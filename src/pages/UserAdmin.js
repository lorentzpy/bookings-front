//import { useAuth } from "../context/authContext";
import React from 'react';
import { useState, useEffect } from "react";
import fetchWithAuth from "../api/fetchWithAuth";

import { useNavigate } from 'react-router-dom';
import showNewUserPopup from '../events/showNewUserPopup';

const apiUrl = process.env.REACT_APP_API_URL;

const UserAdmin = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        const getUsers = async () => {
            try {
                const urlUsers = `${apiUrl}/user`;
                const users = await fetchWithAuth(urlUsers, "GET");
                const users_json = await users.json();
                setData(users_json);
            } catch (err) {
                console.error("Error fetching");
            } finally {
                setLoading(false);
            }
        };

        getUsers();

    }, [reload]);

    const handleCreateUser = (e) => {
        e.preventDefault(); // pour éviter le rechargement de la page
            showNewUserPopup( () => {
                setReload(prev => !prev);
            });
    }

    const handleDeleteUser = async (e, userid) => {

        e.preventDefault();

        try {
            const url = `${apiUrl}/user/${userid}`;
            await fetchWithAuth(url, {method:"DELETE"});

            setData(prev => prev.filter(user => user._id !== userid));
        } catch (err) {
            console.error("Erreur lors de la supprssion:", err);
        }
    } 

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
                <div><button onClick={(e)=>handleDeleteUser(e, user._id)}>Supprimer</button></div>
                </React.Fragment>
            ))}
        </div>
        <br />
        <button className="decolink" onClick={handleCreateUser}>Créer un utilisateur</button>
        <button className="decolink" onClick={() => navigate("/")}>⬅ Retour au calendrier</button>
        </>
    );
}

export default UserAdmin;