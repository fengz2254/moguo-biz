// In Vue we don't strictly need the Component type for the icon in the data interface
// as we can pass the component object directly, but for TS clarity:
export interface NavItem {
  label: string;
  icon: any; // Using any to accommodate Vue component types easily
  active?: boolean;
  hasSubmenu?: boolean;
}

export interface StatData {
  label: string;
  value: number | string;
  subLabel: string;
  subValue: number | string;
  color: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: 'blue' | 'gray';
  icon: any;
}

export interface FaqItem {
  question: string;
}
