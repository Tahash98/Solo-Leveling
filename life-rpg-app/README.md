# 🔴 Life RPG App

A gamified productivity application that transforms your daily tasks and goals into an RPG-style adventure with quests, wars, weapons, titles, and character progression.

## ✨ Features

### 🏠 Home Screen
- **Random Quote Display**: Shows a motivational quote each time you open the app
- **Earned Titles**: Displays unlocked achievements with rarity colors
- **Quick Actions**: Fast access to add quests and start new wars
- **Today's Quests**: View and manage today's scheduled tasks

### 📜 Quests System
- **Flexible Quest Creation**: Only title required, all other fields optional
- **Categories**: Daily, Weekly, 3 Days Circle, Side Quest, War Quest
- **Difficulty Levels**: Easy (5 XP), Medium (10 XP), Hard (15 XP), Badass (20 XP), Special (custom XP)
- **Stat Progression**: Each quest affects specific character stats
- **Auto-Scheduling**: Repeating quests automatically generate for next 30 days
- **Complete Management**: Edit, delete, and complete quests anytime

### 📅 Calendar View
- **Visual Quest Display**: See all scheduled quests in calendar format
- **Quest Indicators**: Color-coded dots show quest density per day
- **Navigation**: Easy month navigation with arrow controls
- **Day Details**: Click any day to see detailed quest list

### ⚔️ Wars (Projects)
- **Project Management**: Track large multi-quest projects
- **Progress Tracking**: Visual progress bars based on completed quests
- **Flexible Creation**: Can create wars with or without initial quests
- **Quest Addition**: Add new quests to existing wars anytime
- **Weapons Integration**: Associate required weapons/skills with wars
- **Reward Titles**: Custom achievement titles for war completion

### 🗡 Weapons (Skills & Tools)
- **Three Types**: 
  - 🎯 Skills (abilities you develop)
  - ⚡ Abilities (special powers)
  - 🔧 Matter (physical tools/resources)
- **Flexible Creation**: Only name required
- **Obtained Status**: Track which weapons you've acquired
- **Progress Indicator**: ⏳ emoji shows not-yet-obtained weapons

### 👑 Titles (Achievements)
- **Four Rarity Levels**: 
  - 🟢 Common (green)
  - 🔵 Rare (blue) 
  - 🟣 Epic (purple)
  - 🟡 Legendary (gold)
- **Automatic Unlocking**: Titles unlock based on achievements
- **Clear Requirements**: Each title shows unlock conditions
- **Home Display**: Earned titles prominently displayed on home screen

### 💬 Quotes Management
- **Custom Quotes**: Add your own motivational messages
- **Random Display**: Home screen shows different quote each visit
- **Full Management**: Edit and delete quotes anytime
- **Preloaded Content**: Comes with inspiring sample quotes

### 📊 Stats & Progression
- **Character Level**: XP-based leveling system (100 XP per level)
- **Seven Core Stats**:
  - ❤️ Health
  - 🧠 Brain  
  - 🏹 Discipline (+0.5 for every completed quest)
  - 🗣 Social
  - ⚔️ Combat
  - 💰 Wealth
  - ✨ Wisdom
- **Level Up Bonuses**: +3 points to all stats when leveling up
- **Visual Progress**: XP bar and stat displays

## 🎨 Design Theme

**Red & Black Fantasy RPG Aesthetic**
- Background: Pure black (#000000)
- Primary Red: #ff2b2b
- Dark Red Accents: #7a1e1e
- Text: White for maximum contrast
- Gradients and shadows for depth
- Smooth animations and transitions
- RPG-style buttons and progress bars

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-rpg-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
```

## 📱 Usage Guide

### Adding Your First Quest
1. Go to the Quests tab or use Quick Actions on Home
2. Click the "+" button
3. Enter a quest title (required)
4. Optionally set category, difficulty, stat, and repeat cycle
5. Save and watch it appear in your quest list

### Creating a War (Project)
1. Navigate to Wars tab
2. Click "+" to create new war
3. Enter war name (required)
4. Add description, reward title, and strategy (optional)
5. Add quests to the war for detailed progress tracking

### Managing Weapons
1. Go to Weapons tab
2. Add weapons with name and type
3. Mark weapons as "obtained" when you acquire the skill/tool
4. Use weapons as requirements in your wars

### Tracking Progress
1. Visit Stats tab to see your character progression
2. Complete quests to gain XP and level up
3. Watch your stats grow with each completed task
4. Unlock titles as you hit milestones

## 💾 Data Persistence

All your data is automatically saved to browser localStorage:
- Quests and completion status
- Wars and progress
- Weapons and obtained status  
- Quotes and custom additions
- Player stats and level
- Title unlock status

**Data persists between sessions** - your progress is never lost!

## 🔧 Technical Details

- **Frontend**: React.js with hooks
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Data Storage**: Browser localStorage
- **Responsive**: Mobile-friendly design
- **Performance**: Optimized with React best practices

## 🎯 Sample Data Included

The app comes preloaded with:
- **4 motivational quotes** to get you started
- **Sample quests**: Daily water intake, reading, room cleaning
- **Sample war**: "Master React Development" 
- **Sample weapons**: Morning Routine, Deep Focus Mode
- **Sample titles**: Various achievement levels to unlock

## 🔄 Automatic Features

- **Quest Scheduling**: Repeating quests auto-generate for 30 days
- **Progress Tracking**: War progress updates automatically
- **Stat Bonuses**: Discipline increases with every completed quest
- **Level Progression**: Automatic leveling based on XP milestones
- **Data Persistence**: All changes save automatically

## 🎮 Gamification Elements

- **XP System**: Earn experience points for completing quests
- **Level Progression**: Character levels unlock as you gain XP
- **Stat Growth**: RPG-style character stats that improve over time
- **Achievement System**: Unlock titles for major milestones
- **Progress Visualization**: Visual progress bars and indicators
- **Rarity System**: Color-coded title rarities for accomplishments

## 🛠 Customization

The app is designed for maximum flexibility:
- **Optional Fields**: Most form fields are optional for quick entry
- **Editable Everything**: Edit any quest, war, weapon, or quote anytime
- **Flexible Categories**: Choose from various quest categories
- **Custom XP**: Set manual XP values for special achievements
- **Personal Quotes**: Add your own motivational messages

## 📋 Future Enhancement Ideas

- Cloud sync across devices
- Social features and sharing
- More detailed analytics
- Goal templates and presets
- Notification system
- Import/export functionality
- Achievement sound effects
- Dark/light theme toggle

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the Life RPG App!

## 📄 License

This project is open source and available under the MIT License.

---

**Start your productivity adventure today!** Transform your goals into quests and level up your life! 🚀✨
