//import { useAuth } from "../context/authContext";
import React from 'react';
import { useState, useEffect } from "react";
import fetchUsers from "../api/fetchUsers";
import { useNavigate } from 'react-router-dom';

const UserAdmin = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                setData(users);
            } catch (err) {
                console.error("Error fetching");
            } finally {
                setLoading(false);
            }
        };

        getUsers();

    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <>
        <h2>User list</h2>
        <div className="table-grid">
            <div className="header">User</div>
            <div className="header">Username</div>
            <div className="header">Actions</div>
            {data.map( (user) => (
                <React.Fragment key={user._id}>
                <div>{user.user}</div>
                <div>{user.username}</div>
                <div><button>Supprimer</button></div>
                </React.Fragment>
            ))}
        </div>
        <br />
        <button className="decolink">Créer un utilisateur</button>
        <button className="decolink" onClick={() => navigate("/")}>
        ⬅ Retour au calendrier
      </button>
        </>
    );
}

export default UserAdmin;