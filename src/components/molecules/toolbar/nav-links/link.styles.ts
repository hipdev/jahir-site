import { Link } from '@/components/core/link';
import tw from '@/tw';

export const ToolbarLink = tw(Link)`
  no-underline
  hover:no-underline
  h-full
  inline-flex
  items-center
  justify-center
  align-middle
  font-manrope
  font-bold
  text-2xs
  text-secondary-txt
  rounded-6
  transition-colors
  min-h-[42px]
  max-h-[42px]
  [grid-row:1]
  [grid-column:1]
  mobile-md:text-xs
  [&>span]:text-[inherit]
  [&>span]:h-full
  [&>span]:inline-flex
  [&>span]:items-center
  [&>span]:align-middle
  [&>span]:p-[calc(var(--floatingMargin,0)/var(--spaceDivider,1))]
  [&[aria-current="page"]]:bg-accent-dark/[0.1]
  hover:bg-accent-dark/[0.1]
`;

export const HomeLink = tw(ToolbarLink)`
  self-center
  gap-[calc(var(--floatingMargin,0)/var(--spaceDivider,1))]
  [&_span]:text-transparent
  [&_span]:bg-gradient-to-r
  [&_span]:from-gradient-brand
  [&_span]:to-gradient-blue
  [&_span]:bg-clip-text
`;
