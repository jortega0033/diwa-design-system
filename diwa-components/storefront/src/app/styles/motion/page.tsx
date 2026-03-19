import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
import { MotionPageClient } from './MotionPageClient';

export const metadata: Metadata = stylesSeo['/styles/motion'];

export default function StylesMotionPage() {
  return <MotionPageClient />;
}

