---
name: MovieBlend
version: 1.1.0
description: A niche gamified social mini-network application centered around shared
  cinematic tastes. It links users' IMDb data, tracks personal viewing habits, and
  enables live 'Watch Rooms' featuring collaborative voting, synchronized timers,
  and a shared room pet that grows as friends watch movies together.
colors:
  surface: '#f7faf5'
  surface-dim: '#d7dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5ef'
  surface-container: '#ebefea'
  surface-container-high: '#e5e9e4'
  surface-container-highest: '#e0e3de'
  on-surface: '#181d1a'
  on-surface-variant: '#3f4943'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eef2ed'
  outline: '#6f7a72'
  outline-variant: '#bec9c0'
  surface-tint: '#116c4a'
  primary: '#0b6947'
  on-primary: '#ffffff'
  primary-container: '#B7E4C7'
  on-primary-container: '#081C15'
  inverse-primary: '#86d7ad'
  secondary: '#006c48'
  on-secondary: '#ffffff'
  secondary-container: '#92f7c3'
  on-secondary-container: '#00734d'
  tertiary: '#086947'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f835f'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1f4c8'
  primary-fixed-dim: '#86d7ad'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#92f7c3'
  secondary-fixed-dim: '#75daa8'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005235'
  tertiary-fixed: '#a0f4c8'
  tertiary-fixed-dim: '#85d7ad'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#FAFDFB'
  on-background: '#181d1a'
  surface-variant: '#D8F3DC'
  deep-forest: '#081C15'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  margin-mobile: 1rem
  margin-desktop: 2rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

----------------------------------------------------------------
# DESIGN SYSTEM BASIS
# -------------------------------------------------------------------
design_language:
  basis: "Material Design 3-inspired"
  principles:
    - "Clear"
    - "Accessible"
    - "Responsive"
    - "Consistent"
    - "Human-centered"
  tone:
    visual: "Soft, cozy, warm, organic, inviting, friendly"
    interaction: "Smooth, predictable, forgiving"
    content: "Warm, conversational, gamified, helpful"

# -------------------------------------------------------------------
# COLOR TOKENS (Soft & Cozy Mint/Forest Green Palette)
# -------------------------------------------------------------------
colors:
  system:
    primary: "#40916C"
    on_primary: "#FFFFFF"
    primary_container: "#B7E4C7"
    on_primary_container: "#081C15"
    secondary: "#52B788"
    on_secondary: "#FFFFFF"
    secondary_container: "#D8F3DC"
    on_secondary_container: "#1B4332"
    tertiary: "#74C69D"
    on_tertiary: "#081C15"
    tertiary_container: "#95D5B2"
    on_tertiary_container: "#081C15"
    background: "#FAFDFB"
    on_background: "#081C15"
    surface: "#FFFFFF"
    on_surface: "#081C15"
    surface_variant: "#D8F3DC"
    on_surface_variant: "#1B4332"
    outline: "#74C69D"

# -------------------------------------------------------------------
# TYPOGRAPHY TOKENS
# -------------------------------------------------------------------
typography:
  font_families:
    brand: "Google Sans, Inter, system-ui, sans-serif"
    body: "Inter, system-ui, sans-serif"

# -------------------------------------------------------------------
# SHAPE TOKENS (Soft and Rounded Corners)
# -------------------------------------------------------------------
shape:
  corner:
    none: "0px"
    extra_small: "4px"
    small: "8px"
    medium: "16px"
    large: "24px"
    extra_large: "32px"
    full: "9999px"
---