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
    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    };
    //to do: on mount document.getElementById("orange").selected = true; for craft

    return (
        <div>
            <h2>edit project</h2>
            <ul>
                <li>{craft}</li>
                <li>{name}</li>
                <li>{pattern}</li>
                <li>{aboutpattern}</li>
            </ul>
            <form onSubmit={handlerOfSubmit}>
                <label htmlFor="projectname">
                    Name
                    <input type="text" value={name} id="projectname" name="projectname" />
                </label>
                <label htmlFor="madefor">
                    Made for
                    <input type="text" id="madefor" name="madefor" />
                </label>
                <label htmlFor="linktoraveler">
                    Link to Raveler
                    <input type="text" id="linktoraveler" name="linktoraveler" />
                </label>
                <label htmlFor="finishby">
                    Finish by
                    <input type="date" id="finishby" name="finishby" />
                </label>
                <label htmlFor="sizemade">
                    Size made
                    <input type="text" id="sizemade" name="sizemade" />
                </label>
                <label htmlFor="patternfrom">
                    Pattern from
                    <input type="text" id="patternfrom" name="patternfrom" />
                </label>
                <label htmlFor="patternname">
                    Pattern name
                    <input
                        type="text"
                        id="patternname"
                        name="patternname"
                        value={pattern}
                    />
                </label>
                <label htmlFor="craft-select">Craft</label>
                <select name="crafts" id="craft-select">
                    <option value="knitting">Knitting</option>
                    <option value="crochet">Crochet</option>
                    <option value="loomknitting">Loom Knitting</option>
                    <option value="machineknitting">Machine Knitting</option>
                    <option value="weaving">Weaving</option>
                    <option value="spinning">Spinning</option>
                </select>
        //select category, on click runs categories();
                <ul id="selectcategory"></ul>
            </form>
        </div>
    );
};

export default EditProject;
