import { useAuth } from "../context/authContext";
import showPwChangePopup from "../events/showPasswordChangePopup";
import { Link } from "react-router-dom";

const Navbar = () => {

    const {user, logout} = useAuth();

    return (
        <nav className="navbar">
            <h1>{process.env.REACT_APP_SITE_NAME}</h1>
            <div className="login">
                { user ? (
                    <>
                    <div className="loginbox">Connecté en tant que {user.username}
                    <br /><a className="decolink" href="/#" onClick={(e) => {
                            e.preventDefault(); // pour éviter le rechargement de la page
                            showPwChangePopup(user);
                        }}>Changer mon mot de passe</a>                   
                    <br /><a className="decolink" href="/#" onClick={logout}>Déconnexion</a>
                    <br /><Link className="decolink" to="/admin">Administration des utilisateurs</Link>
                    </div>
                    </>
                ) :
                (
                    <div className="loginbox">
                        <p><a className="decolink" href="/login">Se connecter</a></p>
                        
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;