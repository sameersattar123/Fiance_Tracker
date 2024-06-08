import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboad");
    }
  }, [user, loading]);

  const logoutFunc = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <p className="logo link" onClick={logoutFunc}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
