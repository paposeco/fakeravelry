import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser, getInfo } from "../Firebase";
import { useEffect, useState } from "react";

const Profile = function() {
    /* const { state } = useLocation();
     * const { name } = state; */
    const navigate = useNavigate();
    const signOut = async function() {
        const waitForSignOut = await signOutUser();
        navigate("/");
    };
    const [userSelectedName, setUserSelectedName] = useState<string>("");
    const getName = async function() {
        const name = await getInfo("name");
        setUserSelectedName(name);
    };

    useEffect(() => {
        getName();
    });

    return (
        <div>
            <h2>Profile</h2>
            <p>Hello {userSelectedName}</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Profile;
