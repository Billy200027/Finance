// ========================================
// CONFIGURACIÓN
// ========================================
// URL proporcionada por Google Apps Script tras publicar el proyecto como Aplicación Web.
// Sustituye esta cadena con tu URL real cuando despliegues tu API.
const API_URL = "PEGAR_AQUI_URL_DE_GOOGLE_APPS_SCRIPT";

// ========================================
// REFERENCIAS AL DOM
// ========================================
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const globalMessage = document.getElementById("globalMessage");
const soundToggle = document.getElementById("soundToggle");

// ========================================
// UTILIDAD DE AUDIO (Efecto de interacción)
// ========================================
/**
 * Reproduce un tono corto y agradable mediante la Web Audio API si está activado.
 * Esto evita cargar archivos de audio externos (mp3/wav) y garantiza funcionamiento inmediato.
 */
function playClickSound() {
    if (!soundToggle.checked) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Nota D5
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08); // Subida a A5
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
        // Silenciar errores si el navegador bloquea AudioContext sin interacción previa
    }
}

// ========================================
// CAMBIO ENTRE LOGIN Y REGISTRO (Pestañas)
// ========================================
function switchTab(targetTab) {
    playClickSound();
    hideGlobalMessage();

    if (targetTab === 'login') {
        tabLogin.classList.add("tab-active");
        tabLogin.setAttribute("aria-selected", "true");
        tabRegister.classList.remove("tab-active");
        tabRegister.setAttribute("aria-selected", "false");

        loginSection.classList.remove("hidden");
        registerSection.classList.add("hidden");
    } else {
        tabRegister.classList.add("tab-active");
        tabRegister.setAttribute("aria-selected", "true");
        tabLogin.classList.remove("tab-active");
        tabLogin.setAttribute("aria-selected", "false");

        registerSection.classList.remove("hidden");
        loginSection.classList.add("hidden");
    }
}

tabLogin.addEventListener("click", () => switchTab('login'));
tabRegister.addEventListener("click", () => switchTab('register'));

// ========================================
// MANEJO DE MENSAJES GLOBAL Y ERRORES DE INPUT
// ========================================
function showMessage(text, type) {
    globalMessage.textContent = text;
    globalMessage.className = `message message-${type}`;
}

function hideGlobalMessage() {
    globalMessage.textContent = "";
    globalMessage.className = "message hidden";
}

function setFieldError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldErrors() {
    const errorTexts = document.querySelectorAll(".error-text");
    errorTexts.forEach(el => el.textContent = "");
}

// ========================================
// VALIDACIÓN
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// ESTADO DE CARGA EN BOTONES
// ========================================
function setLoading(buttonElement, isLoading) {
    const btnText = buttonElement.querySelector(".btn-text");
    const spinner = buttonElement.querySelector(".spinner");

    if (isLoading) {
        buttonElement.disabled = true;
        btnText.classList.add("hidden");
        spinner.classList.remove("hidden");
    } else {
        buttonElement.disabled = false;
        btnText.classList.remove("hidden");
        spinner.classList.add("hidden");
    }
}

// ========================================
// REGISTRO
// ========================================
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    playClickSound();
    clearFieldErrors();
    hideGlobalMessage();

    const user = document.getElementById("regUser").value.trim();
    const name = document.getElementById("regName").value.trim();
    const lastName = document.getElementById("regLastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    let isValid = true;

    if (!user) {
        setFieldError("regUserError", "El usuario es obligatorio.");
        isValid = false;
    }
    if (!name) {
        setFieldError("regNameError", "El nombre es obligatorio.");
        isValid = false;
    }
    if (!lastName) {
        setFieldError("regLastNameError", "El apellido es obligatorio.");
        isValid = false;
    }
    if (!email || !validateEmail(email)) {
        setFieldError("regEmailError", "Introduce un correo electrónico válido.");
        isValid = false;
    }
    if (!password || password.length < 6) {
        setFieldError("regPasswordError", "La contraseña debe tener al menos 6 caracteres.");
        isValid = false;
    }

    if (!isValid) return;

    const registerBtn = document.getElementById("registerBtn");
    setLoading(registerBtn, true);

    const payload = {
        action: "register",
        user: user,
        password: password,
        name: name,
        lastName: lastName,
        email: email
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
            showMessage("¡Registro realizado correctamente! Ya puedes iniciar sesión.", "success");
            registerForm.reset();
            setTimeout(() => switchTab('login'), 1500);
        } else if (data.status === "exists") {
            showMessage("Ese usuario ya está registrado.", "error");
        } else {
            showMessage(data.message || "No se pudo completar el registro.", "error");
        }
    } catch (error) {
        console.error("Error en petición de registro:", error);
        showMessage("No se pudo conectar con el servidor. Verifica la URL de la API.", "error");
    } finally {
        setLoading(registerBtn, false);
    }
});

// ========================================
// INICIO DE SESIÓN
// ========================================
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    playClickSound();
    clearFieldErrors();
    hideGlobalMessage();

    const user = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let isValid = true;

    if (!user) {
        setFieldError("loginUserError", "Introduce tu usuario o ID.");
        isValid = false;
    }
    if (!password) {
        setFieldError("loginPasswordError", "Introduce tu contraseña.");
        isValid = false;
    }

    if (!isValid) return;

    const loginBtn = document.getElementById("loginBtn");
    setLoading(loginBtn, true);

    const payload = {
        action: "login",
        user: user,
        password: password
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
            showMessage(`¡Inicio de sesión exitoso! Bienvenido de nuevo, ${data.name || user}.`, "success");
            loginForm.reset();
        } else if (data.status === "not_found") {
            showMessage("El usuario no existe.", "error");
        } else if (data.status === "wrong_password") {
            showMessage("La contraseña es incorrecta.", "error");
        } else {
            showMessage(data.message || "Error al iniciar sesión.", "error");
        }
    } catch (error) {
        console.error("Error en petición de login:", error);
        showMessage("No se pudo conectar con el servidor. Verifica la URL de la API.", "error");
    } finally {
        setLoading(loginBtn, false);
    }
});
