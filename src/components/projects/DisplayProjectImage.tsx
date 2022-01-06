const DisplayProjectImage = function(props: { imageurl: string }) {
    return (
        <div>
            <img src={props.imageurl} alt="projectphoto" />
        </div>
    );
};

export default DisplayProjectImage;
