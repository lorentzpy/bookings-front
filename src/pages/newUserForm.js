const newUserForm = () => {

    return `
        <form class="change-password">
            <p>
                <label for="login" class="change-password">Login</label>
                <input 
                class="change-password"
                id="userid"
                type="text"
                placeholder="login">
            </p>
            <p>
                <label for="username" class="change-password">Nom de l'utilisateur</label>
                <input 
                class="change-password"
                id="username"
                type="text"
                placeholder="Nom de l'utilisateur">
            </p>
            <p>
                <label for="password" class="change-password">Mot de passe</label>
                <input 
                class="change-password"
                id="password"
                type="password"
                placeholder="Entrez un mot de passe">
            </p>
        </form>
    `;

}

export default newUserForm;