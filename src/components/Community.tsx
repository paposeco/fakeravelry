import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchFriends from "./community/SearchFriends";
import { fetchCommunityMembers } from "../Firebase";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import uniqid from "uniqid";

interface Member {
    username: string;
    imageurl: string;
}

const Community = function() {
    const [allmembers, setallmembers] = useState<Member[]>([]);
    const [usersfetched, setusersfetched] = useState<boolean>(false);

    const fetchusers = async function() {
        setusersfetched(true);
        const fetchfromdb = await fetchCommunityMembers();
        console.log(fetchfromdb);
        if (fetchfromdb !== undefined) {
            setallmembers(fetchfromdb);
        }
    };
    useEffect(() => {
        if (!usersfetched) {
            fetchusers();
        }
    });
    return (
        <div>
            Community
            <SearchFriends />
            {usersfetched &&
                allmembers!.map((member: Member) => (
                    <div key={uniqid()}>
                        <Link to={`/people/${member.username}`}>
                            <DisplayProfileImage imageurl={member.imageurl} />
                        </Link>
                        <Link to={`/people/${member.username}`}>{member.username}</Link>
                    </div>
                ))}
        </div>
    );
};

export default Community;

// todo: remove friend, remove project and delete images
// maybe think about adding more pics to projects?
