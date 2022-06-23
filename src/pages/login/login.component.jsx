import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../../api/api";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./login.styles.scss";

function Login() {
   const [status, setStatus] = useState("");
   const [FormErreur, setFormErreur] = useState("");

   const dispatch = useDispatch();
   const history = useHistory();

   // useEffect(() => {
   //    const idSession = localStorage.getItem("idSession");

   //    if (idSession) {
   //       const formData = new FormData();
   //       formData.append("idSession", idSession);
   //       fetch(BASE_URL + "/getSession.php", {
   //          method: "POST",
   //          body: formData,
   //       })
   //          .then((res) => res.json())
   //          .then((data) => {
   //             console.log(data);
   //             setStatus("session exist, id : " + data);
   //          });
   //    } else {
   //       setStatus("session not exist !");
   //    }
   // }, []);

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
            const data = await res.json();
            console.log(data);
            dispatch(
               setCurrentUser({ currentUser: data.user, type: data.user.type })
            );
            localStorage.setItem("idSession", data.idSession);
            history.push("/");
         } else {
            throw new Error();
         }
      } catch (error) {
         setFormErreur("identification erronée");
      }

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
      <>
         <div className="login__page min-h-screen grid grid-cols-12">
            <div className="left__part col-span-5 hidden lg:flex p-8">
               <div className="">
                  <h1>Gestion Cabinet Medical</h1>
                  <p>
                     Une application informatique pour la gestion d'un cabinet
                     médical, pour faciliter la communication et l’échange de
                     l’information entre les utilisateurs et et faire une
                     gestion globale du dossier de patient qu’est le lieu de
                     recueil et de conservation ses informations
                  </p>
               </div>
            </div>
            <div className="right__part col-span-12 lg:col-span-7 flex items-center justify-center p-8">
               <div className="w-full">
                  <h1 className="text-center">Login</h1>
                  <form className="max-w-xl mx-auto" onSubmit={onLogin}>
                     {FormErreur && (
                        <div className="p-4 border border-red-200 mb-6 bg-red-100 text-center">
                           <p className="text-red-900 ">{FormErreur}</p>
                        </div>
                     )}

                     <div className="form__control">
                        <input
                           type="text"
                           name="login"
                           placeholder="email ou CIN"
                           required
                        />
                        <i className="fas fa-user icon"></i>
                     </div>
                     <div className="form__control">
                        <input
                           type="password"
                           name="motDePasse"
                           placeholder="mot de passe"
                           required
                        />
                        <i class="fas fa-lock icon"></i>
                     </div>
                     <div className="mb-12 flex justify-end">
                        <a className="lien font-light" href="">
                           mot de passe oublié ?
                        </a>
                     </div>
                     <div className="">
                        <button type="submit" className="text-2xl">
                           login
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;
