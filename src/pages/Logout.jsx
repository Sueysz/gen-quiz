import { useNavigate } from "react-router-dom";
import { logout } from "../api";
import { LinkButton } from "../components/Buttons";
import { useAuth } from "../utils/AuthProvider";

export const Logout = () => {
    const { handleRefreshPage } = useAuth();
    const navigate = useNavigate();

    // Gestionnaire de déconnexion
    const handleLogout = async () => {
        try {
            // Appel à la fonction de déconnexion depuis l'API
            const { ok } = await logout();

            // Suppression du token du stockage local
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

    return <LinkButton onClick={handleLogout}>Log-Out</LinkButton>;
};