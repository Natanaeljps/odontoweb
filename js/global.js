

function backLogin() {
    console.log('antes');
    window.location.href = "/html/login.html"
    console.log('depois');
}

function backRegister() {
    console.log('antes');
    window.location.href = "/html/register.html"
    console.log('depois');
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/html/login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}






