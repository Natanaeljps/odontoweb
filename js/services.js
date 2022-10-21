

//========


function btEmergency() {
    //showLoading();

    const care = {
        type: form.emergency().checked ? 'emergency' : 'consulta',
        name: form.name().value,
        age: form.age().value,
        phone: form.phone().value,
        user:{
            uid: firebase.auth().currentUser.uid,
        }
    }
    firebase.firestore()
    .collection('cares')
    .add(care)
    .then(()=>{
        window.location.href = "/html/emergency.html";
    })
    .catch(()=>{
        alert("erro ao salva atendimento")
    })
}


  

const form = {
    name: ()=>document.getElementById("name"),
    age: ()=>document.getElementById("age"),
    phone: ()=>document.getElementById("phone"),

    emergency: ()=>document.getElementById("emergency"),
    appo: ()=>document.getElementById("appo"),
    btEmerg: ()=>document.getElementById("bt-sos"),
    btAppi: ()=>document.getElementById("bt-appo"),
    
}