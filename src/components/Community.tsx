import React, { useState, useEffect } from "react";
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
    const [pagination, setpagination] = useState<Member[][]>([]);
    const [paginationready, setpaginationready] = useState<boolean>(false);
    const [pagemembers, setpagemembers] = useState<Member[]>([]);
    const [pagebuttons, setpagebuttons] = useState<JSX.Element[]>([]);

    // fetches community members from DB
    useEffect(() => {
        const fetchusers = async function() {
            setusersfetched(true);
            const fetchfromdb = await fetchCommunityMembers();
            if (fetchfromdb !== undefined) {
                setallmembers(fetchfromdb);
            }
        };
        if (!usersfetched) {
            fetchusers();
        }
    }, [usersfetched]);

    // displays 10 members at a time
    useEffect(() => {
        const numbermembers = allmembers.length;
        if (numbermembers > 0) {
            const numberpages = Math.ceil(numbermembers / 10); // 10 members per page
            let pages: Member[][] = [];
            for (let i = 0; i < numberpages; i++) {
                let currentpage = allmembers.slice(i * 10, (i + 1) * 10 - 1);
                pages.push(currentpage);
            }
            setpagination(pages);
            setpagemembers(pages[0]);
            setpaginationready(true);
        }
    }, [allmembers]);
    useEffect(() => {
        const membersToDisplay = function(buttonclicked: string) {
            const currentpage = Number(buttonclicked.substring(4));
            const membersonpage = pagination[currentpage - 1];
            setpagemembers(membersonpage);
        };
        const changePage = function(event: React.MouseEvent) {
            const buttonid = event.currentTarget.id;
            const buttonnode = document.getElementById(buttonid);
            const allbuttons = document.querySelectorAll("button");
            allbuttons.forEach((button) => button.classList.remove("buttonactive"));
            if (buttonnode !== null) {
                buttonnode.classList.add("buttonactive");
            }
            membersToDisplay(buttonid);
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
        document.title = "Fake Ravelry";
    }, []);
    return (
        <div id="communitycontent">
            <h2>Fake Ravelry's members</h2>
            <div id="searchfrienddiv">
                <p>Find a member:</p>
                <SearchFriends />
            </div>
            <div id="friendgrid">
                {paginationready &&
                    pagemembers.map((member: Member) => (
                        <div key={uniqid()} className="memberthumbnail">
                            <Link to={`/people/${member.username}`}>
                                <DisplayProfileImage imageurl={member.imageurl} />
                            </Link>
                            <Link to={`/people/${member.username}`}>{member.username}</Link>
                        </div>
                    ))}
            </div>
            <div id="pagination">
                {pagebuttons.map((button) => (
                    <div key={uniqid()}>{button}</div>
                ))}
            </div>
        </div>
    );
};

export default Community;
