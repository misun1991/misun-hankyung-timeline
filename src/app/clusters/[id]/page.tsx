'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTimelineData } from '../../../context/TimelineDataContext';
import { SplitViewLayout } from '../../../components/timeline/SplitViewLayout';

export default function ClusterDetailPage() {
  const params = useParams();
  const { setSelectedClusterId, setViewMode } = useTimelineData();
  const clusterId = params?.id as string;

  useEffect(() => {
    if (clusterId) {
      setSelectedClusterId(clusterId);
      setViewMode('split');
    }
  }, [clusterId, setSelectedClusterId, setViewMode]);

  return <SplitViewLayout initialMode="split" />;
}
