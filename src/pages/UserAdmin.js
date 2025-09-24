//import { useAuth } from "../context/authContext";
import React from 'react';
import { useState, useEffect } from "react";
import fetchUsers from "../api/fetchUsers";

const UserAdmin = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            {data.map( (user) => (
                <React.Fragment key={user._id}>
                <div>{user.user}</div>
                <div>{user.username}</div>
                </React.Fragment>
            ))}
        </div>
        </>
    );
}

export default UserAdmin;