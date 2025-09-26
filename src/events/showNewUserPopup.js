import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma/bulma.css';
import newUserForm from "../pages/newUserForm";
import createUser from "../api/createUser";

const showNewUserPopup = (onSuccess) => {

    Swal.fire({
        title: "Créer un utilisateur",
        showCloseButton: true,
        showCancelButton: true,
        customClass: {
            confirmButton: "order-1",
            cancelButton: "order-2",
        },
        draggable: true,
        html: newUserForm(),
        preConfirm: async () => {
            const login = document.getElementById("userid").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!login || !username || !password) {
                Swal.showValidationMessage("Tous les champs sont obligatoires, veuillez vous assurer que tous les champs sont renseignés.");
                return false;
            }

            const specialChars = "@.#$!%*?&,_+;-";
            
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[" + specialChars + "])[A-Za-z\\d" + specialChars + "]{8,15}$");
            if (!regex.test(password)) {
                Swal.showValidationMessage(`Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et contenir entre 8 et 15 caractères.<br />Caractères spéciaux autorisés:${specialChars}`);
                return false;
            }

            await createUser(login, username, password);

            if (onSuccess) {
                onSuccess(); // ou simplement onSuccess() si tu veux juste reload
              }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    });
};

export default showNewUserPopup