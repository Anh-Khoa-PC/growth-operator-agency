import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string; // For solutions section which might use images
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface WorkItem {
  name: string;
  description: string;
  platforms: ('tiktok' | 'instagram' | 'youtube' | 'link')[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  name: string;
  href: string;
}