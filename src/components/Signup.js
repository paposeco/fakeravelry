const Signup = function () {
  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <label>
          Username: <input type="text" />
        </label>{" "}
        {/* unique username on db */}
        <label>
          Name: <input type="text" />
        </label>
        <label>
          E-mail: <input type="email" />
        </label>{" "}
        {/* unique email on db */}
        <label>
          Password: <input type="text" />
        </label>
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default Signup;
