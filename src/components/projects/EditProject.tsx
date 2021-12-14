//acess info from store
//import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";
import { useSelector, useDispatch } from "react-redux";
import { projectAdded, selectProjectById } from "./projectsSlice";
import Project, { YarnEntry } from "../common/classes";
//import { RootState } from "../store/store";
import displaycategories from "../patterns/categories";
import NeedlesAvailable from "./selectNeedle";
import HooksAvailable from "./selectHook";
import YarnInfo from "./YarnInfo";
import type { ProjectInfo, Pattern, Status } from "../common/types";

// defaultvalue or value

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

    const [happinessChecked, setHappinessChecked] = useState<string>("");

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

    const [showYarnForm, setShowYarnForm] = useState<JSX.Element[]>([]);
    const [numberYarnAdded, setNumberYarnAdded] = useState<number>(0);

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
            let indexYarnAdded = event.target.parentElement!.parentElement!.id;
            if (
                elementId === "closestcolor" ||
                elementId === "yarnweight" ||
                elementId === "skeinmeterageunit" ||
                elementId === "skeinweightunit" ||
                elementId === "currency"
            ) {
                indexYarnAdded = event.target.parentElement!.id;
            }
            setProjectInformation((prevState) => {
                let previousInfo = Object.assign({}, prevState);
                const currentIndexOnProjectInfo = previousInfo.yarn.findIndex(
                    (element) => element.yarnID === indexYarnAdded
                );
                let currentYarn = previousInfo.yarn[currentIndexOnProjectInfo];
                currentYarn[elementId] = event.target.value;
                return previousInfo;
            });
        } else if (elementDataSet === "status") {
            setProjectStatus((prevState) => {
                let previousStatus = Object.assign({}, prevState);
                if (event.target.name === "happiness") {
                    setHappinessChecked(elementId);
                    previousStatus.happiness = elementId;
                } else {
                    previousStatus[elementId] = event.target.value;
                }

                return previousStatus;
            });
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
        } else {
            console.log("data set is missing");
        }
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

        // ******** update store and DB eventually. then redirect to a <project> component and send project id. fetch info store and display on component.

        console.log(projectInformation);
        console.log(projectStatus);
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

    const addYarn = function(event: React.MouseEvent): void {
        setNumberYarnAdded(numberYarnAdded + 1);
        const newyarn = new YarnEntry("yarn" + numberYarnAdded);
        setProjectInformation((prevState) => {
            let previousProjectInformation = Object.assign({}, prevState);
            previousProjectInformation.yarn = [
                ...previousProjectInformation.yarn,
                newyarn,
            ];
            return previousProjectInformation;
        });
    };

    const renderMultipleAddYarn = function(): void {
        for (let i = 0; i < numberYarnAdded; i++) {
            setShowYarnForm(
                showYarnForm.concat(
                    <YarnInfo
                        yarnID={"yarn" + i}
                        key={uniqid()}
                        handler={handlerOfChange}
                    />
                )
            );
        }
    };

    // add to class, type and initial store. actually should change initial store because I think things have changed.
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [photoLinkToDB, setPhotoLinkToDB] = useState("");

    const savePhoto = function(event: React.FormEvent<HTMLFormElement>) {
        setPhotoUploaded(true);
        //save photo to db and get link to display on component
        // photo -> input select file; place on storage and display on page imediately; photo state should be received or not. ? if received, display photo, else display input submit
        // set link locally and to store// local store, db and redux should all share the same elements. photo uploaded true/false and photo location.
        //setPhotoLinkToDB();
        event.preventDefault();
    };
    useEffect(() => {
        renderMultipleSelectNeedles();
    }, [needlesAdded]);
    useEffect(() => {
        renderMultipleSelectHooks();
    }, [hooksAdded]);
    useEffect(() => {
        renderMultipleAddYarn();
    }, [numberYarnAdded]);
    //display project about
    //useEffect on load should fetch obj from store and set project info as component state. on input change update the elements on state; fetch last element on store
    //see how to fetch data form store
    return (
        <div>
            <div>
                <form onSubmit={savePhoto}>
                    <label htmlFor="uploadphotoproject">
                        <input
                            type="file"
                            id="uploadphotoproject"
                            name="uploadphotoproject"
                            accept="image/*"
                        />
                    </label>
                    <button id="submitphoto" type="submit">
                        Upload
                    </button>
                </form>
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
                        {showYarnForm}
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
                        <label htmlFor="progressstatus">
                            Status
                            <select
                                id="progressstatus"
                                name="progressstatus"
                                value={projectStatus.progressstatus}
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
                                checked={happinessChecked === "verysad"}
                            />
                            <label htmlFor="verysad">Very sad</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="sad"
                                onChange={handlerOfChange}
                                data-project="status"
                                checked={happinessChecked === "sad"}
                            />
                            <label htmlFor="sad">Sad</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="meh"
                                onChange={handlerOfChange}
                                data-project="status"
                                checked={happinessChecked === "meh"}
                            />
                            <label htmlFor="meh">Meh</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="happy"
                                onChange={handlerOfChange}
                                data-project="status"
                                checked={happinessChecked === "happy"}
                            />
                            <label htmlFor="happy">Happy</label>
                            <input
                                type="radio"
                                name="happiness"
                                id="veryhappy"
                                onChange={handlerOfChange}
                                data-project="status"
                                checked={happinessChecked === "veryhappy"}
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
                                value={projectStatus.progressrange}
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
