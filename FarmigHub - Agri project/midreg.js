document.addEventListener('DOMContentLoaded', function() {
    // Crop data organized by season
    const cropData = {
        spring: [
            {
                name: "Wheat",
                image: "https://via.placeholder.com/300x180?text=Wheat",
                description: "Spring wheat varieties grow well in cooler temperatures and have a shorter growing season.",
                growingPeriod: "90-110 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Corn",
                image: "https://via.placeholder.com/300x180?text=Corn",
                description: "Spring planting allows corn to establish before summer heat arrives. Requires warm soil to germinate.",
                growingPeriod: "60-100 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "High"
            },
            {
                name: "Lettuce",
                image: "https://via.placeholder.com/300x180?text=Lettuce",
                description: "Cool-season crop that grows quickly in spring conditions. Multiple harvests possible.",
                growingPeriod: "45-65 days",
                soilTypes: ["Loamy", "Sandy"],
                waterNeeds: "Moderate"
            },
            {
                name: "Peas",
                image: "https://via.placeholder.com/300x180?text=Peas",
                description: "Early spring crop that fixes nitrogen in soil. Plant as soon as soil can be worked.",
                growingPeriod: "60-70 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            }
        ],
        summer: [
            {
                name: "Tomatoes",
                image: "https://via.placeholder.com/300x180?text=Tomatoes",
                description: "Heat-loving crop that produces throughout summer. Needs support and regular feeding.",
                growingPeriod: "70-85 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Peppers",
                image: "https://via.placeholder.com/300x180?text=Peppers",
                description: "Need warm soil and long summer days to develop full flavor and color.",
                growingPeriod: "60-90 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Cucumbers",
                image: "https://via.placeholder.com/300x180?text=Cucumbers",
                description: "Fast-growing vines that thrive in summer heat. Regular harvesting encourages production.",
                growingPeriod: "50-70 days",
                soilTypes: ["Loamy", "Sandy"],
                waterNeeds: "High"
            },
            {
                name: "Eggplant",
                image: "https://via.placeholder.com/300x180?text=Eggplant",
                description: "Heat-loving crop that requires consistent warm temperatures to develop fruit.",
                growingPeriod: "100-120 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Moderate"
            }
        ],
        monsoon: [
            {
                name: "Rice (Paddy)",
                image: "https://via.placeholder.com/300x180?text=Rice",
                description: "Primary monsoon crop. Various varieties suitable for different flooding conditions.",
                growingPeriod: "120-150 days",
                soilTypes: ["Clay", "Clay loam"],
                waterNeeds: "Very High"
            },
            {
                name: "Soybean",
                image: "https://via.placeholder.com/300x180?text=Soybean",
                description: "Important monsoon legume crop. Fixes nitrogen and adapts to various soil types.",
                growingPeriod: "100-120 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Maize (Corn)",
                image: "https://via.placeholder.com/300x180?text=Maize",
                description: "Important monsoon cereal crop. Requires good drainage despite high rainfall.",
                growingPeriod: "80-110 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "High"
            },
            {
                name: "Green Gram (Moong)",
                image: "https://via.placeholder.com/300x180?text=Green+Gram",
                description: "Short-duration pulse crop suitable for monsoon season. Improves soil fertility.",
                growingPeriod: "60-65 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Moderate"
            }
        ],
        autumn: [
            {
                name: "Spinach",
                image: "https://via.placeholder.com/300x180?text=Spinach",
                description: "Cool-season leafy green that grows quickly in fall. Can withstand light frost.",
                growingPeriod: "40-50 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Broccoli",
                image: "https://via.placeholder.com/300x180?text=Broccoli",
                description: "Fall crop that develops better flavor in cooler temperatures. Harvest before hard freeze.",
                growingPeriod: "85-100 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Carrots",
                image: "https://via.placeholder.com/300x180?text=Carrots",
                description: "Root vegetable that sweetens after light frost. Store well in ground until needed.",
                growingPeriod: "70-80 days",
                soilTypes: ["Sandy", "Sandy loam"],
                waterNeeds: "Moderate"
            },
            {
                name: "Kale",
                image: "https://via.placeholder.com/300x180?text=Kale",
                description: "Hardy leafy green that improves flavor after frost. Cut leaves as needed.",
                growingPeriod: "55-75 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            }
        ],
        winter: [
            {
                name: "Winter Wheat",
                image: "https://via.placeholder.com/300x180?text=Winter+Wheat",
                description: "Planted in fall, grows slowly over winter, and harvests in early summer.",
                growingPeriod: "240-270 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Low to Moderate"
            },
            {
                name: "Garlic",
                image: "https://via.placeholder.com/300x180?text=Garlic",
                description: "Plant cloves in fall for harvest next summer. Needs period of cold to develop bulbs.",
                growingPeriod: "240-270 days",
                soilTypes: ["Loamy", "Sandy loam"],
                waterNeeds: "Low"
            },
            {
                name: "Onions",
                image: "https://via.placeholder.com/300x180?text=Onions",
                description: "Winter sowing for long-day varieties. Develops strong root systems before spring growth.",
                growingPeriod: "90-120 days",
                soilTypes: ["Loamy", "Sandy"],
                waterNeeds: "Moderate"
            },
            {
                name: "Peas",
                image: "https://via.placeholder.com/300x180?text=Winter+Peas",
                description: "Cold-tolerant varieties can be planted in late fall/winter in milder climates.",
                growingPeriod: "70-80 days",
                soilTypes: ["Loamy", "Clay loam"],
                waterNeeds: "Moderate"
            }
        ]
    };
    
    // Rice variety data
    const riceVarieties = {
        basmati: {
            name: "Basmati Rice",
            origin: "Indian subcontinent",
            characteristics: "Long grain, aromatic, distinct flavor",
            growingConditions: "Requires warm temperatures between 25-35°C, 100-150 cm annual rainfall",
            growingPeriod: "135-145 days",
            bestSeason: "Kharif season (monsoon)"
        },
        jasmine: {
            name: "Jasmine Rice",
            origin: "Thailand",
            characteristics: "Long grain, fragrant, soft and slightly sticky when cooked",
            growingConditions: "Thrives in tropical climate with temperatures between 25-30°C",
            growingPeriod: "120-140 days",
            bestSeason: "Wet season"
        },
        arborio: {
            name: "Arborio Rice",
            origin: "Italy",
            characteristics: "Short, fat grain with high starch content, ideal for risotto",
            growingConditions: "Prefers moderate temperatures between 20-30°C, needs controlled flooding",
            growingPeriod: "130-150 days",
            bestSeason: "Spring to summer"
        },
        brown: {
            name: "Brown Rice",
            origin: "Global (various varieties)",
            characteristics: "Whole grain rice with bran layer intact, more nutritious",
            growingConditions: "Varies by specific variety, generally needs same conditions as white rice",
            growingPeriod: "110-150 days depending on variety",
            bestSeason: "Varies by region"
        },
        glutinous: {
            name: "Glutinous (Sticky) Rice",
            origin: "Southeast Asia",
            characteristics: "Very sticky when cooked, used in desserts and special dishes",
            growingConditions: "Thrives in tropical and subtropical regions, needs ample water",
            growingPeriod: "120-180 days",
            bestSeason: "Wet season in tropical regions"
        }
    };

    // Calendar data showing optimal growing months for various crops
    const calendarData = [
        {
            crop: "Rice (Paddy)",
            months: [
                {month: "Jan", status: "inactive"},
                {month: "Feb", status: "inactive"},
                {month: "Mar", status: "inactive"},
                {month: "Apr", status: "inactive"},
                {month: "May", status: "inactive"},
                {month: "Jun", status: "active"},
                {month: "Jul", status: "optimal"},
                {month: "Aug", status: "optimal"},
                {month: "Sep", status: "optimal"},
                {month: "Oct", status: "active"},
                {month: "Nov", status: "inactive"},
                {month: "Dec", status: "inactive"}
            ]
        },
        {
            crop: "Wheat",
            months: [
                {month: "Jan", status: "active"},
                {month: "Feb", status: "optimal"},
                {month: "Mar", status: "active"},
                {month: "Apr", status: "inactive"},
                {month: "May", status: "inactive"},
                {month: "Jun", status: "inactive"},
                {month: "Jul", status: "inactive"},
                {month: "Aug", status: "inactive"},
                {month: "Sep", status: "inactive"},
                {month: "Oct", status: "active"},
                {month: "Nov", status: "optimal"},
                {month: "Dec", status: "optimal"}
            ]
        },
        {
            crop: "Corn",
            months: [
                {month: "Jan", status: "inactive"},
                {month: "Feb", status: "inactive"},
                {month: "Mar", status: "active"},
                {month: "Apr", status: "optimal"},
                {month: "May", status: "optimal"},
                {month: "Jun", status: "active"},
                {month: "Jul", status: "active"},
                {month: "Aug", status: "inactive"},
                {month: "Sep", status: "inactive"},
                {month: "Oct", status: "inactive"},
                {month: "Nov", status: "inactive"},
                {month: "Dec", status: "inactive"}
            ]
        },
        {
            crop: "Tomatoes",
            months: [
                {month: "Jan", status: "inactive"},
                {month: "Feb", status: "inactive"},
                {month: "Mar", status: "inactive"},
                {month: "Apr", status: "active"},
                {month: "May", status: "optimal"},
                {month: "Jun", status: "optimal"},
                {month: "Jul", status: "optimal"},
                {month: "Aug", status: "active"},
                {month: "Sep", status: "inactive"},
                {month: "Oct", status: "inactive"},
                {month: "Nov", status: "inactive"},
                {month: "Dec", status: "inactive"}
            ]
        },
        {
            crop: "Potatoes",
            months: [
                {month: "Jan", status: "inactive"},
                {month: "Feb", status: "active"},
                {month: "Mar", status: "optimal"},
                {month: "Apr", status: "optimal"},
                {month: "May", status: "active"},
                {month: "Jun", status: "inactive"},
                {month: "Jul", status: "inactive"},
                {month: "Aug", status: "active"},
                {month: "Sep", status: "optimal"},
                {month: "Oct", status: "active"},
                {month: "Nov", status: "inactive"},
                {month: "Dec", status: "inactive"}
            ]
        }
    ];

    // Initialize the page with spring crops
    loadCropsBySeasonAndClimate('spring', 'temperate');
    
    // Set up event listeners for the season tabs
    const seasonTabs = document.querySelectorAll('.tab-button');
    seasonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            seasonTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Load crops for the selected season
            const season = this.getAttribute('data-season');
            const climate = document.getElementById('climate-zone').value;
            loadCropsBySeasonAndClimate(season, climate);
        });
    });
    
    // Climate zone change event
    document.getElementById('climate-zone').addEventListener('change', function() {
        const activeSeason = document.querySelector('.tab-button.active').getAttribute('data-season');
        const climate = this.value;
        loadCropsBySeasonAndClimate(activeSeason, climate);
    });
    
    // Rice variety selector
    document.getElementById('rice-variety').addEventListener('change', function() {
        const variety = this.value;
        const varietyDetails = document.getElementById('variety-details');
        
        if (variety === 'default') {
            varietyDetails.classList.add('hidden');
            return;
        }
        
        // Display details for the selected rice variety
        const data = riceVarieties[variety];
        varietyDetails.innerHTML = `
            <h4>${data.name}</h4>
            <p><strong>Origin:</strong> ${data.origin}</p>
            <p><strong>Characteristics:</strong> ${data.characteristics}</p>
            <p><strong>Growing Conditions:</strong> ${data.growingConditions}</p>
            <p><strong>Growing Period:</strong> ${data.growingPeriod}</p>
            <p><strong>Growing Period:</strong> ${data.growingPeriod}</p>
            <p><strong>Best Season:</strong> ${data.bestSeason}</p>
        `;
        
        varietyDetails.classList.remove('hidden');
        
        // Update paddy image based on variety
        const paddyImage = document.getElementById('paddy-image');
        paddyImage.src = `https://via.placeholder.com/300x200?text=${data.name.replace(' ', '+')}`;
    });
    
    // Generate crop calendar
    generateCropCalendar();
    
    // Function to load crops by season and climate
    function loadCropsBySeasonAndClimate(season, climate) {
        const cropsContainer = document.getElementById('crops-container');
        cropsContainer.innerHTML = ''; // Clear current crops
        
        // Filter crops based on climate (in a real app, you'd have more complex filtering)
        // For now, we'll just show all crops for the selected season
        const crops = cropData[season];
        
        if (crops && crops.length > 0) {
            crops.forEach(crop => {
                const cropCard = createCropCard(crop);
                cropsContainer.appendChild(cropCard);
            });
        } else {
            cropsContainer.innerHTML = '<p>No crops available for this season.</p>';
        }
    }
    
    // Function to create a crop card
    function createCropCard(crop) {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        
        cropCard.innerHTML = `
            <div class="crop-image" style="background-image: url('${crop.image}')"></div>
            <div class="crop-details">
                <h3>${crop.name}</h3>
                <div>
                    ${crop.soilTypes.map(soil => `<span class="crop-tag">${soil}</span>`).join('')}
                    <span class="crop-tag">${crop.waterNeeds} Water</span>
                </div>
                <p class="growing-period">
                    <strong>Growing Period:</strong> ${crop.growingPeriod}
                </p>
                <p>${crop.description}</p>
            </div>
        `;
        
        return cropCard;
    }
    
    // Function to generate crop calendar
    function generateCropCalendar() {
        const calendarContainer = document.querySelector('.crop-calendar');
        
        // Add calendar headers
        calendarContainer.innerHTML = `
            <div class="calendar-header">Crop</div>
            <div class="calendar-header">Jan</div>
            <div class="calendar-header">Feb</div>
            <div class="calendar-header">Mar</div>
            <div class="calendar-header">Apr</div>
            <div class="calendar-header">May</div>
            <div class="calendar-header">Jun</div>
            <div class="calendar-header">Jul</div>
            <div class="calendar-header">Aug</div>
            <div class="calendar-header">Sep</div>
            <div class="calendar-header">Oct</div>
            <div class="calendar-header">Nov</div>
            <div class="calendar-header">Dec</div>
        `;
        
        // Add rows for each crop
        calendarData.forEach(cropRow => {
            // Add crop name
            const cropNameCell = document.createElement('div');
            cropNameCell.className = 'calendar-crop';
            cropNameCell.textContent = cropRow.crop;
            calendarContainer.appendChild(cropNameCell);
            
            // Add month cells
            cropRow.months.forEach(month => {
                const monthCell = document.createElement('div');
                monthCell.className = `calendar-cell ${month.status}`;
                
                // Add tooltip content
                if (month.status !== 'inactive') {
                    monthCell.setAttribute('title', `${month.status === 'optimal' ? 'Best' : 'Good'} time to grow ${cropRow.crop}`);
                }
                
                // Add visual indicator
                if (month.status === 'optimal') {
                    monthCell.innerHTML = '●';
                } else if (month.status === 'active') {
                    monthCell.innerHTML = '○';
                }
                
                calendarContainer.appendChild(monthCell);
            });
        });
    }
    
    // Add mobile touch support for tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Add animated scroll to CTA button
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // If there's a registration page, navigate to it
        // In a real application, this would navigate to your registration page
        window.location.href = href;
    });

    const climateSelect = document.getElementById('climate-zone');
    const seasonInfo = document.getElementById('season-info');

    const seasonData = {
        spring: {
            crops: ['Wheat', 'Barley', 'Peas', 'Early Paddy'],
            temperature: '15°C - 25°C',
            rainfall: 'Moderate',
            soilPrep: 'Light tillage, add organic matter'
        },
        summer: {
            crops: ['Paddy', 'Maize', 'Cotton', 'Vegetables'],
            temperature: '25°C - 35°C',
            rainfall: 'High',
            soilPrep: 'Deep ploughing, raised beds'
        },
        monsoon: {
            crops: ['Paddy', 'Pulses', 'Groundnut', 'Sugarcane'],
            temperature: '20°C - 30°C',
            rainfall: 'Very High',
            soilPrep: 'Drainage management, bunding'
        },
        autumn: {
            crops: ['Mustard', 'Potato', 'Onion', 'Short-duration Paddy'],
            temperature: '15°C - 25°C',
            rainfall: 'Low to Moderate',
            soilPrep: 'Medium tillage, mulching'
        },
        winter: {
            crops: ['Wheat', 'Pulses', 'Oilseeds', 'Winter Vegetables'],
            temperature: '10°C - 20°C',
            rainfall: 'Low',
            soilPrep: 'Deep ploughing, residue management'
        }
    };

    climateSelect.addEventListener('change', function() {
        const selectedSeason = this.value;
        const data = seasonData[selectedSeason];
        
        if (data) {
            seasonInfo.innerHTML = `
                <div class="season-details">
                    <h3>${selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} Season Details</h3>
                    <div class="info-grid">
                        <div class="info-card">
                            <h4>Recommended Crops</h4>
                            <ul>
                                ${data.crops.map(crop => `<li>${crop}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="info-card">
                            <h4>Growing Conditions</h4>
                            <p><strong>Temperature:</strong> ${data.temperature}</p>
                            <p><strong>Rainfall:</strong> ${data.rainfall}</p>
                            <p><strong>Soil Preparation:</strong> ${data.soilPrep}</p>
                        </div>
                    </div>
                </div>
            `;
            seasonInfo.classList.remove('hidden');
        }
    });

    const registerBtn = document.getElementById('registerBtn');
    
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if user has selected a season
        const selectedSeason = document.getElementById('climate-zone').value;
        
        if (!selectedSeason) {
            alert('Please select a growing season before proceeding to registration');
            return;
        }
        
        // Store selected season for use in registration form
        localStorage.setItem('selectedSeason', selectedSeason);
        
        // Redirect to registration page
        window.location.href = 'afterreg.html';
    });
});