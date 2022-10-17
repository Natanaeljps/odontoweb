/*==SE JÁ ESYIVER LOGADO VAI DIRETO PARA HOME===*/
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "/html/home.html";
    }
})

/*===CONFIRMAR E-MAIL===*/
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}
/*===CONFIRMAR SENHA===*/
function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}


/*===Função login===*/
function login() {
    //showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
       // hideLoading();
        window.location.href = "/html/home.html";
    }).catch(error => {
       // hideLoading();
        alert(getErrorMessage(error));
    });
}

/*===recuperação de senha===*/
function recoverPassword() {
    //showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
       // hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
       // hideLoading();
        alert(getErrorMessage(error));
    });
}

/*===MENSSAGEM DE ERRO===*/
function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}






const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),

    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),

    recoverPasswordButton: () => document.getElementById("recover-password-button"),
    
    loginButton: () => document.getElementById("login-button"),
} 