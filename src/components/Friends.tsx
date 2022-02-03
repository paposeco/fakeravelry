import { getFriends } from "../Firebase";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import uniqid from "uniqid";

const Friends = function() {
    const location = useLocation();
    const [friendslist, setfriendslist] = useState<string[]>([]);
    const [friendsfetched, setfriendsfetched] = useState<boolean>(false);

    const fetchFriends = async function(usernametofetch: string) {
        setfriendsfetched(true);
        const friends: string[] = await getFriends(usernametofetch);
        if (friends.length > 0) {
            friends.forEach((friend) => {
                setfriendslist((prevState) => [...prevState, friend]);
            });
        }
    };

    useEffect(() => {
        if (!friendsfetched) {
            const usernameOnPath = location.pathname.substring(8);
            fetchFriends(usernameOnPath);
        }
    });

    useEffect(() => {
        console.log(friendslist);
    }, [friendslist]);

    return (
        <div>
            {friendslist.map((friend: string) => (
                <p key={uniqid()}>{friend}</p>
            ))}
        </div>
    );
};

export default Friends;
