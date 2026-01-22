import { Brain, ThumbsUp, Users, Smartphone, Monitor, Mail, Box, Activity, Settings, DollarSign, Clock, Layers, ShieldCheck, MousePointerClick, Zap, Target } from 'lucide-react';
import { ServiceItem, MetricItem, WorkItem, FAQItem, NavLink, TestimonialItem } from './types';

export const COMPANY_NAME = "Growth Operator Agency";

export const NAV_LINKS: NavLink[] = [
  { name: 'Why Us', href: '#why-us' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Features', href: '#features' },
  { name: 'Process', href: '#process' },
];

export const HERO_CONTENT = {
  badge: "Limited Client Capacity. Spoiler: It never does.",
  headlinePart1: "We create your offer from A to Z, market it,",
  headlinePart2: "and scale it to over €30,000/month in under 60 days.",
  subheadline: "You pay nothing, only result commission.",
  cta: "Apply Now"
};

// "Why Us" Section Content
export const BENEFITS: ServiceItem[] = [
  {
    title: "Built By Experts",
    description: "Leverage our industry expertise to scale your digital products with proven strategies and insights.",
    icon: Brain,
  },
  {
    title: "Seamless Solutions",
    description: "We handle everything from complex funnels, AI automations, and community management so you can focus on what matters most.",
    icon: ThumbsUp,
  },
  {
    title: "Ongoing Partnership",
    description: "We provide continuous support and optimisation to ensure long term success and sustainable growth.",
    icon: Users,
  }
];

// "Complete Backend Solutions" - Updated to match screenshot
export const SOLUTIONS: ServiceItem[] = [
  {
    title: "Stress Less",
    description: "We handle all backend tasks and sales operations so you can focus on growing your business",
    icon: Box 
  },
  {
    title: "Proven Systems",
    description: "Our proven frameworks turn your knowledge into profitable digital products within weeks not months",
    icon: Settings
  },
  {
    title: "Smart Automation",
    description: "We set up automations that nurture leads and convert customers while you sleep",
    icon: Zap
  }
];

export const SERVICES: ServiceItem[] = SOLUTIONS;

// Bento Grid Content
export const BENTO_FEATURES = [
  {
    title: "Effortless Management",
    description: "We handle everything from creating digital assets to setting up high-converting landing pages and managing ad campaigns, so you don't have to.",
    icon: Settings, 
    colSpan: "md:col-span-1"
  },
  {
    title: "Guaranteed Results",
    description: "If you don't reach $10,000 monthly revenue in 90 days, we'll work for free until you do.",
    icon: ShieldCheck,
    colSpan: "md:col-span-1"
  },
  {
    title: "Done-For-You Sales",
    description: "We recruit, train, and place top-tier sales closers to handle your leads and close deals for you 24/7.",
    icon: Users,
    colSpan: "md:col-span-1"
  },
  {
    title: "Proven Track Record",
    description: "Coaches and influencers have scaled to $100,000+ annually using our system when working with us.",
    icon: Activity,
    colSpan: "md:col-span-1",
    isStatsCard: true
  }
];

export const AGENCY_STATS = [
  { label: "Current Client Count", value: "12" },
  { label: "Average Time to Launch", value: "9 Days" },
  { label: "Average MMR per Client", value: "$13,892" },
  { label: "Digital Assets Created", value: "54" },
];

export const RECENT_WORKS: WorkItem[] = [];
export const WORK_METRICS: MetricItem[] = []; 
export const METRICS: MetricItem[] = [];

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
    description: "We launch ads, deploy the sales team, and optimize to hit revenue targets."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What makes this agency different?",
    answer: "Unlike standard agencies, we build the infrastructure, manage assets, and provide a written revenue guarantee. We work as a true partner."
  },
  {
    question: "How does the $10,000 guarantee work?",
    answer: "If after 90 days of partnership our system hasn't added at least $10,000/month to your revenue, we continue working for free until it does. Spoiler: It never does."
  },
  {
    question: "Do I need technical skills?",
    answer: "Absolutely not. We handle everything: landing pages, payment gateways, and automation. You just focus on creating content."
  },
  {
    question: "Who is this service for?",
    answer: "It's for influencers (KOCs, Coaches) who have an existing following and want to convert it into sustainable income."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Working with Growth Operator was the best decision I made for my personal brand. They handled everything.",
    author: "Sarah Jenkins",
    role: "Lifestyle Coach",
    company: "SJ Coaching"
  },
  {
    quote: "The revenue guarantee gave me peace of mind, but the results blew me away. We hit the target in 45 days.",
    author: "David Chen",
    role: "Content Creator",
    company: "TechDaily"
  },
  {
    quote: "I was drowning in tech stack decisions. They came in, built the infrastructure, and I just focused on my community.",
    author: "Amanda Ray",
    role: "Fitness Influencer",
    company: "FitLife"
  }
];

export const MISSION_CONTENT = {
  headline: "We are the backend for your personal brand.",
  subheadline: "Stop wasting time on tech stacks and operational headaches. We build the systems so you can focus on your community.",
  cta: "See How It Works"
};

export const FOOTER_CTA = {
  headline: "Book your call today.",
  subheadline: "Start earning tomorrow. We help you monetize your influence.",
  cta: "Apply Now"
};