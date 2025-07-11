// Mock data for news articles
const newsData = [
    {
        id: 1,
        title: "Latest agricultural drone technology enhances crop monitoring efficiency",
        excerpt: "New advancements in drone technology are helping farmers monitor crop health more accurately.",
        image: "/api/placeholder/400/250",
        category: "technology",
        date: "April 23, 2025",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Global wheat prices expected to stabilize after recent fluctuations",
        excerpt: "Market analysts predict wheat prices to normalize following months of volatility.",
        image: "/api/placeholder/400/250",
        category: "markets",
        date: "April 22, 2025",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Sustainable farming practices gain momentum among small-scale farmers",
        excerpt: "More small farms are adopting eco-friendly techniques to reduce environmental impact.",
        image: "/api/placeholder/400/250",
        category: "sustainability",
        date: "April 21, 2025",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "New fertilizer research shows promising results for organic production",
        excerpt: "Scientists develop innovative organic fertilizer that matches conventional yields.",
        image: "/api/placeholder/400/250",
        category: "research",
        date: "April 20, 2025",
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "Farm labor shortage continues to challenge agricultural sector",
        excerpt: "Producers across the country face ongoing difficulties finding seasonal workers.",
        image: "/api/placeholder/400/250",
        category: "labor",
        date: "April 19, 2025",
        readTime: "3 min read"
    },
    {
        id: 6,
        title: "Climate-resistant crop varieties show positive results in field trials",
        excerpt: "New drought and heat tolerant crop varieties performing well in challenging conditions.",
        image: "/api/placeholder/400/250",
        category: "climate",
        date: "April 18, 2025",
        readTime: "5 min read"
    }
];

// Additional news data for load more functionality
const additionalNewsData = [
    {
        id: 7,
        title: "Urban farming initiatives transform vacant city lots into productive gardens",
        excerpt: "Community groups convert unused urban spaces into thriving agricultural centers.",
        image: "/api/placeholder/400/250",
        category: "urban",
        date: "April 17, 2025",
        readTime: "4 min read"
    },
    {
        id: 8,
        title: "Agricultural exports reach five-year high as international demand grows",
        excerpt: "Strong global demand for agricultural products boosts export volumes and prices.",
        image: "/api/placeholder/400/250",
        category: "trade",
        date: "April 16, 2025",
        readTime: "5 min read"
    },
    {
        id: 9,
        title: "New AI tool helps farmers optimize irrigation scheduling",
        excerpt: "Artificial intelligence system predicts optimal watering times based on multiple factors.",
        image: "/api/placeholder/400/250",
        category: "technology",
        date: "April 15, 2025",
        readTime: "6 min read"
    }
];

// DOM elements
const featuredSlider = document.getElementById('featured-slider');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const sliderDots = document.querySelectorAll('.dot');
const latestNewsGrid = document.getElementById('latest-news-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const voiceSearchBtn = document.getElementById('voice-search-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedSlider();
    loadLatestNews();
    setupEventListeners();
});

// Initialize featured slider
function initFeaturedSlider() {
    const slides = featuredSlider.querySelectorAll('.featured-card');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Featured slider controls
    let currentSlide = 0;
    const slides = featuredSlider.querySelectorAll('.featured-card');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrapping around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }
    
    prevSlideBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextSlideBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance the slider every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterNewsByCategory(category);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Voice search
    voiceSearchBtn.addEventListener('click', startVoiceSearch);
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreNews);
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            // In a real application, this would send the email to a server
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

    // Function to load latest news into the grid
function loadLatestNews() {
    latestNewsGrid.innerHTML = '';
    
    // Display initial news articles
    newsData.forEach(news => {
        const newsItem = createNewsItem(news);
        latestNewsGrid.appendChild(newsItem);
    });
    
    // Show/hide load more button
    if (additionalNewsData.length === 0) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create HTML for a news item
function createNewsItem(news) {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.setAttribute('data-category', news.category);
    
    newsItem.innerHTML = `
        <img src="${news.image}" alt="${news.title}">
        <div class="news-item-content">
            <span class="tag">${news.category.toUpperCase()}</span>
            <h3>${news.title}</h3>
            <p>${news.excerpt}</p>
            <div class="news-meta">
                <span>${news.date}</span>
                <span>${news.readTime}</span>
            </div>
        </div>
    `;
    
    // Add click event to each news item
    newsItem.addEventListener('click', () => {
        // In a real application, this would navigate to the full article
        alert(`You clicked on: ${news.title}`);
    });
    
    return newsItem;
}

// Load more news when the button is clicked
function loadMoreNews() {
    if (additionalNewsData.length > 0) {
        // Get the current category filter
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        
        // Display additional news articles
        for (let i = 0; i < Math.min(3, additionalNewsData.length); i++) {
            const news = additionalNewsData.shift();  // Remove from array
            const newsItem = createNewsItem(news);
            
            // Apply current category filter
            if (activeCategory === 'all' || news.category === activeCategory) {
                newsItem.style.display = 'block';
            } else {
                newsItem.style.display = 'none';
            }
            
            latestNewsGrid.appendChild(newsItem);
        }
        
        // Hide load more button if no more news
        if (additionalNewsData.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Filter news by category
function filterNewsByCategory(category) {
    const newsItems = latestNewsGrid.querySelectorAll('.news-item');
    
    newsItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        return;
    }
    
    // Reset category buttons
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');
    
    // Search through all news items
    const newsItems = latestNewsGrid.querySelectorAll('.news-item');
    let hasResults = false;
    
    newsItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const excerpt = item.querySelector('p').textContent.toLowerCase();
        const category = item.getAttribute('data-category').toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show a message if no results found
    if (!hasResults) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <p>No results found for "${searchTerm}"</p>
            <button class="reset-search">Clear Search</button>
        `;
        latestNewsGrid.innerHTML = '';
        latestNewsGrid.appendChild(noResults);
        
        // Add event listener to reset search button
        const resetBtn = noResults.querySelector('.reset-search');
        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            loadLatestNews();
        });
    }
}

// Voice search functionality (using Web Speech API)
function startVoiceSearch() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        // Change button appearance to indicate listening
        voiceSearchBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        voiceSearchBtn.style.color = '#ff4444';
        
        recognition.start();
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            handleSearch();
        };
        
        recognition.onerror = function() {
            // Reset button on error
            voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceSearchBtn.style.color = '';
        };
        
        recognition.onend = function() {
            // Reset button when finished
            voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceSearchBtn.style.color = '';
        };
    } else {
        alert('Speech recognition is not supported in your browser.');
    }
}

// Weather data and forecast (simulated)
const weatherData = {
    current: {
        temp: 72,
        condition: 'Partly Cloudy',
        humidity: 65,
        wind: '8 mph'
    },
    forecast: [
        { day: 'Today', high: 75, low: 62, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', high: 78, low: 64, condition: 'Sunny' },
        { day: 'Wednesday', high: 80, low: 66, condition: 'Sunny' },
        { day: 'Thursday', high: 76, low: 65, condition: 'Scattered Showers' },
        { day: 'Friday', high: 72, low: 60, condition: 'Partly Cloudy' }
    ]
};

// Market price data (simulated)
const marketPrices = {
    wheat: { current: 7.85, change: 0.12, trend: 'up' },
    corn: { current: 6.42, change: -0.08, trend: 'down' },
    soybeans: { current: 14.36, change: 0.22, trend: 'up' },
    cotton: { current: 0.89, change: 0.01, trend: 'up' },
    cattle: { current: 1.78, change: -0.03, trend: 'down' }
};

// Function to display weather widget (could be implemented in a real application)
function displayWeatherWidget() {
    // This would create and display a weather widget using the weatherData object
    console.log('Weather widget would display here with data:', weatherData);
}

// Function to display market prices widget (could be implemented in a real application)
function displayMarketPricesWidget() {
    // This would create and display a market prices widget using the marketPrices object
    console.log('Market prices widget would display here with data:', marketPrices);
}

// Simulated analytics tracking
function trackPageView() {
    console.log('Page view tracked');
}

function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track page load
window.addEventListener('load', () => {
    trackPageView();
});