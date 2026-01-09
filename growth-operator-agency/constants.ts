import { Brain, ThumbsUp, Users, Smartphone, Monitor, Mail, Box, Activity, Settings, DollarSign, Clock, Layers, ShieldCheck, MousePointerClick } from 'lucide-react';
import { ServiceItem, MetricItem, WorkItem, FAQItem, NavLink } from './types';

export const COMPANY_NAME = "Growth Operator Agency";

export const NAV_LINKS: NavLink[] = [
  { name: 'Why Us', href: '#benefits' },
  { name: 'Services', href: '#solutions' },
  { name: 'Results', href: '#works' },
  { name: 'Process', href: '#process' },
];

export const HERO_CONTENT = {
  badge: "Limited Client Capacity",
  headline: "Growth Operator Agency",
  subheadline: "We guarantee to add $10,000 to your monthly recurring revenue by launching and growing your paid community within 90 days.",
  cta: "BOOK A CALL"
};

export const MISSION_CONTENT = {
  badge: "Our Mission",
  headline: "Helping Influencers Monetize Their Audience",
  subheadline: "Completely different from any agency you've worked with before. We provide seamless support, making it easy for you to monetize while you focus on creating quality content.",
  cta: "BOOK A CALL"
};

export const BENEFITS: ServiceItem[] = [
  {
    title: "Effortless Management",
    description: "We handle everything, from creating digital assets to setting up landing pages and managing ads.",
    icon: ThumbsUp
  },
  {
    title: "Guaranteed Results",
    description: "If you don't hit $10,000/month within 90 days, we work for free until you do.",
    icon: ShieldCheck
  },
  {
    title: "Expert Built",
    description: "Our goal is to help convert followers into sustainable passive income streams.",
    icon: Users
  }
];

export const SOLUTIONS: ServiceItem[] = [
  {
    title: "Digital Asset Creation",
    description: "Monetize your following effectively and professionally.",
    icon: Layers
  },
  {
    title: "Asset Management",
    description: "Reduce your workload and optimize operations.",
    icon: Box
  },
  {
    title: "Process Automation",
    description: "Automate paywalls and fulfillment workflows.",
    icon: Settings
  },
  {
    title: "Landing Page Creation",
    description: "High-converting designs to capture and convert traffic.",
    icon: MousePointerClick
  },
  {
    title: "24/7 Support",
    description: "Fast resolution ensuring your systems are always online.",
    icon: Clock
  },
  {
    title: "Paid Ads Management",
    description: "Expand your reach through effective advertising campaigns.",
    icon: Monitor
  }
];

// Re-using specific content for layout structure
export const SERVICES: ServiceItem[] = SOLUTIONS;

export const RECENT_WORKS: WorkItem[] = [
  {
    name: "Fitness Coach",
    description: "Increased annual income by over $100k using our system.",
    platforms: ['instagram', 'youtube']
  },
  {
    name: "Content Creator",
    description: "Built a paid community generating $15k/month.",
    platforms: ['tiktok', 'link']
  }
];

export const WORK_METRICS: MetricItem[] = [
  { value: "100K+", label: "Added Annual Revenue" },
  { value: "90 Days", label: "To Reach $10k/mo" },
  { value: "24/7", label: "Technical Support" },
  { value: "100%", label: "Focus On Content" }
];

export const METRICS: MetricItem[] = [
  { value: "12", label: "Current Clients" },
  { value: "9 Days", label: "Avg Launch Time" },
  { value: "$13,892", label: "Avg Monthly Revenue" },
  { value: "54", label: "Digital Assets Created" }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Assessment & Strategy",
    description: "We analyze your current assets and design a custom growth roadmap."
  },
  {
    number: "02",
    title: "Infrastructure Build",
    description: "We set up digital assets, landing pages, and automation systems."
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "Launch the community and optimize ads to hit revenue targets."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Growth Operator Agency took the technical weight off my shoulders. I just make videos, and the money hits my account.",
    author: "Michael T.",
    role: "Fitness Coach",
    company: "FitLife"
  },
  {
    quote: "The revenue guarantee is real. Within 2 months I surpassed the $10,000 recurring revenue mark.",
    author: "Sarah J.",
    role: "Content Creator",
    company: "Lifestyle Vlog"
  },
  {
    quote: "24/7 support is incredibly fast. A truly reliable partner.",
    author: "David Chen",
    role: "Business Consultant",
    company: "BizGrowth"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What makes this agency different?",
    answer: "Unlike standard agencies, we build the infrastructure, manage assets, and provide a written revenue guarantee. We work as a true partner."
  },
  {
    question: "How does the $10,000 guarantee work?",
    answer: "If after 90 days of partnership our system hasn't added at least $10,000/month to your revenue, we continue working for free until it does."
  },
  {
    question: "Do I need technical skills?",
    answer: "Absolutely not. We handle everything: landing pages, payment gateways, and automation. You just focus on creating content."
  },
  {
    question: "Who is this service for?",
    answer: "It's for influencers (KOLs, KOCs, Coaches) who have an existing following and want to convert it into sustainable income."
  }
];

export const FOOTER_CTA = {
  headline: "Book your call today.",
  subheadline: "Start earning tomorrow. We help you monetize your influence.",
  cta: "BOOK A CALL"
};