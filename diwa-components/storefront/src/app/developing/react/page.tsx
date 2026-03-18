import React from 'react';
import { FrameworkGuidePage } from '../_shared/FrameworkGuidePage';
import { FRAMEWORK_GUIDES } from '../_shared/frameworkGuides';

export default function DevelopingReactPage() {
  return <FrameworkGuidePage guide={FRAMEWORK_GUIDES.react} />;
}
