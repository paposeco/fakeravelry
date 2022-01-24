//acess info from store
//import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { projectUpdated, projectPhotoAdded } from "./projectsSlice";
import { YarnEntry } from "../common/classes";
import displaycategories, { selectedCategory } from "../patterns/categories";
import DisplayProjectImage from "./DisplayProjectImage";
import YarnInfo from "./YarnInfo";
import type {
    ProjectInfo,
    Status,
    ProjectFromStore,
    Needles,
    Hooks,
    Yarn,
} from "../common/types";
import { updateProjectInDB, uploadPhoto, linkToRaveler } from "../../Firebase";
import DisplaySingleNeedle from "./DisplaySingleNeedle";
import DisplaySingleHook from "./DisplaySingleHook";

//need to handle refreshes

const EditProject = function() {
    // project id is available on state
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectid } = state;
    const [projectID, setProjectID] = useState(state.projectid);
    const [username, setUsername] = useState<string>("");
    // fetches current username from store
    const user = useSelector((state: RootState) => state.userinfo.username);
    // fetches project data from store
    const projectData: ProjectFromStore | undefined = useSelector(
        (state: RootState) =>
            state.projects.find((element) => element.projectid === projectid)
    );

    // local state hooks for form
    const [craftType, setCraftType] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [patternAbout, setPatternAbout] = useState<string>("");
    const [patternName, setPatternName] = useState<string>("");
    const [patternUsed, setPatternUsed] = useState<string>("");
    const [projectInformation, setProjectInformation] = useState<ProjectInfo>();
    const [projectStatus, setProjectStatus] = useState<Status>();
    const [happinessChecked, setHappinessChecked] = useState<string>("");
    const [needleCollection, setNeedleCollection] = useState<Needles[]>([]);
    const [hookCollection, setHookCollection] = useState<Hooks[]>([]);
    const [selectNeedlesToRender, setSelectNeedlesToRender] = useState<
        JSX.Element[]
    >([]);
    const [needlesAdded, setNeedlesAdded] = useState<number>(0);
    const [selectHooksToRender, setSelectHooksToRender] = useState<JSX.Element[]>(
        []
    );
    const [hooksAdded, setHooksAdded] = useState<number>(0);
    const [showYarnForm, setShowYarnForm] = useState<JSX.Element[]>([]);
    const [yarncollection, setYarnCollection] = useState<Yarn[]>([]);
    const [projectSlug, setProjectSlug] = useState<string>("");
    const [madefor, setMadeFor] = useState<string>("");

    // easier access to correct hook for event target id
    const setFunctions = new Map([
        ["projectname", setProjectName],
        ["craft-select", setCraftType],
        ["patternname", setPatternName],
    ]);

    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void {
        const elementId: string = event.target.id;
        const elementDataSet = event.target.dataset.project;
        const newvalue = event.target.value;
        if (elementDataSet === "newproject") {
            const elementStateFunction = setFunctions.get(elementId);
            if (elementStateFunction !== undefined) {
                elementStateFunction(newvalue);
            }
        } else if (elementDataSet === "info") {
            if (event.target.className === "needles") {
                setNeedleCollection((prevState) => {
                    const previousInfo: Needles[] = Array.from(prevState);
                    const selectedneedle = previousInfo.findIndex(
                        (element) => element.selectid === elementId
                    );
                    previousInfo[selectedneedle].value = newvalue;
                    return previousInfo;
                });
            } else if (event.target.className === "hooks") {
                setHookCollection((prevState) => {
                    const previousInfo: Hooks[] = Array.from(prevState);
                    const selectedhook = previousInfo.findIndex(
                        (element) => element.selectid === elementId
                    );
                    previousInfo[selectedhook].value = newvalue;
                    return previousInfo;
                });
            } else if (elementId === "madefor") {
                setProjectInformation((prevState) => {
                    let previousInfo = Object.assign({}, prevState);
                    previousInfo.madefor = newvalue;
                    return previousInfo;
                });
                setMadeFor(newvalue);
            } else {
                setProjectInformation((prevState) => {
                    let previousInfo = Object.assign({}, prevState);
                    previousInfo[elementId] = newvalue;
                    return previousInfo;
                });
            }
        } else if (elementDataSet === "yarn") {
            let indexYarnAdded = event.target.parentElement!.parentElement!.id;
            if (elementId === "closestcolor" || elementId === "yarnweight") {
                indexYarnAdded = event.target.parentElement!.id;
            }
            setYarnCollection((prevState) => {
                let currentyarncollection = Array.from(prevState);
                const indexCurrentYarn = prevState.findIndex(
                    (element) => element.yarnID === indexYarnAdded
                );
                let currentYarn = currentyarncollection[indexCurrentYarn];
                currentYarn[elementId] = event.target.value;
                return currentyarncollection;
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
            } else if (elementId === "gaugepattern") {
                setProjectInformation({
                    ...projectInformation!,
                    gauge: { ...projectInformation!.gauge, gaugepattern: newvalue },
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

    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        if (projectInformation !== undefined) {
            /* let ravelerpath: string = "";
             * if (projectInformation.madefor !== "") {
             *     // looks for user in db
             *     ravelerpath = await linkToRaveler(projectInformation.madefor);
             * } */
            // update project in db
            let gaugeNumberSts: number | null;
            let gaugeNumberRows: number | null;
            projectInformation.gauge.numberStsOrRepeats === undefined
                ? (gaugeNumberSts = null)
                : (gaugeNumberSts = projectInformation.gauge.numberStsOrRepeats);
            projectInformation.gauge.numberRows === undefined
                ? (gaugeNumberRows = null)
                : (gaugeNumberRows = projectInformation.gauge.numberRows);
            updateProjectInDB(
                projectID,
                craftType!,
                projectSlug!,
                projectName!,
                patternUsed,
                patternName!,
                patternAbout!,
                projectInformation.madefor,
                projectInformation.linktoraveler,
                projectInformation.finishby,
                projectInformation.sizemade,
                projectInformation.patternfrom,
                selectedCategory,
                projectInformation.selectedtags,
                needleCollection,
                hookCollection,
                gaugeNumberSts,
                projectInformation.gauge.horizontalunits,
                gaugeNumberRows,
                projectInformation.gauge.gaugesize,
                projectInformation.gauge.gaugepattern,
                JSON.stringify(yarncollection),
                projectInformation.projectnotes,
                projectStatus!.progressstatus,
                projectStatus!.progressrange,
                projectStatus!.happiness,
                projectStatus!.starteddate,
                projectStatus!.completeddate
            );

            // update project in store
            dispatch(
                projectUpdated({
                    projectid: projectID,
                    crafttype: craftType,
                    projectslug: projectSlug,
                    projectname: projectName,
                    patternused: patternUsed,
                    patternname: patternName,
                    about: patternAbout,
                    madefor: projectInformation.madefor,
                    linktoraveler: projectInformation.linktoraveler,
                    finishby: projectInformation.finishby,
                    sizemade: projectInformation.sizemade,
                    patternfrom: projectInformation.patternfrom,
                    patterncategory: selectedCategory,
                    selectedtags: projectInformation.selectedtags,
                    needles: needleCollection,
                    hooks: hookCollection,
                    numberStsOrRepeats: projectInformation.gauge.numberStsOrRepeats,
                    horizontalunits: projectInformation.gauge.horizontalunits,
                    numberRows: projectInformation.gauge.numberRows,
                    gaugesize: projectInformation.gauge.gaugesize,
                    gaugepattern: projectInformation.gauge.gaugepattern,
                    yarn: JSON.stringify(yarncollection),
                    projectnotes: projectInformation.projectnotes,
                    progressstatus: projectStatus!.progressstatus,
                    progressrange: projectStatus!.progressrange,
                    happiness: projectStatus!.happiness,
                    starteddate: projectStatus!.starteddate,
                    completeddate: projectStatus!.completeddate,
                })
            );
            const cleanProjectName = projectName!
                .toLowerCase()
                .trim()
                .replace(/ /g, "-");

            // redirects to project page
            const path = "/notebook/" + username + "/projects/" + cleanProjectName;
            navigate(path, {
                state: { projectid: projectID },
            });
        }
    };

    // needles', hooks' and yarn's forms are only displayed if the user clicks their respective buttons.
    const addNeedle = function(event: React.MouseEvent) {
        setNeedlesAdded(needlesAdded + 1);
        const newneedlealias = "selectneedles" + needlesAdded;
        // sets an initial needle value
        setNeedleCollection((prevState) => [
            ...prevState,
            { selectid: newneedlealias, value: "43" },
        ]);
        // renders the needle select form
        setSelectNeedlesToRender((prevState) => [
            ...prevState,
            <DisplaySingleNeedle
                needle={{ selectid: newneedlealias, value: "43" }}
                handler={handlerOfChange}
                key={uniqid()}
            />,
        ]);
    };

    // if the user is editing a project that already existed, the needles, hooks and yarn need to be rendered differently, since they are rendered with individual components
    const addNeedlesFromStorage = function(needles: Needles[]) {
        for (let i = 0; i < needles.length; i++) {
            setNeedlesAdded(needlesAdded + 1);
            setNeedleCollection((prevState) => [
                ...prevState,
                { selectid: needles[i].selectid, value: needles[i].value },
            ]);
            setSelectNeedlesToRender((prevState) => [
                ...prevState,
                <DisplaySingleNeedle
                    needle={{ selectid: needles[i].selectid, value: needles[i].value }}
                    handler={handlerOfChange}
                    key={uniqid()}
                />,
            ]);
        }
    };

    const addHook = function(event: React.MouseEvent) {
        setHooksAdded(hooksAdded + 1);
        const newhookalias = "selecthooks" + hooksAdded;
        setHookCollection((prevState) => [
            ...prevState,
            { selectid: newhookalias, value: "43" },
        ]);
        setSelectHooksToRender((prevState) => [
            ...prevState,
            <DisplaySingleHook
                hook={{ selectid: newhookalias, value: "43" }}
                handler={handlerOfChange}
                key={uniqid()}
            />,
        ]);
    };

    const addHooksFromStorage = function(hooks: Hooks[]) {
        for (let i = 0; i < hooks.length; i++) {
            setHooksAdded(hooksAdded + 1);
            setHookCollection((prevState) => [
                ...prevState,
                { selectid: hooks[i].selectid, value: hooks[i].value },
            ]);
            setSelectHooksToRender((prevState) => [
                ...prevState,
                <DisplaySingleHook
                    hook={{ selectid: hooks[i].selectid, value: hooks[i].value }}
                    handler={handlerOfChange}
                    key={uniqid()}
                />,
            ]);
        }
    };

    const addYarn = function(event: React.MouseEvent): void {
        const newYarnCollectionLength: number = yarncollection.length + 1;
        const newyarn = new YarnEntry("yarn" + newYarnCollectionLength);
        setYarnCollection((prevState) => [...prevState, newyarn]);
        setShowYarnForm((prevState) => [
            ...prevState,
            <YarnInfo
                yarnID={"yarn" + newYarnCollectionLength}
                yarninfo={newyarn}
                key={uniqid()}
                handler={handlerOfChange}
            />,
        ]);
    };

    const renderYarnFromStorage = function(yarncollection: string) {
        if (yarncollection !== "") {
            // due to the amount of information for each yarn added to a project, the yarn array is stored in a json on the store
            const parseCollection: Yarn[] = JSON.parse(yarncollection);
            for (let i = 0; i < parseCollection.length; i++) {
                setYarnCollection((prevState) => [...prevState, parseCollection[i]]);
                setShowYarnForm((prevState) => [
                    ...prevState,
                    <YarnInfo
                        yarnID={parseCollection[i].yarnID}
                        yarninfo={parseCollection[i]}
                        key={uniqid()}
                        handler={handlerOfChange}
                    />,
                ]);
            }
        }
    };

    // handles adding images to projects
    const [imageSelected, setImageSelected] = useState<FileList | null>();
    const [publicImgUrl, setPublicImgUrl] = useState<string>();
    const [displayImageComponent, setDisplayImageComponent] =
        useState<JSX.Element>();
    const imageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setImageSelected(event.target.files);
    };
    const savePhoto = async function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (imageSelected !== (null && undefined)) {
            // uploads image to firebase storage and returns a public url
            const publicUrl = await uploadPhoto(projectID, imageSelected![0]);
            if (publicUrl !== false) {
                setPublicImgUrl(publicUrl);
                // updates store with publicurl
                dispatch(
                    projectPhotoAdded({ projectid: projectID, imageUrl: publicUrl })
                );
            }
        }
    };

    const renderImage = function(): void {
        if (publicImgUrl !== undefined) {
            setDisplayImageComponent(<DisplayProjectImage imageurl={publicImgUrl} />);
        }
    };

    // on page load, sets project information with info from store
    useEffect(() => {
        if (projectData !== undefined) {
            setCraftType(projectData.crafttype);
            setProjectName(projectData.projectname);
            setPatternAbout(projectData.pattern.about);
            setPatternName(projectData.pattern.name);
            setProjectInformation(projectData.projectinfo);
            setProjectStatus(projectData.projectstatus);
            setHappinessChecked(projectData.projectstatus.happiness);
            renderYarnFromStorage(projectData.projectinfo.yarn);
            addNeedlesFromStorage(projectData.projectinfo.needles);
            addHooksFromStorage(projectData.projectinfo.hooks);
            setHooksAdded(projectData.projectinfo.hooks.length);
            setPublicImgUrl(projectData.imageUrl);
            setProjectSlug(projectData.projectslug);
            setPatternUsed(projectData.patternused);
        }
    }, [projectData]);

    useEffect(() => {
        renderImage();
    }, [publicImgUrl]);
    useEffect(() => {
        setUsername(user);
    }, [user]);

    useEffect(() => {
        if (madefor !== "") {
            linkToRaveler(projectInformation!.madefor).then((value) => {
                setProjectInformation((prevState) => {
                    let previousInfo = Object.assign({}, prevState);
                    previousInfo.linktoraveler = value;
                    return previousInfo;
                });
            });
        }
    }, [madefor]);
    if (projectInformation !== undefined) {
        return (
            <div>
                <div>
                    {displayImageComponent}
                    <form id="uploadPhotoForm" onSubmit={savePhoto}>
                        <label htmlFor="uploadphotoproject">
                            <input
                                type="file"
                                id="uploadphotoproject"
                                name="uploadphotoproject"
                                accept="image/*"
                                onChange={imageChange}
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
                                value={projectInformation.madefor}
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
                                value={projectInformation.linktoraveler}
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
                                value={projectInformation.finishby}
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
                                value={projectInformation.sizemade}
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
                                value={projectInformation.patternfrom}
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
                            name="patterncategory"
                            id="patterncategory"
                            placeholder="select category..."
                            onClick={displaycategories}
                            onChange={handlerOfChange}
                            value={selectedCategory}
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
                                value={projectInformation.selectedtags}
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
                            {/* {selectNeedlesToRender.map((select) => (
                                <div key={uniqid()}>{select}</div>
                            ))} */}
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
                                    value={projectInformation.gauge.numberStsOrRepeats}
                                />
                            </label>
                            <select
                                name="horizontalUnits"
                                id="horizontalUnits"
                                onChange={handlerOfChange}
                                value={projectInformation.gauge.horizontalunits}
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
                                    value={projectInformation.gauge.numberRows}
                                    data-project="gauge"
                                />
                                rows in
                            </label>
                            <select
                                name="verticalUnits"
                                id="verticalUnits"
                                onChange={handlerOfChange}
                                value={projectInformation.gauge.gaugesize}
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
                                    name="gaugepattern"
                                    id="gaugepattern"
                                    data-project="gauge"
                                    onChange={handlerOfChange}
                                    value={projectInformation.gauge.gaugepattern}
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
                            value={projectInformation.projectnotes}
                        />
                        <input type="submit" value="Save Changes" />
                        <div>
                            <label htmlFor="progressstatus">
                                Status
                                <select
                                    id="progressstatus"
                                    name="progressstatus"
                                    value={projectStatus!.progressstatus}
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
                                <label htmlFor="verysad">
                                    <i className="las la-sad-tear happinessemoji"></i>
                                </label>
                                <input
                                    type="radio"
                                    name="happiness"
                                    id="sad"
                                    onChange={handlerOfChange}
                                    data-project="status"
                                    checked={happinessChecked === "sad"}
                                />
                                <label htmlFor="sad">
                                    <i className="las la-frown happinessemoji"></i>
                                </label>
                                <input
                                    type="radio"
                                    name="happiness"
                                    id="meh"
                                    onChange={handlerOfChange}
                                    data-project="status"
                                    checked={happinessChecked === "meh"}
                                />
                                <label htmlFor="meh">
                                    <i className="las la-meh happinessemoji"></i>
                                </label>
                                <input
                                    type="radio"
                                    name="happiness"
                                    id="happy"
                                    onChange={handlerOfChange}
                                    data-project="status"
                                    checked={happinessChecked === "happy"}
                                />
                                <label htmlFor="happy">
                                    <i className="las la-smile-beam happinessemoji"></i>
                                </label>
                                <input
                                    type="radio"
                                    name="happiness"
                                    id="veryhappy"
                                    onChange={handlerOfChange}
                                    data-project="status"
                                    checked={happinessChecked === "veryhappy"}
                                />
                                <label htmlFor="veryhappy">
                                    <i className="las la-laugh happinessemoji"></i>
                                </label>
                            </label>
                            <label htmlFor="progressrange">
                                Progress
                                <input
                                    type="range"
                                    name="progressrange"
                                    id="progressrange"
                                    min="0"
                                    value={projectStatus!.progressrange}
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
                                    value={projectStatus!.starteddate}
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
                                    value={projectStatus!.completeddate}
                                />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default EditProject;

// project status toggles form elements

// very sad <i class="las la-sad-tear"></i>
// sad <i class="las la-frown"></i>
// meh <i class="las la-meh"></i>
// happy <i class="las la-smile-beam"></i>
// very happy <i class="las la-laugh"></i>

// /notebook should redirect to /notebook/username or something

/*
 *   handleInputChange(event) {
 *     const target = event.target;
 *     const value = target.type === 'checkbox' ? target.checked : target.value;
 *     const name = target.name;
 *     this.setState({
 *       [name]: value    });
 *    }*/

// const teste = JSON.stringify(a);
// const aocontrario = JSON.parse(teste);
