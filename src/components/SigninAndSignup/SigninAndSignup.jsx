import React, { useState } from "react";
import "./style.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";

const SigninAndSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginform, setloginform] = useState(false);

  const navigate = useNavigate();

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
            createUserDoc(user);
            navigate("/dashboard");
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

  const createUserDoc = async (user) => {
    setLoading(true);

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("User Doc Created");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  };

  const LoginWithEmail = () => {
    setLoading(true);
    if (name != "" && email != "" && password != "" && comfirmPassword != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("User Logged In");
          setLoading(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All feilds are must filled");
      setLoading(false);
    }
  };

  const SignInWithGoogle = async() => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDoc(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
      console.log(user)
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  }
  return (
    <>
      {loginform ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span>Financely.</span>
            </h2>
            <form action="">
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
              <Button
                disabled={loading}
                text={loading ? "loading..." : "Login with Email and Password"}
                onClick={LoginWithEmail}
              />
              <p style={{ textAlign: "center" }}>or</p>
              <Button
                text={loading ? "loading..." : "Login with Google"}
                blue={true}
                onClick={SignInWithGoogle}
              />
              <p
                onClick={() => setloginform(!loginform)}
                style={{
                  textAlign: "center",
                  marginBottom: 0,
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Or Don't Have An Account? Click Here.
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
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
                onClick={SignInWithGoogle}
                text={loading ? "loading..." : "Signup with Google"}
                blue={true}
              />
              <p
                onClick={() => setloginform(!loginform)}
                style={{
                  textAlign: "center",
                  marginBottom: 0,
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Or Have An Account Already? Click Here
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SigninAndSignup;
