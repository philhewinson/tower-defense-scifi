# MILESTONE 11: Learning Mode + Questions

**Status**: ⏸️ Pending
**Estimated Time**: 6-8 hours
**Dependencies**: Milestone 10 complete

---

## Objective

Integrate educational questions with rewards, difficulty levels, and streak bonuses.

---

## Key Requirements

### 11.1 Question Database
**File**: `src/data/questionData.ts`

```typescript
export interface Question {
  id: string;
  subject: 'math' | 'science' | 'geography' | 'history' | 'language';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  question: string;
  answers: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 'math_easy_001',
    subject: 'math',
    difficulty: 'easy',
    question: 'What is 7 + 5?',
    answers: ['10', '12', '13', '15'],
    correctIndex: 1,
    explanation: '7 + 5 = 12'
  },
  // ... 100+ questions (expandable to 700+)
];
```

Create at least 100 questions for launch:
- 30 Math Easy
- 20 Math Medium
- 10 Math Hard
- 20 Science Easy
- 10 Science Medium
- 10 Geography/History/Language mix

### 11.2 Mode Selection
**File**: `src/scenes/MenuScene.ts`

Main menu buttons:
- **Arcade Mode** → start game without questions
- **Learning Mode** → enable question system

If Learning Mode:
- Show difficulty selector: Easy | Medium | Hard | Extreme

### 11.3 Question Panel UI
**File**: `src/ui/QuestionPanel.ts`

Popup after round ends (if Learning Mode active):

```
┌─────────────────────────────────┐
│  ROUND 5 COMPLETE!              │
│                                 │
│  Question (Math - Medium):      │
│  What is 15% of 200?            │
│                                 │
│  A) 20                          │
│  B) 25                          │
│  C) 30   ← Click               │
│  D) 35                          │
│                                 │
│  [Skip] [Submit Answer]         │
│  Time: 28s                      │
└─────────────────────────────────┘
```

### 11.4 Question Logic
**File**: `src/systems/LearningSystem.ts`

```typescript
export class LearningSystem {
  private correctStreak: number = 0;
  private difficulty: string;

  getRandomQuestion(): Question {
    // Filter by selected difficulty
    // Return random question
  }

  submitAnswer(question: Question, selectedIndex: number): boolean {
    const correct = (selectedIndex === question.correctIndex);
    if (correct) {
      this.correctStreak++;
      this.awardRegularBonus(); // +£75
      this.checkStreakBonus(); // 10 streak = +20 hearts
    } else {
      this.correctStreak = 0;
    }
    return correct;
  }

  awardBossBonus(boss: Boss): void {
    // Reduce boss HP by 20%
    boss.hp *= 0.8;
  }
}
```

### 11.5 Rewards Implementation

**Regular Rounds**:
- Correct answer: +£75 bonus
- Wrong/Skip: No penalty

**Boss Rounds**:
- Correct answer: Boss HP reduced by 20%
- Wrong/Skip: No effect

**Streaks**:
- 10 correct in a row: +20 hearts
- 20 correct: +50 hearts
- 50 correct: +200 hearts + £500

---

## Testing Scenarios

1. **Mode Selection**: Choose Learning Mode → difficulty selector appears
2. **Question Appears**: Complete round → question popup shows
3. **Correct Answer**: Select right answer → +£75, streak increments
4. **Wrong Answer**: Select wrong answer → streak resets, no coins
5. **Skip**: Click skip → no effect
6. **Boss Question**: Round 10 boss + correct answer → boss HP drops 20%
7. **10 Streak**: Answer 10 correct → +20 hearts message
8. **Difficulty Filtering**: Hard difficulty → only hard questions appear

---

## Success Criteria

- ✅ 100+ questions in database
- ✅ Mode selection works (Arcade vs Learning)
- ✅ Questions appear after rounds
- ✅ Correct answers award bonuses
- ✅ Boss HP reduction works
- ✅ Streak system tracks and rewards
- ✅ Difficulty filtering works

---

## Files Created

- `/src/data/questionData.ts`
- `/src/ui/QuestionPanel.ts`
- `/src/systems/LearningSystem.ts`

**Modified:**
- `/src/scenes/MenuScene.ts`
- `/src/scenes/GameScene.ts`

---

**Next**: MILESTONE 12 - Polish + Full Features (FINAL)
