import React, { useState, useEffect, useRef } from "react";
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
import {
    updateProjectInDB,
    uploadPhoto,
    linkToRaveler,
    getUserProfileImage,
} from "../../Firebase";
import DisplaySingleNeedle from "./DisplaySingleNeedle";
import DisplaySingleHook from "./DisplaySingleHook";
import Breadcrumbs from "./Breadcrumbs";
import ProjectsIcon from "../../images/projectsicon.svg";
import PlusIcon from "../../images/circle.svg";

const EditProject = function() {
    // project id is available on state
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectid } = state;
    const [projectID, setProjectID] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    // fetches current username from store
    const user = useSelector((state: RootState) => state.userinfo.username);
    // fetches project data from store
    const projectData:
        | ProjectFromStore
        | undefined = useSelector((state: RootState) =>
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
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [profilebreadcrumbimage, setprofilebreacrumbimage] = useState<string>(
        ""
    );

    // easier access to correct hook for event target id
    const setFunctions = new Map([
        ["projectname", setProjectName],
        ["craft-select", setCraftType],
        ["patternname", setPatternName],
    ]);

    const handlerOfChange = function(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
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
                    console.log(event.target.value);
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

    // needles, hooks and yarn forms are only displayed if the user clicks their respective buttons.
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

    // handles adding images to projects
    const [publicImgUrl, setPublicImgUrl] = useState<string>();
    const [
        displayImageComponent,
        setDisplayImageComponent,
    ] = useState<JSX.Element>();

    const savePhoto = async function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            fileInput !== null &&
            fileInput.current !== null &&
            fileInput.current.files !== null
        ) {
            const publicUrl = await uploadPhoto(
                projectID,
                fileInput.current.files[0]
            );

            if (publicUrl !== false) {
                setPublicImgUrl(publicUrl);
                // updates store with publicurl
                dispatch(
                    projectPhotoAdded({ projectid: projectID, imageUrl: publicUrl })
                );
            }
        }
    };

    const fetchUserProfileInformation = async () => {
        const profileImgUrl: string | undefined = await getUserProfileImage();
        if (profileImgUrl !== undefined) {
            setprofilebreacrumbimage(profileImgUrl);
        }
    };

    const cancelEdit = function(event: React.MouseEvent) {
        const cleanProjectName = projectName!
            .toLowerCase()
            .trim()
            .replace(/ /g, "-");

        // redirects to project page
        const path = "/notebook/" + username + "/projects/" + cleanProjectName;
        navigate(path, {
            state: { projectid: projectID },
        });
    };

    useEffect(() => {
        setProjectID(state.projectid);
    }, [state]);

    // on page load, sets project information with info from store; used when user is editing a project that already existed on db (instead of editing a new project)
    useEffect(() => {
        const localHandlerOfChange = function(
            event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ): void {
            const elementId: string = event.target.id;
            const elementDataSet = event.target.dataset.project;
            const newvalue = event.target.value;
            if (elementDataSet === "info") {
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
            }
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
                        handler={localHandlerOfChange}
                        key={uniqid()}
                    />,
                ]);
            }
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
                        handler={localHandlerOfChange}
                        key={uniqid()}
                    />,
                ]);
            }
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
                            handler={localHandlerOfChange}
                        />,
                    ]);
                }
            }
        };
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
    }, [projectData, hooksAdded, needlesAdded]);

    useEffect(() => {
        const renderImage = function(): void {
            if (publicImgUrl !== undefined) {
                setDisplayImageComponent(
                    <DisplayProjectImage imageurl={publicImgUrl} />
                );
            }
        };
        renderImage();
    }, [publicImgUrl]);
    useEffect(() => {
        setUsername(user);
        fetchUserProfileInformation();
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
    }, [madefor, projectInformation]);

    useEffect(() => {
        document.title = "Fake Ravelry: " + user + "'s " + projectName;
    }, [user, projectName]);

    if (projectInformation !== undefined) {
        return (
            <div>
                <Breadcrumbs
                    username={user}
                    projectname={projectName}
                    profileimage={profilebreadcrumbimage}
                />
                <div id="projectcontent">
                    <h2>
                        <img src={ProjectsIcon} alt="projecticon" /> Project
                    </h2>
                    <div id="project">
                        <div id="projectphoto">
                            {displayImageComponent}
                            <form id="uploadPhotoForm" onSubmit={savePhoto}>
                                <label htmlFor="uploadphotoproject">
                                    <input
                                        type="file"
                                        id="uploadphotoproject"
                                        name="uploadphotoproject"
                                        accept="image/*"
                                        ref={fileInput}
                                    />
                                </label>
                                <button
                                    id="submitphoto"
                                    type="submit"
                                    className="genericbutton"
                                >
                                    upload
                                </button>
                            </form>
                        </div>
                        <form id="editprojectform" onSubmit={handlerOfSubmit}>
                            <div id="projectdescription">
                                <div className="newprojectlabel">
                                    <label htmlFor="projectname">Name</label>
                                    <input
                                        type="text"
                                        value={projectName}
                                        id="projectname"
                                        name="projectname"
                                        data-project="newproject"
                                        onChange={handlerOfChange}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="madefor">Made for</label>
                                    <input
                                        type="text"
                                        id="madefor"
                                        name="madefor"
                                        data-project="info"
                                        value={projectInformation.madefor}
                                        onChange={handlerOfChange}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="linktoraveler">Link to Raveler</label>
                                    <input
                                        type="text"
                                        id="linktoraveler"
                                        name="linktoraveler"
                                        data-project="info"
                                        onChange={handlerOfChange}
                                        value={projectInformation.linktoraveler}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="finishby">Finish by</label>
                                    <input
                                        type="date"
                                        id="finishby"
                                        name="finishby"
                                        data-project="info"
                                        onChange={handlerOfChange}
                                        value={projectInformation.finishby}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="sizemade">Size made</label>
                                    <input
                                        type="text"
                                        id="sizemade"
                                        name="sizemade"
                                        onChange={handlerOfChange}
                                        data-project="info"
                                        value={projectInformation.sizemade}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="patternfrom">Pattern from</label>
                                    <input
                                        type="text"
                                        id="patternfrom"
                                        name="patternfrom"
                                        data-project="info"
                                        onChange={handlerOfChange}
                                        value={projectInformation.patternfrom}
                                    />
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="patternname">Pattern name</label>
                                    <input
                                        type="text"
                                        id="patternname"
                                        name="patternname"
                                        value={patternName}
                                        data-project="newproject"
                                        onChange={handlerOfChange}
                                    />
                                </div>
                                <div className="craftselect">
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
                                </div>
                                <div className="newprojectlabel">
                                    <label htmlFor="patterncategory">Pattern category</label>
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
                                </div>
                                <ul id="selectcategory"></ul>
                                <div className="newprojectlabel">
                                    <label htmlFor="selectedtags">Tags</label>
                                    <input
                                        type="text"
                                        name="selectedtags"
                                        id="selectedtags"
                                        data-project="info"
                                        value={projectInformation.selectedtags}
                                        onChange={handlerOfChange}
                                        title="Separate tags with spaces or commas"
                                    />
                                </div>
                                <div id="needlesandgauge">
                                    <h3>Needles</h3>
                                    <div id="addtool">
                                        <button id="addneedle" onClick={addNeedle} type="button">
                                            <img src={PlusIcon} alt="icon" /> add needle
                                        </button>
                                        <button id="addhook" onClick={addHook} type="button">
                                            <img src={PlusIcon} alt="icon" /> add hook
                                        </button>
                                    </div>
                                    <div id="showtools">
                                        {selectNeedlesToRender}
                                        {selectHooksToRender}
                                    </div>
                                    <div className="gaugediv">
                                        <label htmlFor="gaugehorizontal">Gauge</label>
                                        <div id="completegauge">
                                            <input
                                                type="number"
                                                name="gaugehorizontal"
                                                id="gaugehorizontal"
                                                data-project="gauge"
                                                onChange={handlerOfChange}
                                                value={projectInformation.gauge.numberStsOrRepeats}
                                            />
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
                                        </div>
                                    </div>
                                    <div className="newprojectlabel">
                                        <label htmlFor="gaugepattern">Pattern for gauge</label>
                                        <input
                                            type="text"
                                            name="gaugepattern"
                                            id="gaugepattern"
                                            data-project="gauge"
                                            onChange={handlerOfChange}
                                            value={projectInformation.gauge.gaugepattern}
                                        />
                                    </div>
                                </div>
                                <h3>Yarns</h3>
                                <div id="yarn">
                                    {showYarnForm}
                                    <button onClick={addYarn} type="button" id="addyarnbutton">
                                        <img src={PlusIcon} alt="icon" /> add yarn
                                    </button>
                                </div>
                                <h3>Project notes</h3>
                                <textarea
                                    name="projectnotes"
                                    id="projectnotes"
                                    data-project="info"
                                    onChange={handlerOfChange}
                                    value={projectInformation.projectnotes}
                                ></textarea>
                                <div id="editprojectfooter">
                                    <button className="genericbutton" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="genericbutton">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                            <div id="projectsidebar">
                                <div className="sidebarstatus">
                                    <label
                                        htmlFor="progressstatus"
                                        className="progresstatuslabel"
                                    >
                                        Status
                                    </label>
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
                                </div>
                                <div className="sidebarstatus">
                                    <label htmlFor="happiness" className="progresstatuslabel">
                                        Happiness
                                    </label>
                                    <div id="emojistatus">
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
                                    </div>
                                </div>
                                <div className="sidebarstatus">
                                    <label htmlFor="progressrange" className="progresstatuslabel">
                                        Progress
                                    </label>
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
                                </div>
                                <div className="sidebarstatus">
                                    <label htmlFor="starteddate" className="progresstatuslabel">
                                        Started
                                    </label>
                                    <input
                                        type="date"
                                        id="starteddate"
                                        name="starteddate"
                                        onChange={handlerOfChange}
                                        data-project="status"
                                        value={projectStatus!.starteddate}
                                    />
                                </div>
                                <div className="sidebarstatus">
                                    <label htmlFor="completeddate" className="progresstatuslabel">
                                        Completed
                                    </label>
                                    <input
                                        type="date"
                                        id="completeddate"
                                        name="completeddate"
                                        onChange={handlerOfChange}
                                        data-project="status"
                                        value={projectStatus!.completeddate}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default EditProject;
