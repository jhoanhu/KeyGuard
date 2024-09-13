document.addEventListener('DOMContentLoaded', () => {
    const addPasswordBtn = document.getElementById('add-password');
    const passwordList = document.getElementById('password-list');
    const pageNameInput = document.getElementById('page-name');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('new-password');

    // Guardar contraseñas en localStorage
    const savePasswords = (passwords) => {
        localStorage.setItem('passwords', JSON.stringify(passwords));
    };

    // Cargar contraseñas de localStorage
    const loadPasswords = () => {
        const passwords = localStorage.getItem('passwords');
        return passwords ? JSON.parse(passwords) : [];
    };

    // Mostrar tarjetas con contraseñas
    const renderPasswords = () => {
        passwordList.innerHTML = '';
        const passwords = loadPasswords();
        passwords.forEach((password, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${password.page}</h3>
                <p><strong>Correo:</strong> ${password.email}</p>
                <p><strong>Contraseña:</strong> ${password.password}</p>
                <button data-index="${index}">Eliminar</button>
            `;
            passwordList.appendChild(card);
        });
    };

    // Agregar una nueva contraseña
    addPasswordBtn.addEventListener('click', () => {
        const page = pageNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = newPasswordInput.value.trim();

        if (page && email && password) {
            const passwords = loadPasswords();
            passwords.push({ page, email, password });
            savePasswords(passwords);

            // Limpiar los campos
            pageNameInput.value = '';
            emailInput.value = '';
            newPasswordInput.value = '';

            renderPasswords();
        }
    });

    // Eliminar una contraseña
    passwordList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            const passwords = loadPasswords();
            passwords.splice(index, 1);
            savePasswords(passwords);
            renderPasswords();
        }
    });

    // Cargar contraseñas al iniciar
    renderPasswords();
});
