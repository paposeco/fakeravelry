import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchUser, getProfilePic } from "../../Firebase";
import DisplayProfileImage from "../profiledetails/DisplayProfileImage";

const SearchFriends = function() {
    const [searchquery, setsearchquery] = useState<string>("");
    const [userfound, setuserfound] = useState<boolean>(false);
    const [searchresultinfo, setsearchresultinfo] = useState<string>("");
    const [userpic, setuserpic] = useState<string>("");
    const [cleanusername, setcleanusername] = useState<string>("");
    const handleChange = function(event: React.ChangeEvent<HTMLInputElement>) {
        setsearchquery(event.target.value);
        setuserfound(false);
        setsearchresultinfo("");
        setuserpic("");
        setcleanusername("");
    };
    const handleSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        const userexists = await searchUser(searchquery);
        if (userexists) {
            setuserfound(true);
            const userprofileimage = await getProfilePic(searchquery);
            setuserpic(userprofileimage);
            setcleanusername(searchquery.toLowerCase());
            setsearchresultinfo("We found a user that matches your query:");
        } else {
            setsearchresultinfo("We couldn't find a user that matches your query.");
        }
    };

    return (
        <div>
            <form id="searchusers" onSubmit={handleSubmit}>
                <input
                    type="search"
                    id="searchuser"
                    name="searchuser"
                    placeholder="username"
                    onChange={handleChange}
                />
                <button type="submit" className="genericbutton">
                    Search
                </button>
            </form>
            <p>{searchresultinfo}</p>
            {userfound && (
                <div>
                    <Link to={`/people/${cleanusername}`}>
                        <DisplayProfileImage imageurl={userpic} />
                    </Link>
                    <Link to={`/people/${cleanusername}`}>{cleanusername}</Link>
                </div>
            )}
        </div>
    );
};

export default SearchFriends;
