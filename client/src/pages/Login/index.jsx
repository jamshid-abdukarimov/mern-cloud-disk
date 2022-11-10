import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import Input from "../../utils/Input";
import "../authorization.scss";

const Login = () => {
  const [{ email, password }, setValues] = useState({
    email: "",
    password: "",
  });

  const setEmail = (email) => setValues((prev) => ({ ...prev, email }));
  const setPass = (password) => setValues((prev) => ({ ...prev, password }));

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isEmail = email.toLowerCase().match(re);
    if (!email || !password) {
      return alert("Please, input all fields.");
    }
    if (!isEmail) return alert("Please, input email correctly.");
    dispatch(login(email, password));
  };

  return (
    <form className="authorization" onSubmit={handleSubmit}>
      <div className="authorization__header">Login</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPass}
        type="password"
        placeholder="Введите пароль..."
      />
      <button type="submit" className="authorization__btn">
        Login
      </button>
    </form>
  );
};

export default Login;
