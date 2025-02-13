function createAccount() {

    const username = document.getElementById('username-create').value;
    const password = document.getElementById('password-create').value;

    if (!username) {
        alert('Username needs to be filled!');
        return;
    } else if (!password) {
        alert('Password needs to be filled!');
        return;
    }

    fetch(`/createAccount?username=${username}&password=${password}`)
    .then(response => {

        const status = response.status;

        if (status === 201) {
            alert('Account created with success!');
        } else if (status === 208) {
            alert('Account already exists');
        }
        
        goToCreateAccount('login');

    });

}

function goToCreateAccount(type) {

    const containerLoginElement = document.querySelector('.container-login');
    const h1ContainerLoginElement = document.querySelector('.container h1');
    const containerCreateElement = document.querySelector('.container-create');

    if (type === 'create') {

        containerLoginElement.style.display = 'none';
        h1ContainerLoginElement.style.display = 'none';
        containerCreateElement.style.display = 'flex';

    } else {

        containerLoginElement.style.display = 'flex';
        h1ContainerLoginElement.style.display = 'flex';
        containerCreateElement.style.display = 'none';

    }

}

function enterAccount() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username) {
        alert('Username needs to be filled!');
        return;
    } else if (!password) {
        alert('Password needs to be filled!');
        return;
    }

    fetch(`/enterAccount?username=${username}&password=${password}`)
    .then(response => {

        const status = response.status;

        if (status === 202) {
            
            goHome();

        } else {

            alert('Username or password incorrect!');

        }

    });

}

function goHome() {

    window.location.href = '/home';

}