---
name: "MovieBlend"
version: "1.1.0"
description: "A niche gamified social mini-network application centered around shared cinematic tastes. It links users' IMDb data, tracks personal viewing habits, and enables live 'Watch Rooms' featuring collaborative voting, synchronized timers, and a shared room pet that grows as friends watch movies together."

# -------------------------------------------------------------------
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
  source:
    seed: "#52B788"
    description: "A soft, cozy, and organic green palette inspired by relaxed living rooms, indoor plants, and comfortable, shared home movie nights."

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
    outline_variant: "#95D5B2"

    error: "#E57373"
    on_error: "#FFFFFF"
    error_container: "#FFEBEE"
    on_error_container: "#C62828"

    inverse_surface: "#1B4332"
    inverse_on_surface: "#FAFDFB"
    inverse_primary: "#B7E4C7"

  states:
    hover_opacity: 0.06
    focus_opacity: 0.10
    pressed_opacity: 0.10
    dragged_opacity: 0.14
    disabled_content_opacity: 0.38
    disabled_container_opacity: 0.12

# -------------------------------------------------------------------
# TYPOGRAPHY TOKENS
# -------------------------------------------------------------------
typography:
  font_families:
    brand: "Google Sans, Inter, system-ui, sans-serif"
    body: "Inter, system-ui, sans-serif"
    mono: "monospace"

  type_scale:
    display_large:
      font_family: "{typography.font_families.brand}"
      font_size: "57px"
      line_height: "64px"
      font_weight: 400
      letter_spacing: "-0.25px"
    display_medium:
      font_family: "{typography.font_families.brand}"
      font_size: "45px"
      line_height: "52px"
      font_weight: 400
      letter_spacing: "0px"
    display_small:
      font_family: "{typography.font_families.brand}"
      font_size: "36px"
      line_height: "44px"
      font_weight: 400
      letter_spacing: "0px"
    headline_large:
      font_family: "{typography.font_families.brand}"
      font_size: "32px"
      line_height: "40px"
      font_weight: 400
      letter_spacing: "0px"
    headline_medium:
      font_family: "{typography.font_families.brand}"
      font_size: "28px"
      line_height: "36px"
      font_weight: 400
      letter_spacing: "0px"
    headline_small:
      font_family: "{typography.font_families.brand}"
      font_size: "24px"
      line_height: "32px"
      font_weight: 400
      letter_spacing: "0px"
    title_large:
      font_family: "{typography.font_families.brand}"
      font_size: "22px"
      line_height: "28px"
      font_weight: 400
      letter_spacing: "0px"
    title_medium:
      font_family: "{typography.font_families.body}"
      font_size: "16px"
      line_height: "24px"
      font_weight: 500
      letter_spacing: "0.15px"
    title_small:
      font_family: "{typography.font_families.body}"
      font_size: "14px"
      line_height: "20px"
      font_weight: 500
      letter_spacing: "0.1px"
    body_large:
      font_family: "{typography.font_families.body}"
      font_size: "16px"
      line_height: "24px"
      font_weight: 400
      letter_spacing: "0.5px"
    body_medium:
      font_family: "{typography.font_families.body}"
      font_size: "14px"
      line_height: "20px"
      font_weight: 400
      letter_spacing: "0.25px"
    body_small:
      font_family: "{typography.font_families.body}"
      font_size: "12px"
      line_height: "16px"
      font_weight: 400
      letter_spacing: "0.4px"
    label_large:
      font_family: "{typography.font_families.body}"
      font_size: "14px"
      line_height: "20px"
      font_weight: 500
      letter_spacing: "0.1px"
    label_medium:
      font_family: "{typography.font_families.body}"
      font_size: "12px"
      line_height: "16px"
      font_weight: 500
      letter_spacing: "0.5px"
    label_small:
      font_family: "{typography.font_families.body}"
      font_size: "11px"
      line_height: "16px"
      font_weight: 500
      letter_spacing: "0.5px"

# -------------------------------------------------------------------
# SPACING TOKENS
# -------------------------------------------------------------------
spacing:
  none: "0px"
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  xxxl: "64px"

layout:
  grid:
    base_unit: "8px"
    columns_desktop: 12
    columns_tablet: 8
    columns_mobile: 4
    gutter: "{spacing.md}"
    margin_mobile: "{spacing.md}"
    margin_tablet: "{spacing.lg}"
    margin_desktop: "{spacing.xl}"
  breakpoints:
    compact: "0px"
    medium: "600px"
    expanded: "840px"
    large: "1200px"

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

# -------------------------------------------------------------------
# ELEVATION TOKENS
# -------------------------------------------------------------------
elevation:
  level_0:
    box_shadow: "none"
  level_1:
    box_shadow: "0px 2px 4px rgba(45,106,79,0.04), 0px 1px 2px rgba(45,106,79,0.04)"
  level_2:
    box_shadow: "0px 4px 8px rgba(45,106,79,0.06), 0px 2px 4px rgba(45,106,79,0.03)"
  level_3:
    box_shadow: "0px 8px 16px rgba(45,106,79,0.08), 0px 4px 8px rgba(45,106,79,0.05)"
  level_4:
    box_shadow: "0px 12px 24px rgba(45,106,79,0.10), 0px 6px 12px rgba(45,106,79,0.06)"
  level_5:
    box_shadow: "0px 16px 32px rgba(45,106,79,0.12), 0px 8px 16px rgba(45,106,79,0.08)"

# -------------------------------------------------------------------
# COMPONENT TOKENS
# -------------------------------------------------------------------
components:
  button:
    height: "44px"
    min_width: "64px"
    padding_horizontal: "24px"
    shape: "{shape.corner.full}"
    typography: "{typography.type_scale.label_large}"
    primary:
      container_color: "{colors.system.primary}"
      content_color: "{colors.system.on_primary}"
    secondary:
      container_color: "{colors.system.secondary_container}"
      content_color: "{colors.system.on_secondary_container}"
    text:
      container_color: "transparent"
      content_color: "{colors.system.primary}"

  card:
    container_color: "{colors.system.surface}"
    content_color: "{colors.system.on_surface}"
    shape: "{shape.corner.large}"
    padding: "{spacing.md}"
    elevation: "{elevation.level_1}"

  text_field:
    height: "56px"
    container_color: "{colors.system.surface_variant}"
    content_color: "{colors.system.on_surface}"
    label_color: "{colors.system.on_surface_variant}"
    outline_color: "transparent"
    focus_outline_color: "{colors.system.primary}"
    error_outline_color: "{colors.system.error}"
    shape: "{shape.corner.medium}"

# -------------------------------------------------------------------
# CONTENT STYLE
# -------------------------------------------------------------------
content:
  voice:
    - "Friendly"
    - "Helpful"
    - "Cozy"
    - "Playful / Gamified"
  rules:
    - "Use warm and plain language."
    - "Incorporate friendly team mechanics and gamified concepts where intuitive."
    - "Buttons must explicitly state the outcome (e.g., 'Vote for Pet', 'Reopen Watch Room')."

---

# Product Architecture & Detailed Page Specifications

## 1. Authentication Layer (Log In & Sign Up)
- **Sign Up Form & Flow:** Standard email/password entries with seamless third-party login providers. 
- **Movie Preferences Questionnaire:** Immediately after account registration, users pass through a brief cozy onboarding survey requesting their preferred genres, tropes, and thematic elements. This shapes their baseline profile preferences.
- **IMDb Account Sync:** Quick pipeline to bind their public IMDb handle to effortlessly populate watch histories and lists.
- **Log In Screen:** Simple, clean, and welcoming entry window designed using soft, container-based input boxes.

## 2. Main Page (Dashboard)
- **Cozy Personal Welcome:** Dynamically updates headers to greet the user depending on the time of day.
- **'Recommended For You' Feed:** A beautifully formatted, responsive masonry card layout presenting personalized suggestions based natively on the user's IMDb profile ratings and onboarding questionnaire choices.
- **Active Hub Control:** Visible anchors allowing immediate entry into active or past friend lobbies.

## 3. Room History (New Bottom Navigation Footer View)
- **Persistent Archive Tab:** Houses a dedicated destination in the bottom navigation menu tracking a user's chronological footprint of joined or created Watch Rooms.
- **Quick-Replay Mechanic:** Users can tap any previously utilized room card to immediately re-initialize a live Watch Room session with the exact same group of friends, bypassing repetitive invitation workflows.
- **Pet Progression Tracker:** Displays the room's unique pet, its current developmental stage, and collective milestones unlocked by the group.

## 4. Blend Page & Watch Rooms
- **Watch Room Lobby:** Hosts create rooms instantly, appending friends directly from their in-app network or generating an easily copied, shareable Invite Link.
- **Democratic Pet Voting System:** When a room is launched, the host picks a "Room Pet" mascot. All joining users participate in a real-time democratic vote; the room becomes active only once a group consensus is achieved.
- **Preference-Driven Movie Selection:** Merges everyone's synced IMDb files and onboarding tags to calculate optimal overlaps. The room outputs a final, definitive list of exactly **5 movie recommendations** complete with localized availability tracking badges, descriptions, and scores.

## 5. Live Session Co-Watch Flow
- **Synchronized Timer Triggers:** Upon physical movie launch, the user is prompted: *"Have you started the movie?"* Confirming activates an in-app countdown timer synchronized exactly with the complete runtime of the film.
- **Pause & Interruption Cushion:** After countdown expiry, a status modal asks: *"Is the movie done?"* preventing broken automated states if groups take real-world break intervals.
- **Automated Ingestion & Group Rating:** Once confirmed as complete, all room participants are instantly presented with a matching rating prompt. Pushing their scores automatically adds the film straight into each user's profile database.
- **Pet Growth Animations:** Finalizing a movie rewards the specific Room Pet with experience points (XP), fueling its growth and level-up milestones.

## 6. My Profile Page
- **Social Metrics:** Displays customized avatars, custom backgrounds, bios, friend lists, and a history summary.
- **Personal Database ('Movies You've Watched'):** A highly searchable, indexed catalog housing all movies watched. This updates instantly via manual rating confirmations inside Watch Rooms or direct background IMDb imports, sorted by timeline or star rating.

---

# Design Principles

## 1. Organic comfort over clinical starkness
Utilize smooth curves, generous line height, and comforting pastel mint and forest hues to make the software environment feel calm and relaxed.

## 2. Playful feedback loops
Ensure gamified actions—such as pet voting confirmations or room experience points progression—trigger soft, subtle visual animations that delight users without introducing UI friction.

## 3. High-contrast type hierarchy
Since the application relies on light, comforting creams and greens, keep text content tightly constrained to deep, highly accessible forest charcoal values (`colors.system.on_background`).

---

# Do / Do Not

## Do
- Maintain a highly responsive layout across mobile bottom menus, tablet sidebars, and desktop spaces.
- Mask automated background IMDb synchronization sequences with helpful microcopy skeleton loaders.
- Allow simple, direct clipboard copying for casual watch room sharing links.
- Present immediate confirmation indicators when a movie successfully logs into everyone's profile diaries.

## Do Not
- Use intense dark cyber aesthetics or neon colors.
- Use confusing generic interactive text labels like "Submit" or "Process" inside voting menus.
- Force groups to manually re-invite their standard circle of friends for consecutive movie nights.
---