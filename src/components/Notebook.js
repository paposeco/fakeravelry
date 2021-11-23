//show project collection from (db -> store redux)

import { Link } from "react-router-dom";

const Notebook = function () {
  return (
    <div>
      <Link to="/notebook/newproject">Add new project</Link>
    </div>
  );
};

export default Notebook;
