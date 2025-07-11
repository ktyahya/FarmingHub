document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const farmersGrid = document.getElementById('farmersGrid');
    const questionList = document.getElementById('questionList');
    const storiesCarousel = document.getElementById('storiesCarousel');
    
    // Toggle search bar
    searchToggle?.addEventListener('click', () => {
        searchContainer.style.display = 
            searchContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Mobile menu toggle
    mobileMenuToggle?.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Sample data for farmers
    const farmers = [
        {
            name: 'John Smith',
            specialty: 'Organic Farming',
            experience: '15 years',
            location: 'Northern Region',
            rating: 4.8,
            reviews: 127,
            image: 'farmer1.jpg'
        },
        {
            name: 'Sarah Johnson',
            specialty: 'Hydroponics',
            experience: '8 years',
            location: 'Southern Region',
            rating: 4.6,
            reviews: 89,
            image: 'farmer2.jpg'
        },
        // Add more farmer data as needed
    ];

    // Function to create farmer card
    function createFarmerCard(farmer) {
        return `
            <div class="farmer-card">
                <div class="farmer-cover">
                    <span class="farmer-badge">${farmer.experience}</span>
                </div>
                <div class="farmer-info">
                    <div class="farmer-avatar">
                        <img src="${farmer.image}" alt="${farmer.name}" onerror="this.onerror=null;this.src='default-avatar.png';">
                    </div>
                    <h3 class="farmer-name">${farmer.name}</h3>
                    <p class="farmer-specialty">${farmer.specialty}</p>
                    <div class="farmer-stats">
                        <div class="farmer-stat">
                            <div class="stat-value">${farmer.rating}</div>
                            <div class="stat-label">Rating</div>
                        </div>
                        <div class="farmer-stat">
                            <div class="stat-value">${farmer.reviews}</div>
                            <div class="stat-label">Reviews</div>
                        </div>
                    </div>
                    <button class="btn btn-primary farmer-connect">Connect</button>
                </div>
            </div>
        `;
    }

    // Load farmers initially
    function loadFarmers() {
        if (farmersGrid) {
            farmers.forEach(farmer => {
                farmersGrid.innerHTML += createFarmerCard(farmer);
            });
        }
    }

    // Sample data for questions
    const questions = [
        {
            author: 'Michael Brown',
            date: '2 hours ago',
            title: 'Best practices for organic pest control?',
            content: 'I\'m new to organic farming and looking for effective pest control methods...',
            tags: ['organic', 'pest-control', 'beginners'],
            replies: 12,
            votes: 25
        },
        // Add more question data as needed
    ];

    // Function to create question card
    function createQuestionCard(question) {
        return `
            <div class="question-card">
                <div class="question-header">
                    <div class="question-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="question-meta">
                        <div class="question-author">${question.author}</div>
                        <div class="question-date">${question.date}</div>
                    </div>
                </div>
                <div class="question-content">
                    <h3>${question.title}</h3>
                    <p>${question.content}</p>
                </div>
                <div class="question-footer">
                    <div class="question-tags">
                        ${question.tags.map(tag => `<span class="question-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="question-actions">
                        <a href="#" class="question-action">
                            <i class="fas fa-comment"></i>
                            <span>${question.replies} replies</span>
                        </a>
                        <a href="#" class="question-action">
                            <i class="fas fa-arrow-up"></i>
                            <span>${question.votes} votes</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Load questions
    function loadQuestions() {
        if (questionList) {
            questions.forEach(question => {
                questionList.innerHTML += createQuestionCard(question);
            });
        }
    }

    // Initialize everything
    loadFarmers();
    loadQuestions();

    // Filter functionality
    const filterInputs = document.querySelectorAll('.filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Implement filter logic here
            console.log('Filter changed:', this.id, this.value);
        });
    });

    // Load more functionality
    loadMoreBtn?.addEventListener('click', function() {
        // Implement load more logic here
        console.log('Loading more farmers...');
    });

    // Modal functionality for auth
    const authModal = document.getElementById('authModal');
    const modalClose = document.querySelector('.modal-close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    modalClose?.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.style.display = content.id === tab ? 'block' : 'none';
            });
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
});