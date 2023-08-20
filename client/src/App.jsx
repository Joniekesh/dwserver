import "./App.css";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errMsg, setErrMSG] = useState("");
  const [loading, setIsloading] = useState(false);
  // const [url, setUrl] = useState(window.location.href);

  // useEffect(() => {
  //   setUrl(window.location.href);
  // }, [url]);

  // const redirectURL = url.split("=")[1];
  // console.log(redirectURL);

  // "http://localhost:3000?redirect_url=https://ll04-finance-dowell.github.io/workflowai.online"

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsloading(true);
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      if (res.status === 200) {
        window.location.href = res.data.user.link.split("/")[1];

        setIsloading(false);
      }
    } catch (err) {
      setErrMSG(err?.response?.data);
      setIsloading(false);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="loginTop">
          <img
            src="https://www.login.dowellstore.org/wp-content/uploads/2022/10/artistic-logo-150x150.png"
            alt="DoWell Research"
          />
          <h3>Welcome </h3>
          <p className={errMsg ? "errorTxt" : ""}>
            {errMsg ? errMsg : "Please enter your credentials"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer">
            <label>Password</label>
            <div className="passInput">
              <input
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <AiOutlineEye
                className="icon"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
          </div>

          <button type="submit">{loading ? "Loading..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}

export default App;
