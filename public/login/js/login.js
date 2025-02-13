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

    });

}