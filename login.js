import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcNCuHKg895O3i5G72z445rQTk9lqTXTE",
    authDomain: "agri-project-38580.firebaseapp.com",
    projectId: "agri-project-38580",
    storageBucket: "agri-project-38580.firebasestorage.app",
    messagingSenderId: "440578896159",
    appId: "1:440578896159:web:c6fb0f8966b8e898e2802a",
    measurementId: "G-JQHM1Y90ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show error message
    function showError(element, errorElement, isValid) {
        if (!isValid) {
            errorElement.style.display = 'block';
            element.parentElement.style.borderColor = '#d32f2f';
            element.parentElement.style.boxShadow = '0 0 0 2px rgba(211, 47, 47, 0.1)';
        } else {
            errorElement.style.display = 'none';
            element.parentElement.style.borderColor = '#2e7d32';
            element.parentElement.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.1)';
        }
    }
    
    // Function to validate form inputs
    function validateForm() {
        let isValid = true;
        
        // Validate email
        const isEmailValid = isValidEmail(emailInput.value);
        showError(emailInput, emailError, isEmailValid);
        if (!isEmailValid) isValid = false;
        
        // Validate password
        const isPasswordValid = passwordInput.value.length >= 6;
        showError(passwordInput, passwordError, isPasswordValid);
        if (!isPasswordValid) isValid = false;
        
        return isValid;
    }
    
    // Add event listeners for real-time validation
    emailInput.addEventListener('input', function() {
        if (emailInput.value) {
            showError(emailInput, emailError, isValidEmail(emailInput.value));
        } else {
            emailError.style.display = 'none';
            emailInput.parentElement.style.borderColor = '#e0e0e0';
            emailInput.parentElement.style.boxShadow = 'none';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value) {
            showError(passwordInput, passwordError, passwordInput.value.length >= 6);
        } else {
            passwordError.style.display = 'none';
            passwordInput.parentElement.style.borderColor = '#e0e0e0';
            passwordInput.parentElement.style.boxShadow = 'none';
        }
    });
    
    // Add focus and blur events for input fields
    const inputFields = document.querySelectorAll('input[type="email"], input[type="password"]');
    
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px rgba(46, 125, 50, 0.1)';
            this.parentElement.style.borderColor = '#2e7d32';
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.style.boxShadow = 'none';
                this.parentElement.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Form submission
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
    
        const email = emailInput.value;
        const password = passwordInput.value;
        
        // Save email if "Remember me" is checked
        if (document.getElementById('remember').checked) {
            localStorage.setItem('farmingHubEmail', email);
        } else {
            localStorage.removeItem('farmingHubEmail');
        }
    
        try {
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            console.log('User logged in:', user);
    
            // Redirect to ov.html after successful login
            window.location.href = 'ov.html';
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed: ' + error.message);
        }
    });
    
    // Check for stored email on page load (for "Remember me" functionality)
    const storedEmail = localStorage.getItem('farmingHubEmail');
    if (storedEmail) {
        emailInput.value = storedEmail;
        document.getElementById('remember').checked = true;
    }
    
    // Add animation to the feature items
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 300 + (index * 200));
    });
});