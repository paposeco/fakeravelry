import emptyprojectphoto from "../../images/emptyprojectphoto.svg";

const DisplayProjectImage = function(props: { imageurl: string }) {
    if (props.imageurl === "") {
        return (
            <div>
                <img src={emptyprojectphoto} alt="emptyprojectphoto" />
            </div>
        );
    } else {
        return (
            <div>
                <img src={props.imageurl} alt="projectphoto" />
            </div>
        );
    }
};

export default DisplayProjectImage;
