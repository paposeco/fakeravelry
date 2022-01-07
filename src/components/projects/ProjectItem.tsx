const ProjectItem = function(props: {
    itemdescription: string;
    itemvalue: string;
}) {
    // should toggle visibility instead of an empty div
    if (props.itemvalue === "") {
        return <div></div>;
    } else {
        return (
            <div>
                <div className="itemDescription">{props.itemdescription}</div>
                <div className="itemValue">{props.itemvalue}</div>
            </div>
        );
    }
};

export default ProjectItem;
