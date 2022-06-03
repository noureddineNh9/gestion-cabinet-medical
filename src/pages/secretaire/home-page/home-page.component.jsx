import React from "react";
import { useSelector } from "react-redux";

import CanvasJSReact from "../../../assets/canvasjs-3.6.3/canvasjs.react";

import "./home-page.styles.scss";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HomePage() {
   const currentUser = useSelector((state) => state.user.currentUser);

   const nbPatients = useSelector((state) => state.patient).length;
   const nbAudio = useSelector((state) =>
      state.compteRendu.filter(
         (c) => c.audio && c.audio.idSecretaire == currentUser.idUtilisateur
      )
   ).length;
   const nbRDVenAttente = useSelector((state) =>
      state.rendezVous.filter((r) => r.status === "enAttente")
   ).length;
   const nbRDVConfirme = useSelector((state) =>
      state.rendezVous.filter((r) => r.status === "confirme")
   ).length;
   return (
      <div className="p-8">
         <div className="flex flex-wrap gap-8">
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Patient</h4>
                  <h3 className="desc">{nbPatients}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="fas fa-user"></i>
                  </div>
               </div>
            </div>
            <div className="statistique__item w-max flex">
               <div className="w-full">
                  <h4 className="title">Diagnostiques audio</h4>
                  <h3 className="desc">{nbAudio}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="far fa-file-audio"></i>
                  </div>
               </div>
            </div>
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">RDV En Attente</h4>
                  <h3 className="desc">{nbRDVenAttente}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="far fa-bell"></i>
                  </div>
               </div>
            </div>
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">RDV Confirme</h4>
                  <h3 className="desc">{nbRDVConfirme}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="fas fa-clipboard-check"></i>
                  </div>
               </div>
            </div>
         </div>
         <br />
         <hr />
         <br />
         <div></div>
      </div>
   );
}

export default HomePage;
