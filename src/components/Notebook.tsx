//show project collection from (db -> store redux)
import { RootState } from "./store/store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectThumbnail from "./projects/ProjectThumbnail";
import type { ProjectFromStore } from "./common/types";
import uniqid from "uniqid";

// ir buscar username a store em vez de ir a db.
const Notebook = function() {
    const [newprojectpath, setnewprojectpath] = useState<string>("");
    const user = useSelector((state: RootState) => state.userinfo.username);
    const projectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.projects
    );

    const [username, setUsername] = useState<string>("");
    const [displayProjects, setDisplayProjects] = useState<boolean>(false);

    useEffect(() => {
        setUsername(user);
        setnewprojectpath("/notebook/" + user + "/newproject");
    }, [user]);

    useEffect(() => {
        if (projectData[0].projectid !== "") {
            setDisplayProjects(true);
        }
    }, [projectData]);
    return (
        <div>
            <div>
                <Link to={newprojectpath}>Add new project</Link>
            </div>
            <div>
                {displayProjects && (
                    <div>
                        {projectData.map((project: ProjectFromStore) => (
                            <div key={uniqid()}>
                                <ProjectThumbnail
                                    projectname={project.projectname}
                                    projectphoto={project.imageUrl}
                                    projectslug={project.projectslug}
                                    projectstatus={project.projectstatus.progressstatus}
                                    projectprogress={project.projectstatus.progressrange}
                                    projectid={project.projectid}
                                    username={user}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notebook;

// need to add more projects and check it is works.
// issues on yarn on edit -> one of the items is going from uncontrolled to controlled
// project should be notebook/username/projects/project maybe
