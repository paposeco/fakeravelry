//show project collection from (db -> store redux)

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInfo } from "../Firebase";

const Notebook = function() {
    const [newprojectpath, setnewprojectpath] = useState<string>("");
    const getUsername = async function() {
        const username = await getInfo("username");
        setnewprojectpath("/notebook/" + username + "/newproject");
    };
    useEffect(() => {
        getUsername();
    });
    return (
        <div>
            <Link to={newprojectpath}>Add new project</Link>
        </div>
    );
};

export default Notebook;
