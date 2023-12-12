/*----------------------login.js---------------------------*/
// Retrieve error message from the query parameters
const urlParams = new URLSearchParams(window.location.search);

// Get user email and error message from query parameters, or set default values
let user_email = urlParams.get('email') || "";
let errorMessage = urlParams.get('error') || "";

// Set the value of the email input field to the user's email
document.getElementById("email").value = decodeURIComponent(user_email);

// Set the error message in the errMsg div if present
if (errorMessage) {
    document.getElementById("errMsg").innerHTML = decodeURIComponent(errorMessage);
}

// Function to toggle password visibility
function togglePasswordVisibility() {
    // Get the password input and showPassword checkbox elements
    let passwordInput = document.getElementById('password');
    let showPasswordCheckbox = document.getElementById('showPassword');

    // Toggle the password input type between text and password
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Function to validate email format
function validateEmail() {
    // Clear existing error messages
    document.getElementById("errMsg").innerHTML = "";

    // Get the email input value
    const emailInput = document.getElementById("email").value;

    // Get the email error message container
    const emailError = document.getElementById("emailError");

    // Check if the email is in the correct format
    if (isValidEmail(emailInput) || emailInput == "") {
        // Email is valid, hide the error message
        emailError.innerHTML = "";
        // Perform other actions or submit the form
        console.log("Email is valid. You can proceed with the form submission.");
        // Uncomment the line below to submit the form
        // document.forms[0].submit();
    } else {
        // Email is not in the correct format, display an error message
        emailError.innerHTML = "Please enter a valid email address.";
    }
}

// Function to check if an email is in a valid format using a regular expression
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}