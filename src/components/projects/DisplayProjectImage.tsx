const DisplayProjectImage = function(props: { imageurl: string }) {
    if (props.imageurl === "") {
        return <div></div>;
    } else {
        return (
            <div>
                <img src={props.imageurl} alt="projectphoto" />
            </div>
        );
    }
};

export default DisplayProjectImage;
