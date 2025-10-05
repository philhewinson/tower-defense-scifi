# Tower Defense Game - Project Documentation

## Project Overview

This is a web-based sci-fi tower defense game with educational integration. Players place archers to defend a gate from waves of enemies, with optional learning mode featuring educational questions.

## **CRITICAL: How to Build This Project**

This project is designed to be built **incrementally** across 12 milestones. Each milestone is fully documented in `docs/milestones/MILESTONE_XX.md` files.

### **Build Process**

1. **Current Milestone**: Check `PROGRESS.md` to see which milestone is active
2. **Read Milestone Requirements**: Open the current milestone file in `docs/milestones/`
3. **Implement Features**: Build according to the detailed requirements in that milestone
4. **Test**: Use test scenarios from `TESTING.md` for that milestone
5. **Update Progress**: Mark completed features in `PROGRESS.md`
6. **Move to Next**: Only proceed to next milestone when current is 100% complete

### **Key Documentation Files**

- **@CLAUDE.md** (this file) - Master project guide and how-to-build instructions
- **GAME_DESIGN.md** - Complete game design specification (mechanics, balance, content)
- **PROGRESS.md** - Current build status, completed milestones, next steps
- **TESTING.md** - Test scenarios for each milestone
- **docs/milestones/MILESTONE_XX.md** - Detailed requirements for each build phase

## **Technology Stack**

- **Framework**: Phaser 3 (game engine)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **Storage**: LocalStorage (for save system)
- **Audio**: Howler.js (audio management)

## **Project Structure**

```
bee/
├── @CLAUDE.md                 # This file - master guide
├── GAME_DESIGN.md             # Complete game design spec
├── PROGRESS.md                # Build progress tracking
├── TESTING.md                 # Testing scenarios
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite build config
├── index.html                 # Entry HTML
├── docs/
│   ├── milestones/
│   │   ├── MILESTONE_01.md    # Project setup + basic rendering
│   │   ├── MILESTONE_02.md    # Enemy movement
│   │   ├── MILESTONE_03.md    # Basic archer + shooting
│   │   ├── MILESTONE_04.md    # Round system + economy
│   │   ├── MILESTONE_05.md    # Archer shop + multiple types
│   │   ├── MILESTONE_06.md    # Upgrade system
│   │   ├── MILESTONE_07.md    # Advanced paths + crossings
│   │   ├── MILESTONE_08.md    # All archers + enemy types
│   │   ├── MILESTONE_09.md    # Boss system + scaling
│   │   ├── MILESTONE_10.md    # Avatar system + meta progression
│   │   ├── MILESTONE_11.md    # Learning mode + questions
│   │   └── MILESTONE_12.md    # Polish + full features
│   ├── DATA_SPECS.md          # Data structures and types
│   └── ARCHITECTURE.md        # Code architecture overview
├── src/
│   ├── main.ts                # Entry point
│   ├── scenes/
│   │   ├── BootScene.ts       # Asset loading
│   │   ├── MenuScene.ts       # Main menu
│   │   ├── GameScene.ts       # Main gameplay
│   │   └── UIScene.ts         # UI overlay
│   ├── entities/
│   │   ├── Archer.ts          # Archer class
│   │   ├── Enemy.ts           # Enemy class
│   │   ├── Projectile.ts      # Projectile class
│   │   └── Boss.ts            # Boss enemy class
│   ├── systems/
│   │   ├── EconomySystem.ts   # Coin/heart management
│   │   ├── WaveSystem.ts      # Enemy wave spawning
│   │   ├── UpgradeSystem.ts   # Archer upgrades
│   │   ├── PathSystem.ts      # Path waypoints
│   │   └── SaveSystem.ts      # LocalStorage save/load
│   ├── ui/
│   │   ├── ShopPanel.ts       # Archer shop UI
│   │   ├── UpgradePanel.ts    # Upgrade UI
│   │   ├── StatsPanel.ts      # Game stats UI
│   │   └── QuestionPanel.ts   # Learning mode questions
│   ├── data/
│   │   ├── archerData.ts      # All 30 archer definitions
│   │   ├── enemyData.ts       # Enemy type definitions
│   │   ├── mapData.ts         # Map layouts
│   │   ├── avatarData.ts      # Avatar definitions
│   │   └── questionData.ts    # Educational questions
│   ├── config/
│   │   ├── gameConfig.ts      # Phaser game config
│   │   └── constants.ts       # Game constants
│   └── utils/
│       ├── helpers.ts         # Utility functions
│       └── types.ts           # TypeScript types
├── assets/
│   ├── sprites/               # Character sprites
│   ├── effects/               # Particle effects
│   ├── ui/                    # UI elements
│   ├── audio/
│   │   ├── music/             # Background music
│   │   └── sfx/               # Sound effects
│   └── maps/                  # Map backgrounds
└── public/                    # Static assets

```

## **Development Workflow**

### **Starting Development**

1. Read `PROGRESS.md` to see current milestone
2. Read the current milestone file in `docs/milestones/`
3. Implement features according to requirements
4. Test using scenarios from `TESTING.md`
5. **IMMEDIATELY update `PROGRESS.md` when features are complete** ⚠️
6. Commit changes to git with descriptive message

### **Before Moving to Next Milestone**

- [ ] All features from current milestone implemented
- [ ] All tests passing
- [ ] Code committed to git
- [ ] **`PROGRESS.md` updated with completion status** ⚠️
- [ ] User has tested and approved (for key milestones)

### **CRITICAL: Progress Tracking Protocol** ⚠️

**You MUST update PROGRESS.md immediately after completing each milestone. This is not optional.**

#### When to Update PROGRESS.md:
1. **After completing any milestone** - Mark it as ✅ Complete with completion date
2. **After fixing critical bugs/issues** - Document in "Known Issues" section
3. **After user testing** - Record feedback in "User Feedback Log"
4. **When starting a new milestone** - Update "Current Status" at the top

#### What to Update:
- Quick Status table (change status icons)
- Individual milestone section (mark tasks complete, add completion date)
- "Current Implementation Summary" (update working features)
- "Known Issues" (track bugs and fixes)
- "Next Developer Actions" (update priority)
- "Last Updated" timestamp at bottom

### **Key Principles**

1. **Incremental**: Build one milestone at a time, don't jump ahead
2. **Testable**: Each milestone should be playable/testable
3. **Documented**: Update docs as you go, especially PROGRESS.md **IMMEDIATELY** after completion ⚠️
4. **Data-Driven**: Keep game data (archers, enemies, etc.) in data files, not hardcoded
5. **Clean Code**: TypeScript for type safety, clear naming, comments for complex logic
6. **Progress Tracking**: Always update PROGRESS.md - this is essential for project management

## **Running the Project**

```bash
# Install dependencies
npm install

# Run development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## **Game Design Summary**

See `GAME_DESIGN.md` for complete details. Quick overview:

- **Genre**: Tower defense with educational integration
- **Theme**: Sci-fi/futuristic
- **Core Loop**: Place archers → defend gate → earn coins → buy/upgrade archers
- **Progression**: 30 archer types, 3-tier upgrade system (10 stars each), 5 maps, 10 avatars
- **Difficulty**: Exponential enemy scaling, boss every 10 rounds
- **Learning Mode**: Optional educational questions for bonuses
- **Platforms**: Desktop browser + mobile (responsive)

## **Current Development Status**

**Active Milestone**: 6 - Upgrade System (Milestones 1-5 Complete ✅)

**Completed Milestones**: 1-5 (42% complete)
**Next Steps**: See PROGRESS.md for detailed current status

## **Testing Checkpoints**

User testing required at these milestones:
- **Milestone 3**: Basic archer shooting (core gameplay proof)
- **Milestone 6**: Upgrade system (economy validation)
- **Milestone 9**: Boss + scaling (difficulty curve check)
- **Milestone 12**: Full game (final acceptance testing)

## **Important Notes for Development**

### **Asset Placeholders**

Until final art is created:
- Use colored rectangles/circles for sprites
- Use Phaser's built-in graphics for UI
- Use free asset packs (OpenGameArt, Kenney.nl)
- Document which assets need final art in PROGRESS.md

### **Audio Placeholders**

- Use royalty-free music from FreePD.com or Incompetech
- Use free SFX from Freesound.org
- Can add later without breaking existing code

### **Question Database**

- Start with 100 questions in Milestone 11
- Structured as JSON in `src/data/questionData.ts`
- Easily expandable to 500+ later

### **Performance Considerations**

- Cap enemy count at 50 on screen (milestone 9+)
- Use object pooling for projectiles (milestone 8+)
- Optimize particle effects for mobile (milestone 12)

### **Mobile Optimization**

- Touch controls added in Milestone 5 (shop interaction)
- Pinch-zoom in Milestone 7 (complex paths)
- Performance testing in Milestone 12

## **Data Management**

All game data is in `src/data/` files:

### **archerData.ts**
```typescript
export const ARCHERS = [
  {
    id: 'recruit_bow',
    name: 'Recruit Bow',
    tier: 1,
    cost: 0,
    range: 100,
    fireRate: 1,
    damage: 10,
    projectileType: 'arrow',
    special: null
  },
  // ... 29 more archers
]
```

### **enemyData.ts**
```typescript
export const ENEMIES = [
  {
    id: 'scout',
    name: 'Scout',
    baseHP: 40,
    speed: 120,
    reward: 10,
    sprite: 'scout'
  },
  // ... more enemy types
]
```

### **mapData.ts**
```typescript
export const MAPS = [
  {
    id: 'gateway_station',
    name: 'Gateway Station',
    cost: 0,
    spawns: [{x: 100, y: 600}, {x: 700, y: 600}],
    paths: [
      [{x: 100, y: 600}, {x: 200, y: 400}, ...],
      [{x: 700, y: 600}, {x: 600, y: 400}, ...]
    ],
    gate: {x: 400, y: 50}
  },
  // ... more maps
]
```

## **Debugging Tips**

- Use `console.log()` liberally during development
- Phaser has built-in debug rendering: `scene.physics.world.drawDebug()`
- Check browser console for errors
- Use browser dev tools for mobile simulation
- Test at different game speeds (1x, 2x, 4x)

## **Common Issues & Solutions**

### **Projectiles not hitting enemies**
- Check collision detection in GameScene
- Verify projectile speed matches enemy speed
- Ensure target tracking updates each frame

### **Upgrades not applying**
- Check UpgradeSystem calculates multipliers correctly
- Verify Archer class uses upgrade values
- Console.log archer stats after upgrade

### **Path crossing detection fails**
- Use Phaser's pathfinding or manual waypoint system
- Ensure paths defined as arrays of {x, y} points
- Enemies follow waypoints in sequence

### **Save/load not working**
- Check LocalStorage is enabled (privacy mode blocks it)
- Verify JSON.stringify/parse for save data
- Handle missing data (first load)

## **Future Enhancements** (Post-Milestone 12)

Ideas for v2.0+:
- Multiplayer co-op mode
- Map editor
- Daily challenges
- Leaderboards
- More archer types (50+)
- Achievement system
- Seasonal events
- Mobile app (Cordova/Capacitor wrapper)

## **Contact & Support**

This project is built collaboratively. Key testing checkpoints require user approval before proceeding to next milestone.

---

## **Git & Version Control Best Practices**

### Commit Message Format:
```
<type>: <brief description>

<detailed description if needed>
```

**Types:**
- `feat`: New feature (e.g., "feat: implement archer shop UI")
- `fix`: Bug fix (e.g., "fix: header overlap with gate")
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Commit Frequency:
- Commit after each milestone completion
- Commit after fixing critical bugs
- Commit before major refactoring
- Always include descriptive messages

### Example Commits:
```bash
git commit -m "feat: complete milestone 1 - project setup and basic rendering"
git commit -m "feat: complete milestone 2 - enemy movement system"
git commit -m "fix: resolve header overlap with gate positioning"
```

---

**Last Updated**: 2025-10-05 (Milestone 5 complete)
**Project Start**: 2025-10-05
**Current Progress**: 42% (5/12 milestones)
**Target Completion**: 16-22 days of development
