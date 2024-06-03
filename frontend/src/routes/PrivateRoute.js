import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles, userRole, ...rest }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userRole === "default") {
      setIsLoading(true);
    } else {
      if (allowedRoles.includes(userRole)) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/accessDenied");
      }
    }
  }, [userRole, allowedRoles, navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    navigate("/accessDenied");
    return null;
  }
};

export default PrivateRoute;
