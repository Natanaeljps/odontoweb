function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/html/login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}