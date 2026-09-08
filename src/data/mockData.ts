import { ClusterTopic, WorkflowItem } from '../types/timeline';
import liveFallbackClusters from './liveFallbackClusters.json';

export const INITIAL_CLUSTERS: ClusterTopic[] = (liveFallbackClusters as unknown as ClusterTopic[]);

export const INITIAL_WORKFLOWS: WorkflowItem[] = [
  {
    id: 'WF-20260908-01',
    clusterId: 'cluster-01',
    category: '국제',
    topicName: '北 김주애 후계 구도 공식화와 4대 세습 가속화',
    mode: 'EVOLVE',
    similarityScore: 0.92,
    auditStatus: 'approved',
    eventsCount: 5,
    sourcesCount: 14,
    createdAt: '2026-09-08 09:30',
    inputResearchData: {
      query: '북한 김주애 후계 구도 국정원 정보위 보고 4대 세습',
      articlesDiscovered: 18,
      qualifyingArticles: 14,
      period: '2022.11 - 2026.09'
    },
    finalTimelineData: {
      clusterId: 'cluster-01',
      eventMilestones: 5,
      auditPassed: true
    },
    auditLog: {
      passedCount: 3,
      totalCriteria: 3,
      reason: '일회성 해프닝 제외 충족, 동북아 안보 파급력 명확, 4년에 걸친 장기 인과 추적 완성도 우수',
      macroImpactScore: 96,
      continuityScore: 98
    }
  },
  {
    id: 'WF-20260907-04',
    clusterId: 'cluster-02',
    category: '경제',
    topicName: '미·이란 호르무즈 군사 충돌과 글로벌 유가 충격',
    mode: 'EVOLVE',
    similarityScore: 0.88,
    auditStatus: 'approved',
    eventsCount: 4,
    sourcesCount: 16,
    createdAt: '2026-09-07 18:20',
    inputResearchData: {
      query: '호르무즈 해협 이란 의회 봉쇄 유조선 나포 미국 항모',
      articlesDiscovered: 24,
      qualifyingArticles: 16,
      period: '2026.01 - 2026.09'
    },
    finalTimelineData: {
      clusterId: 'cluster-02',
      eventMilestones: 4,
      auditPassed: true
    },
    auditLog: {
      passedCount: 3,
      totalCriteria: 3,
      reason: '국제 원유 수송로 차단에 따른 국내 정유·물류 실질적 타격 입증, 선박 나포 사건과 파병 이슈 유기적 통합',
      macroImpactScore: 94,
      continuityScore: 91
    }
  },
  {
    id: 'WF-20260908-02',
    clusterId: 'cluster-03',
    category: '사회',
    topicName: '서울 대중교통 노사 교섭 결렬과 9월 총파업 비상',
    mode: 'APPEND',
    similarityScore: 0.85,
    auditStatus: 'approved',
    eventsCount: 4,
    sourcesCount: 12,
    createdAt: '2026-09-08 08:45',
    inputResearchData: {
      query: '서울 지하철 버스 파업 비상수송대책 노사 협상 결렬',
      articlesDiscovered: 15,
      qualifyingArticles: 12,
      period: '2026.03 - 2026.09'
    },
    finalTimelineData: {
      clusterId: 'cluster-03',
      eventMilestones: 4,
      auditPassed: true
    },
    auditLog: {
      passedCount: 3,
      totalCriteria: 3,
      reason: '천만 서울 시민 생활 밀착형 사회적 파급력 및 파업 D-2 국면 급변성 반영 적합',
      macroImpactScore: 89,
      continuityScore: 87
    }
  },
  {
    id: 'WF-20260906-08',
    clusterId: 'cluster-04-rev',
    category: '산업',
    topicName: '차세대 전고체 배터리 파일럿 라인 가동 경쟁',
    mode: 'CREATE',
    similarityScore: 0.76,
    auditStatus: 'revision_required',
    eventsCount: 3,
    sourcesCount: 7,
    createdAt: '2026-09-06 14:10',
    inputResearchData: {
      query: '삼성SDI LG엔솔 전고체 배터리 양산 파일럿 라인',
      articlesDiscovered: 9,
      qualifyingArticles: 7,
      period: '2026.04 - 2026.09'
    },
    auditLog: {
      passedCount: 2,
      totalCriteria: 3,
      reason: '기업별 보도자료 위주의 홍보성 이벤트가 혼재되어 기술적 실체 검증 및 인과 브릿지 보강 필요',
      macroImpactScore: 78,
      continuityScore: 72
    }
  },
  {
    id: 'WF-20260905-12',
    clusterId: 'cluster-05-dnp',
    category: '문화',
    topicName: '특정 인플루언서 팝업스토어 한정판 굿즈 대기열 해프닝',
    mode: 'CREATE',
    similarityScore: 0.42,
    auditStatus: 'do_not_publish',
    eventsCount: 2,
    sourcesCount: 3,
    createdAt: '2026-09-05 11:00',
    inputResearchData: {
      query: '성수동 팝업스토어 인플루언서 오픈런 소동',
      articlesDiscovered: 4,
      qualifyingArticles: 3,
      period: '2026.09.05'
    },
    auditLog: {
      passedCount: 0,
      totalCriteria: 3,
      reason: '1차 검증 탈락: 일회성 단순 해프닝으로 산업적/문화적 파급력 결여 및 지속 경과 추적 불필요 판정',
      macroImpactScore: 21,
      continuityScore: 18
    }
  }
];

export const SAMPLE_INJECTION_TEMPLATE = {
  title: 'K-반도체 첨단 HBM4 주도권 탈환과 글로벌 빅테크 공급전',
  category: '산업',
  subCategories: ['반도체', 'AI하드웨어', '수출'],
  topic_summary:
    '엔비디아 차세대 AI 가속기 플랫폼 루빈(Rubin) 출시에 맞춰 SK하이닉스와 삼성전자가 6세대 고대역폭메모리(HBM4) 공급 주도권을 놓고 격돌하고 있습니다. SK하이닉스가 세계 최초 양산 라인을 선제 가동한 데 이어 삼성전자가 맞춤형 4나노 베이스 다이 기반 샘플 성능 검증을 통과하며 추격의 고삐를 당겼습니다. 이는 메모리 반도체가 단순 부품을 넘어 커스텀 파운드리와 융합되는 산업 생태계 대전환을 알리는 신호탄입니다.',
  current_status:
    '글로벌 빅테크의 2027년도 물량 선점 계약이 진행 중이며, 국내 양대 메모리사의 수율 경쟁과 패키징 협력사 생태계 확장이 본격화되는 국면입니다.',
  audit_status: 'approved',
  status_badge: 'NEW',
  action_mode: 'CREATE',
  similarity_score: 0.91,
  events: [
    {
      date: '2026년 9월 6일',
      headline: '[맞춤형 수주전 본격화] 빅테크 3사, 국내 파운드리 연계 HBM4 사전 예약 쇄도',
      description:
        '마이크로소프트, 메타, 구글이 차세대 AI 데이터센터에 탑재할 맞춤형 HBM4 물량을 선점하기 위해 국내 메모리 제조사들과 공동 개발 및 장기 공급 의향서(LOI)를 체결했습니다.',
      sources: [
        { name: '한국경제', title: '빅테크 3사, 삼성·SK하이닉스 HBM4 조기 확보전 총력', url: 'https://www.hankyung.com' },
        { name: '로이터', title: 'Custom HBM4 orders surge for Korean memory giants' }
      ]
    },
    {
      date: '2026년 9월 1일',
      headline: '[세계 최초 양산] SK하이닉스, 차세대 HBM4 16단 적층 완제품 라인 전격 가동',
      description:
        'SK하이닉스가 청주 M15X 팹에서 TSMC와의 원팀 협력을 바탕으로 설계된 HBM4 16단 제품의 본격 양산 출하식을 가졌습니다. 이전 세대 대비 대역폭을 1.4배 끌어올렸습니다.',
      sources: [
        { name: '한국경제', title: 'SK하이닉스 HBM4 세계 최초 출하... "AI 메모리 독주 지속"', url: 'https://www.hankyung.com' }
      ]
    },
    {
      date: '2025년 10월 20일',
      headline: '[기술 표준 확립] JEDEC, HBM4 표준 규격 최종 승인 공표',
      description:
        '국제반도체표준협의기구(JEDEC)가 2048비트 와이드 인터페이스를 지원하는 차세대 HBM4 표준 규격을 공식 확정 발표했습니다.',
      causal_bridge:
        '2025년 가을 표준이 확립된 이후 약 1년 만에 연구실 샘플 단계에서 실제 양산 라인 가동으로 신속히 전환되었습니다.',
      sources: [
        { name: '전자신문', title: 'JEDEC HBM4 표준 확정... 2048비트 인터페이스 채택' }
      ]
    }
  ]
};
