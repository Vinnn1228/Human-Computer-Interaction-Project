// event-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modelRegistrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const birthDateInput = document.getElementById('birthDate');
    const genderRadios = document.getElementsByName('gender');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');

    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const birthDateError = document.getElementById('birthDateError');
    const genderError = document.getElementById('genderError');
    const termsError = document.getElementById('termsError');

    form.addEventListener('submit', function(event) {
        // Prevent default submission to validate first
        event.preventDefault();
        let isValid = true;

        clearErrors();

        // 1. Full Name Validation: Cannot be empty and must contain at least two words (simple space check)
        const nameValue = fullNameInput.value.trim();
        const nameParts = nameValue.split(' ');
        if (nameValue === '') {
            displayError(fullNameError, 'Full name is required.');
            isValid = false;
        } else if (nameParts.length < 2 || nameParts.some(part => part.length === 0)) {
            // Check if any part is empty string, e.g. "John  Doe"
            displayError(fullNameError, 'Please enter both first and last name.');
            isValid = false;
        }

        // 2. Email Validation: Cannot be empty and must contain "@" and "." after "@"
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            displayError(emailError, 'Email address is required.');
            isValid = false;
        } else {
            const atSymbolIndex = emailValue.indexOf('@');
            const dotSymbolIndex = emailValue.lastIndexOf('.');
            // Check if "@" exists, "." exists, "@" is not the first char,
            // "." is after "@" and there's at least one char between "@" and "."
            // and at least one char after "."
            if (atSymbolIndex < 1 || dotSymbolIndex < atSymbolIndex + 2 || dotSymbolIndex + 2 >= emailValue.length) {
                displayError(emailError, 'Please enter a valid email address (e.g., name@domain.com).');
                isValid = false;
            }
        }

        // 3. Birth Date Validation: Cannot be empty and participant must be at least 18 years old.
        if (birthDateInput.value === '') {
            displayError(birthDateError, 'Birth date is required.');
            isValid = false;
        } else {
            const birthDate = new Date(birthDateInput.value);
            const today = new Date();
            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                displayError(birthDateError, 'You must be at least 18 years old to register.');
                isValid = false;
            } else if (birthDate > today) { // Bonus: Check if birth date is not in the future
                displayError(birthDateError, 'Birth date cannot be in the future.');
                isValid = false;
            }
        }

        // 4. Gender Validation: One option must be selected.
        let genderSelected = false;
        for (let i = 0; i < genderRadios.length; i++) {
            if (genderRadios[i].checked) {
                genderSelected = true;
                break;
            }
        }
        if (!genderSelected) {
            displayError(genderError, 'Please select your gender.');
            isValid = false;
        }

        // 5. Terms and Conditions Validation: Must be checked.
        if (!termsCheckbox.checked) {
            displayError(termsError, 'You must agree to the terms and conditions.');
            isValid = false;
        }

        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            alert('Form submitted successfully! (This is a demo - no data is actually sent)');
            // In a real application, you would submit the form data here, e.g., using fetch()
            // form.submit(); // This would be for traditional form submission
            setTimeout(() => { // Simulate submission
               form.reset();
               submitBtn.disabled = false;
               submitBtn.textContent = 'Submit Application';
            }, 2000);
        }
    });

    function displayError(element, message) {
        element.textContent = message;
    }

    function clearErrors() {
        fullNameError.textContent = '';
        emailError.textContent = '';
        birthDateError.textContent = '';
        genderError.textContent = '';
        termsError.textContent = '';
    }
});