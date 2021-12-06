import { useState, useEffect } from "react";
import type { Status } from "../common/types";

const ProjectStatus = function(props: { editordisplay: string }) {
    const [currentStatus, setCurrentStatus] = useState<Status>({} as Status);

    const handlerOfChange = function() { };
    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setCurrentStatus({
            progress: (event.currentTarget.elements.namedItem(
                "status"
            ) as HTMLInputElement).value,
            happiness: (event.currentTarget.elements.namedItem(
                "happiness"
            ) as HTMLInputElement).value,
            progressrange: (event.currentTarget.elements.namedItem(
                "progressrange"
            ) as HTMLInputElement).value,
            startdate: (event.currentTarget.elements.namedItem(
                "starteddate"
            ) as HTMLInputElement).value,
            completeddate: (event.currentTarget.elements.namedItem(
                "completeddate"
            ) as HTMLInputElement).value,
        });
    };

    useEffect(() => {
        if (currentStatus.happiness !== undefined) {
            const happinessname = currentStatus.happiness;
            (document.getElementById(
                happinessname
            ) as HTMLInputElement).checked = true;
        }
    }, [currentStatus]);
    if (props.editordisplay === "edit") {
        return (
            <div>
                <form onSubmit={handlerOfSubmit}>
                    <label htmlFor="status">
                        Status
                        <select
                            id="status"
                            name="status"
                            value={currentStatus.progress}
                            onChange={handlerOfChange}
                        >
                            <option value="inprogress">In progress</option>
                            <option value="finished">Finished</option>
                            <option value="hibernating">Hibernating</option>
                            <option value="frogged">Frogged</option>
                        </select>
                    </label>
                    {/* checked ?*/}
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
                            value={currentStatus.progressrange}
                        />
                    </label>
                    <label htmlFor="starteddate">
                        Started
                        <input
                            type="date"
                            id="starteddate"
                            name="starteddate"
                            value={currentStatus.startdate}
                        />
                    </label>
                    <label htmlFor="completeddate">
                        Completed
                        <input
                            type="date"
                            id="completeddate"
                            name="completeddate"
                            value={currentStatus.completeddate}
                        />
                    </label>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <p>Status</p>
                    <p>{currentStatus.progress}</p>
                </div>
                <div>
                    <p>Progress</p>
                    <p>{currentStatus.progressrange}</p>
                </div>
                {currentStatus.happiness !== "" ? (
                    <div>
                        <p>Happiness</p>
                        <p>{currentStatus.happiness}</p>
                    </div>
                ) : null}
                <div>
                    <p>Started</p>
                    <p>{currentStatus.startdate}</p>
                </div>
                <div>
                    <p>Completed</p>
                    <p>{currentStatus.completeddate}</p>
                </div>
            </div>
        );
    }
};

export default ProjectStatus;

// there should be a separate edit component for project status
