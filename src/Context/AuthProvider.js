import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        if (isMountedRef.current == true) {
          setTimeout(() => {
            navigate("/kham-pha", { replace: true });
            navigate("/play/:id", { replace: true });
            navigate("/playlist/:id", { replace: true });
            navigate("/playlist1/:id", { replace: true });
            navigate("/musicchart", { replace: true });
            navigate("/", { replace: true });
          }, 0);
          navigate("/login", { replace: true });
        }

        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      if (isMountedRef.current) {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 0);
      }
    });

    return () => {
      unsubscibed();
      isMountedRef.current = false;
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin style={{ position: "fixed", inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
