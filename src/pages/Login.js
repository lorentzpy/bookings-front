import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {

    const { user, login, loading } = useAuth();
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    if (loading) return null;

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userName, password);
            navigate("/");
        } catch {
            alert("wrong login");
        }
    }

    return (
        <>
        <h3>Connectez-vous pour afficher cette page</h3>
        <form onSubmit={handleSubmit}>
          <input id="login" placeholder="Identifiant" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input id="pass" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Connexion</button>
        </form>
        </>
    );

};

export default Login;