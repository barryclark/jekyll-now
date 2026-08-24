# Planning Guide

A bilingual (English/French) wedding website for Justine and Alex celebrating their marriage on June 6, 2026, providing guests with all essential information about the celebration at Fritz Community Center in Baie-D'Urfé, QC.

**Experience Qualities**: 
1. **Romantic** - Evokes the joy and elegance of a wedding celebration through refined typography and warm visual elements
2. **Informative** - Presents all necessary details clearly and accessibly in both languages without overwhelming guests
3. **Celebratory** - Creates excitement through countdown timers, beautiful imagery, and vibrant color choices that honor the couple's special day

**Complexity Level**: Light Application (multiple features with basic state)
This is a multi-page informational website with language switching, countdown timer, embedded forms, and persistent user preferences - typical of a modern wedding website with moderate interactivity.

## Essential Features

### Language Toggle (English/French)
- **Functionality**: Switches all content between English and French
- **Purpose**: Accommodates bilingual wedding guests in Montreal
- **Trigger**: Toggle button in header/navigation
- **Progression**: Click toggle → All text updates instantly → Preference saved to persist across visits
- **Success criteria**: All pages display correct translations, preference persists on reload

### Home Page with Countdown
- **Functionality**: Displays wedding announcement, live countdown to ceremony, date/location, and navigation links
- **Purpose**: Creates excitement and provides immediate access to key information
- **Trigger**: Landing on website
- **Progression**: View countdown → See date/venue → Click quick links to RSVP/Schedule/Travel
- **Success criteria**: Countdown updates in real-time, all information is visible, links navigate correctly

### Multi-Page Navigation
- **Functionality**: Navigate between Home, About, Schedule, RSVP, FAQ, Travel, Venue, Save the Date
- **Purpose**: Organize information logically without overwhelming visitors
- **Trigger**: Click navigation menu items
- **Progression**: Click nav item → Smooth transition to page → View content → Navigate to other pages
- **Success criteria**: All pages accessible, smooth transitions, clear active state

### Schedule Timeline
- **Functionality**: Displays wedding day timeline with times and activities
- **Purpose**: Helps guests plan their day and arrive on time
- **Trigger**: Navigate to Schedule page
- **Progression**: View timeline → Note arrival time → Plan accordingly
- **Success criteria**: Times clearly displayed, activities described in both languages

### RSVP Form Integration
- **Functionality**: Embeds Google Form for guest responses
- **Purpose**: Collect RSVPs with deadline of April 6, 2026
- **Trigger**: Navigate to RSVP page
- **Progression**: View RSVP request → Fill out embedded form → Submit response
- **Success criteria**: Form displays correctly, responsive on mobile, deadline clearly stated

### FAQ Section
- **Functionality**: Accordion-style answers to common questions
- **Purpose**: Reduces repeated questions about dress code, timing, amenities
- **Trigger**: Navigate to FAQ page or click question
- **Progression**: View questions → Expand desired topic → Read answer → Collapse or continue
- **Success criteria**: Questions organized logically, expand/collapse smoothly, answers comprehensive

### Travel Information
- **Functionality**: Provides transportation options, hotel recommendations, weather info
- **Purpose**: Helps out-of-town guests plan their trip to Montreal
- **Trigger**: Navigate to Travel page
- **Progression**: View transportation options → Note hotel recommendations → Check weather expectations
- **Success criteria**: Information organized by category, hotel section indicates "coming soon"

### Save the Date Display
- **Functionality**: Shows the couple's save-the-date announcement image
- **Purpose**: Provides visual continuity and nostalgia for guests
- **Trigger**: Navigate to Save the Date page
- **Progression**: View image → Appreciate design → Reference date/location
- **Success criteria**: Image displays clearly at appropriate size, responsive on all devices

## Edge Case Handling

- **Missing Translation**: Default to English if translation key is missing
- **Countdown Completion**: After June 6, 2026, display "We're married!" message instead of countdown
- **Embedded Form Loading**: Show loading state if Google Form is slow to load
- **Mobile Navigation**: Collapse menu into hamburger on small screens
- **Image Loading**: Show placeholder or skeleton while save-the-date image loads
- **Long FAQ Answers**: Ensure accordion prevents page jumping when expanding content

## Design Direction

The design should evoke sophisticated minimalism and contemporary elegance - clean, refined, and design-forward. Think high-end editorial design, art gallery exhibitions, and modern luxury. The aesthetic should be minimal but not cold, with generous whitespace and strong typographic hierarchy that creates visual impact through restraint rather than decoration.

## Color Selection

A sophisticated neutral palette with muted earth tones and refined accent colors, creating a calm, contemporary atmosphere.

- **Primary Color**: Deep Forest Green (oklch(0.28 0.03 155)) - Conveys natural elegance and sophistication, providing subtle depth
- **Secondary Colors**: Warm Off-White (oklch(0.98 0.005 85)) for backgrounds creating breathing room and calm
- **Accent Color**: Muted Sage Gold (oklch(0.65 0.08 75)) - Subtle highlight color for interactive elements and focal points without overwhelming
- **Foreground/Background Pairings**: 
  - Background Off-White (oklch(0.98 0.005 85)): Deep charcoal text (oklch(0.25 0.02 150)) - Ratio 12.8:1 ✓
  - Primary Green (oklch(0.28 0.03 155)): Off-white text (oklch(0.98 0.005 85)) - Ratio 11.2:1 ✓
  - Accent Sage (oklch(0.65 0.08 75)): Off-white text (oklch(0.98 0.005 85)) - Ratio 5.8:1 ✓

## Font Selection

Typography should feel editorial and refined - elegant serif for display creating visual impact paired with clean modern sans-serif for exceptional readability.

- **Display Font**: Cormorant Garamond - Brings refined elegance with its thin, graceful letterforms perfect for large display text
- **Body Font**: Inter - Contemporary sans-serif ensuring perfect readability across all devices

**Typographic Hierarchy**:
- H1 (Names on Hero): Cormorant Garamond Light/96px-144px/loose letter-spacing (0.03em)
- H2 (Page Titles): Cormorant Garamond Light/56px-112px/normal
- H3 (Section Headers): Cormorant Garamond Regular/32px-48px/normal
- Body Text: Inter Regular/16px-20px/1.6 line-height
- Small Details (Labels): Inter Medium/12px-14px/wide letter-spacing (0.2em) uppercase

## Animations

Animations should be minimal and purposeful - subtle fades and gentle transitions that feel natural and never call attention to themselves. Hover states should be understated color shifts, navigation should use simple opacity transitions, and any motion should complete quickly (under 300ms) to maintain the refined, professional aesthetic.

## Component Selection

- **Components**: 
  - Minimalist navigation with text-only links and subtle underlines
  - Zero border-radius for sharp, architectural feel
  - Accordion for FAQ with simple border separators
  - Thin line dividers creating elegant section breaks
  - Generous whitespace replacing traditional cards/containers
  
- **Customizations**: 
  - Custom countdown display using large serif numerals with minimal styling
  - Timeline-style schedule layout with time on left, icon center, description right
  - Simple language toggle with pipe separator
  - Hero section with subtle grid pattern background
  - Elegant horizontal divider with centered gradient line
  
- **States**: 
  - Buttons: Simple border changes on hover, minimal color shift
  - Accordion: Clean expand/collapse with no animation flourishes
  - Navigation: Thin underline for active state, hover shows underline preview
  - All interactions complete in under 300ms
  
- **Icon Selection**: 
  - All icons use "thin" weight from Phosphor for delicate, refined appearance
  - Calendar (CalendarDots) for date references
  - MapPin for location and travel sections
  - Clock for schedule
  - Question for FAQ
  - Envelope for contact
  - Heart for about/love story
  - ArrowRight for navigation CTAs
  
- **Spacing**: 
  - Generous page padding: px-6 md:px-12 for breathing room
  - Large section gaps: py-24 md:py-32 for spacious vertical rhythm
  - Content max-width: max-w-4xl md:max-w-5xl for optimal reading
  - Minimal internal padding allowing content to breathe
  
- **Mobile**: 
  - Navigation collapses into minimal hamburger
  - Hero names remain large and impactful on mobile
  - Countdown becomes 2x2 grid on smallest screens
  - Schedule timeline stacks naturally
  - Language toggle always visible
  - Typography scales down gracefully (H1: 96px → 48px)
