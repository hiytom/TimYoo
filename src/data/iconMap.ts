import type React from 'react';
import {
  Activity,
  Box,
  Briefcase,
  Calendar,
  DollarSign,
  Factory,
  FileCheck,
  Handshake,
  MapPin,
  Repeat,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { IconKey } from './siteData';

export const iconMap: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  dollarSign: DollarSign,
  factory: Factory,
  shieldCheck: ShieldCheck,
  fileCheck: FileCheck,
  users: Users,
  trendingUp: TrendingUp,
  settings: Settings,
  repeat: Repeat,
  briefcase: Briefcase,
  handshake: Handshake,
  mapPin: MapPin,
  box: Box,
  activity: Activity,
  calendar: Calendar,
};
