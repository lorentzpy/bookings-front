import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h2>Désolé</h2>
            <p>Page non trouvée</p>
            <Link to="/">Retour</Link>
        </div>
    )
};

export default NotFound;