import emptyprojectphoto from "../../images/emptyprojectphoto.svg";

const DisplayProfileImage = function(props: { imageurl: string }) {
    if (props.imageurl === "") {
        return (
            <div>
                <img src={emptyprojectphoto} alt="emptyprofilephoto" />
            </div>
        );
    } else {
        return (
            <div>
                <img src={props.imageurl} alt="profilephoto" />
            </div>
        );
    }
};

export default DisplayProfileImage;
