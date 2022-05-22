import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

function LogoutButton({ children, className }) {
   const dispatch = useDispatch();
   const logOut = () => {
      dispatch(setCurrentUser({ currentUser: null, type: "" }));
   };
   return (
      <a onClick={logOut} className={className && className}>
         {children}
      </a>
   );
}

export default LogoutButton;
