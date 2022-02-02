import { useState, useEffect } from "react";
import type { ProfileInformation } from "../common/types";
import uniqid from "uniqid";

const DisplayProfileDetails = function(props: {
    userinfo: ProfileInformation;
}) {
    const infomap = new Map([
        ["personalsite", "Website or blog"],
        ["selectedcountry", "Location"],
        ["yearsknitting", "Years knitting"],
        ["yearscrocheting", "Years crocheting"],
        ["petskids", "Pets? Kids?"],
        ["favoritecolors", "Favorite colors"],
        ["favecurseword", "Fave curse word"],
        ["aboutme", "About me"],
    ]);
    const [infotodisplay, setinfotodisplay] = useState<string[][]>([]);
    const [infofinished, setinfofinished] = useState<boolean>(false);
    const selectnonemptyinfo = function() {
        const info = props.userinfo;
        for (const [key, value] of Object.entries(info)) {
            if (
                value !== "" &&
                value !== undefined &&
                value !== "notselected" &&
                key !== "username" &&
                key !== "name" &&
                key !== "imageurl"
            ) {
                setinfotodisplay((prevState) => [...prevState, [key, value]]);
            }
        }
        setinfofinished(true);
    };

    useEffect(() => {
        if (!infofinished) {
            selectnonemptyinfo();
        }
    });
    return (
        <div>
            <div className="profileinfodiv">
                <div className="itemdescription">First Name</div>
                <div className="itemvalue">{props.userinfo.name}</div>
            </div>
            {infotodisplay.map((information) => (
                <div className="profileinfodiv" key={uniqid()}>
                    <div className="itemdescription">{infomap.get(information[0])}</div>
                    <div className="itemvalue">{information[1]}</div>
                </div>
            ))}
        </div>
    );
};

export default DisplayProfileDetails;
