//acess info from store

import { useLocation } from "react-router-dom";

// receives basic information about project and creates form for filling out the rest
// updates store on form submit and db
const EditProject = function () {
  const { state } = useLocation();
  const { craft, name, pattern, aboutpattern } = state;
  return (
    <div>
      <h2>edit project</h2>
      <ul>
        <li>{craft}</li>
        <li>{name}</li>
        <li>{pattern}</li>
        <li>{aboutpattern}</li>
      </ul>
    </div>
  );
};

export default EditProject;
