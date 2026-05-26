// Responsive type definition - supports breakpoint-based responsive values
// Can use either breakpoint names (base, sm, md, lg, xl) or device names (mobile, tablet, desktop)

export interface Responsive<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  // Also support explicit device naming
  mobile?: T;
  tablet?: T;
  desktop?: T;
}
