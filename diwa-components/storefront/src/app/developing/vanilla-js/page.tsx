import React from 'react';
import { FrameworkGuidePage } from '../_shared/FrameworkGuidePage';
import { FRAMEWORK_GUIDES } from '../_shared/frameworkGuides';

export default function DevelopingVanillaJsPage() {
  return <FrameworkGuidePage guide={FRAMEWORK_GUIDES['vanilla-js']} />;
}
