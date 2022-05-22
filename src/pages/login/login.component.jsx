import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../../api/api";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./login.styles.scss";

function Login() {
   // const [Route, setRoute] = useState("login");

   const dispatch = useDispatch();
   const history = useHistory();

   const onLogin = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const login = formData.get("login");
      const password = formData.get("password");

      try {
         const res = await fetch(BASE_URL + "/api/login.php", {
            method: "post",
            body: formData,
         });

         if (res.status === 200) {
            const user = await res.json();
            console.log(user);
            dispatch(setCurrentUser({ currentUser: user, type: user.type }));
            history.push("/");
         } else {
            throw new Error();
         }
      } catch (error) {}

      // if (email === "medecin") {
      //    dispatch(setCurrentUser({ currentUser: randomUser, type: "medecin" }));

      //    history.push("/");
      // } else if (email === "secretaire") {
      //    history.push("/");
      //    dispatch(
      //       setCurrentUser({ currentUser: randomUser, type: "secretaire" })
      //    );
      // }
   };

   return (
      <div className="bg__lightgray pt-24">
         <div className="max-w-2xl mx-auto border p-8 bg-white shadow-md">
            <form className="form__1" onSubmit={onLogin}>
               <h2 className="text-center mb-12">Cabinet Médical</h2>

               <div>
                  <label htmlFor="login">login</label>
                  <input type="text" name="login" />
               </div>
               <div className="">
                  <label htmlFor="motDePasse">mot de passe</label>
                  <input type="password" name="motDePasse" />
               </div>
               <div className="mb-8">
                  <a className="lien font-light" href="">
                     mot de passe oublié ?
                  </a>
               </div>
               <div className="">
                  <button type="submit" className="button__3 text-2xl">
                     login
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Login;
