import { signOutUser } from "../Firebase";
import { useNavigate } from "react-router-dom";
const Welcome = function() {
    const navigate = useNavigate();
    const signOut = async function() {
        const waitForSignOut = await signOutUser();
        navigate("/");
    };
    return (
        <div>
            <h2>Welcome to fakeravelry</h2>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
};

export default Welcome;