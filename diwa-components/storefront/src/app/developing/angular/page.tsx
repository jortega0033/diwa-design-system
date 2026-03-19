import React from 'react';
import { FrameworkGuidePage } from '../_shared/FrameworkGuidePage';
import { FRAMEWORK_GUIDES } from '../_shared/frameworkGuides';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/developing/angular'];


export default function DevelopingAngularPage() {
  return <FrameworkGuidePage guide={FRAMEWORK_GUIDES.angular} />;
}
