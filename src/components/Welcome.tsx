import { signOutUser } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Welcome = function() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signOut = async function() {
        const waitForSignOut = await signOutUser();
        navigate("/");
    };
    return (
        <div>
            <h2>Welcome to fakeravelry</h2>
            <button onClick={signOut}>Sign out</button>
        </div>
    );
};

export default Welcome;

/* querySnapshot.forEach((doc) => {
 *     //        console.log(doc.id, " => ", doc.data());
 *     dispatch(
 *         projectFetchedFromDB({
 *             projectid: doc.data().projectid,
 *             crafttype: doc.data().crafttype,
 *             projectname: doc.data().projectname,
 *             patternused: doc.data().patternused,
 *             patternname: doc.data().pattern.name,
 *             about: doc.data().pattern.about,
 *             madefor: doc.data().projectinfo.madefor,
 *             linktoraveler: doc.data().projectinfo.linktoraveler,
 *             finishby: doc.data().projectinfo.finishby,
 *             sizemade: doc.data().projectinfo.sizemade,
 *             patternfrom: doc.data().projectinfo.patternfrom,
 *             patterncategory: doc.data().projectinfo.patterncategory,
 *             selectedtags: doc.data().projectinfo.tags,
 *             needles: doc.data().projectinfo.needles,
 *             hooks: doc.data().projectinfo.hooks,
 *             numberStsOrRepeats: doc.data().projectinfo.gauge.numberStsOrRepeats,
 *             horizontalunits: doc.data().projectinfo.gauge.horizontalunits,
 *             numberRows: doc.data().projectinfo.gauge.numberRows,
 *             gaugesize: doc.data().projectinfo.gauge.gaugesize,
 *             gaugepattern: doc.data().projectinfo.gauge.gaugepattern,
 *             yarn: doc.data().projectinfo.yarn,
 *             projectnotes: doc.data().projectinfo.projectnotes,
 *             progressstatus: doc.data().projectinfo.projectstatus.progressstatus,
 *             progressrange: doc.data().projectinfo.projectstatus.progressrange,
 *             happiness: doc.data().projectinfo.projectstatus.happiness,
 *             starteddate: doc.data().projectinfo.projectstatus.starteddate,
 *             completeddate: doc.data().projectinfo.projectstatus.completeddate,
 *         })
 *     );
 * }); */
