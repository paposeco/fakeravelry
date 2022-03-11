import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Breadcrumbs = function(props: {
    username: string;
    projectname: string;
    profileimage: string;
}) {
    const [userprofile, setuserprofile] = useState<string>("");
    const [usernotebook, setusernotebook] = useState<string>("");

    useEffect(() => {
        setuserprofile(`/people/${props.username}`);
        setusernotebook(`/notebook/${props.username}`);
    }, [props.username]);

    return (
        <div id="breadcrumbs">
            <ul>
                <li>
                    <img
                        src={props.profileimage}
                        alt="userimage"
                        id="profileimgbreadcrumb"
                    />
                    <Link to={userprofile}>{props.username}</Link>
                </li>
                <li> {">"} </li>
                <li>
                    <Link to={usernotebook}>notebook</Link>
                </li>
                <li> {">"} </li>
                <li>
                    <Link to={usernotebook}>projects</Link>
                </li>
                <li> {">"} </li>
                <li>{props.projectname}</li>
            </ul>
        </div>
    );
};

export default Breadcrumbs;
