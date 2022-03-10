import { useState, useEffect } from "react";
import type { ProfileInformation } from "../common/types";
import uniqid from "uniqid";
import { Country } from "../projects/SelectOptions";

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
    const [infotodisplay, setinfotodisplay] = useState<[string, string][]>([]);
    const [infofinished, setinfofinished] = useState<boolean>(false);
    const [personalsiteurl, setpersonalsiteurl] = useState<string>("");
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
                if (key === "personalsite") {
                    if (value.includes("http")) {
                        setpersonalsiteurl(value);
                    } else {
                        setpersonalsiteurl("https://" + value);
                    }
                }
            }
        }
        setinfofinished(true);
    };

    const [countryname, setcountryname] = useState<string>("");
    const getCountryName = function(countrycode: string) {
        const countryinarray = Country.find(
            (element) => element.value === countrycode
        );
        if (countryinarray !== undefined) {
            setcountryname(countryinarray.text);
        }
    };
    useEffect(() => {
        if (!infofinished) {
            selectnonemptyinfo();
        }
    });

    useEffect(() => {
        getCountryName(props.userinfo.selectedcountry);
    }, [props.userinfo]);

    useEffect(() => {
        setinfotodisplay((prevState) => {
            const copyArray = Array.from(prevState);
            const countryinarray = prevState.findIndex(
                (element) => element[0] === "selectedcountry"
            );
            copyArray[countryinarray] = ["selectedcountry", countryname];
            return copyArray;
        });
    }, [countryname]);

    return (
        <div>
            <div className="profileinfodiv">
                <div className="itemdescription">First Name</div>
                <div className="itemvalue">{props.userinfo.name}</div>
            </div>
            {infotodisplay.map((information) => (
                <div className="profileinfodiv" key={uniqid()}>
                    <div className="itemdescription">{infomap.get(information[0])}</div>
                    <div className="itemvalue">
                        {information[0] === "personalsite" ? (
                            <a href={personalsiteurl}>{personalsiteurl}</a>
                        ) : (
                            information[1]
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayProfileDetails;
