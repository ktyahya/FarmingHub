import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
    const registerForm = document.getElementById('registerForm');

    function validateForm(event) {
        event.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        // Reset error messages
        resetErrors();

        // Validate form
        let isValid = true;

        if (username.length < 3) {
            showError('usernameError');
            isValid = false;
        }

        if (!isValidEmail(email)) {
            showError('emailError');
            isValid = false;
        }

        if (password.length < 6) {
            showError('passwordError');
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError('confirmPasswordError');
            isValid = false;
        }

        if (!terms) {
            alert('Please accept the terms and conditions');
            isValid = false;
        }

        // If form is valid, proceed with registration
        if (isValid) {
            // Store user data (you can modify this to use your backend)
            localStorage.setItem('user', JSON.stringify({
                username,
                email,
                isRegistered: true
            }));

            // Redirect to midreg.html
            window.location.href = 'midreg.html';
        }

        return false;
    }

    function showError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'block';
    }

    function resetErrors() {
        const errors = document.getElementsByClassName('error-message');
        for (let error of errors) {
            error.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Attach form submit handler
    registerForm.addEventListener('submit', validateForm);

    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    togglePassword.addEventListener('click', () => togglePasswordVisibility(passwordInput, togglePassword));
    toggleConfirmPassword.addEventListener('click', () => togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword));

    function togglePasswordVisibility(input, icon) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }
});