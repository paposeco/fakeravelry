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
            setProgress(progress);
        }
    }, [props.projectprogress]);

    useEffect(() => {
        setProjectpath(
            "/notebook/" + props.username + "/projects/" + props.projectslug
        );
    }, [props.projectslug]);
    useEffect(() => {
        setProjectID(props.projectid);
    }, [props.projectid]);

    const handleClicks = function(event: React.MouseEvent) {
        navigate(projectpath, {
            state: { projectid: projectID, useronpath: props.useronpath },
        });
    };
    // edit and display should look for the project in store for a certain projectslug
    return (
        <div onClick={handleClicks} key={uniqid()}>
            <div>
                <h3>{props.projectname}</h3>
                <div>
                    <span>{props.projectstatus}</span>
                    {/* <img src={props.projectphoto} alt={`${props.projectname}photo`}/> */}
                    <DisplayProjectImage imageurl={props.projectphoto} />
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectThumbnail;
