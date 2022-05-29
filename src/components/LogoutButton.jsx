import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { setCurrentUser } from "../redux/user/user.actions";

function LogoutButton({ children, className }) {
   const dispatch = useDispatch();
   const logOut = () => {
      const idSession = localStorage.getItem("idSession");

      if (idSession) {
         const formData = new FormData();
         formData.append("idSession", idSession);
         fetch(BASE_URL + "/api/logout.php", {
            method: "POST",
            body: formData,
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);

               localStorage.removeItem("idSession");
            });
      }
      dispatch(setCurrentUser({ currentUser: null, type: "" }));
   };
   return (
      <a onClick={logOut} className={className && className}>
         {children}
      </a>
   );
}

export default LogoutButton;
