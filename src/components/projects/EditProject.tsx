//acess info from store
//import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import displaycategories from "../patterns/categories";
import NeedlesAvailable from "./selectNeedle";
import uniqid from "uniqid";
import HooksAvailable from "./selectHook";
import { DestructuringPattern } from "typescript";

//import Pattern from "../NewProject.tsx"; ainda nao sei se preciso disto

// receives basic information about project and creates form for filling out the rest
// updates store on form submit and db
//can create project on db on new project (and update db here on save) and add it to store on edit project
//maybe first local state and at the end put in store. in theory what will happen in the future is that when app loads, fetches all projects to store. when a new project is added it's added to db and to existing store.
//need to create form
const EditProject = function() {
    const { state } = useLocation();
    const { craft, name, pattern, aboutpattern } = state;
    const [selectNeedlesToRender, setSelectNeedlesToRender] = useState<
        JSX.Element[]
    >([]);
    const [needlesAdded, setNeedlesAdded] = useState<number>(0);
    const [selectHooksToRender, setSelectHooksToRender] = useState<JSX.Element[]>(
        []
    );
    const [hooksAdded, setHooksAdded] = useState<number>(0);
    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    };

    const addNeedle = function(event: React.MouseEvent): void {
        setNeedlesAdded(needlesAdded + 1);
    };
    const renderMultipleSelectNeedles = function(): void {
        for (let i = 0; i < needlesAdded; i++) {
            setSelectNeedlesToRender(
                selectNeedlesToRender.concat(
                    <NeedlesAvailable name={"selectneedles" + i} key={uniqid()} />
                )
            );
        }
    };
    const addHook = function(event: React.MouseEvent): void {
        setHooksAdded(hooksAdded + 1);
    };
    const renderMultipleSelectHooks = function(): void {
        for (let i = 0; i < hooksAdded; i++) {
            setSelectHooksToRender(
                selectHooksToRender.concat(
                    <HooksAvailable name={"selecthooks" + i} key={uniqid()} />
                )
            );
        }
    };

    const handlerOfChange = function() { };
    useEffect(() => {
        renderMultipleSelectNeedles();
    }, [needlesAdded]);
    useEffect(() => {
        renderMultipleSelectHooks();
    }, [hooksAdded]);
    return (
        <div>
            <h2>edit project</h2>
            <form id="editprojectform" onSubmit={handlerOfSubmit}>
                <label htmlFor="projectname">
                    Name
                    <input
                        type="text"
                        value={name}
                        id="projectname"
                        name="projectname"
                        onChange={handlerOfChange}
                    />
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
                        onChange={handlerOfChange}
                    />
                </label>
                <label htmlFor="craft-select">Craft</label>
                <select
                    name="crafts"
                    id="craft-select"
                    value={craft}
                    onChange={handlerOfChange}
                >
                    <option value="knitting">Knitting</option>
                    <option value="crochet">Crochet</option>
                    <option value="loomknitting">Loom Knitting</option>
                    <option value="machineknitting">Machine Knitting</option>
                    <option value="weaving">Weaving</option>
                    <option value="spinning">Spinning</option>
                </select>
                <input
                    type="text"
                    name="selectcategoryinput"
                    id="selectcategoryinput"
                    placeholder="select category..."
                    readOnly
                    onClick={displaycategories}
                    onChange={handlerOfChange}
                />
                <ul id="selectcategory"></ul>
                <label htmlFor="selectedtags">
                    Tags
                    <input type="text" name="selectedtags" id="selectedtags" />
                </label>
                <div id="addtool">
                    <button id="addneedle" onClick={addNeedle}>
                        add needle
                    </button>
                    <button id="addhook" onClick={addHook}>
                        add hook
                    </button>
                    {selectNeedlesToRender}
                    {selectHooksToRender}
                </div>
                <fieldset>
                    <label htmlFor="gaugehorizontal">
                        Gauge
                        <input
                            type="number"
                            name="gaugehorizontal"
                            id="gaugehorizontal"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <select
                        name="horizontalUnits"
                        id="horizontalUnits"
                        onChange={handlerOfChange}
                    >
                        <option value="stitches" selected>
                            stitches
                        </option>
                        <option value="repeats">repeats</option>
                    </select>
                    <label htmlFor="gaugevertical">
                        <input
                            type="number"
                            name="gaugevertical"
                            id="gaugevertical"
                            onChange={handlerOfChange}
                        />
                        rows in
                    </label>
                    <select
                        name="verticalUnits"
                        id="verticalUnits"
                        onChange={handlerOfChange}
                    >
                        <option value="25">2.5 cm</option>
                        <option value="5">5 cm</option>
                        <option value="10">10 cm</option>
                    </select>
                    <label>
                        Pattern for gauge
                        <input type="text" name="patternforgauge" id="patternforgauge" />
                    </label>
                </fieldset>
                <div id="yarn"></div>
            </form>
        </div>
    );
};

export default EditProject;

/* const createSelectNeedles = function(event: React.MouseEvent): void {
 *     setShowNeedles({
 *         show: true,
 *         needlesSelected: showNeedles.needlesSelected,
 *       currentvalue: "",
 *       defaultvalue: "43",
 *         selectsToDisplay: showNeedles.selectsToDisplay + 1,
 *     });
 * }; */

/* const showselected = function(event: React.FormEvent<HTMLSelectElement>) {
 *     event.preventDefault();
 *     setShowNeedles({
 *         show: showNeedles.show,
 *         needlesSelected: showNeedles.needlesSelected.concat(
 *             event.currentTarget.value
 *         ),
 *         currentvalue: event.currentTarget.value,
 *         selectsToDisplay: showNeedles.selectsToDisplay,
 *     });
 * }; */
