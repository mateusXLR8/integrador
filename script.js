// Função para salvar o usuário no LocalStorage
function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para obter os dados do usuário
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função de login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'list.html'; // Redireciona para a lista de usuários
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

// Função de cadastro
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const user = {
        name: document.getElementById('registerName').value,
        cpf: document.getElementById('registerCpf').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('registerPhone').value,
        dob: document.getElementById('registerDob').value,
        password: document.getElementById('registerPassword').value,
    };

    saveUser(user);
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Redireciona para o login
});

// Função para editar o perfil
document.getElementById('editForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const updatedUser = {
        name: document.getElementById('editName').value || currentUser.name,
        cpf: document.getElementById('editCpf').value || currentUser.cpf,
        email: document.getElementById('editEmail').value || currentUser.email,
        phone: document.getElementById('editPhone').value || currentUser.phone,
        dob: document.getElementById('editDob').value || currentUser.dob,
        password: document.getElementById('editPassword').value || currentUser.password,
    };

    const users = getUsers();
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Perfil atualizado!');
        window.location.href = 'list.html';
    }
});

// Função de logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Exibir usuários na tela de listagem
function displayUsers() {
    const users = getUsers();
    const userList = document.getElementById('userList');
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}

if (document.getElementById('userList')) {
    displayUsers();
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpa a lista

    const users = getUsers();

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${user.name}</strong> - ${user.email}<br>
            <button onclick="deleteUser(${index})">Excluir</button>
            <hr>
        `;
        userList.appendChild(li);
    });
}

function deleteUser(index) {
    const users = getUsers();

    if (confirm(`Tem certeza que deseja excluir o usuário ${users[index].name}?`)) {
        users.splice(index, 1); // remove 1 item na posição index
        saveUsers(users); // salva de volta no localStorage
        displayUsers(); // atualiza a lista na tela
    }
}

// Chama isso quando a página carregar
if (document.getElementById('userList')) {
    displayUsers();
}

