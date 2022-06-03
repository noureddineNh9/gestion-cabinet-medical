import React from "react";
import { useSelector } from "react-redux";

import CanvasJSReact from "../../../assets/canvasjs-3.6.3/canvasjs.react";

import "./home-page.styles.scss";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HomePage() {
   const nbPatients = useSelector((state) => state.patient).length;
   const nbMedecins = useSelector((state) => state.medecin).length;
   const nbSecretaires = useSelector((state) => state.secretaire).length;

   const sum = nbPatients + nbPatients + nbSecretaires;

   var options = {
      // exportEnabled: true,
      animationEnabled: true,
      data: [
         {
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
               {
                  y: Math.floor((nbPatients / sum) * 100),
                  label: "patient",
                  color: "#FAD87F",
               },
               {
                  y: Math.floor((nbMedecins / sum) * 100),
                  label: "medecin",
                  color: "#86A8E7",
               },
               {
                  y: Math.floor((nbSecretaires / sum) * 100),
                  label: "secretaire",
                  color: "#D16BA5",
               },
            ],
         },
      ],
   };

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
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Medecin</h4>
                  <h3 className="desc">{nbMedecins}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="fas fa-user-md"></i>
                  </div>
               </div>
            </div>
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Secretaire</h4>
                  <h3 className="desc">{nbSecretaires}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="fas fa-female"></i>
                  </div>
               </div>
            </div>
         </div>
         <br />
         <hr />
         <br />
         <div>
            <div className="container mb-12">
               <CanvasJSChart
                  options={options}
                  /* onRef={ref => this.chart = ref} */
               />
            </div>
         </div>
      </div>
   );
}

export default HomePage;
