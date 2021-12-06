//acess info from store
//import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import displaycategories from "../patterns/categories";
import NeedlesAvailable from "./selectNeedle";
import HooksAvailable from "./selectHook";
import { Colorways, Yarnweight, Currency } from "./SelectOptions";
import type { ProjectInfo, Gauge } from "../common/types";

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
    const [projectInformation, setProjectInformation] = useState<ProjectInfo>(
        {} as ProjectInfo
    );

    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(
            (event.currentTarget.elements.namedItem(
                "selectneedles0"
            ) as HTMLInputElement).value
        );
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

    const addYarn = function(): void {
        const yarnForm: HTMLElement | null = document.querySelector(
            "#yarn fieldset"
        );
        if (yarnForm !== null) {
            yarnForm!.style.display = "block";
        }
    };
    const handlerOfChange = function(
        event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
    ): void { };

    // fetches projectsinstore. need to place it in state. instead of receiving basic info from uselocation, could parseeverything from store directly.
    const projectsInStore: any = useSelector(
        (state: RootState) => state.projects
    );
    console.log(projectsInStore);
    /*
     *   handleInputChange(event) {
     *     const target = event.target;
     *     const value = target.type === 'checkbox' ? target.checked : target.value;
     *     const name = target.name;
     *     this.setState({
     *       [name]: value    });
     *    }*/

    useEffect(() => {
        renderMultipleSelectNeedles();
    }, [needlesAdded]);
    useEffect(() => {
        renderMultipleSelectHooks();
    }, [hooksAdded]);

    //display project about
    //useEffect on load should fetch obj from store and set project info as component state. on input change update the elements on state; fetch last element on store
    //see how to fetch data form store
    return (
        <div>
            <div>
                <p>add photos</p>
            </div>
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
                    <h3>Needles</h3>
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
                            />
                        </label>
                        <select
                            name="horizontalUnits"
                            id="horizontalUnits"
                            onChange={handlerOfChange}
                            value="stitches"
                        >
                            <option value="stitches">stitches</option>
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
                            <option value="notselected"> </option>
                            <option value="25">2.5 cm</option>
                            <option value="5">5 cm</option>
                            <option value="10">10 cm</option>
                        </select>
                        <label>
                            Pattern for gauge
                            <input type="text" name="patternforgauge" id="patternforgauge" />
                        </label>
                    </fieldset>
                    <h3>Yarns</h3>
                    <div id="yarn">
                        <button onClick={addYarn}>add yarn</button>
                        <fieldset style={{ display: "none" }}>
                            <label htmlFor="yarnname">
                                Yarn
                                <input type="text" name="yarnname" id="yarnname" />
                            </label>
                            <label htmlFor="colorway">
                                Colorway
                                <input type="text" name="colorway" id="colorway" />
                            </label>
                            <select
                                name="closestcolor"
                                id="closestcolor"
                                onChange={handlerOfChange}
                                value="colorway0"
                            >
                                {Colorways.map((color, index) => (
                                    <option value={"color" + index} key={uniqid()}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="dyelot">
                                Dye lot
                                <input name="dyelot" id="dyelot" type="text" />
                            </label>
                            <select
                                name="yarnweight"
                                id="yarnweight"
                                onChange={handlerOfChange}
                                value="yarnweight0"
                            >
                                {Yarnweight.map((weight, index) => (
                                    <option value={"yarnweight" + index} key={uniqid()}>
                                        {weight}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="meterage">
                                Per skein: <input id="meterage" name="meterage" type="number" />
                                <select
                                    name="skeinmeterageunit"
                                    id="skeinmeterageunit"
                                    value="meters"
                                    onChange={handlerOfChange}
                                >
                                    <option value="meters">Meters</option>
                                    <option value="yards">Convert to Yards</option>
                                </select>
                                <input id="skeinweight" name="skeinweight" type="number" />
                                <select
                                    name="skeinweightunit"
                                    id="skeinweightunit"
                                    value="grams"
                                    onChange={handlerOfChange}
                                >
                                    <option value="grams">Grams</option>
                                    <option value="ounces">Convert to Ounces</option>
                                </select>
                            </label>
                            <label htmlFor="numberskeins">
                                Skeins
                                <input type="number" id="numberskeins" name="numberskeins" />
                            </label>
                            <label htmlFor="purchasedat">
                                Purchased at
                                <input id="purchasedat" name="purchasedat" type="text" />
                            </label>
                            <label htmlFor="purchasedate">
                                Purchase date
                                <input name="purchasedate" id="purchasedate" type="date" />
                            </label>
                            <label htmlFor="totalpaid">
                                Total paid
                                <input type="number" name="totalpaid" id="totalpaid" />
                                <select
                                    name="currency"
                                    id="currency"
                                    value="currency0"
                                    onChange={handlerOfChange}
                                >
                                    {Currency.map((cur, index) => (
                                        <option value={"currency" + index} key={uniqid()}>
                                            {cur}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </fieldset>
                    </div>
                    <h3>Project notes</h3>
                    <input type="textarea" name="projectnotes" id="projectnotes" />
                    <input type="submit" value="Save Changes" />
                    <div>
                        <label htmlFor="status">
                            Status
                            <select
                                id="status"
                                name="status"
                                value="inprogress"
                                onChange={handlerOfChange}
                            >
                                <option value="inprogress">In progress</option>
                                <option value="finished">Finished</option>
                                <option value="hibernating">Hibernating</option>
                                <option value="frogged">Frogged</option>
                            </select>
                        </label>
                        <label htmlFor="happiness">
                            Happiness
                            <input type="radio" name="happiness" id="verysad" />
                            <label htmlFor="verysad">Very sad</label>
                            <input type="radio" name="happiness" id="sad" />
                            <label htmlFor="sad">Sad</label>
                            <input type="radio" name="happiness" id="meh" />
                            <label htmlFor="meh">Meh</label>
                            <input type="radio" name="happiness" id="happy" />
                            <label htmlFor="happy">Happy</label>
                            <input type="radio" name="happiness" id="veryhappy" />
                            <label htmlFor="veryhappy">Very Happy</label>
                        </label>
                        <label htmlFor="progressrange">
                            Progress
                            <input
                                type="range"
                                name="progressrange"
                                id="progressrange"
                                min="0"
                                max="100"
                            />
                        </label>
                        <label htmlFor="starteddate">
                            Started
                            <input type="date" id="starteddate" name="starteddate" />
                        </label>
                        <label htmlFor="completeddate">
                            Completed
                            <input type="date" id="completeddate" name="completeddate" />
                        </label>
                    </div>
                </form>
            </div>
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
/*  */

// project status toggles form elements
