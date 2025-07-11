// Main JavaScript for GrowPaddy Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Phase Navigation
    initializePhaseNavigation();
    
    // Initialize Tasks
    initializeTasks();
    
    // Initialize Progress Tracking
    initializeProgress();
    
    // Initialize Mobile Menu
    initializeMobileMenu();
});

function initializePhaseNavigation() {
    const phaseTabs = document.querySelectorAll('.phase-tab');
    const phaseContents = document.querySelectorAll('.phase-content');
    
    phaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            phaseTabs.forEach(t => t.classList.remove('active'));
            phaseContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const phaseId = tab.getAttribute('data-phase');
            const content = document.getElementById(`phase-${phaseId}`);
            content.classList.add('active');
            
            // Update progress indicator
            updatePhaseIndicator(phaseId);
            
            // Animate content transition
            content.style.animation = 'fadeIn 0.5s ease';
        });
    });
}

function initializeTasks() {
    const tasks = document.querySelectorAll('.task');
    
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        const infoBtn = task.querySelector('.info-btn');
        const details = task.querySelector('.task-details');
        
        // Task completion handling
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                updateTaskProgress(task.closest('.phase-content'));
                saveProgress();
            });
        }
        
        // Task info toggle
        if (infoBtn && details) {
            infoBtn.addEventListener('click', () => {
                details.classList.toggle('hidden');
            });
        }
    });
}

function updateTaskProgress(phaseContent) {
    if (!phaseContent) return;
    
    const checkboxes = phaseContent.querySelectorAll('input[type="checkbox"]');
    const completeBtn = phaseContent.querySelector('.mark-complete-btn');
    const progressText = phaseContent.querySelector('[id$="-completion"]');
    
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Update completion text
    if (progressText) {
        progressText.textContent = `${completed} of ${total} tasks completed`;
    }
    
    // Enable/disable complete button
    if (completeBtn) {
        completeBtn.disabled = completed !== total;
    }
    
    // Update overall progress
    updateOverallProgress();
}

function updateOverallProgress() {
    const progressBar = document.getElementById('farming-progress');
    const progressText = document.getElementById('progress-percentage');
    
    if (!progressBar || !progressText) return;
    
    const allTasks = document.querySelectorAll('.task input[type="checkbox"]');
    const completedTasks = Array.from(allTasks).filter(cb => cb.checked).length;
    const percentage = Math.round((completedTasks / allTasks.length) * 100);
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

function updatePhaseIndicator(phaseId) {
    const indicator = document.getElementById('phase-indicator');
    if (!indicator) return;
    
    const phases = {
        '1': 'Land & Infrastructure Setup',
        '2': 'Seed Strategy',
        '3': 'Nursery & Transplantation',
        '4': 'Field Cultivation & Care',
        '5': 'Harvesting & Post-Harvest',
        '6': 'Processing & Polishing',
        '7': 'Quality Assurance',
        '8': 'Export Setup',
        '9': 'Sales & Distribution'
    };
    
    indicator.textContent = `Phase ${phaseId}: ${phases[phaseId]}`;
}

function saveProgress() {
    const progress = {
        completedTasks: Array.from(document.querySelectorAll('.task input[type="checkbox"]'))
            .map(cb => cb.checked),
        currentPhase: document.querySelector('.phase-tab.active')?.getAttribute('data-phase')
    };
    
    localStorage.setItem('farmingProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('farmingProgress');
    if (!saved) return;
    
    const progress = JSON.parse(saved);
    
    // Restore task completion status
    const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
    progress.completedTasks.forEach((isChecked, index) => {
        if (checkboxes[index]) {
            checkboxes[index].checked = isChecked;
            updateTaskProgress(checkboxes[index].closest('.phase-content'));
        }
    });
    
    // Restore active phase
    if (progress.currentPhase) {
        const tab = document.querySelector(`[data-phase="${progress.currentPhase}"]`);
        if (tab) tab.click();
    }
}

function initializeMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-btn');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');
    
    if (header && nav) {
        header.insertBefore(menuButton, nav);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}

// Initialize tooltips for info buttons
function initializeTooltips() {
    const infoButtons = document.querySelectorAll('.info-btn');
    
    infoButtons.forEach(btn => {
        const tooltip = btn.nextElementSibling;
        if (!tooltip) return;
        
        btn.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        
        btn.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', () => {
    initializePhaseNavigation();
    initializeTasks();
    initializeProgress();
    initializeMobileMenu();
    initializeTooltips();
    loadProgress();
});