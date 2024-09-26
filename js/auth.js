

// Function to handle login
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password. Try again.");
    }
}

// Function to handle registration
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword && password.length >= 6) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert("Passwords do not match or are too short. Try again.");
    }
}
