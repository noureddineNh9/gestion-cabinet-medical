import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./styles/tailwind.css";
import "./styles/main.scss";
import secretaireRoute from "./routes/secretaireRoute";
import adminRoute from "./routes/adminRoute";
import Login from "./pages/login/login.component";

function App() {
   return (
      <div className="">
         <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route path="/admin" component={adminRoute} />
            <Route path="/secretaire" component={secretaireRoute} />
         </Switch>
      </div>
   );
}

export default App;
