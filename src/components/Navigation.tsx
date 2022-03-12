import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import DisplayProfileMenu from "./profiledetails/DisplayProfileMenu";
import DisplayCommunityMenu from "./community/DisplayCommunityMenu";
import { signOutUser, getUserProfileImage } from "../Firebase";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const Navigation = function(props: { username: string }) {
    const [menushown, setmenushown] = useState(false);
    const [communitymenushown, setcommunitymenushown] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(props.username);
    const [peoplepath, setPeoplePath] = useState<string>(
        "/people/" + props.username
    );
    const [notebookpath, setNotebookpath] = useState<string>(
        "/notebook/" + props.username
    );
    const [profileimg, setprofileimg] = useState<string>("");
    const user = useSelector((state: RootState) => state.userinfo.username);
    const activateMenu = function(event: React.MouseEvent) {
        const target = event.currentTarget;
        const targetdiv = target.querySelector(".navelementselected");
        if (targetdiv !== null) {
            targetdiv.classList.add("activemenunotprofile");
            target.addEventListener("mouseleave", () => {
                targetdiv.classList.remove("activemenunotprofile");
            });
        }
    };

    const [imagefetched, setimagefetched] = useState(false);

    const showMenu = function(event: React.MouseEvent) {
        if (!menushown) {
            setmenushown(true);
            const menuitemdivselected = document.getElementById("selectedmenuitem");
            menuitemdivselected!.setAttribute("class", "activemenu");
        }
    };

    const showCommunityMenu = function(event: React.MouseEvent) {
        if (!communitymenushown) {
            setcommunitymenushown(true);
            const communityelement = document.getElementById("selectedcommunityitem");
            communityelement!.setAttribute("class", "activemenunotprofile");
        }
    };

    const signOut = function() {
        signOutUser();
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserProfileImage = async function() {
            setimagefetched(true);
            const profileimgurl = await getUserProfileImage();
            setprofileimg(profileimgurl);
        };
        if (!imagefetched) {
            fetchUserProfileImage();
        }
    }, [imagefetched]);

    useEffect(() => {
        setUsername(user);
        setPeoplePath("/people/" + user);
        setNotebookpath("/notebook/" + user);
    }, [user]);

    useEffect(() => {
        if (communitymenushown) {
            const communitynavelement = document.getElementById("communitynav");
            const menuitem = document.getElementById("selectedcommunityitem");
            if (communitynavelement !== null) {
                communitynavelement.addEventListener("mouseleave", () => {
                    setcommunitymenushown(false);
                    if (menuitem !== null) {
                        menuitem.classList.remove("activemenunotprofile");
                    }
                });
            }
        }
    }, [communitymenushown]);

    useEffect(() => {
        if (menushown) {
            const profileimg = document.getElementById("profileimage");
            const menuitemdivselected = document.getElementById("selectedmenuitem");
            if (profileimg !== null) {
                profileimg.addEventListener("mouseleave", () => {
                    setmenushown(false);
                    menuitemdivselected!.classList.remove("activemenu");
                });
            }
        }
    }, [menushown]);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <span id="logo">
                            <img src={logo} alt="fakeravelrylogo" />
                        </span>
                    </Link>
                </li>
                <li onMouseEnter={activateMenu}>
                    <div className="menuitem">
                        <Link to="/" className="standardmenu">
                            patterns
                        </Link>
                        <div className="navelementselected"></div>
                    </div>
                </li>
                <li onMouseEnter={activateMenu}>
                    <div className="menuitem">
                        <Link to="/" className="standardmenu">
                            yarns
                        </Link>
                        <div className="navelementselected"></div>
                    </div>
                </li>
                <li onMouseEnter={showCommunityMenu} id="communitynav">
                    <div className="menuitem">
                        <Link to="/community" className="standardmenu">
                            community
                        </Link>
                        <div id="selectedcommunityitem"></div>
                        {communitymenushown && (
                            <DisplayCommunityMenu currentuser={username} />
                        )}
                    </div>
                </li>
                <li onMouseEnter={activateMenu}>
                    <div className="menuitem">
                        <Link to="/" className="standardmenu">
                            support
                        </Link>
                        <div className="navelementselected"></div>
                    </div>
                </li>
                <li id="linktonotebook" onMouseEnter={activateMenu}>
                    <div className="menuitem">
                        <Link to={notebookpath} className="standardmenu">
                            my notebook
                        </Link>
                        <div className="navelementselected"></div>
                    </div>
                </li>
                <li id="profileimage" onMouseEnter={showMenu}>
                    <Link to={peoplepath}>
                        <DisplayProfileImage imageurl={profileimg} />
                    </Link>
                    <div id="selectedmenuitem" className=""></div>
                    {menushown && (
                        <DisplayProfileMenu
                            peoplepath={peoplepath}
                            signoutfunction={signOut}
                        />
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
