/*----------------------register.html---------------------------*/
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
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