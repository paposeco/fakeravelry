import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PeopleIcon from "../../images/peopleicon.svg";
import FriendsIcon from "../../images/friendsicon.svg";

const DisplayCommunityMenu = function(props: { currentuser: string }) {
    const [friendspath, setfriendspath] = useState<string>("");

    useEffect(() => {
        setfriendspath("/people/" + props.currentuser + "/friends");
    }, [props.currentuser]);
    return (
        <div id="communitymenu">
            <ul>
                <li className="menuhover">
                    <Link to={friendspath} className="communitymenuelement">
                        <div className="subnavelement">
                            <div>
                                <img src={FriendsIcon} alt="friendsicon" />
                            </div>
                            <div>
                                <p className="subnavelementtitle">Friends</p>
                                <p className="subnavelementdesc">
                                    See what your fiber pals are making
                                </p>
                            </div>
                        </div>
                    </Link>
                </li>
                <li className="menuhover">
                    <Link to="/community" className="communitymenuelement">
                        <div className="subnavelement">
                            <div>
                                <img src={PeopleIcon} alt="peopleicon" />
                            </div>
                            <div>
                                <p className="subnavelementtitle">People</p>
                                <p className="subnavelementdesc">
                                    Find and follow other crafters
                                </p>
                            </div>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DisplayCommunityMenu;
