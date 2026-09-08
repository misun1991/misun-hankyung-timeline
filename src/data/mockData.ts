import { ClusterTopic, WorkflowItem } from '../types/timeline';

export const INITIAL_CLUSTERS: ClusterTopic[] = [
  {
    id: 'cluster-01',
    title: '北 김주애 후계 구도 공식화와 4대 세습 가속화',
    category: '국제',
    subCategories: ['안보', '남북관계', '외교'],
    updatedAt: '2026.09.08 09:30',
    eventCount: 5,
    sourceCount: 14,
    auditStatus: 'approved',
    statusBadge: '서사변경',
    lifecycleStatus: 'ACTIVE',
    topicSummary:
      '북한이 2022년 화성-17형 대륙간탄도미사일(ICBM) 시험발사 당시 김정은 국무위원장의 딸 김주애를 최초 공개한 이래, 군사·정치 공식 석상에서 그녀의 위상을 지속적으로 격상시켜 왔습니다. 2024년 관영 매체에서 최고 지도자에게만 쓰이던 \'향도\' 칭호를 사용한 데 이어, 최근 국가정보원은 김주애가 유력한 후계자 지위에 도달했음을 국회 정보위원회에 보고했습니다. 이는 백두혈통 4대 세습 체제를 조기에 안착시키고 대내외 결속을 도모하려는 전략적 포석으로 분석됩니다.',
    currentStatus:
      '국정원 국회 보고를 기점으로 국내외 정보당국이 후계 내정 사실을 공식 인정하며 당 조직지도부 내 전담 보좌조직 가동 여부를 정밀 추적 중인 국면입니다.',
    events: [
      {
        id: 'evt-01-05',
        date: '2026년 9월 4일',
        rawDate: '2026-09-04',
        headline: '[후계자 내정 국정원 보고] 국정원 "김주애, 유력 후계자 내정 단계 진입"',
        description:
          '국가정보원은 국회 정보위원회 비공개 간담회에서 김주애의 의전 수준과 현장 지도 활동 반경을 종합 분석한 결과 후계자 수업이 70% 이상 진척되어 사실상 내정 단계에 접어들었다고 공식 보고했습니다. 노동당 주요 간부들의 정중한 도열과 김여정 노동당 부부장의 깍듯한 수행 태도가 핵심 근거로 제시되었습니다.',
        isGapBridge: true,
        causalBridge:
          '2024년 봄 \'향도\' 호칭 부여 이후 약 2년 6개월간 물밑에서 이뤄진 당무 참여 실적과 군부 장악력이 축적된 결과, 대외 정보기관의 최종 판정으로 결실을 맺었습니다.',
        sources: [
          { name: '한국경제', title: '국정원 "北 김주애, 사실상 후계자 내정 단계 진입 확인"', publishedAt: '2026.09.04' },
          { name: '매일경제', title: '정보위 보고 "김주애 활동 반경, 군사에서 당·경제 전반 확대"', publishedAt: '2026.09.04' },
          { name: '연합뉴스', title: '외신 "北 4대 세습 조기 굳히기... 후계자 내정 공식화 촉각"', publishedAt: '2026.09.05' }
        ],
        significance: 'critical'
      },
      {
        id: 'evt-01-04',
        date: '2024년 3월 16일',
        rawDate: '2024-03-16',
        headline: '[최고 존칭 격상] 북한 관영매체, 김주애에 지도자 칭호인 \'향도\' 최초 사용',
        description:
          '조선중앙통신과 노동신문은 김정은과 김주애의 강동종합온실 준공식 참석 소식을 전하며 "향도의 위대한 분들께서 당 및 정부, 군부의 간부들과 함께 온실을 돌아보셨다"고 보도했습니다. 복수형 표현을 통해 김주애를 최고 지도자 반열인 \'향도자\'로 격상시켰음을 천명했습니다.',
        isGapBridge: true,
        causalBridge:
          '2023년 말 군 창건 열병식에서 주석단 중심에 선 이후 1년 만에 호칭 체계마저 후계 구도에 맞게 재정비된 중대 전곡점입니다.',
        sources: [
          { name: '한국경제', title: '北매체, 김주애에 \'향도\' 칭호 첫 사용... "후계 수업 본궤도"', publishedAt: '2024.03.16' },
          { name: '한경비즈니스', title: '북한 권력 승계 분석: \'향도\' 단어의 정치적 무게', publishedAt: '2024.03.18' }
        ],
        significance: 'high'
      },
      {
        id: 'evt-01-03',
        date: '2023년 2월 8일',
        rawDate: '2023-02-08',
        headline: '[군심 장악 무대] 건군절 75주년 열병식 주석단 중앙 차지',
        description:
          '건군절 야간 열병식에서 김주애는 김정은의 바로 곁에서 군 장성들의 경례를 받으며 행진을 사열했습니다. 조선중앙TV는 김주애의 백마를 열병 종대 선두에 세우며 혈통의 순수성과 정통성을 대대적으로 선전했습니다.',
        isGapBridge: false,
        sources: [
          { name: '조선일보', title: '열병식 주석단 정중앙에 선 김주애... 군 장성들 무릎 꿇어', publishedAt: '2023.02.09' },
          { name: '한국경제', title: '백마 탄 김주애, 북한 군부 서열 1순위 상징성 각인', publishedAt: '2023.02.09' }
        ],
        significance: 'high'
      },
      {
        id: 'evt-01-02',
        date: '2022년 11월 27일',
        rawDate: '2022-11-27',
        headline: '[위상 수직 상승] ICBM 공로자 기념사진서 \'존귀하신 자제분\' 격상',
        description:
          '화성-17형 발사에 기여한 국방과학 연구진과의 기념촬영에서 북한 매체는 김주애를 종전 \'사랑하는 자제분\'에서 \'존귀하신 자제분\'으로 호칭을 격상시키며 미래 국방의 상징으로 자리매김했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '北 매체 \'존귀하신 자제분\' 호칭 격상... 김주애 우상화 시동', publishedAt: '2022.11.28' }
        ],
        significance: 'normal'
      },
      {
        id: 'evt-01-01',
        date: '2022년 11월 18일',
        rawDate: '2022-11-18',
        headline: '[4대 세습 구도의 발단] 화성-17형 시험발사장 최초 공개 동행',
        description:
          '김정은 국무위원장이 평양 순안비행장에서 신형 ICBM \'화성-17형\' 발사를 현장 지도할 때 흰색 패딩을 입은 딸 김주애의 손을 잡고 걷는 사진이 관영 매체를 통해 전격 공개되었습니다. 이는 4대 혈통 세습의 시작을 전 세계에 알린 최초의 공식 사건입니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '김정은, 딸 김주애 손잡고 ICBM 발사 참관... 첫 공식 등장', publishedAt: '2022.11.19' },
          { name: '로이터', title: 'North Korea unveils Kim Jong Un\'s daughter in missile test photo', publishedAt: '2022.11.19' }
        ],
        significance: 'critical'
      }
    ],
    mergeHistory: [
      {
        id: 'mrg-01',
        mergedAt: '2026.09.04 16:30',
        sourceClusterName: '국정원 정보위 비공개 보고와 김여정 의전 변화',
        reason: '김주애 후계 내정 판단의 결정적 근거로 판단되어 기존 4대 세습 장기 타임라인에 결합 및 서사 최신화',
        articlesCount: 5,
        similarityScore: 0.92
      }
    ]
  },
  {
    id: 'cluster-02',
    title: '미·이란 호르무즈 군사 충돌과 글로벌 유가 충격',
    category: '경제',
    subCategories: ['국제정세', '유가/원자재', '해운물류'],
    updatedAt: '2026.09.07 18:20',
    eventCount: 4,
    sourceCount: 16,
    auditStatus: 'approved',
    statusBadge: '서사변경',
    lifecycleStatus: 'ACTIVE',
    topicSummary:
      '중동 내 친이란 무장세력의 공습 격화에 맞서 미 해군이 이란 혁명수비대(IRGC) 고속정과 방공망 시설을 타격하면서 호르무즈 해협 일대의 군사적 긴장이 최고조에 달했습니다. 이란이 해협 통항 선박에 대한 무차별 나포 및 봉쇄를 경고하자 브렌트유는 배럴당 95달러선을 돌파했습니다. 이번 사태는 단발성 교전을 넘어 한국 청해부대의 작전 구역 조정과 원유 수급 비상대책으로 전면 비화되고 있습니다.',
    currentStatus:
      '이란 의회의 호르무즈 봉쇄 결의안 채택 임박에 대응해 미국 주도 다국적 해상연합군이 호위선단 작전을 재개했으며, 국제유가는 장중 4.2% 급등세입니다.',
    events: [
      {
        id: 'evt-02-04',
        date: '2026년 9월 7일',
        rawDate: '2026-09-07',
        headline: '[해협 봉쇄 결의안 추진] 이란 의회, 호르무즈 통항 통제 법안 긴급 상정',
        description:
          '이란 의회가 서방 유조선의 호르무즈 해협 통과세를 부과하고 불응 시 통항을 차단하는 긴급 결의안을 상정했습니다. 이에 따라 국내 에너지 업계는 정유 비축유 방출 및 대체 수송로(홍해 우회선) 확보 등 긴급 위기대응 2단계에 착수했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '이란, 호르무즈 통제법 상정... WTI 95달러 돌파 초읽기', publishedAt: '2026.09.07' },
          { name: '블룸버그', title: 'Iran Parliament moves to restrict Hormuz Strait tanker traffic', publishedAt: '2026.09.07' }
        ],
        significance: 'critical'
      },
      {
        id: 'evt-02-03',
        date: '2026년 8월 29일',
        rawDate: '2026-08-29',
        headline: '[연합군 공습 대응] 미 중부사령부, 이란 혁명수비대 해상기지 정밀 타격',
        description:
          '미 해군 제5함대 소속 F/A-18 슈퍼호넷 전투기가 걸프만 입구에서 유조선을 위협하던 이란 드론 발사 기지와 해안 미사일 포대를 전격 파괴했습니다. 이란 외무부는 "주권 침해에 대한 대가를 치를 것"이라며 보복을 공언했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '美, 호르무즈 드론 기지 공습... 중동 전운 최고조', publishedAt: '2026.08.30' },
          { name: '워싱턴포스트', title: 'US conducts precision strikes on IRGC coastal sites', publishedAt: '2026.08.30' }
        ],
        significance: 'high'
      },
      {
        id: 'evt-02-02',
        date: '2026년 6월 15일',
        rawDate: '2026-06-15',
        headline: '[유조선 나포 도발] 이란 혁명수비대, 서방 국적 초대형 원유운반선(VLCC) 나포',
        description:
          '이란 해군 특수부대가 헬기를 동원해 오만만 북부 공해상에서 운항 중이던 마셜제도 국적 유조선 2척을 강제 나포하여 반다르아바스항으로 예인했습니다. 이로 인해 글로벌 해상 보험료율이 300% 폭등했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한경비즈니스', title: '이란의 유조선 나포 전쟁... 글로벌 해상운임비 300% 급등', publishedAt: '2026.06.16' }
        ],
        significance: 'high'
      },
      {
        id: 'evt-02-01',
        date: '2026년 1월 12일',
        rawDate: '2026-01-12',
        headline: '[대치의 시발점] 예멘 반군·이란 연합 해상 공격에 미국 항모전단 전진 배치',
        description:
          '홍해-아덴만 항로 위협이 호르무즈 해협 전면으로 번지자 미 국방부는 에이브러햄 링컨 항모타격단을 아라비아해로 전진 배치하고 걸프 협력회의(GCC) 회원국들과 공동 초계작전에 돌입했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '美 항모전단 호르무즈 급파... 중동 원유 수송로 일촉즉발', publishedAt: '2026.01.13' }
        ],
        significance: 'normal'
      }
    ],
    mergeHistory: [
      {
        id: 'mrg-02-a',
        mergedAt: '2026.09.07 17:00',
        sourceClusterName: '한국 청해부대 작전범위 호르무즈 확대 논란',
        reason: '미국 측의 다국적 해상연합군 동참 요청 및 정부 검토 기사가 본류인 중동 유가 충격 서사에 흡수·병합(EVOLVE)',
        articlesCount: 6,
        similarityScore: 0.88
      },
      {
        id: 'mrg-02-b',
        mergedAt: '2026.08.30 11:15',
        sourceClusterName: '국제 유가 90달러 돌파와 정유주 주가 급등락',
        reason: '군사 충돌에 직접 연동된 금융·에너지 지표 이슈 통합',
        articlesCount: 4,
        similarityScore: 0.85
      }
    ]
  },
  {
    id: 'cluster-03',
    title: '서울 대중교통 노사 교섭 결렬과 9월 총파업 비상',
    category: '사회',
    subCategories: ['노동', '교통', '지자체'],
    updatedAt: '2026.09.08 08:45',
    eventCount: 4,
    sourceCount: 12,
    auditStatus: 'approved',
    statusBadge: '기사추가',
    lifecycleStatus: 'ACTIVE',
    topicSummary:
      '서울 지하철 1~8호선을 운영하는 서울교통공사와 시내버스 노조가 임금 인상률 및 신규 인력 채용 규모를 둘러싸고 사측·서울시와 팽팽히 맞서며 교섭이 최종 결렬되었습니다. 노조 연합회가 9월 10일 동시 총파업을 예고함에 따라 수도권 출퇴근 대란이 가시화되고 있습니다. 서울시는 대체 수송 차량 투입과 지하철 비상 운행 계획을 세우는 한편 막판 중앙노동위원회 사후 조정을 타진하고 있습니다.',
    currentStatus:
      '파업 D-2를 앞두고 노사 대표단이 마지막 실무협상에 돌입했으나 승무 인력 감축 철회 여부를 두고 이견을 좁히지 못하고 있습니다.',
    events: [
      {
        id: 'evt-03-04',
        date: '2026년 9월 8일',
        rawDate: '2026-09-08',
        headline: '[파업 D-2 총력전] 서울시, 비상수송대책본부 가동... "출퇴근 전세버스 1200대 투입"',
        description:
          '서울시는 노조의 10일 파업 돌입에 대비해 비상수송대책본부를 24시간 가동 체제로 전환했습니다. 파업 시 대체 인력을 투입해 출근 시간대 지하철 운행률을 80% 수준으로 유지하고, 시내 주요 환승 거점에 전세버스를 집중 배치할 방침입니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '서울시, 지하철·버스 파업 대비 비상수송대책 전격 가동', publishedAt: '2026.09.08' },
          { name: '뉴시스', title: '출퇴근길 대란 오나... 서울 대중교통 노사 최종 담판 촉각', publishedAt: '2026.09.08' }
        ],
        significance: 'critical'
      },
      {
        id: 'evt-03-03',
        date: '2026년 9월 2일',
        rawDate: '2026-09-02',
        headline: '[쟁의권 확보] 양대 노조 찬반투표서 78% 찬성으로 9월 10일 총파업 결의',
        description:
          '서울교통공사 노조와 시내버스 노동조합의 조합원 총투표 결과 압도적인 찬성표로 합법적 파업권이 확보되었습니다. 노조는 "사측의 일방적 인력 감축과 외주화 방침을 철회하지 않는 한 타협은 없다"고 선언했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '서울교통공사 노조 파업 찬반투표 78% 가결... 10일 돌입', publishedAt: '2026.09.02' }
        ],
        significance: 'high'
      },
      {
        id: 'evt-03-02',
        date: '2026년 7월 24일',
        rawDate: '2026-07-24',
        headline: '[조정 중지 결정] 서울지방노동위원회 최종 조정 결렬',
        description:
          '서울지노위에서 열린 노사 최종 조정 회의에서 임금 2.8% 인상안과 청년 신규 채용 확대를 요구하는 노조 측과 재정 적자를 이유로 동결을 주장하는 사측의 격차를 좁히지 못해 \'조정 중지\' 결정이 내려졌습니다.',
        isGapBridge: false,
        sources: [
          { name: '매일노동뉴스', title: '지노위 조정 중지... 서울지하철 노사 갈등 전면전 치달아', publishedAt: '2026.07.25' }
        ],
        significance: 'normal'
      },
      {
        id: 'evt-03-01',
        date: '2026년 3월 18일',
        rawDate: '2026-03-18',
        headline: '[교섭의 발단] 2026년 단체교섭 상견례... 인력감축 철회 vs 누적적자 해소 충돌',
        description:
          '서울교통공사 노사는 본사 대회의실에서 2026년도 단체교섭 상견례를 열고 공식 협상에 착수했습니다. 노조는 2인 1조 근무 확립을 위한 1000명 신규 채용을 요구한 반면, 공사는 누적적자 18조 원 해소를 위한 경영합리화를 고수했습니다.',
        isGapBridge: false,
        sources: [
          { name: '한국경제', title: '서울교통공사 노사 단체교섭 첫발부터 \'정원 감축\' 평행선', publishedAt: '2026.03.19' }
        ],
        significance: 'normal'
      }
    ],
    mergeHistory: []
  }
];

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
