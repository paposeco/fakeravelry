//acess info from store
//import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";
import { useSelector, useDispatch } from "react-redux";
import { projectAdded, selectProjectById } from "./projectsSlice";
import Project from "../common/classes";

import { RootState } from "../store/store";
import displaycategories from "../patterns/categories";
import NeedlesAvailable from "./selectNeedle";
import HooksAvailable from "./selectHook";
import { Colorways, Yarnweight, Currency } from "./SelectOptions";
import type { ProjectInfo, Pattern, Status } from "../common/types";

//import Pattern from "../NewProject.tsx"; ainda nao sei se preciso disto

// receives basic information about project and creates form for filling out the rest
// updates store on form submit and db
//can create project on db on new project (and update db here on save) and add it to store on edit project
//maybe first local state and at the end put in store. in theory what will happen in the future is that when app loads, fetches all projects to store. when a new project is added it's added to db and to existing store.
//need to create form
const EditProject = function() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { projectid, crafttype, projectname, patternused, patternname } = state;
    const [projectID, setProjectID] = useState(state.projectid);
    const newproject = new Project(
        state.crafttype,
        state.projectname,
        state.patternused,
        state.patternname
    );

    const [craftType, setCraftType] = useState<string>(newproject.crafttype);
    const [projectName, setProjectName] = useState<string>(
        newproject.projectname
    );
    const [patternAbout, setPatternAbout] = useState<string>(
        newproject.pattern.about
    );
    const [patternName, setPatternName] = useState<string>(
        newproject.pattern.name
    );
    const [projectInformation, setProjectInformation] = useState<ProjectInfo>(
        newproject.projectinfo
    );
    const [projectStatus, setProjectStatus] = useState<Status>(
        newproject.projectstatus
    );

    useEffect(() => {
        dispatch(
            projectAdded({
                projectid: projectID,
                photo: newproject.photo,
                crafttype: newproject.crafttype,
                projectname: newproject.projectname,
                pattern: newproject.pattern,
                projectinfo: newproject.projectinfo,
                projectstatus: newproject.projectstatus,
            })
        );
    }, [state]);

    //on refresh, store gets cleared ?? if state already exists, shouldn't read from redux, but from local state, should create new item in storage then
    /* const currentProject: any = useSelector((state: RootState) =>
     *     selectProjectById(state, projectID)
     * ); */

    // when it gets here, if current project doesn't exist, must create a new store

    const [selectNeedlesToRender, setSelectNeedlesToRender] = useState<
        JSX.Element[]
    >([]);
    const [needlesAdded, setNeedlesAdded] = useState<number>(0);
    const [selectHooksToRender, setSelectHooksToRender] = useState<JSX.Element[]>(
        []
    );
    const [hooksAdded, setHooksAdded] = useState<number>(0);

    const setFunctions = new Map([
        ["projectname", setProjectName],
        ["craft-select", setCraftType],
        ["patternName", setPatternName],
    ]);

    /* const [state, setState] = useState({});
     * setState(prevState => {
     *   // Object.assign would also work
     *   return {...prevState, ...updatedValues};
     * })
     *  */

    // if I refresh the page I values won't be placed on input etc because there isn't value there
    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void {
        const elementId: string = event.target.id; // event target or currenttarget=
        const elementDataSet = event.target.dataset.project;
        const newvalue = event.target.value;
        if (elementDataSet === "newproject") {
            const elementStateFunction = setFunctions.get(elementId);
            if (elementStateFunction !== undefined) {
                elementStateFunction(newvalue);
            }
            // each time a needle gets added, state must be updated
        } else if (elementDataSet === "info") {
            setProjectInformation((prevState) => {
                let previousInfo = Object.assign({}, prevState);
                if (event.target.className === "needles") {
                    const indexselectedneedle = previousInfo.needles.findIndex(
                        (element) => element.selectid === elementId
                    );
                    previousInfo.needles[indexselectedneedle].value = newvalue;
                } else if (event.target.className === "hooks") {
                    const indexselectedhook = previousInfo.hooks.findIndex(
                        (element) => element.selectid === elementId
                    );
                    previousInfo.hooks[indexselectedhook].value = newvalue;
                } else {
                    previousInfo[elementId] = event.target.value;
                }

                return previousInfo;
            });
        } else if (elementDataSet === "yarn") {
        } else if (elementDataSet === "status") {
        } else if (elementDataSet === "gauge") {
            if (elementId === "gaugehorizontal") {
                setProjectInformation({
                    ...projectInformation!,
                    gauge: {
                        ...projectInformation!.gauge,
                        numberStsOrRepeats: Number(newvalue),
                    },
                });
            } else if (elementId === "horizontalUnits") {
                setProjectInformation({
                    ...projectInformation!,
                    gauge: { ...projectInformation!.gauge, horizontalunits: newvalue },
                });
            } else if (elementId === "gaugevertical") {
                setProjectInformation({
                    ...projectInformation!,
                    gauge: { ...projectInformation!.gauge, numberRows: Number(newvalue) },
                });
            } else {
                setProjectInformation({
                    ...projectInformation!,
                    gauge: { ...projectInformation!.gauge, gaugesize: newvalue },
                });
            }
            console.log(projectInformation);
        } else {
            console.log("data set is missing");
        }
        /* if (elementId === "craft-select") {
         *     setCraftType(event.currentTarget.value);
         *     // this is the way
         * } else if (elementId === "sizemade") {
         *     setProjectInformation((prevState) => {
         *         let previousInfo = Object.assign({}, prevState);
         *         previousInfo.sizemade = event.target.value;
         *         return previousInfo;
         *     });
         * } */
    };

    /*
     *   handleInputChange(event) {
     *     const target = event.target;
     *     const value = target.type === 'checkbox' ? target.checked : target.value;
     *     const name = target.name;
     *     this.setState({
     *       [name]: value    });
     *    }*/

    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // update store with projectUpdate
    };

    const addNeedle = function(event: React.MouseEvent) {
        setNeedlesAdded(needlesAdded + 1);
        setProjectInformation((prevState) => {
            let previousProjectInformation = Object.assign({}, prevState);
            const idalias: string = "selectneedles" + needlesAdded;
            let newNeedle = { selectid: idalias, value: "43" };
            previousProjectInformation.needles = [
                ...previousProjectInformation.needles,
                newNeedle,
            ];
            return previousProjectInformation;
        });
    };
    const renderMultipleSelectNeedles = function(): void {
        for (let i = 0; i < needlesAdded; i++) {
            setSelectNeedlesToRender(
                selectNeedlesToRender.concat(
                    <NeedlesAvailable
                        name={"selectneedles" + i}
                        key={uniqid()}
                        handler={handlerOfChange}
                    />
                )
            );
        }
    };
    const addHook = function(event: React.MouseEvent): void {
        setHooksAdded(hooksAdded + 1);
        setProjectInformation((prevState) => {
            let previousProjectInformation = Object.assign({}, prevState);
            const idalias: string = "selecthooks" + hooksAdded;
            let newHook = { selectid: idalias, value: "25" };
            previousProjectInformation.hooks = [
                ...previousProjectInformation.hooks,
                newHook,
            ];
            return previousProjectInformation;
        });
    };
    const renderMultipleSelectHooks = function(): void {
        for (let i = 0; i < hooksAdded; i++) {
            setSelectHooksToRender(
                selectHooksToRender.concat(
                    <HooksAvailable
                        name={"selecthooks" + i}
                        key={uniqid()}
                        handler={handlerOfChange}
                    />
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
                            value={projectName}
                            id="projectname"
                            name="projectname"
                            data-project="newproject"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="madefor">
                        Made for
                        <input
                            type="text"
                            id="madefor"
                            name="madefor"
                            data-project="info"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="linktoraveler">
                        Link to Raveler
                        <input
                            type="text"
                            id="linktoraveler"
                            name="linktoraveler"
                            data-project="info"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="finishby">
                        Finish by
                        <input
                            type="date"
                            id="finishby"
                            name="finishby"
                            data-project="info"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="sizemade">
                        Size made
                        <input
                            type="text"
                            id="sizemade"
                            name="sizemade"
                            onChange={handlerOfChange}
                            data-project="info"
                        />
                    </label>
                    <label htmlFor="patternfrom">
                        Pattern from
                        <input
                            type="text"
                            id="patternfrom"
                            name="patternfrom"
                            data-project="info"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="patternname">
                        Pattern name
                        <input
                            type="text"
                            id="patternname"
                            name="patternname"
                            value={patternName}
                            data-project="newproject"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <label htmlFor="craft-select">Craft</label>
                    <select
                        name="crafts"
                        id="craft-select"
                        value={craftType}
                        data-project="newproject"
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
                        data-project="info"
                    />
                    <ul id="selectcategory"></ul>
                    <label htmlFor="selectedtags">
                        Tags
                        <input
                            type="text"
                            name="selectedtags"
                            id="selectedtags"
                            data-project="info"
                            onChange={handlerOfChange}
                        />
                    </label>
                    <h3>Needles</h3>
                    <div id="addtool">
                        <button id="addneedle" onClick={addNeedle} type="button">
                            add needle
                        </button>
                        <button id="addhook" onClick={addHook} type="button">
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
                                data-project="gauge"
                                onChange={handlerOfChange}
                            />
                        </label>
                        <select
                            name="horizontalUnits"
                            id="horizontalUnits"
                            onChange={handlerOfChange}
                            data-project="gauge"
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
                                data-project="gauge"
                            />
                            rows in
                        </label>
                        <select
                            name="verticalUnits"
                            id="verticalUnits"
                            onChange={handlerOfChange}
                            data-project="gauge"
                        >
                            <option value="notselected"> </option>
                            <option value="25">2.5 cm</option>
                            <option value="5">5 cm</option>
                            <option value="10">10 cm</option>
                        </select>
                        <label>
                            Pattern for gauge
                            <input
                                type="text"
                                name="patternforgauge"
                                id="patternforgauge"
                                data-project="info"
                                onChange={handlerOfChange}
                            />
                        </label>
                    </fieldset>
                    <h3>Yarns</h3>
                    <div id="yarn">
                        <button onClick={addYarn} type="button">
                            add yarn
                        </button>
                        <fieldset style={{ display: "none" }}>
                            <label htmlFor="yarnname">
                                Yarn
                                <input
                                    type="text"
                                    name="yarnname"
                                    id="yarnname"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <label htmlFor="colorway">
                                Colorway
                                <input
                                    type="text"
                                    name="colorway"
                                    id="colorway"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <select
                                name="closestcolor"
                                id="closestcolor"
                                onChange={handlerOfChange}
                                value="colorway0"
                                data-project="yarn"
                            >
                                {Colorways.map((color, index) => (
                                    <option value={"color" + index} key={uniqid()}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="dyelot">
                                Dye lot
                                <input
                                    name="dyelot"
                                    id="dyelot"
                                    type="text"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <select
                                name="yarnweight"
                                id="yarnweight"
                                onChange={handlerOfChange}
                                value="yarnweight0"
                                data-project="yarn"
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
                                    data-project="yarn"
                                >
                                    <option value="meters">Meters</option>
                                    <option value="yards">Convert to Yards</option>
                                </select>
                                <input
                                    id="skeinweight"
                                    name="skeinweight"
                                    type="number"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                                <select
                                    name="skeinweightunit"
                                    id="skeinweightunit"
                                    value="grams"
                                    onChange={handlerOfChange}
                                    data-project="yarn"
                                >
                                    <option value="grams">Grams</option>
                                    <option value="ounces">Convert to Ounces</option>
                                </select>
                            </label>
                            <label htmlFor="numberskeins">
                                Skeins
                                <input
                                    type="number"
                                    id="numberskeins"
                                    name="numberskeins"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <label htmlFor="purchasedat">
                                Purchased at
                                <input
                                    id="purchasedat"
                                    name="purchasedat"
                                    type="text"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <label htmlFor="purchasedate">
                                Purchase date
                                <input
                                    name="purchasedate"
                                    id="purchasedate"
                                    type="date"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                            </label>
                            <label htmlFor="totalpaid">
                                Total paid
                                <input
                                    type="number"
                                    name="totalpaid"
                                    id="totalpaid"
                                    data-project="yarn"
                                    onChange={handlerOfChange}
                                />
                                <select
                                    name="currency"
                                    id="currency"
                                    value="currency0"
                                    onChange={handlerOfChange}
                                    data-project="yarn"
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
                    <input
                        type="textarea"
                        name="projectnotes"
                        id="projectnotes"
                        data-project="info"
                        onChange={handlerOfChange}
                    />
                    <input type="submit" value="Save Changes" />
                    <div>
                        <label htmlFor="status">
                            Status
                            <select
                                id="status"
                                name="status"
                                value="inprogress"
                                onChange={handlerOfChange}
                                data-project="status"
                            >
                                <option value="inprogress">In progress</option>
                                <option value="finished">Finished</option>
                                <option value="hibernating">Hibernating</option>
                                <option value="frogged">Frogged</option>
                            </select>
                        </label>
                        <label htmlFor="happiness">
                            Happiness
                            <input
                                type="radio"
                                name="happiness"
                                id="verysad"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                            <label htmlFor="verysad">Very sad</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="sad"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                            <label htmlFor="sad">Sad</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="meh"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                            <label htmlFor="meh">Meh</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="happy"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                            <label htmlFor="happy">Happy</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="veryhappy"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
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
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                        </label>
                        <label htmlFor="starteddate">
                            Started
                            <input
                                type="date"
                                id="starteddate"
                                name="starteddate"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
                        </label>
                        <label htmlFor="completeddate">
                            Completed
                            <input
                                type="date"
                                id="completeddate"
                                name="completeddate"
                                onChange={handlerOfChange}
                                data-project="status"
                            />
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
