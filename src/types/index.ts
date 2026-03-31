export interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ValueProposition {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  content: string;
  name: string;
  age: number;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  annualTotal?: string;
  discount?: string;
  features: PricingFeature[];
  cta: string;
  popular: boolean;
}
