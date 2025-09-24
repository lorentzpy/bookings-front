const apiUrl = process.env.REACT_APP_API_URL;

const fetchUsers = async () => {
    const urlUsers = `${apiUrl}/user`;

    try {
        const response = await fetch(urlUsers);

        const data = await response.json();

        return data;
    } catch(error) {
        console.error("fetching users failed");
    }
}

export default fetchUsers;