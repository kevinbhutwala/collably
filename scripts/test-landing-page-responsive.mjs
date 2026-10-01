import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('📱 MAIN LANDING PAGE RESPONSIVENESS & INTEGRITY AUDIT');
console.log('================================================================\n');

const BASE_DIR = process.cwd();

let allPassed = true;

function check(name, condition, errorMsg) {
  if (condition) {
    console.log(`  ✓ [PASS] ${name}`);
  } else {
    console.log(`  ✗ [FAIL] ${name}: ${errorMsg}`);
    allPassed = false;
  }
}

// 1. Check WishlinkTicketStories
console.log('🎟️ --- 1. TICKET STORIES RESPONSIVENESS & GESTURE AUDIT ---');
const ticketContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkTicketStories.tsx'), 'utf-8');

check(
  'Adaptive Mobile Layout',
  ticketContent.includes('flex flex-row md:flex-col items-center md:justify-center'),
  'Ticket header must be horizontal on mobile and vertical on desktop'
);

check(
  'Responsive Viewport Height',
  ticketContent.includes('min-h-[380px] sm:min-h-[360px] md:h-[360px] lg:h-[350px]'),
  'Ticket viewport must have min-h on mobile to prevent clipping'
);

check(
  'Non-blocking Touch Gestures',
  !ticketContent.includes('e.cancelable) e.preventDefault()'),
  'Touchmove must not prevent default page scrolling'
);

check(
  'Horizontal Swipe Supported',
  ticketContent.includes('onTouchStart={handleTouchStart}') && ticketContent.includes('onTouchEnd={handleTouchEnd}'),
  'Ticket stories must support horizontal swipe'
);

// 2. Check WishlinkEngageBanner
console.log('\n🚀 --- 2. ENGAGE BANNER OVERLAP & SPACING AUDIT ---');
const engageContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkEngageBanner.tsx'), 'utf-8');

check(
  'No Negative Margin on Mobile',
  engageContent.includes('mt-2 sm:mt-4 lg:-mt-28 xl:-mt-32'),
  'Negative top margin must be restricted to desktop (lg:)'
);

check(
  'Valid Tailwind Dimensions',
  !engageContent.includes('w-76') && !engageContent.includes('w-84'),
  'Must not use non-existent tailwind classes w-76 or w-84'
);

check(
  'Mobile Tap Target Buttons',
  engageContent.includes('flex flex-col sm:flex-row items-stretch sm:items-center'),
  'Action buttons must stretch gracefully on mobile'
);

check(
  'Bounded Creator Photo Badge (Zero Right Edge Cutoff)',
  engageContent.includes('relative inline-flex flex-col items-center') &&
  engageContent.includes('left-0 right-0 mx-auto w-[86%] max-w-[230px]'),
  'Creator badge must be centered using left-0 right-0 mx-auto to prevent transform override and right-edge clipping on mobile'
);

// 3. Check StreamlinedPricing
console.log('\n💎 --- 3. PRICING CARDS & BADGE OVERFLOW AUDIT ---');
const pricingContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/StreamlinedPricing.tsx'), 'utf-8');

check(
  'RECOMMENDED Badge Unclipped',
  pricingContent.includes('className="flex relative pt-3.5"') && pricingContent.includes('absolute top-0 left-1/2 -translate-x-1/2'),
  'Recommended badge must sit outside overflow-hidden tilt card'
);

// 4. Check WishlinkHeroShowcase
console.log('\n🌟 --- 4. HERO SECTION RESPONSIVE TYPOGRAPHY AUDIT ---');
const heroContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkHeroShowcase.tsx'), 'utf-8');

check(
  'Fluid Hero Headline',
  heroContent.includes('break-words') && heroContent.includes('text-[2.2rem] min-[360px]:text-[2.6rem]'),
  'Hero title must adapt to 320px+ mobile viewports without overflowing'
);

check(
  'No Orphaned Bullet Separators',
  heroContent.includes('brandPartners.map'),
  'Brand partners ribbon should map cleanly without stray orphaned bullet spans'
);

// 5. Check WishlinkSignpostShowcase
console.log('\n🧭 --- 5. 3D SIGNPOST MOBILE SCALING AUDIT ---');
const signpostContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkSignpostShowcase.tsx'), 'utf-8');

check(
  'Scaled 3D Signpost Container',
  signpostContent.includes('scale-[0.88] min-[360px]:scale-[0.94] min-[420px]:scale-100 origin-center'),
  'Signpost container must scale on small screens to prevent clipping'
);

check(
  'Responsive CTA Button Row',
  signpostContent.includes('flex flex-col sm:flex-row items-stretch sm:items-center'),
  'CTA and navigation arrows must adapt to mobile flex column'
);

// 6. Check WishlinkFlipMarquee
console.log('\n🎴 --- 6. FLIP MARQUEE MOBILE SIZING AUDIT ---');
const marqueeContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkFlipMarquee.tsx'), 'utf-8');

check(
  'Compact Mobile Edge Fade',
  marqueeContent.includes('w-6 sm:w-20 md:w-32 bg-gradient-to-r'),
  'Gradient fades should be w-6 on mobile to avoid covering half the screen'
);

check(
  'Fluid Card Size',
  marqueeContent.includes('w-36 min-[380px]:w-44 sm:w-48'),
  'Cards must shrink proportionally on small phone viewports'
);

// 7. Check StickyCTA & Layout
console.log('\n🔒 --- 7. STICKY CTA & LAYOUT AUDIT ---');
const stickyContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/collably/WishlinkStickyCTA.tsx'), 'utf-8');
const layoutContent = fs.readFileSync(path.join(BASE_DIR, 'src/app/(public)/layout.tsx'), 'utf-8');
const scrollContent = fs.readFileSync(path.join(BASE_DIR, 'src/components/providers/SmoothScrollProvider.tsx'), 'utf-8');

check(
  'Dismissable Sticky Bar',
  stickyContent.includes('isDismissed') && stickyContent.includes('setIsDismissed(true)'),
  'Sticky CTA must have a dismiss option for mobile convenience'
);

check(
  'Dark/Light Text Contrast in Layout',
  layoutContent.includes('text-[#0B0A14] dark:text-[#F4F4F8]'),
  'Layout must not set text-white on light bg-white'
);

check(
  'Native Touch Physics in Lenis',
  scrollContent.includes('syncTouch: false'),
  'Smooth scroll must disable syncTouch virtualization for native 120Hz mobile scrolling'
);

console.log('\n================================================================');
if (allPassed) {
  console.log('✅ ALL RESPONSIVENESS & INTEGRITY CHECKS PASSED (100% SUCCESS)');
} else {
  console.log('❌ SOME RESPONSIVENESS CHECKS FAILED');
  process.exit(1);
}
console.log('================================================================');
