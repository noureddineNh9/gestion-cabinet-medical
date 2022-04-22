import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/admin/home-page/home-page.component";
import MedecinPage from "../pages/admin/medecin-page/medecin-page.component";
import Sidebar from "../pages/admin/components/Sidebar.jsx";

function adminRoute() {
   return (
      <div className="admin">
         <Sidebar />
         <div className="content">
            <Switch>
               <Route exact path="/admin" component={HomePage} />
               <Route exact path="/admin/medecin" component={MedecinPage} />
            </Switch>
         </div>
      </div>
   );
}

export default adminRoute;
