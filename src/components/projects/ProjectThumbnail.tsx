import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayProjectImage from "./DisplayProjectImage";
import uniqid from "uniqid";

const ProjectThumbnail = function(props: {
    useronpath: string;
    projectname: string;
    projectphoto: string;
    projectslug: string;
    projectstatus: string;
    projectprogress: string;
    projectid: string;
    username: string;
}) {
    const [progress, setProgress] = useState<string>();
    const [projectpath, setProjectpath] = useState<string>("");
    const [projectID, setProjectID] = useState<string>("");
    let navigate = useNavigate();
    useEffect(() => {
        if (props.projectprogress === "0") {
            setProgress("");
        } else {
            setProgress(props.projectprogress);
        }
    }, [props.projectprogress]);

    useEffect(() => {
        setProjectpath(
            "/notebook/" + props.useronpath + "/projects/" + props.projectslug
        );
    }, [props]);
    useEffect(() => {
        setProjectID(props.projectid);
    }, [props.projectid]);

    const handleClicks = function(event: React.MouseEvent) {
        navigate(projectpath, {
            state: { projectid: projectID },
        });
    };
    return (
        <div onClick={handleClicks} key={uniqid()} title="Open project">
            <div>
                <p className="projectname">{props.projectname}</p>
                <div>
                    {props.projectstatus === "inprogress" ? (
                        <span className="projectstatusonthumbnail">wip</span>
                    ) : (
                        <span className="projectcomplete"></span>
                    )}
                    <DisplayProjectImage imageurl={props.projectphoto} />
                    {props.projectstatus === "inprogress" ? (
                        <p className="progressonthumbnail">{progress}%</p>
                    ) : (
                        <p className="progressonthumbnail"></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectThumbnail;
