import { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../../utils/Input";
import "../authorization.scss";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [{ email, password }, setValues] = useState({
    email: "",
    password: "",
  });

  const setEmail = (email) => setValues((prev) => ({ ...prev, email }));
  const setPass = (password) => setValues((prev) => ({ ...prev, password }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isEmail = email.toLowerCase().match(re);
    if (!email || !password) {
      return alert("Please, input all fields.");
    }
    if (!isEmail) return alert("Please, input email correctly.");
    if (password.length < 3 || password.length > 12) {
      return alert(
        "Password must be longer than 3 and shorter than 12 symbols."
      );
    }
    registration(email, password);
    navigate("/login");
  };

  return (
    <form className="authorization" onSubmit={handleSubmit}>
      <div className="authorization__header">Registration</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Input your email..."
      />
      <Input
        value={password}
        setValue={setPass}
        type="password"
        placeholder="Input your password..."
      />
      <button type="submit" className="authorization__btn">
        Registration
      </button>
    </form>
  );
};

export default Registration;
