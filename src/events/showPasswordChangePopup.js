import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma/bulma.css';
import changePasswordForm from "../pages/changePasswordForm";
import updatePassword from "../api/updatePassword";

const showPwChangePopup = (user) => {

    Swal.fire({
        title: "Changer mon mot de passe",
        showCloseButton: true,
        showCancelButton: true,
        customClass: {
            confirmButton: "order-1",
            cancelButton: "order-2",
        },
        draggable: true,
        html: changePasswordForm(),
        preConfirm: async () => {
            const oldPw = document.getElementById("old-password").value;
            const newPw = document.getElementById("new-password").value;
            const newPwRepeat = document.getElementById("new-password-repeat").value;

            if (!oldPw || !newPw || !newPwRepeat) {
                Swal.showValidationMessage("Tous les champs sont obligatoires, veuillez vous assurer que tous les champs sont renseignés.");
                return false;
            }

            if (newPw !== newPwRepeat) {
                Swal.showValidationMessage("Les 2 mots de passe sont différents, assurez-vous de la cohérence de vos entrées");
                return false;
            }

            const specialChars = "@.#$!%*?&,_+;-";
            
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[" + specialChars + "])[A-Za-z\\d" + specialChars + "]{8,15}$");
            if (!regex.test(newPw)) {
                Swal.showValidationMessage(`Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et contenir entre 8 et 15 caractères.<br />Caractères spéciaux autorisés:${specialChars}`);
                return false;
            }

            const res = await updatePassword(user, newPw, oldPw);
            if ( !res.ok ) {
                if (res.status === 401) {
                    Swal.showValidationMessage("L'ancien mdp est incorrect, crétin");
                } else {
                    Swal.showValidationMessage(`Une erreur est survenue, mais aucune p... d'idée de ce que ça peut être`);
                }
                return false;
            }            
        }
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    });
};

export default showPwChangePopup;