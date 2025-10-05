# Testing Guide

**Project**: Tower Defense - Sci-Fi Edition

This document contains all test scenarios for each milestone. Use this to verify features work correctly before moving to the next milestone.

---

## General Testing Guidelines

1. **Test in multiple browsers**: Chrome, Firefox, Safari
2. **Test responsiveness**: Resize window, test at 1920×1080, 1366×768, 768×1024
3. **Check console**: No errors should appear (F12 → Console tab)
4. **Performance**: Monitor FPS (show FPS counter in settings)
5. **Mobile**: Test on real mobile device when applicable (M5+)

---

## MILESTONE 1: Project Setup + Basic Rendering

### Test 1.1: Development Server Starts
**Steps:**
1. Open terminal in project directory
2. Run `npm install`
3. Run `npm run dev`

**Expected:**
- ✅ No errors during installation
- ✅ Vite server starts on port 3000
- ✅ Browser opens automatically
- ✅ Game canvas visible in browser

**Pass/Fail**: ⬜

---

### Test 1.2: Background Renders Correctly
**Steps:**
1. Game loads in browser
2. Observe background

**Expected:**
- ✅ Dark blue-purple background (#2a2a4e)
- ✅ Hexagon grid pattern visible across entire canvas
- ✅ Hexagons properly aligned and spaced

**Pass/Fail**: ⬜

---

### Test 1.3: Paths Render and Glow
**Steps:**
1. Game loads
2. Observe paths from bottom to top

**Expected:**
- ✅ Two cyan paths visible (from bottom corners)
- ✅ Paths converge at top center (gate)
- ✅ Paths have glowing effect (bright cyan outline)
- ✅ Path width approximately 60-80px

**Pass/Fail**: ⬜

---

### Test 1.4: Gate Renders at Top
**Steps:**
1. Game loads
2. Observe top-center of screen

**Expected:**
- ✅ Orange rectangle visible at position (960, 100)
- ✅ Yellow border around gate
- ✅ "GATE" text centered on rectangle
- ✅ Gate size approximately 200×150px

**Pass/Fail**: ⬜

---

### Test 1.5: Responsive Scaling
**Steps:**
1. Game loads
2. Resize browser window (smaller and larger)
3. Observe game canvas

**Expected:**
- ✅ Game maintains aspect ratio (16:9)
- ✅ Game centers in window
- ✅ No distortion or stretching
- ✅ All elements scale proportionally

**Pass/Fail**: ⬜

---

### Test 1.6: Console Logs Correct
**Steps:**
1. Open browser console (F12)
2. Load game

**Expected Console Output:**
```
Tower Defense Game - Milestone 1: Initialized
BootScene: Loading assets...
BootScene: Assets loaded, starting GameScene
```

**Pass/Fail**: ⬜

---

### Test 1.7: No Errors
**Steps:**
1. Open browser console
2. Load game
3. Check for any red error messages

**Expected:**
- ✅ No TypeScript errors
- ✅ No Phaser errors
- ✅ No browser runtime errors

**Pass/Fail**: ⬜

---

## MILESTONE 2: Enemy Movement

### Test 2.1: Enemy Spawns
**Steps:**
1. Run game
2. Observe spawn areas (bottom-left and bottom-right)

**Expected:**
- ✅ One enemy (red square) appears at a spawn point
- ✅ Enemy has yellow border
- ✅ Enemy size approximately 30×30px
- ✅ Green HP bar visible above enemy

**Pass/Fail**: ⬜

---

### Test 2.2: Enemy Follows Path
**Steps:**
1. Watch spawned enemy for 10-15 seconds
2. Observe movement

**Expected:**
- ✅ Enemy smoothly moves along waypoints
- ✅ Enemy follows cyan path visually
- ✅ No jerky movement or teleporting
- ✅ Speed appears consistent

**Pass/Fail**: ⬜

---

### Test 2.3: Enemy Reaches Gate
**Steps:**
1. Wait for enemy to complete path
2. Observe what happens when enemy reaches gate

**Expected:**
- ✅ Enemy disappears upon reaching (960, 200)
- ✅ No console errors
- ✅ No visual glitches

**Pass/Fail**: ⬜

---

### Test 2.4: HP Bar Displays
**Steps:**
1. Enemy spawns
2. Observe HP bar above sprite

**Expected:**
- ✅ Green bar visible at full width (30px)
- ✅ Black background bar visible
- ✅ HP bar positioned 25px above enemy sprite

**Pass/Fail**: ⬜

---

### Test 2.5: Random Path Selection
**Steps:**
1. Reload game 10 times (F5)
2. Count which path enemy spawns on

**Expected:**
- ✅ Sometimes left path, sometimes right path
- ✅ Roughly 50/50 distribution (5 left, 5 right ±2)

**Pass/Fail**: ⬜

---

### Test 2.6: Movement Speed
**Steps:**
1. Time enemy from spawn to gate (use stopwatch)
2. Record duration

**Expected:**
- ✅ Takes approximately 12-15 seconds to reach gate
- ✅ Speed feels appropriate (not too fast/slow)

**Pass/Fail**: ⬜
**Actual Time**: _____ seconds

---

## MILESTONE 3: Basic Archer + Shooting

### Test 3.1: Click to Place Archer
**Steps:**
1. Click anywhere on map (off path)
2. Observe

**Expected:**
- ✅ Blue square archer appears at click position
- ✅ Archer size approximately 40×40px
- ✅ No coin deduction (Recruit Bow is free)

**Pass/Fail**: ⬜

---

### Test 3.2: Range Preview Shows
**Steps:**
1. Hover mouse over map before placing archer
2. Observe visual feedback

**Expected:**
- ✅ Translucent archer sprite follows mouse
- ✅ Circle showing range appears (100px radius)
- ✅ Circle is green if valid placement spot

**Pass/Fail**: ⬜

---

### Test 3.3: Archer Detects Enemy
**Steps:**
1. Place archer near path
2. Wait for enemy to spawn and enter range
3. Observe archer behavior

**Expected:**
- ✅ Archer rotates/aims toward enemy when in range
- ✅ Archer starts shooting (projectiles spawn)

**Pass/Fail**: ⬜

---

### Test 3.4: Projectile Fires and Moves
**Steps:**
1. Archer shoots at enemy
2. Watch projectile

**Expected:**
- ✅ Small circle (5px) appears at archer position
- ✅ Projectile moves toward enemy
- ✅ Movement speed approximately 400 px/s
- ✅ Projectile tracks enemy (follows if enemy moves)

**Pass/Fail**: ⬜

---

### Test 3.5: Projectile Hits Enemy
**Steps:**
1. Watch projectile reach enemy
2. Observe collision

**Expected:**
- ✅ Projectile disappears on contact
- ✅ Enemy HP bar decreases
- ✅ HP bar color changes (green → yellow → red)

**Pass/Fail**: ⬜

---

### Test 3.6: Enemy Dies
**Steps:**
1. Let archer shoot enemy multiple times
2. Wait for HP to reach 0

**Expected:**
- ✅ Enemy disappears when HP = 0
- ✅ No console errors
- ✅ Archer finds new target if available

**Pass/Fail**: ⬜

---

### Test 3.7: Out of Range
**Steps:**
1. Place archer far from path (>100px away)
2. Spawn enemy on nearby path

**Expected:**
- ✅ Archer does NOT shoot (enemy out of range)
- ✅ Archer idles (no projectiles)

**Pass/Fail**: ⬜

---

### Test 3.8: Multiple Archers
**Steps:**
1. Place 3 archers at different locations
2. Spawn enemy

**Expected:**
- ✅ All archers in range shoot at enemy
- ✅ Projectiles come from each archer independently
- ✅ Enemy takes damage from all sources

**Pass/Fail**: ⬜

---

## MILESTONE 4: Round System + Economy

### Test 4.1: UI Displays Stats
**Steps:**
1. Game loads
2. Observe top UI bar

**Expected:**
- ✅ Hearts displayed (❤️ 500)
- ✅ Coins displayed (💰 £100)
- ✅ Round number displayed (Round 1)
- ✅ All text clearly readable

**Pass/Fail**: ⬜

---

### Test 4.2: Start Wave Button
**Steps:**
1. Look for "Start Wave" button
2. Click it

**Expected:**
- ✅ Button visible at bottom of screen
- ✅ Button pulsing/highlighted
- ✅ Clicking starts enemy spawning
- ✅ Button disables during wave

**Pass/Fail**: ⬜

---

### Test 4.3: Multiple Enemies Spawn
**Steps:**
1. Start wave
2. Count enemies that spawn

**Expected:**
- ✅ Round 1: 5 enemies spawn
- ✅ Enemies spawn in intervals (not all at once)
- ✅ Approximately 1.5 seconds between spawns
- ✅ Enemy counter shows "X / 5 remaining"

**Pass/Fail**: ⬜

---

### Test 4.4: Kill Rewards
**Steps:**
1. Kill 1 enemy
2. Observe coin count

**Expected:**
- ✅ Coin count increases by £10
- ✅ Coin popup appears briefly above enemy
- ✅ Update is immediate

**Pass/Fail**: ⬜

---

### Test 4.5: Wave Complete Reward
**Steps:**
1. Complete wave (kill all enemies)
2. Observe coin count

**Expected:**
- ✅ +£100 bonus added
- ✅ "Wave Complete" message shows
- ✅ Round number increments to 2
- ✅ "Start Wave" button re-enables

**Pass/Fail**: ⬜

---

### Test 4.6: Enemy Reaches Gate
**Steps:**
1. Don't place archers
2. Let enemy reach gate

**Expected:**
- ✅ Heart count decreases by 1 (500 → 499)
- ✅ Visual feedback (gate flashes red)
- ✅ Enemy disappears

**Pass/Fail**: ⬜

---

### Test 4.7: Game Over at 0 Hearts
**Steps:**
1. Let 500 enemies reach gate (or modify hearts to 5 for quick test)
2. Observe when hearts = 0

**Expected:**
- ✅ Game over screen appears
- ✅ Game pauses (no more spawning)
- ✅ Shows final stats (round reached, coins earned, kills)
- ✅ "Retry" and "Main Menu" buttons visible

**Pass/Fail**: ⬜

---

### Test 4.8: Economy Persists
**Steps:**
1. Earn coins from wave 1 (100 base + kills)
2. Start wave 2
3. Check coin balance

**Expected:**
- ✅ Coins carry over between waves
- ✅ Not reset to £100 each round

**Pass/Fail**: ⬜

---

## MILESTONE 5: Archer Shop + Multiple Types

### Test 5.1: Shop UI Displays
**Steps:**
1. Game loads
2. Observe left sidebar

**Expected:**
- ✅ 6 archer cards visible (Tier 1 bows)
- ✅ Each card shows: icon, name, cost, brief stats
- ✅ Cards clearly readable
- ✅ Scrollable if needed

**Pass/Fail**: ⬜

---

### Test 5.2: Select Archer Type
**Steps:**
1. Click "Hunter Bow" in shop
2. Observe

**Expected:**
- ✅ Hunter Bow card highlights
- ✅ Previous selection unhighlights
- ✅ Hover preview shows Hunter Bow sprite

**Pass/Fail**: ⬜

---

### Test 5.3: Place Different Archer Types
**Steps:**
1. Select Longbow (£250)
2. Click map to place
3. Check coin balance

**Expected:**
- ✅ Longbow placed on map
- ✅ £250 deducted from coins
- ✅ If insufficient funds, placement fails with message

**Pass/Fail**: ⬜

---

### Test 5.4: Archer Stats Differ
**Steps:**
1. Place Recruit Bow (range 100)
2. Place Sniper Bow (range 200)
3. Observe range circles

**Expected:**
- ✅ Sniper Bow range circle 2× larger than Recruit
- ✅ Sniper can hit enemies from farther away
- ✅ Fire rates visually different (Rapid Bow faster)

**Pass/Fail**: ⬜

---

### Test 5.5: Insufficient Funds
**Steps:**
1. Have only £100 coins
2. Try to select Sniper Bow (£500)

**Expected:**
- ✅ Sniper Bow card grayed out
- ✅ Can't select it
- ✅ Tooltip: "Insufficient funds"

**Pass/Fail**: ⬜

---

### Test 5.6: Multiple Archer Types Shoot
**Steps:**
1. Place Recruit, Hunter, and Rapid Bow
2. Spawn enemies

**Expected:**
- ✅ All 3 archers shoot independently
- ✅ Rapid Bow fires faster than others
- ✅ Damage amounts differ (check HP bars)

**Pass/Fail**: ⬜

---

## MILESTONE 6: Upgrade System

### Test 6.1: Select Archer Shows Upgrade Panel
**Steps:**
1. Place an archer
2. Click on placed archer

**Expected:**
- ✅ Right sidebar shows upgrade panel
- ✅ Current stats displayed (range, speed, damage)
- ✅ 3 tier buttons visible (Range, Speed, Damage)
- ✅ Star progress shown (⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪)

**Pass/Fail**: ⬜

---

### Test 6.2: Purchase Range Upgrade
**Steps:**
1. Select archer
2. Click "Upgrade Range" button
3. Observe

**Expected:**
- ✅ Cost deducted from coins
- ✅ First star fills (⭐⚪⚪⚪⚪⚪⚪⚪⚪⚪)
- ✅ Range stat increases by 5%
- ✅ Range circle grows larger visibly

**Pass/Fail**: ⬜

---

### Test 6.3: Upgrade Cost Scaling
**Steps:**
1. Upgrade archer to 1 star: record cost
2. Upgrade to 2 stars: record cost
3. Upgrade to 3 stars: record cost

**Expected:**
- ✅ Each upgrade costs more (1.25× multiplier)
- ✅ Formula: (BaseCost ÷ 15) × (1.25 ^ starNumber)

**Example for Recruit Bow (£0 base):**
- Star 1: £0 (free base)
- For Hunter Bow (£150): Star 1 ≈ £10, Star 2 ≈ £13

**Pass/Fail**: ⬜
**Actual Costs**: Star 1: £_____, Star 2: £_____, Star 3: £_____

---

### Test 6.4: Speed Upgrade Works
**Steps:**
1. Upgrade Speed tier to 1 star
2. Watch archer fire rate

**Expected:**
- ✅ Fire rate increases by 8%
- ✅ Visibly shoots faster
- ✅ Stat shows updated value

**Pass/Fail**: ⬜

---

### Test 6.5: Damage Upgrade Works
**Steps:**
1. Note current archer damage (e.g., 10)
2. Upgrade Damage tier to 1 star
3. Shoot enemy, check damage

**Expected:**
- ✅ Damage increases by 10% (10 → 11)
- ✅ Enemy HP bar decreases more per hit
- ✅ Stat panel shows updated damage

**Pass/Fail**: ⬜

---

### Test 6.6: Max Stars Enforced
**Steps:**
1. Upgrade Range tier to 10 stars
2. Try to upgrade again

**Expected:**
- ✅ "Upgrade Range" button disabled
- ✅ Message: "Max stars reached"
- ✅ All 10 stars filled

**Pass/Fail**: ⬜

---

### Test 6.7: All Tiers Can Be Upgraded
**Steps:**
1. Fully upgrade all 3 tiers (30 stars total)
2. Check stats

**Expected:**
- ✅ Range: +50% (100 → 150)
- ✅ Speed: +80% (1.0 → 1.8/s)
- ✅ Damage: +100% (10 → 20)
- ✅ Archer significantly stronger

**Pass/Fail**: ⬜

---

## MILESTONE 7: Advanced Paths + Crossings

### Test 7.1: Paths Cross Visually
**Steps:**
1. Load game
2. Observe paths

**Expected:**
- ✅ Two paths clearly cross at center point (960, 500)
- ✅ Crossing area highlighted (brighter glow)
- ✅ Both paths continue after crossing

**Pass/Fail**: ⬜

---

### Test 7.2: Enemies Walk Through Crossing
**Steps:**
1. Spawn enemies from both paths
2. Watch movement

**Expected:**
- ✅ Enemies from left path pass through (960, 500)
- ✅ Enemies from right path pass through (960, 500)
- ✅ No collision between enemies
- ✅ Movement smooth through intersection

**Pass/Fail**: ⬜

---

### Test 7.3: Placement Validation (Invalid)
**Steps:**
1. Try to place archer directly on path
2. Observe

**Expected:**
- ✅ Preview circle turns RED
- ✅ Click does NOT place archer
- ✅ Message: "Cannot place on path"

**Pass/Fail**: ⬜

---

### Test 7.4: Placement Validation (Valid)
**Steps:**
1. Hover archer over open area (off path)
2. Observe

**Expected:**
- ✅ Preview circle is GREEN
- ✅ Click successfully places archer

**Pass/Fail**: ⬜

---

### Test 7.5: Choke Point Strategy
**Steps:**
1. Place archer at (960, 500) - the crossing point
2. Spawn enemies from both paths

**Expected:**
- ✅ Archer can target enemies from LEFT path
- ✅ Archer can target enemies from RIGHT path
- ✅ Strategic advantage (one archer covers both)

**Pass/Fail**: ⬜

---

## MILESTONE 8: All Archers + Enemy Types

### Test 8.1: All 30 Archers Available
**Steps:**
1. Open shop
2. Scroll through all tiers (tabs)

**Expected:**
- ✅ Tier 1: 6 archers visible
- ✅ Tier 2: 5 archers visible
- ✅ Tier 3: 5 archers visible
- ✅ Tier 4: 6 archers visible
- ✅ Tier 5: 5 archers visible
- ✅ Tier 6: 3 archers visible
- ✅ Total: 30 unique archers

**Pass/Fail**: ⬜

---

### Test 8.2: Splash Damage (Explosive Bow)
**Steps:**
1. Place Explosive Bow
2. Spawn 3 enemies close together
3. Shoot center enemy

**Expected:**
- ✅ Center enemy takes damage
- ✅ Nearby enemies ALSO take splash damage
- ✅ Visual explosion effect appears

**Pass/Fail**: ⬜

---

### Test 8.3: Pierce (Railgun)
**Steps:**
1. Place Railgun
2. Spawn 3 enemies in a line
3. Shoot

**Expected:**
- ✅ Projectile passes through first enemy
- ✅ Projectile hits second enemy
- ✅ Projectile hits third enemy
- ✅ All 3 enemies take damage

**Pass/Fail**: ⬜

---

### Test 8.4: Chain Lightning (Tesla Coil)
**Steps:**
1. Place Tesla Coil
2. Spawn 5+ enemies in range
3. Observe shooting

**Expected:**
- ✅ Projectile hits first enemy
- ✅ Lightning arc jumps to 2nd enemy
- ✅ Continues jumping up to 5 total enemies
- ✅ Visual chain effect connects enemies

**Pass/Fail**: ⬜

---

### Test 8.5: Poison DoT (Poison Bow)
**Steps:**
1. Place Poison Bow
2. Shoot enemy once
3. Watch enemy HP over time

**Expected:**
- ✅ Initial hit damage (15)
- ✅ Enemy continues losing HP for 3 seconds
- ✅ Total additional damage = 30 over time
- ✅ Green poison effect visible on enemy

**Pass/Fail**: ⬜

---

### Test 8.6: Slow Effect (Cryo Archer)
**Steps:**
1. Place Cryo Archer
2. Shoot enemy
3. Observe movement speed

**Expected:**
- ✅ Enemy slows down by 50% after hit
- ✅ Visibly moving slower
- ✅ Blue frost effect on enemy
- ✅ Slow wears off after duration

**Pass/Fail**: ⬜

---

### Test 8.7: All Enemy Types Spawn
**Steps:**
1. Progress through multiple rounds
2. Observe enemy variety

**Expected:**
- ✅ Scout (fast, low HP)
- ✅ Infantry (balanced)
- ✅ Heavy (slow, high HP)
- ✅ Armored (damage reduction)
- ✅ Runner (very fast)
- ✅ Tank (extreme HP)
- ✅ Regenerator (heals)
- ✅ Swarm Drone (groups of 5)

**Pass/Fail**: ⬜

---

### Test 8.8: Armored Enemy Mechanic
**Steps:**
1. Spawn Armored enemy (100 HP, 40% reduction)
2. Shoot with archer dealing 20 damage

**Expected:**
- ✅ Enemy takes 12 damage (20 × 0.6)
- ✅ Takes longer to kill than regular 100 HP enemy

**Pass/Fail**: ⬜

---

## MILESTONE 9: Boss System + Scaling

### Test 9.1: Boss Spawns Round 10
**Steps:**
1. Progress to round 10
2. Start wave

**Expected:**
- ✅ "BOSS INCOMING" warning shows
- ✅ Large boss enemy appears (2-3× normal size)
- ✅ No regular enemies spawn
- ✅ Boss has 3000 HP
- ✅ Dramatic music change

**Pass/Fail**: ⬜

---

### Test 9.2: Boss Shield Mechanic
**Steps:**
1. Reach Round 20 (Shielded Colossus)
2. Shoot boss

**Expected:**
- ✅ First 1500 damage absorbed by shield
- ✅ Shield bar visible above HP bar
- ✅ After shield breaks, HP decreases
- ✅ Visual effect when shield breaks

**Pass/Fail**: ⬜

---

### Test 9.3: Boss Fire Aura
**Steps:**
1. Reach Round 30 (Inferno Beast)
2. Place archer near boss path

**Expected:**
- ✅ Archer within 150px fires slower (30% reduction)
- ✅ Fire particle effects around boss
- ✅ Archers far away (>150px) not affected

**Pass/Fail**: ⬜

---

### Test 9.4: Boss Regeneration
**Steps:**
1. Reach Round 50 (Nightmare Overlord)
2. Stop shooting boss for a few seconds
3. Observe HP

**Expected:**
- ✅ Boss HP increases over time
- ✅ +100 HP per second
- ✅ Regeneration effect visible (green glow)

**Pass/Fail**: ⬜

---

### Test 9.5: Boss Deals 50 Heart Damage
**Steps:**
1. Let boss reach gate
2. Observe hearts

**Expected:**
- ✅ Hearts decrease by 50 (not 1)
- ✅ Dramatic screen shake
- ✅ Warning message

**Pass/Fail**: ⬜

---

### Test 9.6: Boss Reward
**Steps:**
1. Kill Round 10 boss
2. Check coin balance

**Expected:**
- ✅ +£500 reward
- ✅ Coin popup shows large amount
- ✅ Victory fanfare plays

**Pass/Fail**: ⬜

---

### Test 9.7: HP Scaling Formula
**Steps:**
1. Round 1: Spawn Scout (40 base HP)
2. Round 10: Spawn Scout
3. Round 20: Spawn Infantry (80 base HP)

**Expected:**
- ✅ Round 1 Scout: 40 HP
- ✅ Round 10 Scout: 100 HP (40 × 2.5)
- ✅ Round 20 Infantry: 320 HP (80 × 4.0)

**Pass/Fail**: ⬜
**Actual HPs**: R1: _____, R10: _____, R20: _____

---

### Test 9.8: Enemy Count Scaling
**Steps:**
1. Count enemies per round

**Expected:**
- ✅ Round 1: 5 enemies
- ✅ Round 5: 13 enemies
- ✅ Round 10: BOSS (1 enemy)
- ✅ Round 15: 23 enemies
- ✅ Round 30: 43 enemies
- ✅ Round 50: 50 enemies (capped)

**Pass/Fail**: ⬜

---

## MILESTONE 10: Avatar System + Meta Progression

### Test 10.1: Avatar Selection Screen
**Steps:**
1. Start game from main menu
2. Click "Avatars"

**Expected:**
- ✅ Grid of avatar portraits displayed
- ✅ 14 total avatars (10 gameplay + 4 cosmetic)
- ✅ Shows name, cost, bonus description
- ✅ Locked avatars have lock icon

**Pass/Fail**: ⬜

---

### Test 10.2: Select Avatar
**Steps:**
1. Choose "Engineer" avatar
2. Click "Select"
3. Start game

**Expected:**
- ✅ Engineer avatar active
- ✅ Bonus applied (12% archer cost reduction)
- ✅ Avatar icon shown in game UI

**Pass/Fail**: ⬜

---

### Test 10.3: Engineer Bonus Works
**Steps:**
1. Select Engineer avatar
2. Check archer shop prices

**Expected:**
- ✅ Recruit Bow: £0 (can't discount free)
- ✅ Hunter Bow: £132 (£150 × 0.88)
- ✅ Longbow: £220 (£250 × 0.88)
- ✅ All prices reduced by 12%

**Pass/Fail**: ⬜

---

### Test 10.4: Tactician Bonus Works
**Steps:**
1. Select Tactician avatar
2. Place Recruit Bow (100 range)
3. Check range circle

**Expected:**
- ✅ Range increased to 115 (100 × 1.15)
- ✅ Range circle visibly larger
- ✅ Can hit enemies farther away

**Pass/Fail**: ⬜

---

### Test 10.5: Economist Bonus Works
**Steps:**
1. Select Economist avatar
2. Kill 1 enemy (£10 base reward)

**Expected:**
- ✅ Earn £13 (£10 × 1.30)
- ✅ All enemy kill rewards 30% higher

**Pass/Fail**: ⬜

---

### Test 10.6: Meta Currency Earned
**Steps:**
1. Reach Round 10
2. Complete boss round
3. Check meta coin balance

**Expected:**
- ✅ +500 meta coins awarded
- ✅ Popup: "Meta Coins Earned: 500"
- ✅ Balance updates

**Pass/Fail**: ⬜

---

### Test 10.7: Unlock Avatar
**Steps:**
1. Have 1200 meta coins
2. Click locked "Tactician" avatar (£1200)
3. Click "Unlock"

**Expected:**
- ✅ 1200 meta coins deducted
- ✅ Avatar unlocks (lock icon removed)
- ✅ Can now select and use avatar

**Pass/Fail**: ⬜

---

### Test 10.8: Progress Persists
**Steps:**
1. Unlock avatar
2. Close browser completely
3. Reopen game

**Expected:**
- ✅ Avatar still unlocked
- ✅ Meta coin balance preserved
- ✅ LocalStorage working

**Pass/Fail**: ⬜

---

## MILESTONE 11: Learning Mode + Questions

### Test 11.1: Mode Selection
**Steps:**
1. Main menu
2. Observe game mode buttons

**Expected:**
- ✅ "Arcade Mode" button visible
- ✅ "Learning Mode" button visible
- ✅ Clicking Learning Mode shows difficulty selector

**Pass/Fail**: ⬜

---

### Test 11.2: Difficulty Selector
**Steps:**
1. Choose Learning Mode
2. Observe options

**Expected:**
- ✅ 4 difficulty buttons: Easy, Medium, Hard, Extreme
- ✅ Selecting one starts game

**Pass/Fail**: ⬜

---

### Test 11.3: Question Appears After Round
**Steps:**
1. Start Learning Mode (Easy)
2. Complete Round 1
3. Observe

**Expected:**
- ✅ Question popup appears
- ✅ Shows: subject, difficulty level, question text
- ✅ 4 multiple choice answers (A, B, C, D)
- ✅ Timer (30 seconds)
- ✅ Skip and Submit buttons

**Pass/Fail**: ⬜

---

### Test 11.4: Correct Answer Reward
**Steps:**
1. Answer question correctly
2. Check coin balance

**Expected:**
- ✅ +£75 bonus
- ✅ "Correct!" message with explanation
- ✅ Streak counter: 1

**Pass/Fail**: ⬜

---

### Test 11.5: Wrong Answer
**Steps:**
1. Answer question incorrectly
2. Observe

**Expected:**
- ✅ "Incorrect" message
- ✅ Shows correct answer
- ✅ No coins awarded
- ✅ Streak resets to 0

**Pass/Fail**: ⬜

---

### Test 11.6: Skip Question
**Steps:**
1. Click "Skip" button

**Expected:**
- ✅ Question closes
- ✅ No penalty
- ✅ No reward
- ✅ Streak resets

**Pass/Fail**: ⬜

---

### Test 11.7: Boss Question Bonus
**Steps:**
1. Reach Round 10 (boss)
2. Answer question correctly
3. Observe boss HP

**Expected:**
- ✅ Boss HP reduced by 20% (3000 → 2400)
- ✅ Message: "Boss weakened!"
- ✅ Visual effect on boss

**Pass/Fail**: ⬜

---

### Test 11.8: 10-Question Streak Bonus
**Steps:**
1. Answer 10 questions correctly in a row
2. After 10th correct answer

**Expected:**
- ✅ +20 hearts awarded
- ✅ Special message: "10-QUESTION STREAK! +20 Hearts"
- ✅ Hearts balance increases
- ✅ Streak counter shows 10

**Pass/Fail**: ⬜

---

### Test 11.9: Difficulty Filtering
**Steps:**
1. Select "Hard" difficulty
2. Play several rounds, note questions

**Expected:**
- ✅ All questions are Hard level
- ✅ No Easy or Medium questions appear
- ✅ Questions appropriately challenging

**Pass/Fail**: ⬜

---

### Test 11.10: Question Database Size
**Steps:**
1. Play 20+ rounds
2. Note question variety

**Expected:**
- ✅ At least 100 unique questions
- ✅ Mix of subjects (Math, Science, Geography, etc.)
- ✅ Minimal repetition

**Pass/Fail**: ⬜

---

## MILESTONE 12: Polish + Full Features (FINAL)

### Test 12.1: All 6 Maps Unlockable
**Steps:**
1. Main menu → Map Selection
2. View all maps

**Expected:**
- ✅ Gateway Station (FREE)
- ✅ Desert Outpost (£1000)
- ✅ Cyber Maze (£2000)
- ✅ Orbital Platform (£3500)
- ✅ Volcanic Core (£5000)
- ✅ Final Frontier (£8000)

**Pass/Fail**: ⬜

---

### Test 12.2: Different Map Layouts
**Steps:**
1. Play on Gateway Station (2 paths)
2. Play on Orbital Platform (4 paths)

**Expected:**
- ✅ Visibly different background art
- ✅ Different path configurations
- ✅ Different spawn points
- ✅ Strategic differences

**Pass/Fail**: ⬜

---

### Test 12.3: Speed Controls
**Steps:**
1. Start game at 1x speed
2. Click 2x button
3. Click 4x button

**Expected:**
- ✅ Game speeds up visibly at 2x
- ✅ Game much faster at 4x
- ✅ Button highlights active speed
- ✅ No glitches or crashes

**Pass/Fail**: ⬜

---

### Test 12.4: Sell Archer
**Steps:**
1. Place archer worth £500
2. Right-click archer
3. Click "Sell"

**Expected:**
- ✅ Context menu appears
- ✅ Archer removed from map
- ✅ £250 refunded (50%)
- ✅ Confirmation message

**Pass/Fail**: ⬜

---

### Test 12.5: Active Ability
**Steps:**
1. Place archer
2. Click archer to activate boost
3. Observe

**Expected:**
- ✅ Archer glows (visual effect)
- ✅ Fire rate doubles for 5 seconds
- ✅ Cooldown timer appears (30s)
- ✅ Can't activate again until cooldown expires

**Pass/Fail**: ⬜

---

### Test 12.6: Wave Preview
**Steps:**
1. Before starting wave
2. Check right panel

**Expected:**
- ✅ Shows upcoming enemy types
- ✅ Shows quantities (e.g., "10× Infantry, 5× Scout")
- ✅ Updates for each round

**Pass/Fail**: ⬜

---

### Test 12.7: Damage Numbers
**Steps:**
1. Archer shoots enemy
2. Observe

**Expected:**
- ✅ Damage number floats up from enemy ("+10", "+25", etc.)
- ✅ Number fades out as it rises
- ✅ Critical hits (special abilities) in YELLOW

**Pass/Fail**: ⬜

---

### Test 12.8: Particle Effects
**Steps:**
1. Kill enemy
2. Purchase upgrade
3. Complete wave

**Expected:**
- ✅ Enemy death: Explosion particles
- ✅ Upgrade purchase: Glow burst from archer
- ✅ Wave complete: Confetti or celebration particles
- ✅ Smooth, not laggy

**Pass/Fail**: ⬜

---

### Test 12.9: Combo System
**Steps:**
1. Kill 5 enemies within 3 seconds

**Expected:**
- ✅ "COMBO ×5!" text appears
- ✅ Coin multiplier indicator (1.5×)
- ✅ Next kill awards 1.5× coins
- ✅ 10-kill combo: "MEGA COMBO!" + screen shake

**Pass/Fail**: ⬜

---

### Test 12.10: Audio - Music
**Steps:**
1. Load game
2. Progress through menus and gameplay

**Expected:**
- ✅ Menu music plays (upbeat electronic)
- ✅ Gameplay music plays (synthwave)
- ✅ Boss round: Music intensifies
- ✅ Smooth transitions between tracks
- ✅ Music loops seamlessly

**Pass/Fail**: ⬜

---

### Test 12.11: Audio - Sound Effects
**Steps:**
1. Perform various actions

**Expected SFX:**
- ✅ Archer placed (beep-boop)
- ✅ Archer shoots (pew/bang, varies by type)
- ✅ Enemy hit (thud)
- ✅ Enemy dies (explosion)
- ✅ Coin earned (ching)
- ✅ Upgrade (power-up sound)
- ✅ Wave complete (chime)
- ✅ Boss spawns (ominous horn)
- ✅ Heart lost (crack)
- ✅ Button click (click)

**Pass/Fail**: ⬜

---

### Test 12.12: Tutorial System
**Steps:**
1. Start new game (first time)
2. Play first 3 rounds

**Expected:**
- ✅ Round 1: Tooltip guides placement
- ✅ Round 2: Tooltip about shop
- ✅ Round 3: Tooltip about upgrades
- ✅ Tooltips dismissable
- ✅ Don't reappear after first playthrough

**Pass/Fail**: ⬜

---

### Test 12.13: Statistics Tracking
**Steps:**
1. Main menu → Stats
2. View statistics

**Expected Display:**
- ✅ Total enemies killed
- ✅ Highest round reached
- ✅ Total coins earned
- ✅ Accuracy % (hits / shots)
- ✅ Favorite archer (most used)
- ✅ Questions answered correctly
- ✅ Total playtime

**Pass/Fail**: ⬜

---

### Test 12.14: Save/Load System
**Steps:**
1. Play to round 7
2. Close browser tab
3. Reopen game
4. Click "Continue"

**Expected:**
- ✅ Game resumes at round 7
- ✅ Coins, hearts, archers preserved
- ✅ Same map and avatar
- ✅ All state intact

**Pass/Fail**: ⬜

---

### Test 12.15: Settings Menu
**Steps:**
1. Main menu → Settings
2. Adjust settings

**Expected Controls:**
- ✅ Music volume slider (0-100%)
- ✅ SFX volume slider (0-100%)
- ✅ Graphics quality dropdown
- ✅ Colorblind mode toggle
- ✅ Show FPS toggle
- ✅ Reset save data button (with confirmation)

**Pass/Fail**: ⬜

---

### Test 12.16: Mobile Touch Controls
**Steps:**
1. Open on mobile device or browser mobile simulator
2. Test interactions

**Expected:**
- ✅ Tap = click (select, place)
- ✅ Long-press = right-click (sell archer)
- ✅ Pinch-zoom works
- ✅ UI buttons large enough (min 44px)
- ✅ No accidental double-taps

**Pass/Fail**: ⬜
**Device Tested**: _________________

---

### Test 12.17: Mobile Performance
**Steps:**
1. Play on mobile device
2. Monitor FPS and smoothness

**Expected:**
- ✅ 30 FPS minimum
- ✅ No significant lag
- ✅ Particles don't cause slowdown
- ✅ 50 enemies + 20 archers playable

**Pass/Fail**: ⬜
**Device**: _________________
**FPS**: _____

---

### Test 12.18: Responsive Layout
**Steps:**
1. Test at different resolutions:
   - 1920×1080 (desktop)
   - 1366×768 (laptop)
   - 768×1024 (tablet portrait)
   - 1024×768 (tablet landscape)
   - 375×667 (mobile)

**Expected:**
- ✅ UI scales appropriately
- ✅ All elements visible
- ✅ No overlapping UI
- ✅ Text readable at all sizes

**Pass/Fail**: ⬜

---

### Test 12.19: Game Over Screen
**Steps:**
1. Let hearts reach 0
2. Observe game over

**Expected:**
- ✅ "GAME OVER" title
- ✅ Final stats: Round, kills, coins
- ✅ "Retry" button → restart game
- ✅ "Main Menu" button → return to menu
- ✅ Game paused (no background action)

**Pass/Fail**: ⬜

---

### Test 12.20: Victory Screen (Round 50+)
**Steps:**
1. Reach and complete Round 50
2. Observe

**Expected:**
- ✅ "CONGRATULATIONS!" screen
- ✅ Meta coin reward shown
- ✅ High score saved
- ✅ "Continue" to Round 51
- ✅ "Main Menu" button

**Pass/Fail**: ⬜

---

## FINAL ACCEPTANCE TEST

### Complete Playthrough
**Steps:**
1. Start new game
2. Select Learning Mode (Medium)
3. Choose Tactician avatar
4. Play Gateway Station map
5. Progress to Round 20
6. Answer questions correctly (streak 10+)
7. Defeat Round 20 boss
8. Unlock new avatar with meta coins
9. Check stats
10. Verify save/load

**Expected:**
- ✅ All systems work together seamlessly
- ✅ No crashes or major bugs
- ✅ Gameplay feels balanced and fun
- ✅ Visuals polished
- ✅ Audio enhances experience
- ✅ Tutorial helpful for new players
- ✅ Learning mode integrates smoothly
- ✅ Progression feels rewarding

**Pass/Fail**: ⬜

---

## Browser Compatibility

Test full game in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Performance Benchmarks

**Desktop:**
- Target: 60 FPS
- Actual: _____ FPS

**Mobile:**
- Target: 30 FPS
- Actual: _____ FPS
- Device: _________________

**Load Time:**
- Target: < 5 seconds
- Actual: _____ seconds

**Bundle Size:**
- Actual: _____ MB

---

## Critical Bugs Found

| Bug ID | Description | Severity | Status |
|--------|-------------|----------|--------|
| | | | |

---

## User Feedback Summary

**What works well:**
-

**What needs improvement:**
-

**Suggestions for future versions:**
-

---

**Testing Complete**: ⬜
**Date**: __________
**Tester**: __________
**Final Verdict**: PASS / FAIL / NEEDS WORK

---

End of Testing Guide
