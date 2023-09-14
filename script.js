// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCTAhkbk7LjgDIu5j18EgwGZh7ch_Fw9Cc",
    authDomain: "formulario-f77a0.firebaseapp.com",
    projectId: "formulario-f77a0",
    storageBucket: "formulario-f77a0.appspot.com",
    messagingSenderId: "628428686003",
    appId: "1:628428686003:web:640531103ac34b0b3aa6c6",
    measurementId: "G-XTZZ74F4EE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar campo nombre
    let inputName = document.getElementById('name');
    let errorName = document.getElementById('nameError');

    if (inputName.value.trim() === '') {
        errorName.textContent = 'Por favor, introduce tu nombre';
        errorName.classList.add('error-message');
    } else {
        errorName.textContent = '';
        errorName.classList.remove('error-message');
    }

    // Validar correo electrónico

    let inputEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    
    if (!emailPattern.test(inputEmail.value)) {
        errorEmail.textContent = 'Por favor, introduce un correo válido';
        errorEmail.classList.add('error-message');
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }

    // Validar contraseña

    let inputPassword = document.getElementById('password');
    let errorPassword = document.getElementById('passwordError');
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!passwordPattern.test(inputPassword.value)) {
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y caracteres especiales.';
        errorPassword.classList.add('error-message');
    } else {
        errorPassword.textContent = '';
        errorPassword.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario

    if(!errorName.textContent && !errorEmail.textContent && !errorPassword.textContent) {
        // Backend que recibe la información

        db.collection("users").add({
            name : inputName.value,
            email: inputEmail.value,
            password: inputPassword.value
        })
        .then((docRef) => {
            alert("El formulario se ha enviado correctamente.", docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });

    }

})