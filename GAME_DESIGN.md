# Tower Defense Game - Complete Design Specification

**Version**: 1.0
**Last Updated**: 2025-10-05
**Status**: Design Complete, Ready for Implementation

---

## Table of Contents

1. [Game Overview](#game-overview)
2. [Core Mechanics](#core-mechanics)
3. [Archer System](#archer-system)
4. [Enemy System](#enemy-system)
5. [Economy System](#economy-system)
6. [Upgrade System](#upgrade-system)
7. [Avatar System](#avatar-system)
8. [Map System](#map-system)
9. [Learning Mode](#learning-mode)
10. [UI/UX Design](#uiux-design)
11. [Audio Design](#audio-design)
12. [Progression & Balance](#progression--balance)

---

## Game Overview

### Concept
A sci-fi themed tower defense game where players place archers to defend a gate from waves of robot enemies. Features include 30 archer types, a 3-tier upgrade system, multiple maps, avatar bonuses, and optional educational integration.

### Target Audience
- Primary: Ages 10-16 (educational mode)
- Secondary: All ages (arcade mode)

### Platforms
- Desktop browsers (mouse controls)
- Mobile browsers (touch controls, responsive UI)

### Core Loop
1. Place archers using coins
2. Enemies spawn and walk paths toward gate
3. Archers shoot and kill enemies
4. Earn coins from kills and round completion
5. Upgrade archers or buy new ones
6. Progress through increasingly difficult rounds
7. Optional: Answer educational questions for bonuses

### Win/Loss Conditions
- **Win**: Survive indefinitely, achieve high scores
- **Loss**: Gate reaches 0 hearts

---

## Core Mechanics

### Path System
- **Multiple Spawn Points**: 2-4 tunnels per map (bottom/sides)
- **Fixed Routes**: Each spawn has a predetermined winding path to the gate
- **Path Crossing**: Paths intersect at strategic points (choke points)
- **Enemy Distribution**: Enemies randomly assigned to spawns (with load balancing)
- **Visual Design**: Glowing neon edges mark valid paths

### Archer Placement
- **Free Placement**: Anywhere on map except enemy paths
- **Range Preview**: Circle indicator shows coverage when hovering/selecting
- **Placement Cost**: Deducted from coin balance
- **Removal**: Right-click or long-press to sell for 50% refund
- **Selection**: Click/tap to select, shows stats and upgrade panel

### Combat System
- **Auto-Targeting**: Archers automatically target closest enemy in range
- **Projectiles**: Visual projectiles with travel time (not instant hit)
- **Damage Application**: On projectile-enemy collision
- **Special Effects**: Splash, pierce, chain, DoT, slow (varies by archer)
- **Active Ability**: Click archer for 2x fire rate for 5s (30s cooldown)

### Round System
- **Wave-Based**: Enemies spawn in waves
- **Start Wave**: Player clicks "Start Wave" button when ready
- **Round Progression**: 1 → 2 → 3 ... → 10 (boss) → 11 → 12 ... → 20 (boss)
- **Boss Rounds**: Every 10th round spawns a powerful boss
- **Round Income**: £100 base reward per round completion

### Game Speed Controls
- **1x**: Normal speed (default)
- **2x**: Double speed (faster gameplay)
- **4x**: Quad speed (skip waiting)
- **UI**: Buttons in top-right corner

---

## Archer System

### Archer Roster (30 Total)

#### **TIER 1: BOW ARCHERS (£0-500)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| recruit_bow | Recruit Bow | £0 | 100 | 1.0/s | 10 | FREE starter |
| hunter_bow | Hunter Bow | £150 | 120 | 1.2/s | 12 | - |
| longbow | Longbow | £250 | 150 | 0.9/s | 18 | - |
| crossbow | Crossbow | £300 | 110 | 1.5/s | 14 | - |
| rapid_bow | Rapid Bow | £400 | 90 | 2.5/s | 8 | High fire rate |
| sniper_bow | Sniper Bow | £500 | 200 | 0.6/s | 35 | Long range |

#### **TIER 2: ADVANCED BOWS (£600-1200)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| compound_bow | Compound Bow | £600 | 140 | 1.8/s | 20 | - |
| explosive_bow | Explosive Bow | £750 | 130 | 0.8/s | 25 | +15 splash damage |
| piercing_bow | Piercing Bow | £850 | 160 | 1.0/s | 30 | Hits 2 enemies |
| poison_bow | Poison Bow | £950 | 120 | 1.2/s | 15 | +30 DoT over 3s |
| multishot_bow | Multishot Bow | £1100 | 110 | 0.9/s | 18 | Shoots 3 arrows |

#### **TIER 3: ENERGY WEAPONS (£1300-2500)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| laser_pistol | Laser Pistol | £1300 | 150 | 3.0/s | 12 | Instant hit |
| plasma_rifle | Plasma Rifle | £1600 | 170 | 2.0/s | 25 | - |
| pulse_blaster | Pulse Blaster | £1900 | 130 | 2.5/s | 20 | Slows 20% |
| ion_cannon | Ion Cannon | £2200 | 140 | 0.7/s | 60 | Chains to 2 enemies |
| photon_beam | Photon Beam | £2500 | 200 | 1.5/s | 35 | Penetrates 3 enemies |

#### **TIER 4: BALLISTIC GUNS (£2600-4000)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| assault_rifle | Assault Rifle | £2600 | 160 | 4.0/s | 15 | - |
| shotgun | Shotgun | £2900 | 80 | 1.0/s | 50 | Cone attack, hits 3 |
| sniper_rifle | Sniper Rifle | £3200 | 300 | 0.5/s | 100 | Extreme range |
| machine_gun | Machine Gun | £3500 | 140 | 5.0/s | 12 | Very fast |
| grenade_launcher | Grenade Launcher | £3800 | 180 | 0.8/s | 40 | +30 splash AOE |
| railgun | Railgun | £4000 | 350 | 0.4/s | 150 | Penetrates all |

#### **TIER 5: HEAVY ARTILLERY (£4200-6500)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| rocket_launcher | Rocket Launcher | £4200 | 200 | 0.6/s | 80 | +40 splash |
| minigun | Minigun | £4800 | 150 | 7.0/s | 10 | Extremely fast |
| tesla_coil | Tesla Coil | £5400 | 120 | 2.0/s | 45 | Chains to 5 |
| orbital_cannon | Orbital Cannon | £6000 | 250 | 0.3/s | 200 | +80 splash |
| tactical_nuke | Tactical Nuke Launcher | £6500 | 220 | 0.2/s | 250 | +100 huge AOE |

#### **TIER 6: SPECIAL/COUNTER UNITS (£2500-8000)**
| ID | Name | Cost | Range | Fire Rate | Damage | Special |
|----|------|------|-------|-----------|--------|---------|
| emp_archer | EMP Archer | £2500 | 140 | 1.0/s | 40 | **Breaks shields** |
| cryo_archer | Cryo Archer | £3000 | 130 | 1.2/s | 25 | **Slows 50% + counters fire** |
| quantum_destroyer | Quantum Destroyer | £8000 | 280 | 1.0/s | 120 | **Anti-boss, pierce, splash** |

### Projectile Types
- **Arrow**: Medium speed, arc trajectory
- **Bullet**: Fast, straight line
- **Laser**: Instant, beam visual
- **Rocket**: Slow, large splash on impact
- **Energy Ball**: Medium speed, glowing effect

---

## Enemy System

### Regular Enemy Types

| ID | Name | Base HP | Speed | Reward | Special |
|----|------|---------|-------|--------|---------|
| scout | Scout | 40 | Fast (120 px/s) | £10 | - |
| infantry | Infantry | 80 | Normal (80 px/s) | £15 | - |
| heavy | Heavy | 150 | Slow (50 px/s) | £25 | High HP |
| armored | Armored | 100 | Normal (80 px/s) | £30 | 40% damage reduction |
| runner | Runner | 30 | Very Fast (150 px/s) | £12 | Low HP, hard to hit |
| tank | Tank | 250 | Very Slow (40 px/s) | £40 | Extreme HP |
| regenerator | Regenerator | 120 | Normal (80 px/s) | £35 | Heals 5 HP/s |
| swarm_drone | Swarm Drone | 20 | Fast (120 px/s) | £5 | Spawns in groups of 5 |

### Boss Enemies

| Round | Name | Base HP | Special Abilities | Reward |
|-------|------|---------|-------------------|--------|
| 10 | Titan | 3000 | None | £500 |
| 20 | Shielded Colossus | 4500 | 1500 HP shield (absorbs damage) | £700 |
| 30 | Inferno Beast | 6000 | Fire aura (slows nearby archers 30%) | £900 |
| 40 | Armored Juggernaut | 8000 | Shield + 50% damage reduction | £1100 |
| 50+ | Nightmare Overlord | 12000 | Shield + fire + 100 HP/s regen | £1500 |

### HP Scaling Formula
```
Effective HP = Base HP × (1 + Round × 0.15)
```

**Examples:**
- Round 1 Scout: 40 HP
- Round 10 Scout: 40 × 2.5 = 100 HP
- Round 20 Infantry: 80 × 4.0 = 320 HP
- Round 30 Heavy: 150 × 5.5 = 825 HP

### Enemy Count Per Round

| Round | Count | Notes |
|-------|-------|-------|
| 1-5 | 5, 7, 9, 11, 13 | Tutorial phase |
| 6-10 | 15, 17, 19, 21, BOSS | Ramping difficulty |
| 11-20 | 23-41 (+2 per round) | Steady increase |
| 21-40 | 43-49 (+2 per round) | Approaching cap |
| 41+ | 50 | Performance cap |

### Boss Round Mechanics
- Replaces regular enemies (only boss spawns)
- Boss walks same path as regular enemies
- Takes 50 hearts from gate (vs 1 for regular enemies)
- Dramatic visual (larger sprite, particle effects)

---

## Economy System

### Starting Resources
- **Coins**: £100
- **Hearts**: 500
- **Free Archer**: 1× Recruit Bow (can place immediately)

### Income Sources

#### Per-Round Base Income
- **All rounds**: £100 (guaranteed)

#### Enemy Kill Rewards
- See enemy table above (£5-40 per regular enemy)
- Bosses: £500-1500 depending on round

#### Learning Mode Bonuses
- Correct answer: +£75
- 10-question streak: +20 hearts

### Expenditures

#### Archer Purchases
- £0 (Recruit Bow) to £8000 (Quantum Destroyer)
- See archer table for all costs

#### Archer Upgrades
**Cost Formula:**
```
Upgrade Cost = (Base Archer Cost ÷ 15) × (1.25 ^ Star Number)
```

**Example: Sniper Rifle (£3200 base)**
- Star 1: £213
- Star 5: £660
- Star 10: £1730

#### Heart Purchases
- **Rate**: £1000 per 100 hearts
- **Unlimited**: Can buy as many as affordable

#### Map Unlocks
- Gateway Station: FREE
- Desert Outpost: £1000
- Cyber Maze: £2000
- Orbital Platform: £3500
- Volcanic Core: £5000
- Final Frontier: £8000

#### Avatar Unlocks
- Cadet: FREE
- Gameplay avatars: £800-5000
- Cosmetic avatars: £200-800

### Persistent Currency
- **Separate from in-game coins**: Meta currency for unlocks
- **Earned by**: Reaching milestones (round 10, 20, 30, etc.)
- **Conversion**: Every 10 rounds = 500 meta coins
- **Used for**: Maps, avatars (persistent between games)

---

## Upgrade System

### Structure
Each archer has **3 upgrade tiers**, each with **10 star levels** (30 total upgrades per archer).

### Tier Effects

#### Tier 1: Range
- **Effect**: +5% range per star
- **Max**: +50% range at 10 stars

#### Tier 2: Attack Speed
- **Effect**: +8% fire rate per star
- **Max**: +80% fire rate at 10 stars

#### Tier 3: Damage
- **Effect**: +10% damage per star
- **Max**: +100% damage at 10 stars (double damage)

### Upgrade Mechanics
1. Select placed archer
2. Upgrade panel shows 3 tiers with star progress
3. Click tier button to purchase next star
4. Cost calculated by formula (see Economy)
5. Star fills in, stats immediately update
6. Archer becomes more effective

### Example Progression
**Recruit Bow (FREE base)**
- No upgrades: 100 range, 1.0/s, 10 dmg
- Range 10 stars: 150 range, 1.0/s, 10 dmg
- Speed 10 stars: 150 range, 1.8/s, 10 dmg
- Damage 10 stars: 150 range, 1.8/s, 20 dmg

**Total investment**: ~£150 in upgrades = 3× effective DPS

---

## Avatar System

### Gameplay Avatars

| ID | Name | Cost | Bonus Effect |
|----|------|------|--------------|
| cadet | Cadet | FREE | None (default) |
| engineer | Engineer | £800 | All archers cost 12% less |
| tactician | Tactician | £1200 | All archers +15% range |
| sharpshooter | Sharpshooter | £1200 | All archers +12% attack speed |
| economist | Economist | £1500 | Enemies drop 30% more coins |
| medic | Medic | £1500 | Start with +250 hearts |
| demolitionist | Demolitionist | £1800 | All splash damage +40% |
| marksman | Marksman | £2000 | All archers +15% damage |
| scientist | Scientist | £2500 | Upgrade costs -25% |
| commander | Commander | £5000 | All bonuses at 8% each |

### Cosmetic Avatars

| Name | Cost | Visual |
|------|------|--------|
| Cyber Ninja | £200 | Neon ninja sprite |
| Astro Explorer | £400 | Astronaut sprite |
| Neon Warrior | £600 | Glowing armor |
| Crystal Mage | £800 | Crystalline figure |

### Avatar Mechanics
- **Selection**: Main menu before starting game
- **Switchable**: Can change between games (not mid-game)
- **Persistent**: Once unlocked, always available
- **Meta Currency**: Purchased with meta coins (not in-game coins)

---

## Map System

### Map Roster

#### **Gateway Station** (FREE)
- **Spawns**: 2 (bottom corners)
- **Paths**: Winding routes that cross once in center
- **Difficulty**: Beginner-friendly
- **Theme**: Blue/purple hexagon tech (reference image)

#### **Desert Outpost** (£1000)
- **Spawns**: 3 (bottom, left, right)
- **Paths**: More open layout, minimal crossings
- **Difficulty**: Medium
- **Theme**: Sandy tech, warm colors

#### **Cyber Maze** (£2000)
- **Spawns**: 2 (opposite corners)
- **Paths**: Complex winding, crosses 3 times
- **Difficulty**: Hard
- **Theme**: Dense circuitry, green/blue

#### **Orbital Platform** (£3500)
- **Spawns**: 4 (all corners)
- **Paths**: Converge in center (major choke point)
- **Difficulty**: Very Hard
- **Theme**: Space station, dark void

#### **Volcanic Core** (£5000)
- **Spawns**: 3 (spread)
- **Paths**: Narrow placement zones, lava hazards
- **Difficulty**: Extreme
- **Theme**: Lava/magma, red/orange

#### **Final Frontier** (£8000)
- **Spawns**: 4 (symmetrical)
- **Paths**: 4 crossing paths, ultimate challenge
- **Difficulty**: Nightmare
- **Theme**: Deep space, cosmic

### Difficulty Modifiers (Per Map)

| Difficulty | Enemy HP | Enemy Count | Enemy Speed | Coin Rewards | Boss Frequency |
|------------|----------|-------------|-------------|--------------|----------------|
| Tutorial | 50% | 50% | Normal | 150% | Every 10 rounds |
| Easy | 75% | 75% | Normal | 110% | Every 10 rounds |
| Normal | 100% | 100% | Normal | 100% | Every 10 rounds |
| Hard | 150% | 100% | +25% | 120% | Every 10 rounds |
| Nightmare | 200% | 100% | +50% | 150% | Every 5 rounds |

---

## Learning Mode

### Mode Selection
**Main Menu Choice:**
- **Arcade Mode**: Pure tower defense, no questions
- **Learning Mode**: Questions after each round for bonuses

### Question System

#### Subjects
1. **Math**: Arithmetic, algebra, geometry, percentages, fractions
2. **Science**: Physics, chemistry, biology, astronomy
3. **Geography**: Countries, capitals, landmarks, continents
4. **History**: Events, dates, important figures
5. **Language**: Vocabulary, grammar, spelling, idioms

#### Difficulty Levels

| Level | Age Range | Description | Question Pool |
|-------|-----------|-------------|---------------|
| Easy | 7-10 | Elementary basics | 200 questions |
| Medium | 11-13 | Middle school | 200 questions |
| Hard | 14-16 | High school | 200 questions |
| Extreme | 17+ | College/Advanced | 100 questions |

**Total**: 700+ questions at launch (expandable)

### Question Flow
1. Round ends
2. Question popup appears (if Learning Mode active)
3. Display question + 4 multiple choice answers
4. 30-second timer (optional skip)
5. Select answer
6. Show correct/incorrect feedback
7. Award bonus if correct
8. Continue to next round

### Rewards

#### Regular Rounds
- **Correct**: +£75 bonus
- **Incorrect**: No penalty (no coins)
- **Skipped**: No penalty (no coins)

#### Boss Rounds
- **Correct**: -20% boss current HP (massive advantage)
- **Incorrect**: No effect
- **Skipped**: No effect

#### Streak Bonuses
- **10 correct in a row**: +20 hearts
- **20 correct in a row**: +50 hearts
- **50 correct in a row**: +200 hearts + £500

### Question Data Structure
```typescript
interface Question {
  id: string;
  subject: 'math' | 'science' | 'geography' | 'history' | 'language';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  question: string;
  answers: [string, string, string, string]; // 4 options
  correctIndex: 0 | 1 | 2 | 3;
  explanation?: string; // Optional learning feedback
}
```

---

## UI/UX Design

### Layout

#### Top Bar (Always Visible)
- **Left**: Heart count (❤️ 500)
- **Center**: Round number (ROUND 15) + coins (💰 £2450)
- **Right**: Speed controls (1x | **2x** | 4x)

#### Left Sidebar (Archer Shop)
- **Tabs**: By Tier (Bows, Adv Bows, Energy, Guns, Heavy, Special)
- **Archer Cards**: Icon, name, cost, stats preview
- **Scroll**: Vertical scrolling for all archers
- **Highlight**: Selected archer glows

#### Right Sidebar (Context Panel)
- **No Selection**: Shows next wave preview (enemy types, count)
- **Archer Selected**: Stats + upgrade panel
  - Current stats (range, speed, damage)
  - 3 tier buttons with star progress
  - Upgrade cost for next star
  - Sell button (refund 50%)

#### Bottom Bar
- **Left**: Start Wave button (pulsing when ready)
- **Center**: Current wave progress (Enemies: 12/25)
- **Right**: Active ability indicator (if archer selected)

#### Center (Game Map)
- **Full screen game canvas**
- **Minimap** (optional, bottom-right corner)

### Visual Feedback

#### Archer Placement
- **Hover**: Translucent archer sprite + range circle
- **Valid**: Green circle
- **Invalid** (on path): Red circle
- **Insufficient funds**: Grayed out in shop

#### Combat
- **Damage Numbers**: Float upward from hit enemy (+10, +25, +50)
- **Critical** (special abilities): Yellow damage numbers
- **Kill**: Enemy flash white, particle burst, coin icon popup

#### Combo System
- **5-kill streak**: "COMBO x5" text, 1.5× coin multiplier
- **10-kill streak**: "MEGA COMBO x10", 2× coin multiplier, screen shake

#### Upgrades
- **Purchase**: Star fills with glow effect, stat number increases with +X animation

### Mobile Optimizations
- **Touch Controls**: Tap to select, tap to place
- **Pinch Zoom**: For precise placement on small screens
- **Larger Buttons**: 44px minimum hit area (Apple guidelines)
- **Simplified UI**: Hide non-essential elements on mobile
- **Portrait/Landscape**: Both supported, UI adjusts

---

## Audio Design

### Music Tracks

#### Menu Music
- **Style**: Upbeat electronic, welcoming
- **Tempo**: 120 BPM
- **Loop**: Seamless 2-minute loop

#### Gameplay Music
- **Style**: Energetic synthwave, driving beat
- **Tempo**: 140 BPM
- **Intensity**: Increases with round number
- **Boss Variant**: Heavier bassline, dramatic

#### Victory Fanfare
- **Length**: 10 seconds
- **Style**: Triumphant, celebratory

#### Game Over
- **Length**: 8 seconds
- **Style**: Somber, reflective

### Sound Effects

| Event | Sound | Description |
|-------|-------|-------------|
| Archer placed | Beep-boop | Tech activation |
| Archer shoots | Pew/bang/whoosh | Varies by weapon type |
| Enemy hit | Thud | Impact sound |
| Enemy killed | Explosion | Satisfying pop |
| Coin earned | Ching | Cash register |
| Upgrade purchased | Power-up | Rising synth |
| Wave complete | Chime | Success bell |
| Boss spawns | Deep horn | Ominous warning |
| Heart lost | Crack | Shield break |
| Button click | Click | UI feedback |

### Audio Settings
- **Master Volume**: 0-100%
- **Music Volume**: 0-100%
- **SFX Volume**: 0-100%
- **Mute All**: Toggle button

---

## Progression & Balance

### Early Game (Rounds 1-10)
- **Income**: ~£200-300/round (base + kills)
- **Spending**: Buy 3-5 basic archers (£0-500 each)
- **Strategy**: Cover both paths with Recruit/Hunter/Longbows
- **Challenges**: Learning placement, resource management
- **Boss**: First boss at round 10 tests basic setup

### Mid Game (Rounds 11-30)
- **Income**: ~£500-800/round
- **Spending**: Upgrade existing archers, buy Tier 3-4 (£1300-4000)
- **Strategy**: Optimize placement, focus fire on choke points
- **Challenges**: Enemy HP scaling, need higher DPS
- **Boss**: Shielded/Fiery bosses require counter archers

### Late Game (Rounds 31-50)
- **Income**: ~£1000-2000/round
- **Spending**: Max upgrades, buy Tier 5-6 (£4200-8000)
- **Strategy**: Specialized builds, combo counter-units
- **Challenges**: Enemy spam, boss every 10 rounds
- **Boss**: Multi-ability bosses need coordinated damage

### Endless (Round 51+)
- **Income**: ~£2500+/round
- **Spending**: Fully upgraded army
- **Strategy**: Perfect efficiency, max DPS setups
- **Challenges**: Pure survival, leaderboard competition
- **Scaling**: Exponential enemy HP, player skill ceiling

### Difficulty Curve Target
- **Round 10**: 70% of players should win (with tutorial)
- **Round 20**: 40% of players
- **Round 30**: 20% of players
- **Round 50**: 5% of players (skilled veterans)
- **Round 100**: <1% (mastery)

### Balance Principles
1. **Early archers remain useful**: Upgraded Recruit Bow > non-upgraded Tier 3
2. **Specialization rewarded**: Counter-units (EMP, Cryo) essential for bosses
3. **Economic decisions matter**: Save for expensive archer vs upgrade existing
4. **Learning curve**: Tutorial easy, Round 10 medium, Round 30+ hard
5. **No impossible walls**: Always a strategy to progress with skill

---

## Technical Specifications

### Performance Targets
- **60 FPS**: Maintain on desktop with 50 enemies + 20 archers
- **30 FPS**: Acceptable on mobile
- **Load Time**: <5 seconds initial load

### Browser Support
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions (iOS 14+)
- **Edge**: Last 2 versions

### Save System
- **LocalStorage**: Auto-save after each round
- **Data Saved**:
  - Current game state (if in progress)
  - Unlocked maps/avatars
  - Meta currency
  - High scores
  - Statistics (total kills, rounds reached)
  - Learning mode streak

### Accessibility
- **Colorblind Mode**: Alternative color palettes
- **Reduced Motion**: Disable particle effects
- **Larger Text**: UI scaling option
- **Keyboard Controls**: Full game playable without mouse

---

## Future Expansion Ideas (Post-Launch)

### Version 2.0 Features
- Multiplayer co-op (2 players defend together)
- Map editor (user-created levels)
- Daily challenges
- Global leaderboards
- Achievement system
- Seasonal events
- 20 more archers (total 50)
- New enemy types (10 more)

### Monetization (Optional)
- **100% Free**: Base game always free
- **Cosmetics**: Purchasable skins for archers/enemies
- **Battle Pass**: Seasonal cosmetics + bonus questions
- **No Pay-to-Win**: All gameplay content earnable free

---

**End of Game Design Document**

**Next Steps**: See `docs/milestones/MILESTONE_01.md` to begin implementation.
