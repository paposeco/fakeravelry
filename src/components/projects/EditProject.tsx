//acess info from store

import { useLocation } from "react-router-dom";
//import Pattern from "../NewProject.tsx"; ainda nao sei se preciso disto

// receives basic information about project and creates form for filling out the rest
// updates store on form submit and db
//can create project on db on new project (and update db here on save) and add it to store on edit project
//maybe first local state and at the end put in store. in theory what will happen in the future is that when app loads, fetches all projects to store. when a new project is added it's added to db and to existing store.
//need to create form
const EditProject = function() {
    const { state } = useLocation();
    const { craft, name, pattern, aboutpattern } = state;
    return (
        <div>
            <h2>edit project</h2>
            <ul>
                <li>{craft}</li>
                <li>{name}</li>
                <li>{pattern}</li>
                <li>{aboutpattern}</li>
            </ul>
        </div>
    );
};

export default EditProject;
