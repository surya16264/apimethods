const loginForm = document.querySelector('#login');
const createAccountForm = document.querySelector('#createAccount');
const linkCreateAccount = document.querySelector('#linkCreateAccount');
const linkLogin = document.querySelector('#linkLogin');
const loginButton = document.querySelector('#login-form-Button');
const createAccountButton = document.querySelector('#signUp-form-button');

let loginUsernameText = document.querySelector('#loginUsername');
let loginPasswordText = document.querySelector('#loginPassword');
let signUpUsernameText = document.querySelector('#signUpUsername');
let signUpEmailText = document.querySelector('#signUpEmail');
let signUpPasswordText = document.querySelector('#signUpPassword');
let signUpConfirmPasswordText = document.querySelector('#signUpConfirmPassword');
let userDetailsArray = [];



// Login and Sign Up form 
linkCreateAccount.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('form-hidden');
    createAccountForm.classList.remove('form-hidden');
})

linkLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('form-hidden');
    createAccountForm.classList.add('form-hidden');
})

/**
 * Add user details to the local storage in sign up form 
 */
createAccountButton.addEventListener('click', (e) => {
    if(signUpUsernameText.value == '' || signUpEmailText.value == '' || signUpPasswordText.value == '' || signUpConfirmPasswordText.value == '') {    
        e.preventDefault();
        setInputMessageError(createAccountForm, "This feilds are required *");
    }
    else if (signUpUsernameText.value.length < 5 || signUpPasswordText.value.length < 5 || signUpConfirmPasswordText.value.length < 5) {
        e.preventDefault();
        setInputError(createAccountForm, "This feilds requires atleast 5 characters");
    }
    else {
        creatingUserDetails(e);
    }
    clearInputFeilds();
});

/**
 * createing User details function
 * @param {*} e 
 */
let creatingUserDetails = (e) => {
    userDetailsArray = JSON.parse(localStorage.getItem('UserDetails'));
         if(userDetailsArray == null) {
             userDetailsArray = [];
         }
        if(signUpPasswordText.value === signUpConfirmPasswordText.value) {
            let userDetails = {
                Username : signUpUsernameText.value,
                Email : signUpEmailText.value,
                Password : signUpPasswordText.value,
                ConfirmPassword : signUpConfirmPasswordText.value
            }
            userDetailsArray.push(userDetails);
            localStorage.setItem('UserDetails', JSON.stringify(userDetailsArray));
            sessionStorage.setItem('LoginUser', JSON.stringify(userDetails));
            window.location.href = "./FetchDataInApi/index.html";    
        }
        else {
            e.preventDefault();
            setInputPasswordError(createAccountForm, "Both Password and Confirm Password should be same");
        }
}

/**
 * login form checking with user details in local storage
 */

loginButton.addEventListener('click', (e) => { 
    if(loginUsernameText.value == '' || loginPasswordText.value == '') {
        e.preventDefault();
        setInputMessageError(loginForm,"This feilds are required *");
    }
    else {
        findingUserLogin(e);
    }
});

/**
 * Finding user login Function
 * @param {*} e
 */

let findingUserLogin = (e) => {
    let loginDetails = JSON.parse(localStorage.getItem('UserDetails'));
        let userFind;
        let user = {};
        loginDetails.filter(data => {
            if(data.Email === loginUsernameText.value || data.Username === loginUsernameText.value && data.Password === loginPasswordText.value) {
                    userFind = true;
                     user = {
                        Username : loginUsernameText.value
                    }      
            }
        }); 
        if(userFind) {
            sessionStorage.setItem('LoginUser', JSON.stringify(user));
            window.location.href = "./FetchDataInApi/index.html";
        }
        else {
            e.preventDefault();
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
        clearInputFeilds();
}

/**
 * Clear the input feilds after clicking login or create account button
 */

let clearInputFeilds = () => {
    document.querySelectorAll('.form-input').forEach(element => {
        element.value = '';
    })
}

/**
 * Login form Error message
 * @param {*} loginForm 
 * @param {*} type 
 * @param {*} message 
 */

let setFormMessage = (loginForm, type, message) => {
    const messageElement = loginForm.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message-${type}`);
}

/**
 * This feilds requires atleast 5 characters error message
 * @param {*} inputElement 
 * @param {*} message 
 */

let setInputError = (inputElement, message) => {
    inputElement.querySelectorAll('.form-input-text').forEach(element => {
        element.classList.add('form-input-error');
    });
    inputElement.querySelectorAll('.error-message').forEach(element => {
        element.textContent = message;
    });
}

/**
 * This feild is required error message in login and Sign Up from
 * @param {*} elementType 
 * @param {*} Message 
 */

let setInputMessageError = (elementType, Message) => {
    elementType.querySelectorAll('.form-input-group').forEach(element => {
        element.querySelector('.form-input').classList.add("form-input-error");
        element.querySelector('.form-input-error-message').textContent = Message;
    })
}

/**
 * Password and Confirm password should be same error message
 * @param {*} elementType 
 * @param {*} Message 
 */

let setInputPasswordError = (elementType, Message) => {
    document.querySelector('#signUpPassword').classList.add("form-input-error");
    document.querySelector('#signUpConfirmPassword').classList.add("form-input-error");
    elementType.querySelectorAll('#form-input-error-message').forEach(element => {
        element.textContent = Message;
    });
}

/**
 * Show and Hide password toggle button
 */

 const passwordToggleButton = document.getElementById("password-visibility");
 passwordToggleButton.addEventListener('click', () => {
     (loginPasswordText.type === "password") ? loginPasswordText.type = "text" : loginPasswordText.type = "password";
 });

