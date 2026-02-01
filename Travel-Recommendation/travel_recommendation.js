/**
 * TravelBloom - Travel Recommendation JavaScript
 * Handles search functionality, keyword matching, and result display
 */

// Global variable to store fetched data
let travelData = null;

// Fetch travel data when page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchTravelData();

    // Add enter key support for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchRecommendations();
            }
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

/**
 * Fetch travel data from JSON file
 */
function fetchTravelData() {
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            travelData = data;
            console.log('Travel data loaded successfully:', data);
        })
        .catch(error => {
            console.error('Error fetching travel data:', error);
        });
}

/**
 * Show a beautiful toast notification
 * @param {string} type - 'success', 'warning', 'error', or 'info'
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');

    const icons = {
        success: 'fa-check',
        warning: 'fa-exclamation',
        error: 'fa-times',
        info: 'fa-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.4s ease-out forwards';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/**
 * Show all destinations - triggered by Start Exploring button
 */
function showAllDestinations() {
    if (!travelData) {
        console.error('Travel data not loaded yet');
        showToast('error', 'Loading...', 'Data is still loading. Please try again.');
        return;
    }

    let allResults = [];

    // Add all beaches
    travelData.beaches.forEach(beach => {
        allResults.push({
            name: beach.name,
            imageUrl: beach.imageUrl,
            description: beach.description,
            type: 'beach',
            category: 'Beach'
        });
    });

    // Add all temples
    travelData.temples.forEach(temple => {
        allResults.push({
            name: temple.name,
            imageUrl: temple.imageUrl,
            description: temple.description,
            type: 'temple',
            category: 'Temple'
        });
    });

    // Add all cities from all countries
    travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            allResults.push({
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description,
                type: 'country',
                countryName: country.name,
                category: 'City'
            });
        });
    });

    // Display all results
    displayResults(allResults, 'All Destinations');
    showToast('success', 'Exploring All Destinations', `Found ${allResults.length} amazing places for you!`);
}

/**
 * Search for recommendations based on user input
 */
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) {
        showToast('warning', 'Please enter a keyword', 'Try searching for: beach, temple, or a country name');
        return;
    }

    if (!travelData) {
        console.error('Travel data not loaded yet');
        showToast('error', 'Loading...', 'Data is still loading. Please try again.');
        return;
    }

    let results = [];

    // Check for beach/beaches keyword
    if (keyword === 'beach' || keyword === 'beaches') {
        results = travelData.beaches.map(beach => ({
            name: beach.name,
            imageUrl: beach.imageUrl,
            description: beach.description,
            type: 'beach'
        }));
    }
    // Check for temple/temples keyword
    else if (keyword === 'temple' || keyword === 'temples') {
        results = travelData.temples.map(temple => ({
            name: temple.name,
            imageUrl: temple.imageUrl,
            description: temple.description,
            type: 'temple'
        }));
    }
    // Check for country keyword or country names
    else if (keyword === 'country' || keyword === 'countries') {
        // Show all cities from all countries
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description,
                    type: 'country',
                    countryName: country.name
                });
            });
        });
    }
    // Check if search matches a specific country name
    else {
        const matchedCountry = travelData.countries.find(
            country => country.name.toLowerCase() === keyword
        );

        if (matchedCountry) {
            results = matchedCountry.cities.map(city => ({
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description,
                type: 'country',
                countryName: matchedCountry.name
            }));
        }
    }

    // Display results
    displayResults(results, keyword);

    // Show toast notification
    if (results.length > 0) {
        showToast('success', 'Search Complete', `Found ${results.length} destinations for "${keyword}"`);
    } else {
        showToast('warning', 'No Results', `No destinations found for "${keyword}". Try beach, temple, or a country name.`);
    }
}

/**
 * Display search results in the results container
 * @param {Array} results - Array of result objects
 * @param {string} keyword - The search keyword used
 */
function displayResults(results, keyword) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchKeyword = document.getElementById('searchKeyword');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Update the search keyword display
    if (searchKeyword) {
        searchKeyword.textContent = `Showing results for: "${keyword}"`;
    }

    // Switch to search results page
    showPage('search');

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 style="color: #1e6091; margin-bottom: 1rem;">No results found for "${keyword}"</h3>
                <p style="color: #666;">Try searching for: beach, beaches, temple, temples, country, countries, Australia, Japan, or Brazil</p>
            </div>
        `;
        return;
    }

    // Create cards for each result
    results.forEach((result, index) => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.animationDelay = `${index * 0.1}s`;

        // Get local time for countries
        let timeHtml = '';
        if (result.type === 'country') {
            timeHtml = getLocalTimeHtml(result.name);
        }

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${result.imageUrl}" alt="${result.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="card-content">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                ${timeHtml}
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

/**
 * Get local time HTML for a city
 * @param {string} cityName - Name of the city
 * @returns {string} HTML string with local time
 */
function getLocalTimeHtml(cityName) {
    const timezones = {
        'Sydney, Australia': 'Australia/Sydney',
        'Melbourne, Australia': 'Australia/Melbourne',
        'Tokyo, Japan': 'Asia/Tokyo',
        'Kyoto, Japan': 'Asia/Tokyo',
        'Rio de Janeiro, Brazil': 'America/Sao_Paulo',
        'São Paulo, Brazil': 'America/Sao_Paulo'
    };

    const timezone = timezones[cityName];

    if (timezone) {
        try {
            const options = {
                timeZone: timezone,
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            const localTime = new Date().toLocaleTimeString('en-US', options);
            return `<div class="card-time"><i class="fas fa-clock"></i> Local time: ${localTime}</div>`;
        } catch (error) {
            console.error('Error getting local time:', error);
            return '';
        }
    }

    return '';
}

/**
 * Clear search results and reset input
 */
function clearResults() {
    // Clear the search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    // Clear the results container
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }

    // Go back to home page
    showPage('home');

    showToast('info', 'Search Cleared', 'Ready for a new adventure!');
    console.log('Results cleared');
}

// =========================================
// Chatbot Functions
// =========================================

let chatbotOpen = false;
let settingsOpen = false;

/**
 * Toggle chatbot window visibility
 */
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    const badge = document.getElementById('chatbotBadge');

    chatbotOpen = !chatbotOpen;

    if (chatbotOpen) {
        chatWindow.classList.add('active');
        badge.style.display = 'none';
        document.getElementById('chatInput').focus();
    } else {
        chatWindow.classList.remove('active');
    }
}

/**
 * Toggle settings panel visibility
 */
function toggleSettings() {
    const settings = document.getElementById('chatbotSettings');
    const toggle = document.getElementById('settingsToggle');
    const icon = document.getElementById('settingsIcon');

    settingsOpen = !settingsOpen;

    if (settingsOpen) {
        settings.classList.add('active');
        toggle.classList.add('active');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');

        // Load saved settings
        const savedUrl = localStorage.getItem('chatbot_api_url') || '';
        const savedKey = localStorage.getItem('chatbot_api_key') || '';
        document.getElementById('apiUrl').value = savedUrl;
        document.getElementById('apiKey').value = savedKey;
    } else {
        settings.classList.remove('active');
        toggle.classList.remove('active');
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

/**
 * Save API settings to localStorage
 */
function saveApiSettings() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();

    localStorage.setItem('chatbot_api_url', apiUrl);
    localStorage.setItem('chatbot_api_key', apiKey);

    showToast('success', 'Settings Saved', 'API configuration has been saved.');
    toggleSettings();
}

/**
 * Handle Enter key in chat input
 */
function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

/**
 * Send chat message
 */
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Check if API is configured
    const apiUrl = localStorage.getItem('chatbot_api_url');
    const apiKey = localStorage.getItem('chatbot_api_key');

    if (apiUrl && apiKey) {
        // Use external API
        callExternalAPI(message, apiUrl, apiKey);
    } else {
        // Use local responses
        setTimeout(() => {
            hideTypingIndicator();
            const response = getLocalResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

/**
 * Add message to chat window
 */
function addChatMessage(content, type) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;

    const icon = type === 'user' ? 'fa-user' : 'fa-robot';

    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${icon}"></i></div>
        <div class="message-content">${content}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Get local response based on keywords
 */
function getLocalResponse(message) {
    const msg = message.toLowerCase();

    // Beach responses
    if (msg.includes('beach') || msg.includes('bãi biển')) {
        return "🏖️ We have beautiful beach destinations like <strong>Bora Bora</strong> in French Polynesia and <strong>Copacabana Beach</strong> in Brazil! Try searching 'beach' to explore these paradise locations.";
    }

    // Temple responses
    if (msg.includes('temple') || msg.includes('đền')) {
        return "🏛️ For temple lovers, I recommend <strong>Angkor Wat</strong> in Cambodia and the magnificent <strong>Taj Mahal</strong> in India. Search 'temple' to see all options!";
    }

    // Japan responses
    if (msg.includes('japan') || msg.includes('nhật')) {
        return "🇯🇵 Japan is amazing! Visit <strong>Tokyo</strong> for the vibrant city life or <strong>Kyoto</strong> for traditional temples and cherry blossoms. Search 'Japan' to explore!";
    }

    // Australia responses
    if (msg.includes('australia') || msg.includes('úc')) {
        return "🇦🇺 G'day! Australia offers <strong>Sydney</strong> with its iconic Opera House and <strong>Melbourne</strong> known for its arts and coffee culture. Search 'Australia' for more!";
    }

    // Brazil responses
    if (msg.includes('brazil') || msg.includes('braxin')) {
        return "🇧🇷 Brazil is incredible! Experience <strong>Rio de Janeiro</strong> with Christ the Redeemer or explore <strong>São Paulo</strong>'s urban culture. Search 'Brazil' to see all!";
    }

    // Recommend/suggest
    if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('gợi ý')) {
        return "✨ I'd be happy to help! Here are my top picks:<br><br>🏖️ <strong>For beaches:</strong> Bora Bora<br>🏛️ <strong>For culture:</strong> Angkor Wat<br>🏙️ <strong>For cities:</strong> Tokyo<br><br>Click 'Start Exploring' on the homepage to see all destinations!";
    }

    // Help/hello
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('xin chào') || msg.includes('help')) {
        return "👋 Hello! I'm your TravelBloom assistant. I can help you discover:<br><br>🏖️ Beautiful beaches<br>🏛️ Ancient temples<br>🌏 Exciting countries (Japan, Australia, Brazil)<br><br>Just ask me about any destination!";
    }

    // Default response
    return "🌍 Great question! I can help you find amazing travel destinations. Try asking about:<br><br>• Beaches 🏖️<br>• Temples 🏛️<br>• Countries like Japan, Australia, or Brazil 🗺️<br><br>Or click 'Start Exploring' on the homepage!";
}

/**
 * Call external API for chat response
 */
async function callExternalAPI(message, apiUrl, apiKey) {
    try {
        // Build the full API endpoint
        const endpoint = apiUrl.endsWith('/chat/completions')
            ? apiUrl
            : apiUrl.replace(/\/$/, '') + '/chat/completions';

        // Auto-detect provider and set appropriate model
        let model = 'gpt-3.5-turbo'; // Default for OpenAI

        if (apiUrl.includes('groq.com')) {
            model = 'llama-3.3-70b-versatile'; // Groq's best free model
        } else if (apiUrl.includes('aimlapi.com')) {
            model = 'google/gemma-3-27b-it'; // AIML model
        } else if (apiUrl.includes('openrouter.ai')) {
            model = 'google/gemma-2-9b-it:free'; // OpenRouter free model
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful travel assistant for TravelBloom website. Help users discover beach destinations (Bora Bora, Copacabana), temples (Angkor Wat, Taj Mahal), and cities in Australia (Sydney, Melbourne), Japan (Tokyo, Kyoto), and Brazil (Rio, São Paulo). Keep responses friendly, concise and use emojis. Answer in the same language the user uses.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 200
            })
        });

        hideTypingIndicator();

        if (response.ok) {
            const data = await response.json();
            const botResponse = data.choices[0].message.content;
            addChatMessage(botResponse, 'bot');
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', errorData);
            addChatMessage("Sorry, I couldn't connect to the AI service. " + getLocalResponse(message), 'bot');
        }
    } catch (error) {
        console.error('API Error:', error);
        hideTypingIndicator();
        addChatMessage(getLocalResponse(message), 'bot');
    }
}
