export type CategoryType = '전체' | '국제' | '경제' | '부동산' | '사회' | '산업' | '문화';

export type LifecycleStatus = 'ACTIVE' | 'COMPLETED' | 'DISCOVERED';

export type ActionMode = 'CREATE' | 'EVOLVE' | 'APPEND';

export type AuditStatus = 'approved' | 'revision_required' | 'do_not_publish';

export type StatusBadgeType = 'NEW' | '기사추가' | '서사변경';

export interface TimelineSource {
  id?: string;
  name: string; // e.g. 한국경제, 매일경제, 연합뉴스
  title?: string;
  url?: string;
  publishedAt?: string;
  reporter?: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // e.g. "2026년 9월 4일" or "2026.09.04"
  rawDate: string; // "2026-09-04" for sorting
  headline: string; // e.g. "[4대 세습 구도의 발단] ..."
  description: string;
  causalBridge?: string; // Highlighting causality if gap > 6 months
  isGapBridge?: boolean; // Flag to render visual bridge callout
  sources: TimelineSource[];
  significance?: 'critical' | 'high' | 'normal';
}

export interface MergeHistoryItem {
  id: string;
  mergedAt: string;
  sourceClusterName: string;
  reason: string;
  articlesCount: number;
  similarityScore: number;
}

export interface ClusterTopic {
  id: string; // e.g. "cluster-01"
  title: string; // Macro topic name (15~25 characters)
  category: CategoryType;
  subCategories?: string[];
  updatedAt: string; // e.g. "2026.09.08 09:30"
  eventCount: number;
  sourceCount: number;
  auditStatus: AuditStatus;
  statusBadge?: StatusBadgeType;
  lifecycleStatus: LifecycleStatus;
  topicSummary: string; // 3~4 sentences paragraph editorial summary
  currentStatus: string; // Ongoing latest phase sentence
  events: TimelineEvent[];
  mergeHistory?: MergeHistoryItem[];
  rawJson?: any;
}

export interface WorkflowItem {
  id: string; // e.g. "WF-20260908-01"
  clusterId: string;
  category: CategoryType;
  topicName: string;
  mode: ActionMode;
  similarityScore: number;
  auditStatus: AuditStatus;
  eventsCount: number;
  sourcesCount: number;
  createdAt: string;
  inputResearchData?: any;
  finalTimelineData?: any;
  auditLog?: {
    passedCount: number;
    totalCriteria: number;
    reason: string;
    macroImpactScore: number;
    continuityScore: number;
  };
}

export interface InjectionPayload {
  id?: string;
  title: string;
  category: CategoryType;
  subCategories?: string[];
  topic_summary: string;
  current_status: string;
  audit_status?: AuditStatus;
  status_badge?: StatusBadgeType;
  lifecycle_status?: LifecycleStatus;
  action_mode?: ActionMode;
  similarity_score?: number;
  events: Array<{
    id?: string;
    date: string;
    headline: string;
    description: string;
    causal_bridge?: string;
    sources?: Array<{
      name: string;
      title?: string;
      url?: string;
    }>;
  }>;
  merge_history?: Array<{
    merged_at: string;
    source_cluster_name: string;
    reason: string;
    articles_count: number;
  }>;
}
