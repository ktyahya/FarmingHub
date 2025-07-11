document.addEventListener('DOMContentLoaded', function() {
    const farmerForm = document.getElementById('farmerForm');
    const successMessage = document.getElementById('successMessage');
    const newRegistrationBtn = document.getElementById('newRegistration');
    const farmerTypeSelect = document.getElementById('farmerType');
    const experienceRow = document.getElementById('experienceYearsRow');
    const experienceInput = document.getElementById('experience');
    
    // Form validation and submission
    farmerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            fullName: document.getElementById('fullName').value,
            location: document.getElementById('location').value,
            age: document.getElementById('age').value,
            experience: document.getElementById('experience').value,
            soilType: document.getElementById('soilType').value,
            cropType: document.getElementById('cropType').value,
            acres: document.getElementById('acres').value,
            organicFarming: document.getElementById('organicFarming').checked
        };
        
        // Validate form
        if (validateForm(formData)) {
            // Submit form (you can add AJAX functionality here to send data to server)
            console.log('Form data:', formData);
            
            // Show success message and hide form
            farmerForm.closest('.card').style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // For demo purposes: Store in localStorage
            localStorage.setItem('farmerData', JSON.stringify(formData));
        }
    });
    
    // Reset form and go back to registration
    newRegistrationBtn.addEventListener('click', function() {
        farmerForm.reset();
        farmerForm.closest('.card').style.display = 'block';
        successMessage.classList.add('hidden');
    });
    
    // Field validation with visual feedback
    const inputFields = farmerForm.querySelectorAll('input, select');
    inputFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Helper functions
    function validateForm(data) {
        let isValid = true;
        
        // Validate each field
        if (!data.fullName.trim()) {
            showError('fullName', 'Please enter your full name');
            isValid = false;
        }
        
        if (!data.location.trim()) {
            showError('location', 'Please enter your location');
            isValid = false;
        }
        
        if (!data.age || data.age < 18 || data.age > 120) {
            showError('age', 'Please enter a valid age between 18 and 120');
            isValid = false;
        }
        
        if (data.experience === '' || isNaN(data.experience) || data.experience < 0) {
            showError('experience', 'Please enter valid years of experience');
            isValid = false;
        }
        
        if (!data.soilType) {
            showError('soilType', 'Please select a soil type');
            isValid = false;
        }
        
        if (!data.cropType) {
            showError('cropType', 'Please select a crop type');
            isValid = false;
        }
        
        if (!data.acres || data.acres <= 0) {
            showError('acres', 'Please enter a valid farm size in acres');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        // Remove any existing error messages
        clearError(field.id);
        
        // Validate based on field type
        if (field.value.trim() === '') {
            if (field.required) {
                showError(field.id, `This field is required`);
            }
        } else if (field.type === 'number') {
            if (field.id === 'age' && (field.value < 18 || field.value > 120)) {
                showError(field.id, 'Age must be between 18 and 120');
            } else if (field.id === 'acres' && field.value <= 0) {
                showError(field.id, 'Farm size must be greater than 0');
            } else if (field.id === 'experience' && field.value < 0) {
                showError(field.id, 'Experience cannot be negative');
            }
        }
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        clearError(fieldId);
        
        // Add error styling
        field.style.borderColor = 'var(--error-color)';
        field.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
        
        // Create and insert error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.innerHTML = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = '';
        field.style.backgroundColor = '';
        
        // Remove error message if exists
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    farmerTypeSelect.addEventListener('change', function() {
        if (this.value === 'experienced') {
            experienceRow.style.display = 'flex';
            experienceInput.required = true;
        } else {
            experienceRow.style.display = 'none';
            experienceInput.required = false;
            experienceInput.value = '';
        }
    });

    // Update form validation
    document.getElementById('farmerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (farmerTypeSelect.value === 'experienced' && !experienceInput.value) {
            alert('Please enter your years of experience');
            return;
        }
        // Continue with form submission...
    });

    // Show/hide experience years based on farmer type
    farmerTypeSelect.addEventListener('change', function() {
        experienceRow.style.display = 
            this.value === 'experienced' ? 'block' : 'none';
    });

    farmerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            location: document.getElementById('location').value,
            age: document.getElementById('age').value,
            farmerType: document.getElementById('farmerType').value,
            cropType: document.getElementById('cropType').value,
            acres: document.getElementById('acres').value,
            organicFarming: document.getElementById('organicFarming').checked
        };

        // Add experience years if farmer is experienced
        if (formData.farmerType === 'experienced') {
            formData.experience = document.getElementById('experience').value;
        }

        // Store farmer data in localStorage
        localStorage.setItem('farmerData', JSON.stringify(formData));

        // Show success message briefly
        successMessage.classList.remove('hidden');
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
            window.location.href = 'ov.html';
        }, 1500);
    });

    // Clear form button handler
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        farmerForm.reset();
        experienceYearsRow.style.display = 'none';
    });
});