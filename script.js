/**
 * Barbie Comfort Chatbot - Complete Working Version
 * With crisis detection and sympathetic responses
 */

// ===== LOCAL STORAGE KEYS =====
const STORAGE_KEYS = {
  LAST_PERIOD: 'barbie_lastPeriod',
  CYCLE_LENGTH: 'barbie_cycleLength',
  HEALTH_NOTE: 'barbie_healthNote',
  CHAT_HISTORY: 'barbie_chatHistory'
};

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
  console.log('🌸 Initializing Barbie Comfort Chatbot...');
  initializeChatbot();
});

function initializeChatbot() {
  
  // ===== GET ALL DOM ELEMENTS =====
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendMsgBtn');
  const lastPeriodInput = document.getElementById('lastPeriodDate');
  const cycleLengthInput = document.getElementById('cycleLength');
  const savePeriodBtn = document.getElementById('savePeriodBtn');
  const clearPeriodBtn = document.getElementById('clearPeriodBtn');
  const nextPeriodDisplay = document.getElementById('nextPeriodDisplay');
  const healthNoteInput = document.getElementById('healthNoteInput');
  const saveNoteBtn = document.getElementById('saveNoteBtn');
  const loadNoteBtn = document.getElementById('loadNoteBtn');
  const savedNoteDisplay = document.getElementById('savedNoteDisplay');
  const moodBtns = document.querySelectorAll('.mood-btn');
  const moodMessageDiv = document.getElementById('moodMessage');
  const affirmationDisplay = document.getElementById('affirmationDisplay');
  const newAffirmationBtn = document.getElementById('newAffirmationBtn');

  // Check if critical elements exist
  if (!chatMessages || !userInput || !sendBtn) {
    console.error('❌ Critical elements not found');
    return;
  }

  // ===== HELPER FUNCTIONS =====
  function addBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot-msg');
    msgDiv.innerHTML = `<i class="fas fa-heart" style="margin-right: 8px; color: #FF9EB5;"></i>${text}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'user-msg');
    msgDiv.innerHTML = `${text}<i class="fas fa-smile" style="margin-left: 8px;"></i>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ===== CRISIS DETECTION AND RESPONSE =====
  
  // Comprehensive list of crisis keywords and phrases
  const crisisKeywords = [
    // Direct suicide statements
    'kill myself', 'kill me', 'end my life', 'end it all', 'commit suicide',
    'take my own life', 'take my life', 'suicide', 'want to die',
    'wish i was dead', 'better off dead', 'ready to die', 'going to die',
    
    // Hopelessness
    'no reason to live', 'nothing to live for', 'what\'s the point',
    'no way out', 'can\'t go on', 'can\'t do this anymore',
    'too tired to go on', 'don\'t want to wake up', 'hope is gone',
    'never get better', 'always be this way',
    
    // Being a burden
    'everyone would be better off', 'better without me', 'no one would miss me',
    'burden to everyone', 'only cause problems', 'world would be better',
    
    // Giving up
    'give up', 'giving up', 'done fighting', 'stop struggling',
    'i quit', 'i surrender',
    
    // Overwhelming pain
    'pain is too much', 'suffering too much', 'can\'t take the pain',
    'hurt so bad', 'emotional pain', 'unbearable pain',
    
    // Wanting to disappear
    'want to disappear', 'wish i could vanish', 'want to escape',
    'wish i wasn\'t here', 'don\'t want to exist',
    
    // Feeling trapped
    'trapped', 'no escape', 'no way forward', 'no options left',
    'stuck', 'out of options',
    
    // Finality
    'saying goodbye', 'this is the end', 'last time', 'final goodbye'
  ];

  // Check if message contains crisis content
  function isCrisisMessage(message) {
    const lower = message.toLowerCase().trim();
    
    for (let phrase of crisisKeywords) {
      if (lower.includes(phrase)) {
        console.log('⚠️ Crisis detected');
        return true;
      }
    }
    return false;
  }

  // Get sympathetic crisis response
  function getCrisisResponse() {
    const responses = [
      "I'm so deeply sorry you're feeling this way. Thank you for telling me. You're not alone in this moment, and there are people who truly want to help. Please reach out:\n\n" +
      "🌺 **988 Suicide & Crisis Lifeline**: Call or text 988\n" +
      "🌺 **Crisis Text Line**: Text HOME to 741741\n" +
      "🌺 **Emergency**: Call 911 if you're in immediate danger\n\n" +
      "You matter. Your life matters. Please talk to someone who can be there right now. I'm holding you in my thoughts. 🤍",
      
      "I hear your pain, and it's real. You don't have to carry this alone. Right now, the most important thing is connecting you with people who can help:\n\n" +
      "📞 **988 Lifeline**: Call or text 988\n" +
      "💬 **Crisis Text Line**: Text HOME to 741741\n" +
      "🚑 **Emergency**: 911 if you need immediate help\n\n" +
      "Please reach out. You deserve support. I'm here with you. 🌸"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ===== NORMAL RESPONSES =====
  
  function getNormalResponse(message) {
    const lower = message.toLowerCase().trim();
    
    // Greetings
    if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
      return "Hi sweet one. I'm so glad you're here. How are you feeling today? 💕";
    }
    
    // How are you
    if (lower.includes('how are you')) {
      return "I'm here with you, and that's what matters. How are YOU doing right now? 🌸";
    }
    
    // Thank you
    if (lower.includes('thank')) {
      return "You're so welcome, lovely. I'm always here for you. 🤍";
    }
    
    // Period-related
    if (lower.includes('period') || lower.includes('cramp') || lower.includes('cycle')) {
      if (lower.includes('cramp') || lower.includes('pain') || lower.includes('hurt')) {
        return "Those cramps can be really tough, sweet one. Be gentle with yourself - warmth, rest, and kindness help. If the pain feels too much, it's okay to check with your doctor. I'm here with you. 🌸";
      }
      return "Our cycles affect us in so many ways - physically and emotionally. Whatever you're experiencing right now is valid. How are you feeling? 💕";
    }
    
    // Tired/exhausted
    if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('drained')) {
      return "That tiredness - it's real. You've been giving so much. Rest isn't something you earn, it's something you deserve. Can you give yourself permission to pause? I'll be here. 🤍";
    }
    
    // Sadness
    if (lower.includes('sad') || lower.includes('down') || lower.includes('crying')) {
      return "I hear that sadness, and it's okay to feel it. You don't have to be okay all the time. I'm right here with you in this moment. Would you like to talk about it? 🌸";
    }
    
    // Anxiety
    if (lower.includes('anxious') || lower.includes('worried') || lower.includes('scared') || lower.includes('nervous')) {
      return "Anxiety is so hard to carry. Let's breathe together for a moment. In... and out... You're safe right now, in this moment. I'm here with you. 💕";
    }
    
    // Happiness
    if (lower.includes('happy') || lower.includes('good day') || lower.includes('great')) {
      return "Oh, I love that you're feeling this! Tell me more - what's bringing you joy? You deserve these moments. ✨";
    }
    
    // Loneliness
    if (lower.includes('alone') || lower.includes('lonely') || lower.includes('by myself')) {
      return "Loneliness can feel so heavy. But right now, in this moment, you're not alone - I'm here with you. What's on your heart? 🤍";
    }
    
    // Anger
    if (lower.includes('angry') || lower.includes('mad') || lower.includes('frustrated')) {
      return "Your anger is valid. Sometimes anger is what's left when we're hurting. Take a breath with me. I'm here to listen, not to judge. 🌸";
    }
    
    // Stress
    if (lower.includes('stress') || lower.includes('overwhelmed')) {
      return "Stress can make everything feel heavier. You don't have to solve everything right now. Just this moment, just breathing. I'm here with you. 💕";
    }
    
    // Confusion
    if (lower.includes('confused') || lower.includes('don\'t understand')) {
      return "It's okay to be confused. You don't need to have all the answers right now. What part feels most unclear? I'm here to listen. 🤍";
    }
    
    // Questions
    if (message.includes('?')) {
      return "That's a thoughtful question. Tell me a bit more about what's on your mind - I want to understand. 🌸";
    }
    
    // Default warm responses
    const defaultResponses = [
      "I'm listening, really listening. You matter here. Would you like to tell me more? 💕",
      "Thank you for sharing that with me. How are you feeling in this moment? 🤍",
      "I'm here with you, holding space for whatever you need to share. You're not alone. 🌸",
      "That's completely valid, sweet one. I'm here and I care about what you're going through. 💕"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // ===== MAIN CHAT HANDLER =====
  function handleChatSend() {
    const msg = userInput.value.trim();
    if (msg === '') return;
    
    // Add user message to chat
    addUserMessage(msg);
    
    // Clear input
    userInput.value = '';
    
    // Check for crisis FIRST
    if (isCrisisMessage(msg)) {
      console.log('🚨 Crisis detected - sending sympathetic response');
      const crisisResponse = getCrisisResponse();
      addBotMessage(crisisResponse);
      return;
    }
    
    // If not crisis, send normal response
    const normalResponse = getNormalResponse(msg);
    addBotMessage(normalResponse);
  }

  // ===== ATTACH EVENT LISTENERS =====
  sendBtn.addEventListener('click', function(e) {
    e.preventDefault();
    handleChatSend();
  });

  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChatSend();
    }
  });

  // ===== PERIOD TRACKER =====
  if (savePeriodBtn && lastPeriodInput && cycleLengthInput && nextPeriodDisplay) {
    
    function updateNextPeriodDisplay() {
      const lastDateStr = lastPeriodInput.value;
      const cycle = parseInt(cycleLengthInput.value, 10);
      
      if (!lastDateStr || isNaN(cycle) || cycle < 20) {
        nextPeriodDisplay.innerHTML = '<i class="fas fa-sparkles"></i> enter your dates, and i\'ll help you track, lovely';
        return;
      }
      
      const lastDate = new Date(lastDateStr);
      if (isNaN(lastDate.getTime())) {
        nextPeriodDisplay.innerHTML = '<i class="fas fa-sparkles"></i> hmm, that date needs another look, sweet one';
        return;
      }
      
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + cycle);
      
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      nextPeriodDisplay.innerHTML = `<i class="fas fa-calendar-check"></i> your next period may arrive around: ${nextDate.toLocaleDateString(undefined, options)}`;
    }

    function savePeriodToStorage() {
      const lastDate = lastPeriodInput.value;
      const cycle = cycleLengthInput.value;
      
      if (lastDate) localStorage.setItem(STORAGE_KEYS.LAST_PERIOD, lastDate);
      if (cycle) localStorage.setItem(STORAGE_KEYS.CYCLE_LENGTH, cycle);
      
      updateNextPeriodDisplay();
      addBotMessage("I've saved your cycle info, lovely. Remember, this is just an estimate - our bodies have their own beautiful rhythm. I'm here to support you. 💕");
    }

    savePeriodBtn.addEventListener('click', savePeriodToStorage);
    
    if (clearPeriodBtn) {
      clearPeriodBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.LAST_PERIOD);
        localStorage.removeItem(STORAGE_KEYS.CYCLE_LENGTH);
        lastPeriodInput.value = '';
        cycleLengthInput.value = '28';
        nextPeriodDisplay.innerHTML = '<i class="fas fa-sparkles"></i> enter your dates, and i\'ll help you track, lovely';
        addBotMessage("Period data cleared. You can start fresh anytime, sweet one.");
      });
    }

    // Load saved period data
    const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_PERIOD);
    const savedCycle = localStorage.getItem(STORAGE_KEYS.CYCLE_LENGTH);
    if (savedDate) lastPeriodInput.value = savedDate;
    if (savedCycle) cycleLengthInput.value = savedCycle;
    updateNextPeriodDisplay();
  }

  // ===== HEALTH NOTES =====
  if (saveNoteBtn && healthNoteInput && savedNoteDisplay) {
    
    function saveHealthNote() {
      const note = healthNoteInput.value.trim();
      if (note === '') {
        alert("Write what's in your heart, lovely 💕");
        return;
      }
      
      localStorage.setItem(STORAGE_KEYS.HEALTH_NOTE, note);
      savedNoteDisplay.innerHTML = `<i class="fas fa-star"></i> ${note}`;
      healthNoteInput.value = '';
      addBotMessage("Your note is safely kept here. It's brave to write down how you're feeling. 🤍");
    }

    function loadHealthNote() {
      const note = localStorage.getItem(STORAGE_KEYS.HEALTH_NOTE);
      if (note) {
        savedNoteDisplay.innerHTML = `<i class="fas fa-star"></i> ${note}`;
        healthNoteInput.value = note;
        addBotMessage("Here's what you wrote before, beautiful. You can add more anytime.");
      } else {
        savedNoteDisplay.innerHTML = '<i class="fas fa-star"></i> no notes yet, sweet one';
        addBotMessage("You haven't saved any notes yet. Whenever you're ready to write, I'll be here.");
      }
    }

    saveNoteBtn.addEventListener('click', saveHealthNote);
    loadNoteBtn.addEventListener('click', loadHealthNote);

    const existingNote = localStorage.getItem(STORAGE_KEYS.HEALTH_NOTE);
    if (existingNote) savedNoteDisplay.innerHTML = `<i class="fas fa-star"></i> ${existingNote}`;
  }

  // ===== MOOD BUTTONS =====
  if (moodBtns.length > 0 && moodMessageDiv) {
    const moodReplies = {
      happy: "Oh, I love that you're feeling happy! Let's hold onto this moment. What's one thing making you feel this way? ✨",
      sad: "I'm right here with you in this sadness. It's okay to not be okay. Would it help to talk about it? 🤍",
      angry: "Your anger is valid. Take a breath with me - you're safe to feel this here. I'm listening. 💕",
      stressed: "Stress can be so heavy. Let's pause for one breath together. You're doing the best you can. 🌸"
    };
    
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        const reply = moodReplies[mood] || "Thank you for sharing your mood with me. I'm here with you. 💕";
        moodMessageDiv.innerHTML = `<i class="fas fa-heart" style="color: #FF9EB5;"></i> ${reply}`;
        addBotMessage(reply);
      });
    });
  }

  // ===== AFFIRMATIONS =====
  if (affirmationDisplay && newAffirmationBtn) {
    const affirmations = [
      "You are enough, exactly as you are right now.",
      "Your feelings are valid, and you deserve to feel them safely.",
      "You are worthy of love, rest, and gentleness - especially from yourself.",
      "Your body carries you through so much. Thank her today.",
      "You don't have to be perfect to be loved. You already are.",
      "It's okay to rest. It's okay to ask for help. It's okay to be you.",
      "You are stronger than you know, softer than you think, and braver than you believe.",
      "This moment is yours. Breathe into it gently.",
      "You are not alone. I'm right here with you.",
      "Your heart matters. Your voice matters. You matter."
    ];

    function setRandomAffirmation() {
      const randomIdx = Math.floor(Math.random() * affirmations.length);
      affirmationDisplay.textContent = affirmations[randomIdx];
    }

    newAffirmationBtn.addEventListener('click', setRandomAffirmation);
    setRandomAffirmation();
  }

  console.log('✅ Barbie Comfort Chatbot is fully loaded and ready');
}