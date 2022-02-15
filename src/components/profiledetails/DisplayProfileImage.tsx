import emptyprojectphoto from "../../images/emptyprojectphoto.svg";

const DisplayProfileImage = function(props: { imageurl: string }) {
    if (props.imageurl === "" || props.imageurl === undefined) {
        return (
            <div className="profileimage">
                <img src={emptyprojectphoto} alt="emptyprofilephoto" />
            </div>
        );
    } else {
        return (
            <div className="profileimage">
                <img src={props.imageurl} alt="profilephoto" />
            </div>
        );
    }
};

export default DisplayProfileImage;
