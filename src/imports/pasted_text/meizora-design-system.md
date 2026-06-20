Design a complete ultra-premium dark UI design system for a website called "Meizora" — an AI image prompt discovery platform. The product is a visual gallery where users browse AI-generated image inspirations, click on any image to reveal the exact AI prompt used to create it, and copy that prompt to use in tools like Midjourney, FLUX, DALL·E, or Stable Diffusion.

---

## BRAND IDENTITY & DESIGN LANGUAGE

Name: Meizora
Tagline: "Find the prompt. Create the vision."
Personality: Premium editorial magazine meets dark-mode creative studio. Think: Linear.app meets Behance dark mode meets a luxury fashion publication. Human-crafted feel, not AI-generated generic.

---

## DESIGN SYSTEM FOUNDATION

### Color Palette (strictly follow these values)

Background primary: #0B0B10
Background surface (cards): #13131A
Background elevated: #1A1A24
Border default: rgba(255, 255, 255, 0.07)
Border hover: rgba(255, 255, 255, 0.14)
Border accent: rgba(183, 148, 244, 0.25)

Text primary: #EDECF5
Text secondary: #9896B0
Text tertiary (muted): #5C5A72
Accent purple: #B794F4
Accent purple dim: rgba(183, 148, 244, 0.1)
Accent green (copy/success): #4ADE80
Accent gold (trending): #FBBF24

### Typography

Display font: "Clash Display" — weight 600, 700. Used for hero headings, section titles, brand logo.
Body font: "Outfit" — weight 300, 400, 500, 600. Used for all body text, labels, navigation, buttons.
Mono font: "JetBrains Mono" — weight 400. Used ONLY for prompt text display inside cards and drawers.

Font scale:

- Hero heading: 52px / Clash Display 700 / letter-spacing -0.04em / line-height 1.05
- Section heading: 32px / Clash Display 600 / letter-spacing -0.03em
- Card title: 14px / Outfit 500
- Body text: 14px / Outfit 400 / line-height 1.6
- Label / tag: 10px / Outfit 700 / letter-spacing 0.1em / uppercase
- Prompt text: 12px / JetBrains Mono 400 / line-height 1.8 / color #C5C3D8
- Navigation: 13px / Outfit 400

### Spacing System

Base unit: 4px
Component internal padding: 16px, 20px, 24px
Section padding: 48px vertical, 32px horizontal
Card gap: 12px
Border radius: 14px cards, 10px buttons, 6px tags/badges, 20px pill buttons

### Visual Atmosphere

Add a very subtle radial glow at the top center of the page — rgba(183, 148, 244, 0.06) — 60% width, 30% height, feathered to transparency. This is the only atmospheric effect. No noise textures. No mesh gradients. No decorative patterns. Depth comes from layered surfaces and precise border values only.

---

## PAGE 1 — HOMEPAGE / GALLERY (DESKTOP, 1440px wide)

### Navigation Bar

Height: 60px. Background: rgba(11, 11, 16, 0.85) with backdrop blur 20px. Bottom border: 1px solid rgba(255,255,255,0.07). Sticky. Padding: 0 40px.

Left: Logo — white dot 8px with 1px purple glow, followed by "Vivid" in Clash Display 700 20px. Dot and text separated by 8px.

Center: Navigation links — Explore / Trending / Collections / Creators. Each: Outfit 400 13px, color #9896B0. Hover state shows color #EDECF5 with very subtle underline.

Right: "Submit Prompt" button — Outfit 600 13px, background #B794F4, color #0B0B10, border-radius 8px, padding 8px 18px. Hover: opacity 0.88. Plus a user avatar circle placeholder 34px diameter.

### Hero Section

Height: auto (no fixed height). Padding: 56px 0 44px. Background: transparent (the page background shows through). Centered content. Max-width of content: 680px, centered.

Top of hero: A small pill badge — "✦ 2,847 prompts updated daily" — 11px Outfit 700, uppercase, letter-spacing 0.1em, color #B794F4, background rgba(183,148,244,0.1), border 1px solid rgba(183,148,244,0.2), border-radius 20px, padding 5px 14px. Small 6px animated pulse dot before text.

Hero heading (2 lines): "Find the perfect prompt." line break "Create stunning visuals." — 52px Clash Display 700, letter-spacing -0.04em, line-height 1.05, color #EDECF5. The word "perfect" has color #B794F4.

Subheading below (1 line): "Browse thousands of AI prompts. Click any image to copy it instantly." — 15px Outfit 300, color #9896B0.

Search bar below subheading: 24px gap. Full width of content area (max 580px). Height 50px. Background #13131A. Border 1px solid rgba(255,255,255,0.12). Border-radius 12px. Left: 16px padding, search icon 16px in #5C5A72. Placeholder text: "Search prompts, styles, moods…" in #5C5A72 Outfit 400 14px. Right: small "⌘K" shortcut badge in #5C5A72 background rgba(255,255,255,0.06) rounded 4px. On focus: border-color rgba(183,148,244,0.4), box-shadow 0 0 0 3px rgba(183,148,244,0.08).

### Category Filter Bar

Margin-top: 28px from hero bottom. Full width. Overflow-x scroll, scrollbar hidden. Padding: 0 40px. 8px gap between pills.

Pills: "All" (active), "Cinematic", "Fashion & Editorial", "Portrait", "Anime & Illustration", "Architecture", "Product Ads", "Nature & Landscape", "Viral / Trending", "Poster Design", "Dark & Moody", "Minimal Abstract".

Default pill: Outfit 500 12px, color #9896B0, background transparent, border 1px solid rgba(255,255,255,0.1), border-radius 20px, padding 7px 16px.

Active pill: color #B794F4, background rgba(183,148,244,0.1), border-color rgba(183,148,244,0.3).

Hover pill: color #EDECF5, border-color rgba(255,255,255,0.2).

### Sort & Count Row

Margin-top: 24px. Padding: 0 40px. Flexbox, space-between.

Left: Sort tabs pill group — background #13131A, border 1px solid rgba(255,255,255,0.07), border-radius 10px, internal padding 3px. Three tabs: "Trending" / "Newest" / "Popular". Active tab: background #1A1A24, Outfit 500 12px color #EDECF5. Inactive: Outfit 400 12px color #9896B0.

Right: "2,847 prompts" — Outfit 400 12px color #5C5A72.

### Masonry Gallery Grid

Margin-top: 20px. Padding: 0 40px 64px. Column layout: 4 columns, 12px gap. Variable row heights (masonry), simulating Pinterest-style layout.

Each card:

- Background: #13131A
- Border: 1px solid rgba(255,255,255,0.07)
- Border-radius: 14px
- Overflow: hidden
- No drop shadow
- Cursor: pointer
- On hover: border-color rgba(255,255,255,0.14), translateY(-2px) transition

Card image area: variable height (portrait ~65% AR, landscape ~55% AR, square ~80% AR). The image fills this area with object-fit cover.

On top of image (always visible):

- Top-left: Category badge — background rgba(11,11,16,0.72) with backdrop-blur 8px, border 1px solid rgba(255,255,255,0.1), border-radius 5px, padding 3px 8px. Text: Outfit 700 9px uppercase letter-spacing 0.1em color #EDECF5.
- Top-right: Like count — same backdrop pill, "♡ 1.8k" — Outfit 500 11px color #EDECF5.

On hover overlay (animated, opacity 0 → 1 on card hover, duration 200ms):

- Gradient from bottom: rgba(11,11,16,0.95) at bottom to transparent at 55% height
- Inside overlay at bottom:
    - Category label (10px Outfit 700 uppercase, color #B794F4)
    - Card title (13px Outfit 500, color #EDECF5, 2 lines max)
    - Two small buttons: "♡ Save" and "Copy Prompt ↗" — each 11px Outfit 500, background rgba(255,255,255,0.08), border-radius 6px, padding 5px 10px, color #EDECF5

Design 8 sample cards across the masonry grid with these categories and varying aspect ratios:

1. "Neon Rain Tokyo Night" — Cinematic — tall portrait
2. "Desert Editorial Couture" — Fashion & Editorial — landscape
3. "Freckled Natural Light Portrait" — Portrait — tall
4. "Retro Sci-Fi Movie Poster" — Poster Design — tall
5. "Studio Ghibli Forest Spirit" — Anime & Illustration — landscape
6. "Crimson Velvet Fashion" — Dark & Moody — tall
7. "Brutalist Concrete Interior" — Architecture — landscape
8. "Bioluminescent Ocean Wave" — Viral / Trending — landscape wide

Each card image placeholder should be a dark-toned color block matching the category mood — not grey placeholders.

---

## PAGE 2 — PROMPT DETAIL DRAWER (OVERLAY STATE)

Design the open drawer state on top of the blurred gallery.

Backdrop: the gallery behind is dimmed with rgba(0,0,0,0.65) and backdrop-blur 6px. This shows the gallery is still there underneath.

Drawer panel: slides up from bottom. Width: 640px max. Centered horizontally. Bottom: 24px from viewport edge. Background: #13131A. Border: 1px solid rgba(255,255,255,0.12). Border-radius: 20px. Overflow hidden.

Top of drawer: image from the selected card — full width, height 220px, object-fit cover. No border-radius on this image (it clips to the drawer's rounded corners at top only).

Body section padding: 22px 24px.

Header row inside body:

- Left stacked: category badge (same pill style as card, purple), then 1 line title 20px Clash Display 600 color #EDECF5
- Right: X close button — 34px × 34px, background #1A1A24, border 1px solid rgba(255,255,255,0.1), border-radius 8px, "✕" 14px color #9896B0

Prompt box (most important element):

- Background: #0B0B10
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 12px
- Padding: 16px 18px
- Top label: "PROMPT" — 9px Outfit 700 uppercase letter-spacing 0.14em color #5C5A72, margin-bottom 10px
- Prompt text body: JetBrains Mono 400 12px, color #C5C3D8, line-height 1.8. Full prompt text visible, no truncation.

Copy button:

- Full width, height 48px
- Background: #B794F4
- Color: #0B0B10
- Border-radius: 12px
- Outfit 700 14px
- Text: "⊕ Copy Prompt" left aligned with icon
- Hover: opacity 0.88
- Active / copied state: background changes to #4ADE80, text changes to "✓ Copied!" — smooth color transition 300ms

Meta chips row (bottom of drawer):

- Border-top: 1px solid rgba(255,255,255,0.07), padding-top 14px, margin-top 14px
- Horizontal scroll row of chips: each chip shows model name (Midjourney, FLUX, etc.) and style tags
- Chip style: Outfit 500 11px, color #9896B0, background #1A1A24, border 1px solid rgba(255,255,255,0.07), border-radius 6px, padding 4px 10px

---

## PAGE 3 — EXPLORE PAGE (Category Detail)

Header: "Cinematic Prompts" — 36px Clash Display 700, breadcrumb above "All Categories → Cinematic"

Same masonry grid as homepage but full page, with a category description paragraph at top: max 2 lines, Outfit 300 15px color #9896B0.

Sidebar (optional, left, 200px): category list with active state highlighted in purple.

---

## PAGE 4 — SUBMIT PROMPT PAGE

Clean centered form, max-width 560px.

Heading: "Share your prompt" — 32px Clash Display 600
Subtext: "Help the community discover prompts that create stunning results." — Outfit 300 14px color #9896B0

Form fields (all styled with background #13131A, border 1px solid rgba(255,255,255,0.1), border-radius 10px, padding 12px 16px, Outfit 400 14px, color #EDECF5, placeholder #5C5A72):

1. Image upload area — dashed border rgba(183,148,244,0.25), border-radius 14px, 200px tall, centered icon and "Drop your AI-generated image here or click to browse" — Outfit 400 13px color #5C5A72. On drag-over: border becomes solid purple.
2. "Prompt Text" — textarea, 120px tall, font JetBrains Mono 400 12px
3. "Title" — single line input
4. "AI Model Used" — dropdown: Midjourney / FLUX / DALL·E 3 / Stable Diffusion / ChatGPT Image / Other
5. "Category" — multi-select pill checkboxes matching the main category list
6. Submit button — same purple CTA style, full width, "Submit for Review"

---

## PAGE 5 — MOBILE VERSION (375px wide)

Replicate the homepage for mobile:

Navigation: Logo left, hamburger menu right (no visible nav links). Height 52px.

Hero: heading 36px, single column, full padding 20px horizontal.

Search bar: full width minus 20px margin each side.

Category pills: horizontal scroll, padding 0 20px, same pill style.

Gallery grid: 2 columns, 8px gap, padding 0 16px. Cards same design.

Bottom navigation bar (fixed): 60px tall, background rgba(11,11,16,0.9) backdrop-blur 20px, border-top 1px solid rgba(255,255,255,0.07). 4 icons: Home / Explore / Collections / Submit. Active icon: color #B794F4. Inactive: #5C5A72. Labels: 10px Outfit 400.

Drawer on mobile: full width, bottom sheet, border-radius top-left and top-right 20px only, height auto, max 90vh with internal scroll.

---

## COMPONENT LIBRARY (Design System Sheet)

Create a separate page in the Figma file with all reusable components:

1. Color swatches — all tokens with names and hex values
2. Typography scale — all text styles displayed
3. Button states — primary, secondary, ghost, danger; each in default / hover / active / disabled
4. Category pill — default / hover / active
5. Card — default / hover state (show overlay)
6. Prompt drawer — closed / open
7. Form inputs — empty / focus / filled / error
8. Badge / chip variants — category, model, trending, new
9. Sort tabs
10. Navigation bar — desktop and mobile
11. Bottom navigation bar (mobile)
12. Search bar — empty / focused / with results

---

## DESIGN QUALITY RULES (DO NOT VIOLATE)

1. NO pure black backgrounds — use #0B0B10 only
2. NO white text on colored backgrounds — always #0B0B10 on purple
3. NO box-shadow or drop-shadow on cards — use border only
4. NO gradients on UI elements — only on image overlays and the ambient background glow
5. NO Inter, Roboto, or Arial fonts anywhere
6. NO rounded shapes that are fully circular on rectangular cards
7. ALL text must have sufficient contrast — test against backgrounds
8. Prompt text MUST always use JetBrains Mono — never Outfit for prompt content
9. Copy button MUST have a success state (green) — never just grey
10. Every interactive element must have a visible hover state

---

## SPACING & GRID

Desktop (1440px): 40px outer margin, 12px gutter, 4-column masonry
Tablet (768px): 24px outer margin, 10px gutter, 3-column masonry
Mobile (375px): 16px outer margin, 8px gutter, 2-column masonry

---

## FINAL OUTPUT REQUEST

Deliver:

- 1 × Homepage (desktop 1440px) — gallery state
- 1 × Homepage with drawer open (desktop 1440px)
- 1 × Mobile homepage (375px) with bottom nav
- 1 × Submit prompt page (desktop)
- 1 × Component library / design system page
- All components organized into a structured Figma file with named frames and auto-layout where possible
- Styles panel populated with all color tokens and text styles