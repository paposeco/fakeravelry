import { Country } from "../projects/SelectOptions";
import { RootState } from "../store/store";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addInfoToProfile,
    getInfo,
    uploadProfilePhoto,
    getUserProfileInformation,
} from "../../Firebase";
import uniqid from "uniqid";
import DisplayProfileImage from "./DisplayProfileImage";
import type { ProfileInformation } from "../common/types";

const EditProfile = function() {
    const navigate = useNavigate();
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
    const [infofetched, setinfofecthed] = useState<boolean>(false);

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

    useEffect(() => {
        const fetchEmail = async function() {
            const fetchedemail = await getInfo("email");
            setemail(fetchedemail);
            setemailready(true);
        };
        if (!emailready) {
            fetchEmail();
        }
    }, [emailready]);

    useEffect(() => {
        const fetchUserProfileInformation = async function() {
            const profileinfo:
                | ProfileInformation
                | false
                | undefined = await getUserProfileInformation(user.userID);

            return profileinfo;
        };
        if (!infofetched) {
            const profileinfo = fetchUserProfileInformation();
            profileinfo.then(function(dbinfo) {
                if (dbinfo !== false && dbinfo !== undefined) {
                    setselectedcountry(dbinfo.selectedcountry);
                    setpersonalsite(dbinfo.personalsite);
                    setyearsknitting(dbinfo.yearsknitting);
                    setyearscrocheting(dbinfo.yearscrocheting);
                    setpetskids(dbinfo.petskids);
                    setfavoritecolors(dbinfo.favoritecolors);
                    setfavecurseword(dbinfo.favecurseword);
                    setaboutme(dbinfo.aboutme);
                    setPublicImgUrl(dbinfo.imageurl);
                }
                setinfofecthed(true);
            });
        }
    }, [infofetched, user]);

    const [publicImgUrl, setPublicImgUrl] = useState<string>("");
    const fileInput = useRef<HTMLInputElement | null>(null);

    // saves photo to firebase storage and updates DB with publicURL
    const savePhoto = async function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            fileInput !== null &&
            fileInput.current !== null &&
            fileInput.current.files !== null
        ) {
            const publicUrl = await uploadProfilePhoto(fileInput.current.files[0]);
            if (publicUrl !== false && publicUrl !== undefined) {
                setPublicImgUrl(publicUrl);
                await addInfoToProfile(
                    publicUrl,
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
            }
        }
    };

    const selectCountry = function(event: React.ChangeEvent<HTMLSelectElement>) {
        setselectedcountry(event.target.value);
    };

    const handleSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
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
        navigate("/people/" + user.username);
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

    useEffect(() => {
        document.title = "Fake Ravelry: " + user.username + "'s profile";
    }, [user]);

    return (
        <div id="content">
            <div id="userprofile">
                <div id="profileleft">
                    <div>
                        <h2>{user.username}</h2>
                    </div>
                    <div>add profile pics</div>
                    <DisplayProfileImage imageurl={publicImgUrl} />
                    <form id="uploadProfilePic" onSubmit={savePhoto}>
                        <label htmlFor="uploadphotoproject">
                            <input
                                type="file"
                                id="uploadphotoproject"
                                name="uploadphotoproject"
                                accept="image/*"
                                ref={fileInput}
                            />
                        </label>
                        <button id="submitphoto" type="submit" className="genericbutton">
                            Upload
                        </button>
                    </form>
                </div>

                <div id="editprofile">
                    <h3>important stuff</h3>
                    <div className="editprofilediv">
                        <div className="editprofiledivlabel">Email address</div>
                        <div>{email}</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="editprofilediv">
                            <label htmlFor="personalsite" className="editprofiledivlabel">
                                Website or blog
                            </label>
                            <input
                                type="text"
                                name="personalsite"
                                id="personalsite"
                                value={personalsite}
                                onChange={handleChange}
                            />
                        </div>
                        <h3>personal bits</h3>
                        <div className="editprofilediv">
                            <label htmlFor="firstname" className="editprofiledivlabel">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="country" className="editprofiledivlabel">
                                Country
                            </label>
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
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="yearsknitting" className="editprofiledivlabel">
                                Years knitting
                            </label>
                            <input
                                type="text"
                                id="yearsknitting"
                                name="yearsknitting"
                                value={yearsknitting}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="yearscrocheting" className="editprofiledivlabel">
                                Years crocheting
                            </label>
                            <input
                                type="text"
                                id="yearscrocheting"
                                name="yearscrocheting"
                                value={yearscrocheting}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="petskids" className="editprofiledivlabel">
                                Any pets? Kids?
                            </label>
                            <input
                                id="petskids"
                                name="petskids"
                                type="text"
                                value={petskids}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="favoritecolors" className="editprofiledivlabel">
                                Favorite colors
                            </label>
                            <input
                                type="text"
                                id="favoritecolors"
                                name="favoritecolors"
                                value={favoritecolors}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="curseword" className="editprofiledivlabel">
                                Fave curse word
                            </label>
                            <input
                                type="text"
                                name="curseword"
                                id="curseword"
                                value={favecurseword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editprofilediv">
                            <label htmlFor="aboutme" className="editprofiledivlabel">
                                About me
                            </label>
                            <input
                                type="textarea"
                                name="aboutme"
                                id="aboutme"
                                value={aboutme}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="genericbutton">
                            save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
