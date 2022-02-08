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
    const [pageselected, setpageselected] = useState<string>("page1");
    const [pagemembers, setpagemembers] = useState<Member[]>([]);

    const fetchusers = async function() {
        setusersfetched(true);
        const fetchfromdb = await fetchCommunityMembers();
        if (fetchfromdb !== undefined) {
            setallmembers(fetchfromdb);
        }
    };
    useEffect(() => {
        if (!usersfetched) {
            fetchusers();
        }
    });

    //click button => show content on index of pagination

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

    const changePage = function(event: React.MouseEvent) {
        const buttonid = event.currentTarget.id;
        setpageselected(buttonid);
        membersToDisplay(buttonid);
    };

    const membersToDisplay = function(buttonclicked: string) {
        const currentpage = Number(buttonclicked.substring(4));
        const membersonpage = pagination[currentpage - 1];
        setpagemembers(membersonpage);
    };

    const [pagebuttons, setpagebuttons] = useState<JSX.Element[]>([]);
    useEffect(() => {
        if (paginationready) {
            const neededbuttons = pagination.length;
            let buttons: JSX.Element[] = [];
            for (let i = 0; i < neededbuttons; i++) {
                buttons.push(
                    <button id={`page${i + 1}`} onClick={changePage}>
                        Page {i + 1}
                    </button>
                );
            }
            setpagebuttons(buttons);
        }
    }, [paginationready]);

    return (
        <div>
            <div>
                Community
                <SearchFriends />
            </div>
            <div>
                {paginationready &&
                    pagemembers.map((member: Member) => (
                        <div key={uniqid()}>
                            <Link to={`/people/${member.username}`}>
                                <DisplayProfileImage imageurl={member.imageurl} />
                            </Link>
                            <Link to={`/people/${member.username}`}>{member.username}</Link>
                        </div>
                    ))}
            </div>
            <div>
                {pagebuttons.map((button) => (
                    <div key={uniqid()}>{button}</div>
                ))}
            </div>
        </div>
    );
};

export default Community;

// todo: remove friend, remove project and delete images
