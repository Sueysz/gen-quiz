import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = ()=>{

        



        navigate("/login")
    };

    return <button onClick={handleLogout}>Logout</button>
}

