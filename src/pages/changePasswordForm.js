const changePasswordForm = () => {

    return `
        <form class="change-password">
            <p>
                <label for="old-password" class="change-password">Mot de passe actuel</label>
                <input 
                class="change-password"
                id="old-password"
                type="password"
                placeholder="Entrer le mot de passe actuel">
            </p>
            <p>
                <label for="new-password" class="change-password">Nouveau mot de passe</label>
                <input 
                class="change-password"
                id="new-password"
                type="password"
                placeholder="Entrez un nouveau mot de passe">
            </p>
            <p>
                <label for="new-password-repeat" class="change-password">Répéter le nouveau mot de passe</label>
                <input 
                class="change-password"
                id="new-password-repeat"
                type="password"
                placeholder="Répétez le nouveau mot de passe">
            </p>
        </form>
    `;

}

export default changePasswordForm;