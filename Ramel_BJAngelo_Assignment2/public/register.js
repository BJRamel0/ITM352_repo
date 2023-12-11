/*----------------------register.html---------------------------*/
// Retrieve error message from the query parameters
const urlParams = new URLSearchParams(window.location.search);

// Retrieve values from the query parameters or set default values if not present
let user_firstName = urlParams.get('firstName') || "";
let user_lastName = urlParams.get('lastName') || "";
let user_email = urlParams.get('email') || "";
let errorMessage = urlParams.get('error') || "";

// Set the value of the username field to the value from the query parameters
document.getElementById("firstName").value = decodeURIComponent(user_firstName);
document.getElementById("lastName").value = decodeURIComponent(user_lastName);
document.getElementById("email").value = decodeURIComponent(user_email);

// Set the error message in the errMsg div if present
if (errorMessage) {
    document.getElementById("errMsg").innerHTML = decodeURIComponent(errorMessage);
}

function validateFirstName() {
    document.getElementById("errMsg").innerHTML = "";
    // Get the first name input value
    const firstNameInput = document.getElementById("firstName").value;

    // Get the error message container
    const firstNameError = document.getElementById("firstNameError");

    // Regular expression for first name validation
    const nameRegex = /^[a-zA-Z]{2,30}$/;

    if (nameRegex.test(firstNameInput) || firstNameInput === "") {
        // First name is valid, hide the error message
        firstNameError.innerHTML = "";
        // Perform other actions or submit the form
        console.log("First name is valid. You can proceed with the form submission.");
        // Uncomment the line below to submit the form
        // document.forms[0].submit();
    } else {
        // First name is not in the correct format, display an error message
        firstNameError.innerHTML = "Invalid first name. Please enter a name between 2 and 30 characters containing only letters.";
    }
}

function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let repeatPasswordInput = document.getElementsByName('repeat_password')[0];
    let showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
        repeatPasswordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
        repeatPasswordInput.type = 'password';
    }
}

function validateEmail() {
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

function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswords() {
    document.getElementById("errMsg").innerHTML = "";
    // Get the password and repeat password input values
    const passwordInput = document.getElementById("password").value;
    const repeatPasswordInput = document.getElementById("repeatPassword").value;

    // Get the error message container
    const repeatPassError = document.getElementById("repeatPassError");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    if (passwordRegex.test(passwordInput) || passwordInput == "") {
        PassError.innerHTML = "";
    } else {
        PassError.innerHTML = 'Invalid password format. Password must be 10-16 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character.';

    }

    // Check if the passwords match
    if (passwordInput === repeatPasswordInput ||  repeatPasswordInput == "" ) {
        // Passwords match, hide the error message
        repeatPassError.innerHTML = "";
        // Perform other actions or submit the form
        console.log("Passwords match. You can proceed with the form submission.");
        // Uncomment the line below to submit the form
        // document.forms[0].submit();
    } else {
        // Passwords do not match, display an error message
        repeatPassError.innerHTML = "Passwords do not match.";
    }
}
