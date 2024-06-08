import React, { useState } from "react";
import "./style.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const SigninAndSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const SignupWithEmail = () => {
    setLoading(true);
    if (name != "" && email != "" && password != "" && comfirmPassword != "") {
      if (password == comfirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setComfirmPassword("");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password not match");
        setLoading(false);
      }
    } else {
      toast.error("All feilds are must filled");
      setLoading(false);
    }
  };
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span>Financely.</span>
      </h2>
      <form action="">
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Sameer Sattar"}
          type={"text"}
        />
        <Input
          type={"email"}
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"sameersattar@123gmail.com"}
        />
        <Input
          type={"password"}
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          type={"password"}
          label={"Comfirm Password"}
          state={comfirmPassword}
          setState={setComfirmPassword}
          placeholder={"Example@123"}
        />
        <Button
          disabled={loading}
          text={loading ? "loading..." : "Signup with Email and Password"}
          onClick={SignupWithEmail}
        />
        <p style={{ textAlign: "center" }}>or</p>
        <Button
          text={loading ? "loading..." : "Signup with Google"}
          blue={true}
        />
      </form>
    </div>
  );
};

export default SigninAndSignup;
