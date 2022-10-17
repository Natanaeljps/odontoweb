/*==SE JÁ ESYIVER LOGADO VAI DIRETO PARA HOME===*/
/*firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "/html/home.html";
    }
})*/

/*===CONFIRMAR E-MAIL===*/
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}
/*===CONFIRMAR SENHA===*/
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}


function register() {
    //showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
     //   hideLoading();
        window.location.href = "/html/home.html";
    }).catch(error => {
       // hideLoading();
        alert(getErrorMessage(error));
    })
}


function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

/*===VALIDANDO A SENHA===*/
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

/*===ATIVAR BOTÂO REGISTRAR===*/
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

/*===VALIDANDO O E-MAIL, SENHAS===*/
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

///====================================================

if (!isNewTransaction()) {
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}


function isNewTransaction() {
    return getTransactionUid() ? false : true;
}


function findTransactionByUid(uid) {
    //showLoading();

    firebase.firestore()
        .collection("user")
        .doc(uid)
        .get()
        .then(doc => {
            //hideLoading();
            if (doc.exists) {
                fillTransactionScreen(doc.data());
                toggleSaveButtonDisable();
            } else {
                alert("Documento nao encontrado");
                window.location.href = "../home/home.html";
            }
        })
        .catch(() => {
           // hideLoading();
            alert("Erro ao recuperar documento");
            window.location.href = "../home/home.html";
        });
}









const form = {
    user: ()=>document.getElementById("user"),

    age: ()=>document.getElementById("age"),

    sexM: ()=>document.getElementById("sex-m"),
    sexF: ()=>document.getElementById("sex-f"),
    sexI: ()=>document.getElementById("sex-i"),

    email: () => document.getElementById("email"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    emailInvalidError: () => document.getElementById('email-invalid-error'),

    password: ()=> document.getElementById("password"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    passwordRequiredError: () => document.getElementById("password-required-error"),

    confirmPassword: () => document.getElementById('confirm-password'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    
    registerButton: () => document.getElementById('register-button')    

}