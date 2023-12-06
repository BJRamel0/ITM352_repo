/*----------------------register.html---------------------------*/

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
    // Get the password and repeat password input values
    const passwordInput = document.getElementById("password").value;
    const repeatPasswordInput = document.getElementById("repeatPassword").value;

    // Get the error message container
    const repeatPassError = document.getElementById("repeatPassError");

    // Check if the passwords match
    if (passwordInput === repeatPasswordInput || passwordInput == "") {
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
