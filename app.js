const API_KEY = "AIzaSyDRaVJAIzdpuvms242NBB9ZX3aycYLsxVw"; 
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; 

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Theme switching functionality
const themeSwitcher = document.getElementById('theme-switcher');
let currentTheme = 1;

themeSwitcher.addEventListener('click', () => {
    currentTheme = (currentTheme % 7) + 1;
    document.body.setAttribute('data-theme', `theme${currentTheme}`);
    
    // Animate the button
    themeSwitcher.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeSwitcher.style.transform = 'rotate(0deg)';
    }, 300);
});

// Function to detect if text is in Hindi or Hinglish
function isHindiOrHinglish(text) {
    const hindiRegex = /[\u0900-\u097F]/;
    const hinglishRegex = /(hai|ka|ki|ke|ko|me|se|ne|kaun|kya|kahan|kab|kyun|kaise|kitna|kuch|bahut|bhi|nahi|nahin|na|hi|to|bhi|aur|ya|ye|wo|us|un|in|is|itne|itni|itna|aap|tum|tu|main|hum|sab|kuch|kuchh|kya|kyun|kaise|kahan|kab|kitna|kuch|bahut|bhi|nahi|nahin|na|hi|to|bhi|aur|ya|ye|wo|us|un|in|is|itne|itni|itna|aap|tum|tu|main|hum|sab)/i;
    return hindiRegex.test(text) || hinglishRegex.test(text);
}

const ENERGY_PROMPT = `You are an energy consumption assistant designed to provide guidance on energy efficiency, renewable energy, and cost-saving measures. Your purpose is to help users reduce their energy consumption and environmental impact.

Behavior Rules:

If the user asks about energy consumption, efficiency, renewable energy, or related topics, provide detailed information about:
- Energy-saving tips for home and office
- Appliance energy efficiency ratings
- Renewable energy options (solar, wind, etc.)
- Electricity cost calculations
- Carbon footprint reduction
- Smart home energy solutions
- Government incentives and rebates
- Energy monitoring tools

Format your responses with:
1. Use emojis at the start of each main point
2. Use bold text for important terms using **text**
3. Use bullet points for lists
4. Add line breaks between sections
5. Use relevant emojis for different topics:
   - 💡 for energy-saving tips
   - ⚡ for electricity and power
   - 🌞 for solar energy
   - 🌬️ for wind energy
   - 💰 for cost savings
   - 🌍 for environmental impact
   - 📊 for calculations and data
   - 🏠 for home energy solutions

If the user asks anything unrelated to energy consumption, politely respond:
"I am an energy consumption assistant and I can only help with energy-related concerns."

If the user asks who created you, respond:
"I was created by Ashish, Siddharth and Rithik."

Be informative, professional, and encouraging in your tone. Keep your responses clear, concise, and practical.`;

const HINGLISH_ENERGY_PROMPT = `You are an energy consumption assistant designed to provide guidance on energy efficiency, renewable energy, and cost-saving measures. Your purpose is to help users reduce their energy consumption and environmental impact.

IMPORTANT: The user is asking in Hinglish (mix of Hindi and English). Please understand their Hinglish query and respond in English.

Behavior Rules:

If the user asks about energy consumption, efficiency, renewable energy, or related topics, provide detailed information about:
- Energy-saving tips for home and office
- Appliance energy efficiency ratings
- Renewable energy options (solar, wind, etc.)
- Electricity cost calculations
- Carbon footprint reduction
- Smart home energy solutions
- Government incentives and rebates
- Energy monitoring tools

Format your responses with:
1. Use emojis at the start of each main point
2. Use bold text for important terms using **text**
3. Use bullet points for lists
4. Add line breaks between sections
5. Use relevant emojis for different topics:
   - 💡 for energy-saving tips
   - ⚡ for electricity and power
   - 🌞 for solar energy
   - 🌬️ for wind energy
   - 💰 for cost savings
   - 🌍 for environmental impact
   - 📊 for calculations and data
   - 🏠 for home energy solutions

If the user asks anything unrelated to energy consumption, politely respond:
"I am an energy consumption assistant and I can only help with energy-related concerns."

If the user asks who created you, respond:
"I was created by Ashish, Siddharth and Rithik."

Be informative, professional, and encouraging in your tone. Keep your responses clear, concise, and practical.`;

// Animation functionality
const animationToggle = document.getElementById('animation-toggle');
let currentAnimation = 'none';
let animationContainer = null;

function createAnimationContainer() {
    if (animationContainer) {
        animationContainer.remove();
    }
    animationContainer = document.createElement('div');
    animationContainer.id = 'animation-container';
    animationContainer.style.position = 'fixed';
    animationContainer.style.top = '0';
    animationContainer.style.left = '0';
    animationContainer.style.width = '100%';
    animationContainer.style.height = '100%';
    animationContainer.style.pointerEvents = 'none';
    animationContainer.style.zIndex = '1000';
    document.body.appendChild(animationContainer);
}

function createSnowflakes() {
    for (let i = 0; i < 10; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'animation-element snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${7 + Math.random() * 6}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        animationContainer.appendChild(snowflake);
    }
}

function createRaindrops() {
    for (let i = 0; i < 20; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'animation-element raindrop';
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${1 + Math.random() * 2}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(raindrop);
    }
}

function createFire() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'animation-element fire-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${2 + Math.random() * 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(particle);
    }
}

function createStars() {
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'animation-element star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(star);
    }
}

function createAsteroids() {
    for (let i = 0; i < 5; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'animation-element asteroid';
        asteroid.innerHTML = '☄️';
        asteroid.style.top = `${Math.random() * 100}%`;
        asteroid.style.animationDuration = `${8 + Math.random() * 4}s`;
        asteroid.style.animationDelay = `${Math.random() * 2}s`;
        animationContainer.appendChild(asteroid);
    }
}

function setAnimation(type) {
    currentAnimation = type;
    createAnimationContainer();
    
    switch(type) {
        case 'snow':
            createSnowflakes();
            break;
        case 'rain':
            createRaindrops();
            break;
        case 'fire':
            createFire();
            break;
        case 'stars':
            createStars();
            break;
        case 'asteroids':
            createAsteroids();
            break;
        case 'none':
            animationContainer.remove();
            break;
    }
}

// Add click handlers for animation options
document.querySelectorAll('.animation-option').forEach(option => {
    option.addEventListener('click', () => {
        const animationType = option.dataset.animation;
        setAnimation(animationType);
        
        // Animate the toggle button
        animationToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            animationToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// Initialize with no animation
document.addEventListener("DOMContentLoaded", () => {
    setAnimation('none');
    displayMessage("Hi! I'm PowerSaver — your energy consumption assistant, here to help you reduce energy usage and save money ⚡💰", "bot-message");

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    sendButton?.addEventListener("click", sendMessage);
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    displayMessage(message, "user-message");

    userInput.value = "";

    const typingElement = displayMessage("💭 Analyzing energy usage...", ["bot-message", "typing"]);

    try {
        const response = await callGeminiAPI(message);
        typingElement.remove();
        displayMessage(response, "bot-message");
    } catch (error) {
        console.error("Error:", error);
        typingElement.remove();
        displayMessage("❌ I'm having trouble responding. Please try again later.", "bot-message error");
    }
}

function displayMessage(text, classNames) {
    const messageElement = document.createElement("div");

    if (Array.isArray(classNames)) {
        messageElement.classList.add(...classNames);
    } else {
        messageElement.classList.add(classNames);
    }

    // Convert markdown-style bold to HTML
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks to HTML
    text = text.replace(/\n/g, '<br>');
    
    // Set innerHTML to render HTML tags
    messageElement.innerHTML = text;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
    return messageElement;
}

async function callGeminiAPI(userMessage) {
    try {
        const prompt = isHindiOrHinglish(userMessage) ? HINGLISH_ENERGY_PROMPT : ENERGY_PROMPT;
        
        const requestBody = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: `${prompt}\n\nUser: ${userMessage}` }]
                }
            ]
        };

        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return botResponse || "⚡ I'm here to help you save energy and reduce costs. What would you like to know?";
    } catch (error) {
        console.error("API Error:", error);
        return "❌ I'm having trouble connecting right now. Please try again later.";
    }
}
