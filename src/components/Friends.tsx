import {
    getFriends,
    getUserID,
    getProfilePic,
    removeFriendDB,
} from "../Firebase";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import SearchFriends from "./community/SearchFriends";
import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { RootState } from "./store/store";
import MoreVertical from "../images/more-vertical.svg";

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
    const [useronpathhasfriends, setuseronpathhasfriends] = useState<boolean>(
        true
    );
    const [usernameonpath, setusernameonpath] = useState<string>("");

    const [pagination, setpagination] = useState<FriendProfile[][]>([]);
    const [paginationready, setpaginationready] = useState<boolean>(false);
    const [pagemembers, setpagemembers] = useState<FriendProfile[]>([]);
    const [pagebuttons, setpagebuttons] = useState<JSX.Element[]>([]);

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

    const showRemoveFriendOption = function(event: React.MouseEvent) {
        const divalreadyexists = document.getElementById("removethisfriend");
        if (divalreadyexists === null) {
            const newdiv = document.createElement("div");
            const firstevent = event;
            const friendgrid = document.getElementById("friendgrid");
            friendgrid!.appendChild(newdiv);
            newdiv.setAttribute("id", "removethisfriend");
            newdiv.style.position = "absolute";
            newdiv.style.top = `${event.pageY}px`;
            newdiv.style.left = `${event.pageX}px`;
            const para = document.createElement("p");
            const closebox = document.createElement("div");
            newdiv.appendChild(closebox);
            newdiv.appendChild(para);
            para.textContent = "Remove friend";
            closebox.setAttribute("class", "closebox");
            const closebutton = document.createElement("button");
            closebutton.setAttribute("class", "genericbutton");
            closebutton.textContent = "x";
            closebox.appendChild(closebutton);
            closebutton.addEventListener("click", () => {
                newdiv.remove();
            });
            para.addEventListener("click", () => {
                removeFriend(firstevent);
            });
        } else {
            divalreadyexists.remove();
        }
    };

    const removeFriend = async function(event: React.MouseEvent) {
        const buttonid = event.currentTarget.id;
        const friendusername = buttonid.substring(12);
        await removeFriendDB(friendusername);
        setfriendslist((prevState) => {
            let friends = Array.from(prevState);
            const friendtodelete = friends.findIndex(
                (element) => element.friendusername === friendusername
            );
            friends.splice(friendtodelete, 1);
            return friends;
        });
    };

    useEffect(() => {
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
        if (!friendsfetched) {
            const completePath = location.pathname.substring(8);
            const usernameOnPath = completePath.substring(
                0,
                completePath.indexOf("/friends")
            );
            fetchFriends(usernameOnPath);
        }
    }, [friendsfetched, location.pathname, user]);

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
    }, [user, location.pathname]);

    useEffect(() => {
        const numbermembers = friendslist.length;
        if (numbermembers > 0) {
            const numberpages = Math.ceil(numbermembers / 10); // 10 members per page
            let pages: FriendProfile[][] = [];
            for (let i = 0; i < numberpages; i++) {
                let currentpage = friendslist.slice(i * 10, (i + 1) * 10 - 1);
                pages.push(currentpage);
            }
            setpagination(pages);
            setpagemembers(pages[0]);
            setpaginationready(true);
        }
    }, [friendslist]);

    useEffect(() => {
        const membersToDisplay = function(buttonclicked: string) {
            const currentpage = Number(buttonclicked.substring(4));
            const membersonpage = pagination[currentpage - 1];
            setpagemembers(membersonpage);
        };
        const changePage = function(event: React.MouseEvent) {
            const buttonid = event.currentTarget.id;
            membersToDisplay(buttonid);
            const buttonnode = document.getElementById(buttonid);
            const allbuttons = document.querySelectorAll("button");
            allbuttons.forEach((button) => button.classList.remove("buttonactive"));
            if (buttonnode !== null) {
                buttonnode.classList.add("buttonactive");
            }
        };

        if (paginationready) {
            const neededbuttons = pagination.length;
            let buttons: JSX.Element[] = [];
            for (let i = 0; i < neededbuttons; i++) {
                if (i === 0) {
                    buttons.push(
                        <button
                            id={`page${i + 1}`}
                            onClick={changePage}
                            className="genericbutton buttonactive"
                        >
                            {i + 1}
                        </button>
                    );
                } else {
                    buttons.push(
                        <button
                            id={`page${i + 1}`}
                            onClick={changePage}
                            className="genericbutton"
                        >
                            {i + 1}
                        </button>
                    );
                }
            }
            setpagebuttons(buttons);
        }
    }, [paginationready, pagination]);

    useEffect(() => {
        document.title = "Fake Ravelry: " + usernameonpath + "'s friends";
    }, [usernameonpath]);

    return (
        <div id="communitycontent">
            {usermatchespath ? (
                <h2>My friends</h2>
            ) : (
                <h2>{usernameonpath}'s friends'</h2>
            )}
            {useronpathhasfriends && (
                <div>
                    <div id="friendgrid">
                        {paginationready &&
                            pagemembers.map((member: FriendProfile) => (
                                <div className="memberthumbnail" key={uniqid()}>
                                    <Link to={`/people/${member.friendusername}`}>
                                        <DisplayProfileImage imageurl={member.friendimageurl} />
                                    </Link>
                                    <div className="friendthumbnailfooter">
                                        <Link to={`/people/${member.friendusername}`}>
                                            {member.friendusername}
                                        </Link>
                                        <button
                                            title="Remove friend"
                                            onClick={showRemoveFriendOption}
                                            id={"buttonRemove" + member.friendusername}
                                            className="removefriend"
                                        >
                                            <img src={MoreVertical} alt="more" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div id="pagination">
                        {pagebuttons.map((button) => (
                            <div key={uniqid()}>{button}</div>
                        ))}
                    </div>
                </div>
            )}

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
    );
};

export default Friends;
