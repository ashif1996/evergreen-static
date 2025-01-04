document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    validateLoginForm();
    validateContactForm();
    validateRegisterForm();
});

function loadContent(containerId, contentUrl) {
    const container = document.getElementById(containerId);

    if (container) {
        fetch(contentUrl)
            .then((response) => response.text())
            .then((contentData) => {
                container.innerHTML = contentData;
            })
            .catch((error) => {
                console.error(`Error Loading content for ${containerId}:`, error)
            });
    }
}

function loadNavbar() {
    loadContent('navbar-container', 'navbar.html');
}

function loadFooter() {
    loadContent('footer-container', 'footer.html');
}

function validateLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        let username;
        let password;

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        username = document.getElementById('username').value;
        password = document.getElementById('password').value;

        if (username === '' && password === '') {
            showLoginErrorMessage();
        } else if (username === '' || password === '') {
            loginErrorMessage();
        }  else {
            submitLoginForm();
        }
    });

    function showLoginErrorMessage() {
        showMessage('errorMessage', 'successMessage', 'loginErrorMessage');
    }

    function loginErrorMessage() {
        showMessage('loginErrorMessage', 'errorMessage', 'successMessage');
    }

    function submitLoginForm() {
        if (username && password) {
            let loginData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

            console.log('You have been verified:', loginData);
            showLoginSuccessMessage();
        }
    }

    function showLoginSuccessMessage() {
        showMessage('successMessage', 'errorMessage', 'loginErrorMessage');
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
    
            if (validateForm()) {
                submitContactForm();
            } else {
                showErrorMessage();
            }
        });
    
        function validateName() {
            const nameInput = document.getElementById('messageName');
            const messageNameError = document.getElementById('messageNameError');
            let name = nameInput.value.trim();
    
            if (name === '') {
                messageNameError.textContent = 'Name is required';
                return false;
            } else if (!isNaN(name)) {
                messageNameError.textContent = 'Name should not be a number';
                return false;
            } else if (!name.match(/^[A-Za-z]+\s[A-Za-z]+$/)) {
                messageNameError.textContent = 'Full name required';
                return false;
            } else {
                messageNameError.textContent = '';
                return true;
            } 
        }
    
        function validateEmail() {
            const emailInput = document.getElementById('messageEmail');
            const messageEmailError = document.getElementById('messageEmailError');
            let email = emailInput.value.trim();
    
            if (email === '') {
                messageEmailError.textContent = 'Email is required';
                return false;
            } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                messageEmailError.textContent = 'Invalid email address';
                return false;
            } else {
                messageEmailError.textContent = '';
                return true;
            } 
        }
    
        function validateMessage() {
            const messageInput = document.getElementById('messageContent');
            const messageContentError = document.getElementById('messageContentError');
            let message = messageInput.value.trim();
            
            if (message === '') {
                messageContentError.textContent = 'Message is required';
                return false;
            } else if (message.length < 20) {
                messageContentError.textContent = 'Message must be at least 20 characters long.';
            } else {
                messageContentError.textContent = '';
                return true;
            }
        }
    
        function validateForm() {
            return validateName() && validateEmail() && validateMessage();
        }
    
        function submitContactForm() {
            let formData = {
                name: document.getElementById('messageName').value,
                email: document.getElementById('messageEmail').value,
                message: document.getElementById('messageContent').value
            };
        
            console.log('Form submitted successfully:', formData);
            showSuccessMessage();
        }
        
    
        function showErrorMessage() {
            showMessage('submitErrorMessage', 'submitSuccessMessage');
        }
    
        function showSuccessMessage() {
            showMessage('submitSuccessMessage', 'submitErrorMessage');
        }
    }
}

function validateRegisterForm() {
    const registerForm = document.getElementById('registerform');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (validateRegisterForm()) {
                submitRegisterForm();
            } else {
                showRegisterFormErrorMessage();
            }
        });

        function validateFirstName() {
            const firstNameInput = document.getElementById('firstname');
            let firstName = firstNameInput.value.trim();

            if (firstName === '') {
                document.getElementById('firstNameError').innerHTML = 'First Name is required.';
                return false;
            } else if (!isNaN(firstName)) {
                document.getElementById('firstNameError').innerHTML = 'First Name should not be a number.';
                return false;
            } else if (!/^[A-Za-z]+$/.test(firstName)) {
                document.getElementById('firstNameError').innerHTML = 'Please enter a valid First Name.';
                return false;
            } else {
                document.getElementById('firstNameError').innerHTML = '';
                return true;
            }
        }

        function validateSecondName() {
            const secondNameInput = document.getElementById('secondname');
            let secondName = secondNameInput.value.trim();

            if (secondName === '') {
                document.getElementById('secondNameError').innerHTML = 'Second Name is required.';
                return false;
            } else if (!isNaN(secondName)) {
                document.getElementById('secondNameError').innerHTML = 'Second Name should not be a number.';
                return false;
            } else if (!/^[A-Za-z]+$/.test(secondName)) {
                document.getElementById('secondNameError').innerHTML = 'Please enter a valid Second Name.';
                return false;
            } else {
                document.getElementById('secondNameError').innerHTML = '';
                return true;
            }
        }

        function validateUserName() {
            const userNameInput = document.getElementById('username');
            let userName = userNameInput.value.trim();

            if (userName === '') {
                document.getElementById('userNameError').innerHTML = 'User Name is required.';
                return false;
            } else if (!/^[A-Za-z0-9]+$/.test(userName)) {
                document.getElementById('userNameError').innerHTML = 'User Name should contain only letters and numbers.';
                return false;
            } else {
                document.getElementById('userNameError').innerHTML = '';
                return true;
            }
        }

        function validateRegisterEmail() {
            const registerEmailInput = document.getElementById('registerEmail');
            let registerEmail = registerEmailInput.value.trim();

            if (registerEmail === '') {
                document.getElementById('emailError').innerHTML = 'Email is required.';
                return false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
                document.getElementById('emailError').innerHTML = 'Invalid email address.';
                return false;
            } else {
                document.getElementById('emailError').innerHTML = '';
                return true;
            }
        }

        function validatePassword() {
            const passwordInput = document.getElementById('password');
            const repasswordInput = document.getElementById('repassword');
            const passwordError = document.getElementById('passwordError');
            const repasswordError = document.getElementById('repasswordError');
            let password = passwordInput.value.trim();
            let repassword = repasswordInput.value.trim();

            if (password === '') {
                passwordError.textContent = 'Password is required.';
                return false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(password)) {
                passwordError.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
                return false;
            } else if (password.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters long.';
                return false;
            } else {
                passwordError.textContent = '';
            }

            if (repassword !== password) {
                repasswordError.textContent = 'Passwords do not match.';
                return false;
            } else {
                repasswordError.textContent = '';
            }
            return true;
        }

        function validateTerms() {
            const termsCheckbox = document.getElementById('termsCheckbox');
            const termsError = document.getElementById('termsError');
        
            if (!termsCheckbox.checked) {
                termsError.textContent = 'You must accept the terms and conditions.';
                return false;
            } else {
                termsError.textContent = '';
                return true;
            }
        }
        
        function validateRegisterForm() {
            return validateFirstName() && validateSecondName() && validateUserName() && validateRegisterEmail() && validatePassword() && validateTerms();
        }

        function submitRegisterForm() {
            let registerData = {
                FirstName: document.getElementById('firstname').value,
                SecondName: document.getElementById('secondname').value,
                Username: document.getElementById('username').value,
                Email: document.getElementById('registerEmail').value,
                Password: document.getElementById('password').value,
                RePassword: document.getElementById('repassword').value
            }

            console.log('You have registered successfully:', registerData);
            showRegisterFormSuccessMessage();
        }

        function showRegisterFormErrorMessage() {
            showMessage('submitRegisterErrorMessage', 'submitRegisterSuccessMessage');
        }

        function showRegisterFormSuccessMessage() {
            showMessage('submitRegisterSuccessMessage', 'submitRegisterErrorMessage');
        }
    }
}

function showMessage(showId, ...hideIds) {
    const showElement = document.getElementById(showId);

    if (showElement) {
        showElement.classList.remove('d-none');
    }

    hideIds.forEach(id => {
        const hideElement = document.getElementById(id);

        if (hideElement) {
            hideElement.classList.add('d-none');
        }
    });
}