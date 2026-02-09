/**
 * Email validation function
 * @param {string} stringToTest - Email string to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(stringToTest) {
    const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
    // Regex from https://colinhacks.com/essays/reasonable-email-regex
    return emailRegex.test(stringToTest);
}

/**
 * Removes all error messages and ARIA attributes from the form
 */
function removeErrorMessages() {
    // Remove email error
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.remove();
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.removeAttribute('aria-invalid');
        emailInput.removeAttribute('aria-describedby');
    }
    
    // Remove checkbox error
    const checkboxError = document.getElementById('checkbox-error');
    if (checkboxError) {
        checkboxError.remove();
    }
    
    const checkboxes = document.querySelectorAll('input[name="description"]');
    checkboxes.forEach(checkbox => {
        checkbox.removeAttribute('aria-invalid');
        checkbox.removeAttribute('aria-describedby');
    });
}

/**
 * Shows error message for invalid email
 */
function showEmailError() {
    const emailInput = document.getElementById('email');
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.id = 'email-error';
    errorMessage.textContent = 'Please enter a valid email address.';
    
    // Insert error message after the email input
    emailInput.parentNode.appendChild(errorMessage);
    
    // Set ARIA attributes for accessibility
    emailInput.setAttribute('aria-invalid', 'true');
    emailInput.setAttribute('aria-describedby', 'email-error');
    
    // Focus the email input
    emailInput.focus();
}

/**
 * Shows error message for invalid checkboxes
 */
function showCheckboxError() {
    const checkboxes = document.querySelectorAll('input[name="description"]');
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.id = 'checkbox-error';
    errorMessage.textContent = 'Please select at least one option.';
    
    // Insert error message after the checkbox group
    const checkboxGroup = document.querySelector('.checkbox-group');
    checkboxGroup.parentNode.appendChild(errorMessage);
    
    // Set ARIA attributes for all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.setAttribute('aria-invalid', 'true');
        checkbox.setAttribute('aria-describedby', 'checkbox-error');
    });
    
    // Focus the first checkbox
    if (checkboxes.length > 0) {
        checkboxes[0].focus();
    }
}

/**
 * Validates the email input
 * @returns {boolean} True if email is valid
 */
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    
    if (!emailValue || !isValidEmail(emailValue)) {
        showEmailError();
        return false;
    }
    
    return true;
}

/**
 * Validates the checkboxes (at least one must be checked)
 * @returns {boolean} True if at least one checkbox is checked
 */
function validateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="description"]');
    const isAnyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    if (!isAnyCheckboxChecked) {
        showCheckboxError();
        return false;
    }
    
    return true;
}

/**
 * Sets up form validation
 */
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (!form) return; // Form not on this page
    
    form.addEventListener('submit', function(event) {
        // Remove any existing error messages
        removeErrorMessages();
        
        // Validate all inputs
        const isEmailValid = validateEmail();
        const areCheckboxesValid = validateCheckboxes();
        
        // If any validation fails, prevent form submission
        if (!isEmailValid || !areCheckboxesValid) {
            event.preventDefault();
        }
        
        // If all valid, form will submit normally (causing page reload)
    });
}

// Set up form validation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFormValidation);
} else {
    setupFormValidation();
}
