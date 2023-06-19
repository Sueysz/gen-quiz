import { useNavigate } from "react-router-dom";
import { logout } from "../api";
import { LogoutButton } from "./Buttons";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { ok } = await logout();

            localStorage.removeItem("token");

            if (ok) {
                console.log("Logout successful");
                navigate("/login");
            } else {
                console.error("Logout failed");
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout :", error);
            alert("Error during logout");
        }
    };

    return <LogoutButton onClick={handleLogout}>Logout</LogoutButton>;
};