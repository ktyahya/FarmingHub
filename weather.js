// Weather icons mapping
const weatherIcons = {
    'Clear': 'fa-sun',
    'Sunny': 'fa-sun',
    'Partly Cloudy': 'fa-cloud-sun',
    'Cloudy': 'fa-cloud',
    'Overcast': 'fa-cloud',
    'Mist': 'fa-smog',
    'Fog': 'fa-smog',
    'Rain': 'fa-cloud-rain',
    'Showers': 'fa-cloud-showers-heavy',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Sleet': 'fa-cloud-meatball',
    'Hail': 'fa-cloud-meatball',
    'Drizzle': 'fa-cloud-rain'
};

// Sample data for demonstration - in a real application, this would come from an API
const weatherData = {
    'coimbatore': {
        current: {
            temp: 13,
            condition: 'Cloudy',
            humidity: 32,
            wind: 22,
            pressure: 1005
        },
        forecast: [
            { day: 'Today', temp: 13, condition: 'Cloudy' },
            { day: 'Tomorrow', temp: 15, condition: 'Partly Cloudy' },
            { day: 'Saturday', temp: 16, condition: 'Clear' },
            { day: 'Sunday', temp: 14, condition: 'Rain' },
            { day: 'Monday', temp: 12, condition: 'Showers' }
        ],
        advice: 'Weather conditions are ideal for your crops today. Consider increasing water supply based on current conditions.',
        crops: [
            { name: 'Cotton', suitability: 'High', description: 'Perfect conditions for cotton growth.' },
            { name: 'Maize', suitability: 'Medium', description: 'Good choice with current rainfall patterns.' },
            { name: 'Sugarcane', suitability: 'High', description: 'Excellent temperature for sugarcane cultivation.' }
        ]
    },
    'chennai': {
        current: {
            temp: 28,
            condition: 'Partly Cloudy',
            humidity: 65,
            wind: 15,
            pressure: 1008
        },
        forecast: [
            { day: 'Today', temp: 28, condition: 'Partly Cloudy' },
            { day: 'Tomorrow', temp: 29, condition: 'Sunny' },
            { day: 'Saturday', temp: 30, condition: 'Clear' },
            { day: 'Sunday', temp: 29, condition: 'Partly Cloudy' },
            { day: 'Monday', temp: 27, condition: 'Rain' }
        ],
        advice: 'High temperatures expected. Ensure adequate irrigation for your crops. Consider early morning or evening watering.',
        crops: [
            { name: 'Rice', suitability: 'High', description: 'Good monsoon conditions for rice cultivation.' },
            { name: 'Groundnuts', suitability: 'Medium', description: 'Suitable with proper drainage systems.' },
            { name: 'Vegetables', suitability: 'High', description: 'Good growing conditions for most vegetable varieties.' }
        ]
    },
    'madurai': {
        current: {
            temp: 25,
            condition: 'Clear',
            humidity: 45,
            wind: 10,
            pressure: 1010
        },
        forecast: [
            { day: 'Today', temp: 25, condition: 'Clear' },
            { day: 'Tomorrow', temp: 26, condition: 'Sunny' },
            { day: 'Saturday', temp: 27, condition: 'Sunny' },
            { day: 'Sunday', temp: 26, condition: 'Partly Cloudy' },
            { day: 'Monday', temp: 24, condition: 'Cloudy' }
        ],
        advice: 'Clear skies and moderate temperatures are excellent for most crops. Good time for pest control measures.',
        crops: [
            { name: 'Banana', suitability: 'High', description: 'Ideal growing conditions present.' },
            { name: 'Mango', suitability: 'High', description: 'Perfect weather for mango orchards.' },
            { name: 'Tomato', suitability: 'Medium', description: 'Consider additional sun protection.' }
        ]
    }
};

// Initialize default location
let currentLocation = 'coimbatore';

// DOM elements
const locationSearch = document.getElementById('location-search');
const searchBtn = document.getElementById('search-btn');
const getWeatherBtn = document.querySelector('.weather-btn');
const backBtn = document.querySelector('.back-btn');
const forecastContainer = document.getElementById('forecast-container');
const cropRecommendations = document.getElementById('crop-recommendations');

// Update UI with weather data
function updateWeatherUI(location) {
    const data = weatherData[location.toLowerCase()];
    
    if (!data) {
        alert('Location not found in our database. Try Coimbatore, Chennai, or Madurai.');
        return;
    }
    
    // Update current weather
    document.getElementById('location').textContent = location.charAt(0).toUpperCase() + location.slice(1);
    document.getElementById('forecast-location').textContent = location.charAt(0).toUpperCase() + location.slice(1);
    document.getElementById('temp').textContent = `${data.current.temp}°C`;
    document.getElementById('weather-condition').textContent = data.current.condition;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('wind').textContent = `${data.current.wind} km/h`;
    document.getElementById('pressure').textContent = `${data.current.pressure} hPa`;
    
    // Update weather icon
    const iconElement = document.getElementById('weather-icon');
    iconElement.innerHTML = `<i class="fas ${weatherIcons[data.current.condition] || 'fa-cloud'}"></i>`;
    
    // Update forecast
    forecastContainer.innerHTML = '';
    data.forecast.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <h4>${day.day}</h4>
            <div><i class="fas ${weatherIcons[day.condition] || 'fa-cloud'}"></i></div>
            <p class="temp">${day.temp}°C</p>
            <p>${day.condition}</p>
        `;
        forecastContainer.appendChild(dayCard);
    });
    
    // Update advice
    document.getElementById('advice-text').textContent = data.advice;
    
    // Update crop recommendations
    cropRecommendations.innerHTML = '';
    data.crops.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        cropCard.innerHTML = `
            <div class="crop-image">
                <i class="fas fa-seedling" style="font-size: 50px; color: #4caf50;"></i>
            </div>
            <div class="crop-details">
                <h3>${crop.name}</h3>
                <p><strong>Suitability:</strong> ${crop.suitability}</p>
                <p>${crop.description}</p>
            </div>
        `;
        cropRecommendations.appendChild(cropCard);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const location = locationSearch.value.trim();
    if (location) {
        currentLocation = location;
        updateWeatherUI(location);
    }
});

locationSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationSearch.value.trim();
        if (location) {
            currentLocation = location;
            updateWeatherUI(location);
        }
    }
});

getWeatherBtn.addEventListener('click', () => {
    updateWeatherUI(currentLocation);
});

backBtn.addEventListener('click', () => {
    // In a real application, this would navigate back to a previous page
    // For demonstration, we'll just alert
    alert('Navigating back to the main dashboard...');
});

// Initialize with default data
document.addEventListener('DOMContentLoaded', () => {
    updateWeatherUI(currentLocation);
});

document.addEventListener('DOMContentLoaded', function() {
    // Back button handler
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        window.location.href = 'ov.html';
    });
});