// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const mainContent = document.querySelector('.main-content');
const navItems = document.querySelectorAll('.nav-item');
const chartTabs = document.querySelectorAll('.chart-actions .btn-outline');
const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]');

// Add these constants at the top of your file
const WEATHER_API_KEY = 'fae174b556f43761bda96973552c1604'; // Replace with your new API key
const DEFAULT_LOCATION = 'Coimbatore,IN'; // Example: 'London,UK'

// Dashboard Data
const salesData = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 19, 15, 25, 22, 30, 35]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [35, 40, 35, 50, 49, 60, 70, 65, 75, 70, 80, 95]
    },
    yearly: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        data: [200, 300, 280, 350, 400, 500, 550]
    }
};

// Sample Crop Performance Data
const cropPerformanceData = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Wheat',
            data: [65, 68, 70, 72, 75, 73, 78],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [55, 58, 57, 60, 62, 65, 67],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [45, 47, 48, 50, 52, 53, 55],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Wheat',
            data: [60, 65, 70, 75, 80, 85, 88, 90, 87, 83, 80, 78],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [50, 55, 58, 62, 65, 70, 73, 75, 73, 70, 65, 60],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [40, 45, 48, 52, 55, 58, 62, 65, 63, 60, 55, 50],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    },
    yearly: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Wheat',
            data: [750, 800, 850, 900, 950, 1000],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [600, 650, 700, 750, 800, 850],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [500, 550, 600, 650, 700, 750],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    }
};

// Initialize the Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setCurrentDate();
    initializeCharts();
    initializeEventListeners();
});

// Set current date in header
function setCurrentDate() {
    const dateDisplay = document.querySelector('.date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateDisplay.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Initialize Dashboard
function initializeDashboard() {
    // Check if sidebar state is saved in localStorage
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
    
    // Set active nav item
    const currentPath = window.location.pathname;
    navItems.forEach(item => {
        const link = item.querySelector('a').getAttribute('href');
        if (currentPath.includes(link)) {
            item.classList.add('active');
        }
    });
}

// Initialize Charts
function initializeCharts() {
    const salesChart = document.getElementById('salesChart');
    
    if (salesChart) {
        const ctx = salesChart.getContext('2d');
        
        // Create gradient for chart
        let gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(118, 210, 117, 0.6)');
        gradient.addColorStop(1, 'rgba(118, 210, 117, 0.1)');
        
        // Initialize chart with weekly data
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesData.weekly.labels,
                datasets: [{
                    label: 'Sales',
                    data: salesData.weekly.data,
                    borderColor: '#43a047',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#43a047',
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#333',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Sales: $' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            borderDash: [5, 5],
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Initialize Crop Performance Chart
    const cropChart = document.getElementById('cropPerformanceChart');
    if (cropChart) {
        window.cropChart = initializeCropChart();
        
        // Add event listeners for period buttons
        const periodButtons = document.querySelectorAll('.chart-actions .btn-outline');
        periodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                periodButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Update chart
                const period = e.target.dataset.period;
                updateCropChart(window.cropChart, period);
            });
        });
    }
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Chart tabs
    chartTabs.forEach(tab => {
        tab.addEventListener('click', handleChartTabClick);
    });
    
    // Task checkboxes
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleTaskCheckboxChange);
    });
    
    // Initialize notification dropdown
    const notificationButton = document.querySelector('.notification');
    if (notificationButton) {
        notificationButton.addEventListener('click', toggleNotificationDropdown);
    }
    
    // Initialize message dropdown
    const messageButton = document.querySelector('.message');
    if (messageButton) {
        messageButton.addEventListener('click', toggleMessageDropdown);
    }
    
    // Mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Handle click outside dropdown menus to close them
    document.addEventListener('click', handleOutsideClick);
    
    // Handle Farmer Community navigation
    const communityLink = document.querySelector('a[href="community.html"]');
    communityLink?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'community.html';
    });
}

// Toggle Sidebar
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

// Handle Chart Tab Click
function handleChartTabClick(e) {
    // Remove active class from all tabs
    chartTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    e.target.classList.add('active');
    
    // Update chart data based on selected period
    const period = e.target.getAttribute('data-period');
    updateChartData(period);
}

// Update Chart Data
function updateChartData(period) {
    if (!window.myChart) return;
    
    window.myChart.data.labels = salesData[period].labels;
    window.myChart.data.datasets[0].data = salesData[period].data;
    window.myChart.update();
}

// Handle Task Checkbox Change
function handleTaskCheckboxChange(e) {
    const taskItem = e.target.closest('.task-item');
    const taskInfo = taskItem.querySelector('.task-info');
    
    if (e.target.checked) {
        taskInfo.classList.add('completed');
    } else {
        taskInfo.classList.remove('completed');
    }
    
    // Update task status in database (mock)
    updateTaskStatus(e.target.dataset.taskId, e.target.checked);
}

// Update Task Status (Mock)
function updateTaskStatus(taskId, isCompleted) {
    console.log(`Task ${taskId} completion status updated to: ${isCompleted}`);
    // In a real app, this would be an API call
}

// Toggle Notification Dropdown
function toggleNotificationDropdown(e) {
    e.stopPropagation();
    const dropdown = document.querySelector('.notification-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Close message dropdown if open
        const messageDropdown = document.querySelector('.message-dropdown');
        if (messageDropdown && messageDropdown.classList.contains('active')) {
            messageDropdown.classList.remove('active');
        }
    }
}

// Toggle Message Dropdown
function toggleMessageDropdown(e) {
    e.stopPropagation();
    const dropdown = document.querySelector('.message-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Close notification dropdown if open
        const notificationDropdown = document.querySelector('.notification-dropdown');
        if (notificationDropdown && notificationDropdown.classList.contains('active')) {
            notificationDropdown.classList.remove('active');
        }
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
}

// Open Modal
function openModal(modalId) {
    const modalOverlay = document.getElementById(modalId);
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Click Outside Dropdown
function handleOutsideClick(e) {
    // Close notification dropdown
    const notificationDropdown = document.querySelector('.notification-dropdown');
    if (notificationDropdown && 
        notificationDropdown.classList.contains('active') && 
        !e.target.closest('.notification') && 
        !e.target.closest('.notification-dropdown')) {
        notificationDropdown.classList.remove('active');
    }
    
    // Close message dropdown
    const messageDropdown = document.querySelector('.message-dropdown');
    if (messageDropdown && 
        messageDropdown.classList.contains('active') && 
        !e.target.closest('.message') && 
        !e.target.closest('.message-dropdown')) {
        messageDropdown.classList.remove('active');
    }
    
    // Close mobile sidebar
    if (sidebar.classList.contains('active') && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.mobile-menu-btn')) {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}

// Show Toast Notification
function showToast(type, title, message, duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = '';
    switch(type) {
        case 'success':
            iconClass = 'fa-check-circle';
            break;
        case 'error':
            iconClass = 'fa-times-circle';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            break;
        case 'info':
            iconClass = 'fa-info-circle';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Get or create toast container
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Append toast to container
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Add close event
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

// Remove Toast
function removeToast(toast) {
    toast.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
        toast.remove();
        
        // Remove container if empty
        const toastContainer = document.querySelector('.toast-container');
        if (toastContainer && toastContainer.children.length === 0) {
            toastContainer.remove();
        }
    }, 300);
}

// Show/Hide Loader
function showLoader() {
    let loader = document.querySelector('.loader-container');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'loader-container';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Simulate data loading
function loadDashboardData() {
    showLoader();
    
    // Simulate API call
    setTimeout(() => {
        hideLoader();
        showToast('success', 'Success', 'Dashboard data updated successfully!');
    }, 1500);
}

// Example usage of modal
function addNewTask() {
    openModal('newTaskModal');
}

// Example of form submission
function submitNewTask(form) {
    // Get form data
    const formData = new FormData(form);
    const taskData = {
        title: formData.get('taskTitle'),
        description: formData.get('taskDescription'),
        priority: formData.get('taskPriority'),
        dueDate: formData.get('taskDueDate')
    };
    
    // Validation
    if (!taskData.title) {
        showToast('error', 'Error', 'Task title is required');
        return false;
    }
    
    // Show loader
    showLoader();
    
    // Simulate API call
    setTimeout(() => {
        hideLoader();
        closeModal();
        showToast('success', 'Task Added', 'New task has been added successfully');
        
        // In a real app, you would add the task to the UI here
        addTaskToUI(taskData);
    }, 1000);
    
    return false; // Prevent form submission
}

// Add task to UI
function addTaskToUI(taskData) {
    const tasksList = document.querySelector('.tasks-list');
    if (!tasksList) return;
    
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const priorityClass = taskData.priority.toLowerCase();
    const today = new Date();
    const dueDate = new Date(taskData.dueDate);
    const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    taskItem.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" id="task-new" data-task-id="new">
            <label for="task-new"></label>
        </div>
        <div class="task-info">
            <h4>${taskData.title}</h4>
            <p>${taskData.description || 'No description'}</p>
        </div>
        <div class="task-meta">
            <span class="task-priority ${priorityClass}">${taskData.priority}</span>
            <span class="task-date">${formattedDate}</span>
        </div>
    `;
    
    // Add to top of list
    tasksList.insertBefore(taskItem, tasksList.firstChild);
    
    // Initialize checkbox event
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', handleTaskCheckboxChange);
}

// Update chart when period changes (weekly/monthly/yearly)
function updateCropChart(chart, period) {
    chart.data = cropPerformanceData[period];
    chart.update();
}

// Add this function to fetch weather data
async function updateWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${DEFAULT_LOCATION}&units=metric&appid=${WEATHER_API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.list) {
            throw new Error('Invalid weather data structure received');
        }
        
        // Get the weather container
        const weatherContainer = document.getElementById('weather-forecast');
        weatherContainer.innerHTML = '';
        
        // Process 7 days of weather data
        const dailyData = data.list.filter(reading => reading.dt_txt.includes('12:00:00'));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        dailyData.slice(0, 7).forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = days[date.getDay()];
            const temp = Math.round(day.main.temp);
            const weatherIcon = getWeatherIcon(day.weather[0].main);
            
            const weatherDay = document.createElement('div');
            weatherDay.className = 'weather-day';
            weatherDay.innerHTML = `
                <p class="day">${dayName}</p>
                <i class="${weatherIcon}"></i>
                <p class="temp">${temp}°C</p>
            `;
            
            weatherContainer.appendChild(weatherDay);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherContainer = document.getElementById('weather-forecast');
        if (weatherContainer) {
            weatherContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load weather data: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Helper function to map weather conditions to FontAwesome icons
function getWeatherIcon(condition) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Snow': 'fas fa-snowflake',
        'Thunderstorm': 'fas fa-bolt',
        'Drizzle': 'fas fa-cloud-rain',
        'Mist': 'fas fa-smog',
        'Smoke': 'fas fa-smog',
        'Haze': 'fas fa-smog',
        'Dust': 'fas fa-smog',
        'Fog': 'fas fa-smog'
    };
    
    return iconMap[condition] || 'fas fa-cloud';
}

// Add event listener for the update button
document.addEventListener('DOMContentLoaded', function() {
    const updateWeatherBtn = document.querySelector('.weather-forecast .btn-outline');
    if (updateWeatherBtn) {
        updateWeatherBtn.addEventListener('click', updateWeatherForecast);
    }
    
    // Initial weather update
    updateWeatherForecast();
});

// Add event listener for time range selector
document.getElementById('timeRange').addEventListener('change', function(e) {
    const data = {
        month: [4.2, 9.5, 7.1, 3.8, 2.5],
        quarter: [4.5, 8.9, 6.8, 4.1, 2.7],
        year: [4.8, 9.2, 7.4, 3.9, 2.9]
    };
    
    cropPerformanceChart.data.datasets[0].data = data[e.target.value];
    cropPerformanceChart.update();
});

function initializeCropPerformanceChart() {
    const ctx = document.getElementById('cropPerformanceChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [65, 35],
                backgroundColor: [
                    '#4CAF50',
                    '#E8F5E9'
                ],
                borderWidth: 0,
                circumference: 360,
                rotation: -90
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', function() {
    const chart = initializeCropPerformanceChart();
    
    // Time button handlers
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function handleLogout(event) {
    event.preventDefault();
    
    // Clear any stored user data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Ensure the logout button is visible when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener for weather forecast link
    const weatherLink = document.querySelector('a[href="weather.html"]');
    weatherLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'weather.html';
    });
});

// Add this to your existing JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            this.parentElement.classList.add('active');
        });
    });
});