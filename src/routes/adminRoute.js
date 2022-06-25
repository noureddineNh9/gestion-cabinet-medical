import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/admin/home-page/home-page.component";
import MedecinPage from "../pages/admin/medecin-page/medecin-page.component";
import Sidebar from "../pages/admin/components/Sidebar.jsx";
import SecretairePage from "../pages/admin/secretaire-page/secretaire-page";
import ServicePage from "../pages/admin/service-page/service-page";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api/api";
import { setCurrentUser } from "../redux/user/user.actions";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
   const dispatch = useDispatch();
   const history = useHistory();

   const onLogin = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const login = formData.get("login");
      const password = formData.get("password");

      try {
         const res = await fetch(BASE_URL + "/api/admin/login.php", {
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
      <div className="login__page bg__lightgray flex items-center min-h-screen">
         <div className="w-full  ">
            <div className="max-w-2xl mx-auto ">
               <h1 className="text-center mb-12">Admin</h1>
               <form className="max-w-xl mx-auto" onSubmit={onLogin}>
                  {/* {FormErreur && (
                     <div className="p-4 border border-red-200 mb-6 bg-red-100 text-center">
                        <p className="text-red-900 ">{FormErreur}</p>
                     </div>
                  )} */}

                  <div className="form__control">
                     <input
                        type="text"
                        name="login"
                        placeholder="login"
                        required
                     />
                     <i className="fas fa-user icon"></i>
                  </div>
                  <div className="form__control">
                     <input
                        type="password"
                        name="password"
                        placeholder="mot de passe"
                        required
                     />
                     <i class="fas fa-lock icon"></i>
                  </div>
                  <div className="mt-12">
                     <button type="submit" className="text-2xl">
                        login
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

function AdminRoute() {
   const history = useHistory();

   const user = useSelector((state) => state.user);

   return (
      <>
         {!user.currentUser ? (
            <LoginForm />
         ) : user.type === "admin" ? (
            <div className="admin">
               <Sidebar />
               <div className="content">
                  <Switch>
                     <Route exact path="/admin" component={HomePage} />
                     <Route
                        exact
                        path="/admin/medecin"
                        component={MedecinPage}
                     />
                     <Route
                        exact
                        path="/admin/secretaire"
                        component={SecretairePage}
                     />
                     <Route
                        exact
                        path="/admin/service"
                        component={ServicePage}
                     />
                  </Switch>
               </div>
            </div>
         ) : (
            history.push("/")
         )}
      </>
   );
}

export default AdminRoute;
