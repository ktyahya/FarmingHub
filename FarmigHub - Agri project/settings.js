document.addEventListener('DOMContentLoaded', function() {
    // Handle profile picture change
    const changePhotoBtn = document.getElementById('change-photo');
    changePhotoBtn.addEventListener('click', function() {
        // Simulate file input click
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();

        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-pic').src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    });

    // Handle form submission
    const saveBtn = document.querySelector('.save-btn');
    saveBtn.addEventListener('click', function() {
        // Collect all form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            farmName: document.getElementById('farm-name').value,
            location: document.getElementById('location').value,
            farmSize: document.getElementById('farm-size').value,
            language: document.getElementById('language').value,
            tempUnit: document.getElementById('temp-unit').value,
            notifications: {
                email: document.getElementById('email-notif').checked,
                weather: document.getElementById('weather-notif').checked,
                task: document.getElementById('task-notif').checked
            }
        };

        // Save to localStorage for demo purposes
        localStorage.setItem('userSettings', JSON.stringify(formData));
        
        // Show success message
        alert('Settings saved successfully!');
    });

    // Handle cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', function() {
        if(confirm('Are you sure you want to discard changes?')) {
            location.href = 'ov.html'; // Redirect to dashboard
        }
    });

    // Handle password change
    const changePasswordBtn = document.querySelector('.change-password-btn');
    changePasswordBtn.addEventListener('click', function() {
        // Add your password change logic here
        alert('Password change functionality will be implemented soon.');
    });

    // Handle 2FA
    const enable2FABtn = document.querySelector('.enable-2fa-btn');
    enable2FABtn.addEventListener('click', function() {
        // Add your 2FA logic here
        alert('Two-factor authentication will be implemented soon.');
    });

    // Load saved settings if they exist
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        // Populate form fields with saved data
        Object.keys(settings).forEach(key => {
            if (document.getElementById(key)) {
                document.getElementById(key).value = settings[key];
            }
        });
    }
});