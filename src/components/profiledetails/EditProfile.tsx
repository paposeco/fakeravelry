import { Country } from "../projects/SelectOptions";
import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addInfoToProfile, getInfo, uploadProfilePhoto } from "../../Firebase";
import uniqid from "uniqid";
import DisplayProfileImage from "./DisplayProfileImage";

const EditProfile = function() {
    // fetch info from db
    const [selectedcountry, setselectedcountry] = useState<string>("notselected");
    const [personalsite, setpersonalsite] = useState<string>("");
    const [firstname, setfirstname] = useState<string>("");
    const [yearsknitting, setyearsknitting] = useState<string>("");
    const [yearscrocheting, setyearscrocheting] = useState<string>("");
    const [petskids, setpetskids] = useState<string>("");
    const [favoritecolors, setfavoritecolors] = useState<string>("");
    const [favecurseword, setfavecurseword] = useState<string>("");
    const [aboutme, setaboutme] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [emailready, setemailready] = useState<boolean>(false);

    const functionmap = new Map([
        ["personalsite", setpersonalsite],
        ["firstname", setfirstname],
        ["yearsknitting", setyearsknitting],
        ["yearscrocheting", setyearscrocheting],
        ["petskids", setpetskids],
        ["favoritecolors", setfavoritecolors],
        ["curseword", setfavecurseword],
        ["aboutme", setaboutme],
    ]);

    const user = useSelector((state: RootState) => state.userinfo);

    useEffect(() => {
        setfirstname(user.name);
    }, [user]);

    const fetchEmail = async function() {
        const fetchedemail = await getInfo("email");
        setemail(fetchedemail);
        setemailready(true);
    };

    useEffect(() => {
        if (!emailready) {
            fetchEmail();
        }
    });
    const [imageSelected, setImageSelected] = useState<FileList | null>();
    const [publicImgUrl, setPublicImgUrl] = useState<string>("");

    const handleImageChange = function(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setImageSelected(event.target.files);
    };

    const savePhoto = async function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (imageSelected !== (null && undefined)) {
            // uploads image to firebase storage and returns a public url
            const publicUrl = await uploadProfilePhoto(imageSelected![0]);
            if (publicUrl !== false && publicUrl !== undefined) {
                setPublicImgUrl(publicUrl);
            }
        }
    };

    const selectCountry = function(event: React.ChangeEvent<HTMLSelectElement>) {
        setselectedcountry(event.target.value);
    };

    const handleSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        // save to db. on display profile fetch info ?
        event.preventDefault();
        await addInfoToProfile(
            publicImgUrl,
            firstname,
            personalsite,
            selectedcountry,
            yearsknitting,
            yearscrocheting,
            petskids,
            favoritecolors,
            favecurseword,
            aboutme
        );
    };

    const handleChange = function(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void {
        const elementId: string = event.target.id;
        if (elementId === "country") {
            setselectedcountry(event.target.value);
        } else {
            const elementStateFunction = functionmap.get(elementId);
            if (elementStateFunction !== undefined) {
                elementStateFunction(event.target.value);
            }
        }
    };

    return (
        <div>
            <div>
                <h2>{user.username}</h2>
                <div>add profile pics</div>
                <DisplayProfileImage imageurl={publicImgUrl} />
                <form id="uploadProfilePic" onSubmit={savePhoto}>
                    <label htmlFor="uploadphotoproject">
                        <input
                            type="file"
                            id="uploadphotoproject"
                            name="uploadphotoproject"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    <button id="submitphoto" type="submit">
                        Upload
                    </button>
                </form>
            </div>
            <h3>important stuff</h3>
            <div>
                <div className="itemdescription">Email address</div>
                <div className="itemvalue">{email}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="personalsite">Website or blog</label>
                <input
                    type="text"
                    name="personalsite"
                    id="personalsite"
                    value={personalsite}
                    onChange={handleChange}
                />
                <h3>personal bits</h3>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    onChange={handleChange}
                />
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    name="country"
                    value={selectedcountry}
                    onChange={selectCountry}
                >
                    {Country.map((acountry) => (
                        <option key={uniqid()} value={acountry.value}>
                            {acountry.text}
                        </option>
                    ))}
                </select>
                <label htmlFor="yearsknitting">Years knitting</label>
                <input
                    type="text"
                    id="yearsknitting"
                    name="yearsknitting"
                    value={yearsknitting}
                    onChange={handleChange}
                />
                <label htmlFor="yearscrocheting">Years crocheting</label>
                <input
                    type="text"
                    id="yearscrocheting"
                    name="yearscrocheting"
                    value={yearscrocheting}
                    onChange={handleChange}
                />
                <label htmlFor="petskids">Any pets? Kids?</label>
                <input
                    id="petskids"
                    name="petskids"
                    type="text"
                    value={petskids}
                    onChange={handleChange}
                />
                <label htmlFor="favoritecolors">Favorite colors</label>
                <input
                    type="text"
                    id="favoritecolors"
                    name="favoritecolors"
                    value={favoritecolors}
                    onChange={handleChange}
                />
                <label htmlFor="curseword">Fave curse word</label>
                <input
                    type="text"
                    name="curseword"
                    id="curseword"
                    value={favecurseword}
                    onChange={handleChange}
                />
                <label htmlFor="aboutme">About me</label>
                <input
                    type="textarea"
                    name="aboutme"
                    id="aboutme"
                    value={aboutme}
                    onChange={handleChange}
                />
                <input type="submit" value="Save Changes" />
            </form>
        </div>
    );
};

export default EditProfile;
// cancel button
// should be able to upload info to db and add profile pics
// need to work on displaying info