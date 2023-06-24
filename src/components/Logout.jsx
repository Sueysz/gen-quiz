import { useNavigate } from "react-router-dom";
import { logout } from "../api";
import { LinkButton } from "./Buttons";
import { useAuth } from "../utils/AuthProvider";

export const Logout = () => {
    const { handleRefreshPage } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { ok } = await logout();

            localStorage.removeItem("token");

            if (ok) {
                console.log("Logout successful");
                navigate("/login");
                handleRefreshPage();
            } else {
                console.error("Logout failed");
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout :", error);
            alert("Error during logout");
        }
    };

    return <LinkButton onClick={handleLogout}>LogOut</LinkButton>;
};