# Tower Defense - Sci-Fi Edition

A web-based tower defense game with educational integration, built with Phaser 3, TypeScript, and Vite.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Status

**Current Progress**: 42% Complete (5/12 milestones) 🎮

**Current Milestone**: 6 (Upgrade System)
**Completed**: Milestones 1-5 ✅

The game runs at http://localhost:3000 when dev server is active.

### What's Working Now:
- ✅ Core game loop (enemies spawn, archers shoot, damage applies)
- ✅ Economy system (coins, hearts, rewards)
- ✅ Wave progression with scaling difficulty
- ✅ 6 Tier 1 archers with different stats
- ✅ UI with shop, header bar, speed controls
- ✅ Game over/restart functionality

## Documentation

- **[@CLAUDE.md](./@CLAUDE.md)** - Master project guide and build instructions
- **[GAME_DESIGN.md](./GAME_DESIGN.md)** - Complete game design specification
- **[PROGRESS.md](./PROGRESS.md)** - Development progress tracker
- **[TESTING.md](./TESTING.md)** - Testing scenarios for all milestones
- **[docs/milestones/](./docs/milestones/)** - Detailed requirements for each milestone

## Project Structure

```
bee/
├── src/
│   ├── scenes/        # Phaser scenes (Boot, Game, Menu, etc.)
│   ├── entities/      # Game entities (Archer, Enemy, Projectile)
│   ├── systems/       # Game systems (Economy, Wave, Upgrade, etc.)
│   ├── ui/            # UI components
│   ├── data/          # Game data (archers, enemies, questions, etc.)
│   ├── config/        # Configuration files
│   └── utils/         # Utility functions
├── assets/            # Game assets (sprites, audio, maps)
├── docs/              # Documentation
└── public/            # Static files
```

## Milestone Roadmap

1. ✅ **Project Setup + Basic Map Rendering** - Complete
2. ✅ **Enemy Movement** - Complete
3. ✅ **Basic Archer + Shooting** - Complete
4. ✅ **Round System + Economy** - Complete
5. ✅ **Archer Shop + Multiple Types** - Complete
6. 🔄 **Upgrade System** - In Progress
7. ⏸️ Advanced Paths + Crossings
8. ⏸️ All Archers + Enemy Types
9. ⏸️ Boss System + Difficulty Scaling
10. ⏸️ Avatar System + Meta Progression
11. ⏸️ Learning Mode + Questions
12. ⏸️ Polish + Full Features

**Progress**: 42% (5/12 milestones complete)

## Technology Stack

- **Game Engine**: Phaser 3.80.1
- **Language**: TypeScript 5.3.3
- **Build Tool**: Vite 5.0.11
- **Physics**: Arcade Physics (Phaser built-in)

## Features (Planned)

- 30 unique archer types
- 8 enemy types + 5 boss variants
- 3-tier upgrade system (10 stars per tier)
- 6 playable maps
- 10 avatars with gameplay bonuses
- Educational learning mode with 700+ questions
- Responsive design (desktop + mobile)
- Save/load system
- Statistics tracking

## License

Private project - All rights reserved

## Support

For build instructions and development guidelines, see [@CLAUDE.md](./@CLAUDE.md)
