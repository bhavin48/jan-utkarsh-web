import React from "react";
import LOGO_IMAGE from "../../../assets/images/apps/logo.png";
import CollapseLogo from "../../../assets/images/apps/logo.png";
import { Link } from "react-router-dom";

const LogoComponent: React.FC<any> = ({ collapsed }) => {
  return (
    <div className="logo__wrapper">
      {collapsed ? (
        <Link to="/">
          <img src={CollapseLogo} alt="LOGO" style={{maxWidth:60}} />
        </Link>
      ) : (
        <Link to="/">
          <img src={LOGO_IMAGE} alt="LOGO" />
        </Link>
      )}
    </div>
  );
};

export default LogoComponent;
