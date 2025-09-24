import { useState } from "react";
import { useAuth } from "../context/authContext";
import fetchWithAuth from "../api/fetchWithAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const useCommitBooking = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user } = useAuth();

    const commitBooking = async (action, payloadData = {}, id="") => {

        setLoading(true);
        setError(null);
        setSuccess(false);

        const baseUrl = `${apiUrl}/bookings`;
        var url = "";
        var method = "";

        if(action === "create") {
            url = baseUrl;
            method = 'POST';
            payloadData.createdBy = user.userid;
        } else if (action === 'edit') {
            url = `${baseUrl}/${id}`;
            method = 'PATCH'
        } else if (action === 'delete') {
            url = `${baseUrl}/${id}`;
            method = 'DELETE';
        }
        
        payloadData.modifiedBy = user.userid;

        try {
            await fetchWithAuth(url, {
                method: method,
                body: JSON.stringify(payloadData)
            });

            setSuccess(true);
        } catch(error) {
            console.error("Erreur:", error);
        };       

    };

    return {commitBooking, loading, error, success};
    
}

export default useCommitBooking;