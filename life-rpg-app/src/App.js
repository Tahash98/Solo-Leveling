import React, { useState, useEffect } from 'react';
import './App.css';

// Utility Functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Sample Data
const initialQuotes = [
  { id: '1', text: "Discipline is the bridge between goals and accomplishment." },
  { id: '2', text: "A little progress each day adds up to big results." },
  { id: '3', text: "Courage is not the absence of fear, but the triumph over it." },
  { id: '4', text: "Focus on the process, not the outcome." }
];

const initialTitles = [
  { id: '1', name: "Seeker of Discipline", icon: "🏹", rarity: "common", description: "Complete 10 Daily Quests", unlocked: true, requirement: { type: "dailyQuests", count: 10 } },
  { id: '2', name: "Keeper of the Three-Day Cycle", icon: "🔄", rarity: "rare", description: "Maintain 3 Circle quests for 2 weeks", unlocked: false, requirement: { type: "threeDayCycle", count: 14 } },
  { id: '3', name: "Master of Consistency", icon: "⏳", rarity: "epic", description: "30 Daily Quests in a row", unlocked: true, requirement: { type: "streak", count: 30 } },
  { id: '4', name: "Grand Hero of Progress", icon: "👑", rarity: "legendary", description: "Level 50 + 5 Wars", unlocked: false, requirement: { type: "levelAndWars", level: 50, wars: 5 } }
];

const initialWeapons = [
  { id: '1', name: "Morning Routine", type: "ability", description: "Improves daily productivity", strengths: "Great for starting the day", weaknesses: "Requires consistency", bestUse: "Every morning", obtained: true },
  { id: '2', name: "Deep Focus Mode", type: "skill", description: "Enhanced concentration ability", strengths: "Eliminates distractions", weaknesses: "Energy intensive", bestUse: "Complex tasks", obtained: false }
];

const generateRepeatingQuests = (quest, startDate = new Date()) => {
  const quests = [];
  const repeatDays = quest.repeatCycle === 'daily' ? 1 : quest.repeatCycle === '3days' ? 3 : 7;
  
  for (let i = 0; i < 30; i++) {
    const questDate = addDays(startDate, i * repeatDays);
    quests.push({
      ...quest,
      id: generateId(),
      date: formatDate(questDate),
      completed: false
    });
  }
  return quests;
};

const initialQuests = [
  { id: generateId(), title: "Drink 2L of water", category: "daily", difficulty: "easy", xp: 5, stat: "health", repeatCycle: "daily", date: formatDate(new Date()), completed: false },
  { id: generateId(), title: "Read 10 pages of a book", category: "3days", difficulty: "medium", xp: 10, stat: "brain", repeatCycle: "3days", date: formatDate(new Date()), completed: false },
  { id: generateId(), title: "Clean the entire room", category: "weekly", difficulty: "hard", xp: 15, stat: "discipline", repeatCycle: "weekly", date: formatDate(addDays(new Date(), 1)), completed: false }
];

const initialWars = [
  {
    id: '1',
    title: "Master React Development",
    description: "Become proficient in React development",
    quests: [
      { id: generateId(), title: "Learn React Basics", completed: false },
      { id: generateId(), title: "Build a small project", completed: false }
    ],
    progress: 0,
    completed: false,
    rewardTitle: "Web Knight",
    weaponsNeeded: ["JavaScript Mastery", "Time Management Skill"],
    strategy: "Focus on practical projects"
  }
];

function App() {
  // State Management
  const [currentTab, setCurrentTab] = useState('home');
  const [quests, setQuests] = useState([]);
  const [wars, setWars] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [titles, setTitles] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    xp: 0,
    health: 10,
    brain: 10,
    discipline: 10,
    social: 10,
    combat: 10,
    wealth: 10,
    wisdom: 10
  });
  
  // Modal States
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showWarModal, setShowWarModal] = useState(false);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('lifeRpgData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setQuests(data.quests || []);
      setWars(data.wars || initialWars);
      setWeapons(data.weapons || initialWeapons);
      setQuotes(data.quotes || initialQuotes);
      setTitles(data.titles || initialTitles);
      setPlayerStats(data.playerStats || {
        level: 1,
        xp: 0,
        health: 10,
        brain: 10,
        discipline: 10,
        social: 10,
        combat: 10,
        wealth: 10,
        wisdom: 10
      });
    } else {
      // Initialize with sample data
      const expandedQuests = [];
      initialQuests.forEach(quest => {
        if (quest.repeatCycle !== 'none') {
          expandedQuests.push(...generateRepeatingQuests(quest));
        } else {
          expandedQuests.push(quest);
        }
      });
      
      setQuests(expandedQuests);
      setWars(initialWars);
      setWeapons(initialWeapons);
      setQuotes(initialQuotes);
      setTitles(initialTitles);
    }
  }, []);
  
  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      quests,
      wars,
      weapons,
      quotes,
      titles,
      playerStats
    };
    localStorage.setItem('lifeRpgData', JSON.stringify(dataToSave));
  }, [quests, wars, weapons, quotes, titles, playerStats]);
  
  // Quest Functions
  const addQuest = (questData) => {
    const quest = {
      ...questData,
      id: generateId(),
      completed: false,
      date: questData.date || formatDate(new Date())
    };
    
    if (questData.repeatCycle && questData.repeatCycle !== 'none') {
      const repeatingQuests = generateRepeatingQuests(quest, new Date(quest.date));
      setQuests(prev => [...prev, ...repeatingQuests]);
    } else {
      setQuests(prev => [...prev, quest]);
    }
  };
  
  const completeQuest = (questId) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId) {
        const completedQuest = { ...quest, completed: true };
        
        // Add XP and update stats
        const xpGain = completedQuest.xp || 5;
        setPlayerStats(prevStats => {
          const newXP = prevStats.xp + xpGain;
          const newLevel = Math.floor(newXP / 100) + 1;
          const leveledUp = newLevel > prevStats.level;
          
          const updatedStats = {
            ...prevStats,
            xp: newXP,
            level: newLevel,
            discipline: prevStats.discipline + 0.5 // Discipline bonus for completing any quest
          };
          
          // Add stat-specific bonus
          if (completedQuest.stat && updatedStats[completedQuest.stat] !== undefined) {
            updatedStats[completedQuest.stat] += 1;
          }
          
          // Level up bonus
          if (leveledUp) {
            Object.keys(updatedStats).forEach(stat => {
              if (stat !== 'level' && stat !== 'xp') {
                updatedStats[stat] += 3;
              }
            });
          }
          
          return updatedStats;
        });
        
        return completedQuest;
      }
      return quest;
    }));
  };
  
  const editQuest = (questId, newData) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, ...newData } : quest
    ));
  };
  
  const deleteQuest = (questId) => {
    setQuests(prev => prev.filter(quest => quest.id !== questId));
  };
  
  // War Functions
  const addWar = (warData) => {
    const war = {
      ...warData,
      id: generateId(),
      progress: 0,
      completed: false,
      quests: warData.quests || []
    };
    setWars(prev => [...prev, war]);
  };
  
  const updateWarProgress = (warId) => {
    setWars(prev => prev.map(war => {
      if (war.id === warId) {
        const completedQuests = war.quests.filter(q => q.completed).length;
        const progress = war.quests.length > 0 ? (completedQuests / war.quests.length) * 100 : 0;
        const completed = progress === 100;
        
        return { ...war, progress, completed };
      }
      return war;
    }));
  };
  
  const addQuestToWar = (warId, questData) => {
    const quest = { ...questData, id: generateId(), completed: false };
    setWars(prev => prev.map(war =>
      war.id === warId ? { ...war, quests: [...war.quests, quest] } : war
    ));
  };
  
  // Weapon Functions
  const addWeapon = (weaponData) => {
    const weapon = { ...weaponData, id: generateId() };
    setWeapons(prev => [...prev, weapon]);
  };
  
  const toggleWeaponObtained = (weaponId) => {
    setWeapons(prev => prev.map(weapon =>
      weapon.id === weaponId ? { ...weapon, obtained: !weapon.obtained } : weapon
    ));
  };
  
  // Quote Functions
  const addQuote = (quoteData) => {
    const quote = { ...quoteData, id: generateId() };
    setQuotes(prev => [...prev, quote]);
  };
  
  const getRandomQuote = () => {
    if (quotes.length === 0) return "Welcome to your Life RPG journey!";
    return quotes[Math.floor(Math.random() * quotes.length)].text;
  };
  
  // Helper Functions
  const getTodayQuests = () => {
    const today = formatDate(new Date());
    return quests.filter(quest => quest.date === today);
  };
  
  const getEarnedTitles = () => {
    return titles.filter(title => title.unlocked);
  };
  
  // Render Functions
  const renderQuestModal = () => {
    if (!showQuestModal) return null;
    
    return (
      <QuestModal
        quest={editingItem}
        onSave={(questData) => {
          if (editingItem) {
            editQuest(editingItem.id, questData);
          } else {
            addQuest(questData);
          }
          setShowQuestModal(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setShowQuestModal(false);
          setEditingItem(null);
        }}
      />
    );
  };
  
  const renderWarModal = () => {
    if (!showWarModal) return null;
    
    return (
      <WarModal
        war={editingItem}
        weapons={weapons}
        onSave={(warData) => {
          if (editingItem) {
            setWars(prev => prev.map(war => 
              war.id === editingItem.id ? { ...war, ...warData } : war
            ));
          } else {
            addWar(warData);
          }
          setShowWarModal(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setShowWarModal(false);
          setEditingItem(null);
        }}
      />
    );
  };
  
  const renderWeaponModal = () => {
    if (!showWeaponModal) return null;
    
    return (
      <WeaponModal
        weapon={editingItem}
        onSave={(weaponData) => {
          if (editingItem) {
            setWeapons(prev => prev.map(weapon =>
              weapon.id === editingItem.id ? { ...weapon, ...weaponData } : weapon
            ));
          } else {
            addWeapon(weaponData);
          }
          setShowWeaponModal(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setShowWeaponModal(false);
          setEditingItem(null);
        }}
      />
    );
  };
  
  const renderQuoteModal = () => {
    if (!showQuoteModal) return null;
    
    return (
      <QuoteModal
        quote={editingItem}
        onSave={(quoteData) => {
          if (editingItem) {
            setQuotes(prev => prev.map(quote =>
              quote.id === editingItem.id ? { ...quote, ...quoteData } : quote
            ));
          } else {
            addQuote(quoteData);
          }
          setShowQuoteModal(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setShowQuoteModal(false);
          setEditingItem(null);
        }}
      />
    );
  };
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>🔴 Life RPG App</h1>
      </header>
      
      <div className="tab-content">
        {currentTab === 'home' && (
          <HomeTab
            randomQuote={getRandomQuote()}
            earnedTitles={getEarnedTitles()}
            todayQuests={getTodayQuests()}
            onAddQuest={() => setShowQuestModal(true)}
            onStartWar={() => setShowWarModal(true)}
            onCompleteQuest={completeQuest}
            onEditQuest={(quest) => {
              setEditingItem(quest);
              setShowQuestModal(true);
            }}
            onDeleteQuest={deleteQuest}
          />
        )}
        
        {currentTab === 'quests' && (
          <QuestsTab
            quests={quests}
            onCompleteQuest={completeQuest}
            onEditQuest={(quest) => {
              setEditingItem(quest);
              setShowQuestModal(true);
            }}
            onDeleteQuest={deleteQuest}
          />
        )}
        
        {currentTab === 'calendar' && (
          <CalendarTab
            quests={quests}
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onNavigateMonth={(direction) => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + direction);
              setCurrentDate(newDate);
            }}
          />
        )}
        
                 {currentTab === 'wars' && (
           <WarsTab
             wars={wars}
             onEditWar={(war) => {
               setEditingItem(war);
               setShowWarModal(true);
             }}
             onDeleteWar={(warId) => {
               setWars(prev => prev.filter(war => war.id !== warId));
             }}
             onAddQuestToWar={addQuestToWar}
             onUpdateWarProgress={updateWarProgress}
             onCompleteWarQuest={(warId, questId) => {
               setWars(prev => prev.map(war => {
                 if (war.id === warId) {
                   const updatedQuests = war.quests.map(q => 
                     q.id === questId ? { ...q, completed: true } : q
                   );
                   const completedQuests = updatedQuests.filter(q => q.completed).length;
                   const progress = updatedQuests.length > 0 ? (completedQuests / updatedQuests.length) * 100 : 0;
                   return { ...war, quests: updatedQuests, progress, completed: progress === 100 };
                 }
                 return war;
               }));
             }}
           />
         )}
        
        {currentTab === 'weapons' && (
          <WeaponsTab
            weapons={weapons}
            onToggleObtained={toggleWeaponObtained}
            onEditWeapon={(weapon) => {
              setEditingItem(weapon);
              setShowWeaponModal(true);
            }}
            onDeleteWeapon={(weaponId) => {
              setWeapons(prev => prev.filter(weapon => weapon.id !== weaponId));
            }}
          />
        )}
        
        {currentTab === 'titles' && (
          <TitlesTab titles={titles} />
        )}
        
        {currentTab === 'quotes' && (
          <QuotesTab
            quotes={quotes}
            onEditQuote={(quote) => {
              setEditingItem(quote);
              setShowQuoteModal(true);
            }}
            onDeleteQuote={(quoteId) => {
              setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
            }}
          />
        )}
        
        {currentTab === 'stats' && (
          <StatsTab playerStats={playerStats} />
        )}
      </div>
      
      {/* Add Buttons */}
      {currentTab === 'quests' && (
        <button className="add-button" onClick={() => setShowQuestModal(true)}>
          +
        </button>
      )}
      
      {currentTab === 'wars' && (
        <button className="add-button" onClick={() => setShowWarModal(true)}>
          +
        </button>
      )}
      
      {currentTab === 'weapons' && (
        <button className="add-button" onClick={() => setShowWeaponModal(true)}>
          +
        </button>
      )}
      
      {currentTab === 'quotes' && (
        <button className="add-button" onClick={() => setShowQuoteModal(true)}>
          +
        </button>
      )}
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'quests', icon: '📜', label: 'Quests' },
          { id: 'calendar', icon: '📅', label: 'Calendar' },
          { id: 'wars', icon: '⚔️', label: 'Wars' },
          { id: 'weapons', icon: '🗡', label: 'Weapons' },
          { id: 'titles', icon: '👑', label: 'Titles' },
          { id: 'quotes', icon: '💬', label: 'Quotes' },
          { id: 'stats', icon: '📊', label: 'Stats' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <div className="nav-icon">{tab.icon}</div>
            <div>{tab.label}</div>
          </button>
        ))}
      </nav>
      
      {/* Modals */}
      {renderQuestModal()}
      {renderWarModal()}
      {renderWeaponModal()}
      {renderQuoteModal()}
    </div>
  );
}

// Component Definitions
const HomeTab = ({ randomQuote, earnedTitles, todayQuests, onAddQuest, onStartWar, onCompleteQuest, onEditQuest, onDeleteQuest }) => (
  <div className="home-container fade-in">
    <div className="quote-section">
      <h3>🗨️ Quote of the Day</h3>
      <p className="quote-text">"{randomQuote}"</p>
    </div>
    
    <div className="titles-section">
      <h3>🎖️ Earned Titles</h3>
      <div className="earned-titles">
        {earnedTitles.length > 0 ? earnedTitles.map(title => (
          <div key={title.id} className={`title-badge title-${title.rarity}`}>
            {title.name} {title.icon}
          </div>
        )) : (
          <p>No titles earned yet. Complete quests to unlock titles!</p>
        )}
      </div>
    </div>
    
    <div className="quick-actions">
      <button className="action-button" onClick={onAddQuest}>
        + Add Quest
      </button>
      <button className="action-button" onClick={onStartWar}>
        + Start New War
      </button>
    </div>
    
    <div className="today-quests">
      <h3>📅 Today's Quests</h3>
      <div className="quest-list">
        {todayQuests.length > 0 ? todayQuests.map(quest => (
          <QuestItem
            key={quest.id}
            quest={quest}
            onComplete={onCompleteQuest}
            onEdit={onEditQuest}
            onDelete={onDeleteQuest}
          />
        )) : (
          <p>No quests for today. Add some quests to get started!</p>
        )}
      </div>
    </div>
  </div>
);

const QuestItem = ({ quest, onComplete, onEdit, onDelete }) => (
  <div className={`quest-item ${quest.completed ? 'completed' : ''}`}>
    <div className="quest-content">
      <div className="quest-title">{quest.title}</div>
      <div className="quest-details">
        <span>Category: {quest.category}</span>
        <span>Difficulty: {quest.difficulty}</span>
        <span>XP: {quest.xp}</span>
        <span>Stat: {quest.stat}</span>
      </div>
    </div>
    <div className="quest-actions">
      {!quest.completed && (
        <button className="btn-complete" onClick={() => onComplete(quest.id)}>
          Complete
        </button>
      )}
      <button className="btn-edit" onClick={() => onEdit(quest)}>
        Edit
      </button>
      <button className="btn-delete" onClick={() => onDelete(quest.id)}>
        Delete
      </button>
    </div>
  </div>
);

const QuestsTab = ({ quests, onCompleteQuest, onEditQuest, onDeleteQuest }) => {
  const categories = ['daily', 'weekly', '3days', 'side', 'war'];
  
  return (
    <div className="fade-in">
      {categories.map(category => {
        const categoryQuests = quests.filter(quest => quest.category === category);
        if (categoryQuests.length === 0) return null;
        
        return (
          <div key={category} className="category-section">
            <div className="category-header">
              {category.charAt(0).toUpperCase() + category.slice(1)} Quests
            </div>
            <div className="quest-list">
              {categoryQuests.map(quest => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onComplete={onCompleteQuest}
                  onEdit={onEditQuest}
                  onDelete={onDeleteQuest}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CalendarTab = ({ quests, currentDate, selectedDate, onDateSelect, onNavigateMonth }) => {
  const today = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  
  const getQuestsForDate = (date) => {
    const dateStr = formatDate(date);
    return quests.filter(quest => quest.date === dateStr);
  };
  
  return (
    <div className="calendar-container fade-in">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={() => onNavigateMonth(-1)}>
          ←
        </button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button className="calendar-nav" onClick={() => onNavigateMonth(1)}>
          →
        </button>
      </div>
      
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const dayQuests = getQuestsForDate(day);
          const isToday = formatDate(day) === formatDate(today);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          
          return (
            <div
              key={day.toString()}
              className={`calendar-day ${isToday ? 'today' : ''} ${dayQuests.length > 0 ? 'has-quests' : ''}`}
              style={{ opacity: isCurrentMonth ? 1 : 0.3 }}
              onClick={() => onDateSelect(day)}
            >
              <div className="day-number">{day.getDate()}</div>
              <div className="quest-dots">
                {dayQuests.slice(0, 3).map((_, index) => (
                  <div key={index} className="quest-dot" />
                ))}
                {dayQuests.length > 3 && <div style={{ fontSize: '10px' }}>+{dayQuests.length - 3}</div>}
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedDate && (
        <div className="mt-20">
          <h3>Quests for {selectedDate.toDateString()}</h3>
          <div className="quest-list">
            {getQuestsForDate(selectedDate).map(quest => (
              <div key={quest.id} className="quest-item">
                <div className="quest-content">
                  <div className="quest-title">{quest.title}</div>
                  <div className="quest-details">
                    <span>Category: {quest.category}</span>
                    <span>Status: {quest.completed ? 'Completed' : 'Pending'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WarsTab = ({ wars, onEditWar, onDeleteWar, onAddQuestToWar, onUpdateWarProgress, onCompleteWarQuest }) => (
  <div className="fade-in">
    {wars.length > 0 ? wars.map(war => (
      <div key={war.id} className="war-item">
        <div className="war-header">
          <div className="war-title">{war.title}</div>
          <div className="quest-actions">
            <button className="btn-edit" onClick={() => onEditWar(war)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => onDeleteWar(war.id)}>
              Delete
            </button>
          </div>
        </div>
        
        {war.description && <p>{war.description}</p>}
        
        <div className="war-progress">
          <div 
            className="war-progress-bar" 
            style={{ width: `${war.progress}%` }}
          />
        </div>
        <p>Progress: {Math.round(war.progress)}%</p>
        
        {war.quests.length > 0 && (
          <div className="war-quests">
            <h4>War Quests:</h4>
            {war.quests.map(quest => (
              <div key={quest.id} className="war-quest-item">
                <span style={{ textDecoration: quest.completed ? 'line-through' : 'none' }}>
                  {quest.title}
                </span>
                                 {!quest.completed && (
                   <button 
                     className="btn-complete"
                     onClick={() => onCompleteWarQuest(war.id, quest.id)}
                   >
                     Complete
                   </button>
                 )}
              </div>
            ))}
          </div>
        )}
        
        {war.weaponsNeeded && war.weaponsNeeded.length > 0 && (
          <div className="mt-15">
            <h4>Weapons Needed:</h4>
            <p>{war.weaponsNeeded.join(', ')}</p>
          </div>
        )}
        
        {war.completed && war.rewardTitle && (
          <div className="mt-15">
            <h4 style={{ color: '#ff2b2b' }}>🏆 Reward Title: {war.rewardTitle}</h4>
          </div>
        )}
      </div>
    )) : (
      <div className="empty-state">
        <div className="empty-state-icon">⚔️</div>
        <p>No wars yet. Start your first war!</p>
      </div>
    )}
  </div>
);

const WeaponsTab = ({ weapons, onToggleObtained, onEditWeapon, onDeleteWeapon }) => (
  <div className="fade-in">
    {weapons.length > 0 ? weapons.map(weapon => (
      <div key={weapon.id} className={`weapon-item ${!weapon.obtained ? 'not-obtained' : ''}`}>
        <div className="weapon-header">
          <div className="weapon-name">{weapon.name}</div>
          <div className="weapon-type-container">
            <span className={`weapon-type ${weapon.type}`}>
              {weapon.type === 'skill' ? '🎯' : weapon.type === 'ability' ? '⚡' : '🔧'} {weapon.type}
            </span>
          </div>
        </div>
        
        {weapon.description && <p>{weapon.description}</p>}
        
        <div className="quest-actions mt-10">
          <button 
            className={weapon.obtained ? 'btn-complete' : 'btn-edit'}
            onClick={() => onToggleObtained(weapon.id)}
          >
            {weapon.obtained ? '✅ Obtained' : '⏳ Mark Obtained'}
          </button>
          <button className="btn-edit" onClick={() => onEditWeapon(weapon)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDeleteWeapon(weapon.id)}>
            Delete
          </button>
        </div>
      </div>
    )) : (
      <div className="empty-state">
        <div className="empty-state-icon">🗡</div>
        <p>No weapons yet. Add your first weapon!</p>
      </div>
    )}
  </div>
);

const TitlesTab = ({ titles }) => (
  <div className="fade-in">
    {titles.map(title => (
      <div key={title.id} className="weapon-item">
        <div className="weapon-header">
          <div className="weapon-name">
            {title.unlocked ? '✅' : '🔒'} {title.name} {title.icon}
          </div>
          <div className={`title-badge title-${title.rarity}`}>
            {title.rarity}
          </div>
        </div>
        <p>{title.description}</p>
        {!title.unlocked && (
          <p style={{ color: '#aaa', fontSize: '14px' }}>
            Requirement: {title.requirement.type === 'dailyQuests' ? `Complete ${title.requirement.count} daily quests` :
                         title.requirement.type === 'threeDayCycle' ? `Maintain 3-day cycle for ${title.requirement.count} days` :
                         title.requirement.type === 'streak' ? `${title.requirement.count} quest streak` :
                         `Level ${title.requirement.level} + ${title.requirement.wars} wars`}
          </p>
        )}
      </div>
    ))}
  </div>
);

const QuotesTab = ({ quotes, onEditQuote, onDeleteQuote }) => (
  <div className="fade-in">
    {quotes.length > 0 ? quotes.map(quote => (
      <div key={quote.id} className="weapon-item">
        <p style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: '1.5' }}>
          "{quote.text}"
        </p>
        <div className="quest-actions mt-10">
          <button className="btn-edit" onClick={() => onEditQuote(quote)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDeleteQuote(quote.id)}>
            Delete
          </button>
        </div>
      </div>
    )) : (
      <div className="empty-state">
        <div className="empty-state-icon">💬</div>
        <p>No quotes yet. Add your first motivational quote!</p>
      </div>
    )}
  </div>
);

const StatsTab = ({ playerStats }) => {
  const xpProgress = (playerStats.xp % 100) / 100 * 100;
  
  const stats = [
    { key: 'health', icon: '❤️', name: 'Health' },
    { key: 'brain', icon: '🧠', name: 'Brain' },
    { key: 'discipline', icon: '🏹', name: 'Discipline' },
    { key: 'social', icon: '🗣', name: 'Social' },
    { key: 'combat', icon: '⚔️', name: 'Combat' },
    { key: 'wealth', icon: '💰', name: 'Wealth' },
    { key: 'wisdom', icon: '✨', name: 'Wisdom' }
  ];
  
  return (
    <div className="stats-container fade-in">
      <div className="level-section">
        <div className="level-display">Level {playerStats.level}</div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="xp-text">
          {playerStats.xp % 100} / 100 XP to next level
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.key} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-name">{stat.name}</div>
            <div className="stat-value">{Math.round(playerStats[stat.key])}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Modal Components
const QuestModal = ({ quest, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: quest?.title || '',
    category: quest?.category || 'daily',
    difficulty: quest?.difficulty || 'easy',
    manualXP: quest?.manualXP || '',
    stat: quest?.stat || 'discipline',
    repeatCycle: quest?.repeatCycle || 'none',
    date: quest?.date || formatDate(new Date())
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    const questData = {
      ...formData,
      xp: formData.difficulty === 'special' ? parseInt(formData.manualXP) || 5 : 
          { easy: 5, medium: 10, hard: 15, badass: 20 }[formData.difficulty]
    };
    
    onSave(questData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal slide-up">
        <h2>{quest ? 'Edit Quest' : 'Add New Quest'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="3days">3 Days Circle</option>
              <option value="side">Side Quest</option>
              <option value="war">War Quest</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="easy">Easy (5 XP)</option>
              <option value="medium">Medium (10 XP)</option>
              <option value="hard">Hard (15 XP)</option>
              <option value="badass">Badass (20 XP)</option>
              <option value="special">Special (Manual XP)</option>
            </select>
          </div>
          
          {formData.difficulty === 'special' && (
            <div className="form-group">
              <label>Manual XP</label>
              <input
                type="number"
                value={formData.manualXP}
                onChange={(e) => setFormData({...formData, manualXP: e.target.value})}
                min="1"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Stat Affected</label>
            <select
              value={formData.stat}
              onChange={(e) => setFormData({...formData, stat: e.target.value})}
            >
              <option value="health">❤️ Health</option>
              <option value="brain">🧠 Brain</option>
              <option value="discipline">🏹 Discipline</option>
              <option value="social">🗣 Social</option>
              <option value="combat">⚔️ Combat</option>
              <option value="wealth">💰 Wealth</option>
              <option value="wisdom">✨ Wisdom</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Repeat Cycle</label>
            <select
              value={formData.repeatCycle}
              onChange={(e) => setFormData({...formData, repeatCycle: e.target.value})}
            >
              <option value="none">No Repeat</option>
              <option value="daily">Daily</option>
              <option value="3days">3 Days Circle</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WarModal = ({ war, weapons, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: war?.title || '',
    description: war?.description || '',
    rewardTitle: war?.rewardTitle || '',
    strategy: war?.strategy || '',
    weaponsNeeded: war?.weaponsNeeded || []
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal slide-up">
        <h2>{war ? 'Edit War' : 'Start New War'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>War Name *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Reward Title</label>
            <input
              type="text"
              value={formData.rewardTitle}
              onChange={(e) => setFormData({...formData, rewardTitle: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Strategy</label>
            <textarea
              value={formData.strategy}
              onChange={(e) => setFormData({...formData, strategy: e.target.value})}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WeaponModal = ({ weapon, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: weapon?.name || '',
    type: weapon?.type || 'skill',
    description: weapon?.description || '',
    strengths: weapon?.strengths || '',
    weaknesses: weapon?.weaknesses || '',
    bestUse: weapon?.bestUse || '',
    obtained: weapon?.obtained || false
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal slide-up">
        <h2>{weapon ? 'Edit Weapon' : 'Add New Weapon'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Weapon Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="skill">🎯 Skill</option>
              <option value="ability">⚡ Ability</option>
              <option value="matter">🔧 Matter</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Strengths</label>
            <textarea
              value={formData.strengths}
              onChange={(e) => setFormData({...formData, strengths: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Weaknesses</label>
            <textarea
              value={formData.weaknesses}
              onChange={(e) => setFormData({...formData, weaknesses: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Best Use</label>
            <textarea
              value={formData.bestUse}
              onChange={(e) => setFormData({...formData, bestUse: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.obtained}
                onChange={(e) => setFormData({...formData, obtained: e.target.checked})}
              />
              Obtained
            </label>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuoteModal = ({ quote, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    text: quote?.text || ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal slide-up">
        <h2>{quote ? 'Edit Quote' : 'Add New Quote'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quote Text *</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              required
              placeholder="Enter your motivational quote..."
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
