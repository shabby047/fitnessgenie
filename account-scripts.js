// account-scripts.js

// Function to handle form submission for signup
document.getElementById('signup-form-fields').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const gender = document.getElementById('signup-gender').value;

    // Save user data to localStorage
    saveUserData(name, email, password, gender);
});

// Function to handle form submission for login
document.getElementById('login-form-fields').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Fetch user data from localStorage and attempt login
    login(email, password);
});

// Function to save user data to localStorage
function saveUserData(name, email, password, gender) {
    // Simulated user data array (replace with actual database logic)
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];

    // Check if user with same email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('User with this email already exists. Please use a different email.');
        return;
    }

    // Add new user to the array
    const newUser = { name, email, password, gender };
    users.push(newUser);

    // Save updated user data array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! Please log in to access your account.');
}

// Function to handle user login
function login(email, password) {
    // Fetch user data from localStorage
    const users = localStorage.getItem('users');
    if (!users) {
        alert('No users found. Please sign up to create an account.');
        return;
    }

    // Check if entered email and password match any user
    const user = JSON.parse(users).find(user => user.email === email && user.password === password);
    if (user) {
        // Show user info and hide login/signup forms
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-gender').textContent = 'Gender: ' + user.gender;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

// Show login form on click
document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('user-info').style.display = 'none';
});

// Show signup form on click
document.getElementById('signup-btn').addEventListener('click', function() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('user-info').style.display = 'none';
});
