import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.styles.scss";

function Login() {
   // const [Route, setRoute] = useState("login");

   const onLogin = () => {};

   return (
      <div className="bg__lightgray pt-24">
         <div className="max-w-2xl mx-auto border p-8 bg-white shadow-md">
            <form className="form__1">
               <h2 className="text-center mb-12">Cabinet Médical</h2>

               <div>
                  <label htmlFor="email">email</label>
                  <input type="text" name="email" id="" />
               </div>
               <div className="">
                  <label htmlFor="email">password</label>
                  <input type="password" name="password" id="" />
               </div>
               <div className="mb-8">
                  <a className="lien font-light" href="">
                     mot de passe oublié ?
                  </a>
               </div>
               <div className="">
                  <Link to="/admin" className="button__3 text-2xl">
                     login
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Login;
