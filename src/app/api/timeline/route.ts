import { NextResponse } from 'next/server';
import { ClusterTopic, CategoryType, TimelineEvent, TimelineSource } from '@/types/timeline';

const API_BASE_URL = 'https://apidev-core.hankyung.com';

function mapSectionToCategory(section?: string): CategoryType {
  if (!section) return '국제';
  const s = section.trim();
  if (s.includes('정치')) return '정치';
  if (s.includes('경제') || s.includes('금융')) return '경제';
  if (s.includes('산업') || s.includes('기업')) return '산업';
  if (s.includes('증권') || s.includes('주식')) return '증권';
  if (s.includes('부동산')) return '부동산';
  if (s.includes('IT') || s.includes('테크') || s.includes('기술') || s.includes('과학')) return 'IT/테크';
  if (s.includes('국제') || s.includes('외교') || s.includes('해외')) return '국제';
  if (s.includes('사회')) return '사회';
  if (s.includes('문화') || s.includes('스포츠')) return '문화';
  return '국제';
}

function formatDateToKorean(dateStr?: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split(/[-.]/);
  if (parts.length >= 3) {
    return `${parts[0]}년 ${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
  }
  return dateStr;
}

function getMonthsDifference(d1: string, d2: string): number {
  try {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return 0;
    return Math.abs((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
  } catch {
    return 0;
  }
}

export async function GET() {
  try {
    // Fetch in parallel batches of 6 to prevent Nginx 502 payload timeout
    const batchSkips = [0, 6, 12, 18, 24];
    const fetchPromises = batchSkips.map(async skip => {
      try {
        const res = await fetch(`${API_BASE_URL}/timeline?limit=6&skip=${skip}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          next: { revalidate: 30 }
        });
        if (!res.ok) return [];
        const json = await res.json();
        return (json?.data?.items || []) as any[];
      } catch (err) {
        console.error(`Batch skip=${skip} failed:`, err);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const rawItems: any[] = results.flat();

    if (rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: '서버에서 타임라인 데이터를 불러오지 못했습니다.' },
        { status: 502 }
      );
    }

    const seenIds = new Set<string>();

    const clusters: ClusterTopic[] = rawItems
      .filter(item => {
        const id = item._id || item.topic_id || item.workflow_id;
        if (!id || seenIds.has(id)) return false;
        seenIds.add(id);
        return true;
      })
      .map((item, idx) => {
        const topicId = item._id || item.topic_id || `topic-${idx + 1}`;
        const category = mapSectionToCategory(item.topic_section);

        // Source lookup map
        const sourceMap = new Map<string, any>();
        (item.source_index || []).forEach((src: any) => {
          if (src.source_id) sourceMap.set(src.source_id, src);
          if (src.grounding_id) sourceMap.set(src.grounding_id, src);
        });

        // Events mapping
        const rawEvents: any[] = item.timeline || [];
        const events: TimelineEvent[] = rawEvents.map((ev, evIdx) => {
          const rawDate = ev.event_at || '';
          const prevEvent = evIdx > 0 ? rawEvents[evIdx - 1] : null;

          let isGap = false;
          if (prevEvent?.event_at && rawDate) {
            const diffMonths = getMonthsDifference(prevEvent.event_at, rawDate);
            if (diffMonths >= 6) isGap = true;
          }

          if (
            ev.description?.includes('장기화하자') ||
            ev.description?.includes('공백') ||
            ev.description?.includes('이후 1년') ||
            ev.description?.includes('물밑')
          ) {
            isGap = true;
          }

          let causalBridge: string | undefined = undefined;
          if (isGap && ev.description) {
            const sentences = ev.description.split(/(?<=[.?!])\s+/);
            causalBridge = sentences[0] || undefined;
          }

          const sources: TimelineSource[] = (ev.source_ids || []).map((sId: string) => {
            const matched = sourceMap.get(sId);
            if (matched) {
              return {
                id: matched.source_id,
                name: matched.publisher || '한국경제',
                title: matched.title || ev.headline || '관련 기사',
                url: matched.url_validation?.resolved_url || matched.url || '#',
                publishedAt: matched.published_at || rawDate
              };
            }
            return {
              name: '한국경제',
              title: ev.headline || '관련 기사 보도',
              publishedAt: rawDate
            };
          });

          if (sources.length === 0) {
            sources.push({
              name: '한국경제',
              title: ev.headline || '관련 보도',
              publishedAt: rawDate
            });
          }

          return {
            id: ev.event_id || `evt-${topicId}-${evIdx + 1}`,
            date: formatDateToKorean(rawDate),
            rawDate: rawDate,
            headline: ev.headline || '주요 국면 사건',
            description: ev.description || '',
            isGapBridge: isGap,
            causalBridge: causalBridge,
            sources: sources,
            significance: evIdx === rawEvents.length - 1 ? 'critical' : evIdx === 0 ? 'high' : 'normal'
          };
        });

        let currentStatus = '최신 국면 실시간 분석 중';
        if (typeof item.current_status === 'object' && item.current_status !== null) {
          currentStatus = item.current_status.summary || item.current_status.as_of || currentStatus;
        } else if (typeof item.current_status === 'string' && item.current_status.trim()) {
          currentStatus = item.current_status;
        }

        const upDate = item.updated_at ? item.updated_at.replace('T', ' ').slice(0, 16) : '2026.09.08 10:00';

        return {
          id: topicId,
          title: item.topic_title || '한경 AI 이슈 타임라인',
          category: category,
          subCategories: [category],
          updatedAt: upDate,
          eventCount: events.length,
          sourceCount: (item.source_index || []).length || events.length,
          auditStatus: 'approved',
          statusBadge: item.mode === 'merged' ? '서사변경' : item.created_at === item.updated_at ? 'NEW' : '기사추가',
          lifecycleStatus: 'ACTIVE',
          topicSummary: item.topic_summary || '주요 거시 이슈의 과거 발단부터 최근 경과까지 인과 맥락을 시간순으로 구조화한 타임라인입니다.',
          currentStatus: currentStatus,
          events: events,
          mergeHistory:
            item.mode === 'merged' || item.last_merged_from_workflow_id
              ? [
                  {
                    id: item.last_merged_from_workflow_id || `MH-${topicId}`,
                    mergedAt: upDate,
                    sourceClusterName: '관련 파생 이슈 연계',
                    reason: `유사 이슈 정밀 병합 (${Math.round((item.last_merge_similarity || 0.85) * 100)}% 일치)`,
                    articlesCount: (item.source_index || []).length || 3,
                    similarityScore: item.last_merge_similarity || 0.85
                  }
                ]
              : undefined,
          rawJson: item
        };
      });

    return NextResponse.json({
      success: true,
      total: clusters.length,
      data: clusters
    });
  } catch (err: any) {
    console.error('Failed to fetch timeline data from apidev-core:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
