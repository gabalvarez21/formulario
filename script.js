

const firebaseConfig = {
    apiKey: "AIzaSyB6jwkmjuc1QD_CtwSxftNvlfIphQ6Sgi0",
    authDomain: "datosformulario-de1a6.firebaseapp.com",
    projectId: "datosformulario-de1a6",
    storageBucket: "datosformulario-de1a6.appspot.com",
    messagingSenderId: "945692714691",
    appId: "1:945692714691:web:401cd2bb2cde2a4f512476",
    measurementId: "G-QVBBHB5WFD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce tu nombre'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayusculas y minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
    }
})