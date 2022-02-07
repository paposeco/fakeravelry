import { getFriends, getUserID, getProfilePic } from "../Firebase";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import SearchFriends from "./community/SearchFriends";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { RootState } from "./store/store";

interface FriendProfile {
    friendusername: string;
    friendimageurl: string;
}

const Friends = function() {
    const location = useLocation();
    const [friendslist, setfriendslist] = useState<FriendProfile[]>([]);
    const [friendsfetched, setfriendsfetched] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.userinfo);
    const [usermatchespath, setUsermatchespath] = useState<boolean>(true);
    const [useronpathhasfriends, setuseronpathhasfriends] =
        useState<boolean>(true);
    const [usernameonpath, setusernameonpath] = useState<string>("");

    const fetchFriends = async function(usernametofetch: string) {
        if (user.username !== "") {
            setfriendsfetched(true);
            if (user.username === usernametofetch) {
                const friends: string[] = await getFriends(user.userID); //array of friends usernames
                if (friends.length > 0) {
                    const friendsinfo = await getFriendsInfo(friends);
                    setfriendslist(friendsinfo);
                } else {
                    setuseronpathhasfriends(false);
                }
            } else {
                const userID = await getUserID(usernametofetch);
                if (userID !== undefined && userID !== false) {
                    const friends: string[] = await getFriends(userID);
                    if (friends.length > 0) {
                        const friendsinfo = await getFriendsInfo(friends);
                        setfriendslist(friendsinfo);
                    } else {
                        setuseronpathhasfriends(false);
                    }
                }
            }
        }
    };

    const getFriendsInfo = async function(friendslist: string[]) {
        let friendsDetails: FriendProfile[] = [];
        for (let i = 0; i < friendslist.length; i++) {
            const currentfriendusername = friendslist[i];
            const profilepic = await getProfilePic(currentfriendusername);
            if (profilepic !== undefined && profilepic !== false) {
                friendsDetails.push({
                    friendusername: currentfriendusername,
                    friendimageurl: profilepic,
                });
            } else {
                friendsDetails.push({
                    friendusername: currentfriendusername,
                    friendimageurl: "",
                });
            }
        }
        return friendsDetails;
    };

    // fetch username and profile photo: link to profile

    useEffect(() => {
        if (!friendsfetched) {
            const completePath = location.pathname.substring(8);
            const usernameOnPath = completePath.substring(
                0,
                completePath.indexOf("/friends")
            );
            fetchFriends(usernameOnPath);
        }
    });

    useEffect(() => {
        if (user.username !== "") {
            const completePath = location.pathname.substring(8);
            const usernameOnPath = completePath.substring(
                0,
                completePath.indexOf("/friends")
            );
            setusernameonpath(usernameOnPath);
            if (user.username !== usernameOnPath) {
                setUsermatchespath(false);
            }
        }
    }, [user]);

    return (
        <div>
            <div>
                {useronpathhasfriends && (
                    <div>
                        {friendslist.map((friend: FriendProfile) => (
                            <div key={uniqid()}>
                                <Link to={`/people/${friend.friendusername}`}>
                                    <DisplayProfileImage imageurl={friend.friendimageurl} />
                                </Link>
                                <Link to={`/people/${friend.friendusername}`}>
                                    {friend.friendusername}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                {!useronpathhasfriends && (
                    <div>
                        <div>
                            {!usermatchespath ? (
                                <p>{usernameonpath} has no friends yet.</p>
                            ) : (
                                <p>You don't have any friends yet.</p>
                            )}
                        </div>
                        <div>{usermatchespath ? <SearchFriends /> : null}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
