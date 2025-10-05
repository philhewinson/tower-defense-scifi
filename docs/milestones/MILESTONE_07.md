# MILESTONE 7: Advanced Paths + Crossings

**Status**: ⏸️ Pending
**Estimated Time**: 4-5 hours
**Dependencies**: Milestone 6 complete

---

## Objective

Enhance path system to include crossing points, improve path visuals, add placement validation.

---

## Key Requirements

### 7.1 Enhanced Path System
**File**: `src/systems/PathSystem.ts` (enhance)

Update paths to cross in center:

```typescript
static readonly PATH_1: PathWaypoint[] = [
  { x: 200, y: 1000 },
  { x: 400, y: 800 },
  { x: 700, y: 600 },  // Approaches center
  { x: 960, y: 500 },  // CENTER CROSSING POINT
  { x: 1100, y: 300 },
  { x: 960, y: 100 }   // Gate
];

static readonly PATH_2: PathWaypoint[] = [
  { x: 1720, y: 1000 },
  { x: 1520, y: 800 },
  { x: 1220, y: 600 }, // Approaches center
  { x: 960, y: 500 },  // CENTER CROSSING POINT (same as Path 1)
  { x: 800, y: 300 },
  { x: 960, y: 100 }   // Gate
];
```

Paths now share crossing point at (960, 500).

### 7.2 Visual Path Enhancement
- Wider paths (80px instead of 60px)
- Animated glow effect (pulsing cyan)
- Highlight crossing zone (brighter glow)
- Path edge particles (optional)

### 7.3 Placement Validation
**File**: `src/utils/helpers.ts`

```typescript
export function isOnPath(x: number, y: number, allPaths: PathWaypoint[][]): boolean {
  // Check if point (x,y) is within 50px of any path segment
  // Returns true if on path (invalid placement)
}
```

Update GameScene to check before allowing placement:
- Green circle → valid placement
- Red circle → on path, can't place

### 7.4 Choke Point Strategy
With crossing paths, placing archers near (960, 500) covers both paths → strategic advantage.

---

## Testing Scenarios

1. **Paths Cross**: Visual paths clearly cross at center point
2. **Enemies Cross**: Enemies from both spawns pass through same center area
3. **Placement Validation**: Can't place archer directly on path (red circle)
4. **Valid Placement**: Can place archer between paths (green circle)
5. **Strategic Choke Point**: Archer at (960, 500) can shoot enemies from both paths

---

## Success Criteria

- ✅ Paths visually cross at center
- ✅ Enemies walk through crossing point correctly
- ✅ Placement validation prevents on-path placement
- ✅ Archer near choke point targets both paths
- ✅ Green/red circle placement feedback works

---

## Files Modified

- `/src/systems/PathSystem.ts`
- `/src/scenes/GameScene.ts`
- `/src/utils/helpers.ts` (new)

---

**Next**: MILESTONE 8 - All Archers + Enemy Types
