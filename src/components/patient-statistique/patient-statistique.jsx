import React from "react";
import { useSelector } from "react-redux";
import "./patient-statistique.styles.scss";
import CanvasJSReact from "../../assets/canvasjs-3.6.3/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PatientStatistique({ idPatient, consultationsData }) {
   const ElementsSante = useSelector((state) =>
      state.elementSante.filter((e) => e.idPatient == idPatient)
   );
   const nbElement = ElementsSante.length;

   var consultations = useSelector((state) => state.consultation);
   consultations = useSelector((state) => {
      var list = new Array();
      state.elementSante.map((ele) => {
         if (ele.idPatient == idPatient) {
            list = [
               ...list,
               ...consultations.filter((c) => c.idElement == ele.idElement),
            ];
         }
      });
      return list;
   });

   const derniersConsultation = consultations
      .sort((a, b) => b.idConsultation - a.idConsultation)
      .filter((c, i) => i < 3);

   console.log(derniersConsultation);

   const nbConsultations = consultations.length;

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
            dataPoints: ElementsSante.map((ele) => {
               var nb = consultations.filter(
                  (c) => c.idElement == ele.idElement
               ).length;

               var color = `rgb(
                  ${Math.floor(Math.random() * 138 + 117)},
                  ${Math.floor(Math.random() * 138 + 117)},
                  ${Math.floor(Math.random() * 138 + 117)}
               )`;

               return {
                  y: (nb / nbConsultations) * 100,
                  label: ele.nom,
                  color: color,
               };
            }),
         },
      ],
   };

   return (
      <div>
         <div className="flex flex-wrap gap-8">
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Elements Santé</h4>
                  <h3 className="desc">{nbElement}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i className="fas fa-book-medical"></i>
                  </div>
               </div>
            </div>
            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Consultation</h4>
                  <h3 className="desc">{nbConsultations}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i className="fas fa-notes-medical"></i>
                  </div>
               </div>
            </div>
         </div>
         <br />
         <hr />
         <br />
         <div>
            <h3 className="text-slate-500 font-semibold mb-4">
               Pourcentage de consultations pour chaque élément de santé
            </h3>
            <div className="container mb-12">
               <CanvasJSChart
                  options={options}
                  /* onRef={ref => this.chart = ref} */
               />
            </div>
            <div className="lg:flex gap-8 ">
               <div className="dernier__consultation w-full mb-12">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-slate-500 font-semibold">
                        Dernier consultation
                     </h3>

                     <span className="date h-max">
                        {derniersConsultation[0].dateCreation}
                     </span>
                  </div>
                  <p className="mb-6 ">
                     <strong>motif de consultation : </strong>
                     <span className="text-gray-600">
                        {derniersConsultation[0].motif}
                     </span>
                  </p>

                  <p>
                     <strong>remarques : </strong>
                     <span className="text-gray-600">
                        {derniersConsultation[0].remarques}
                     </span>
                  </p>
               </div>
               <div className="remarques__container w-full lg:max-w-3xl px-8 mb-12">
                  <h3 className="mb-6 text-slate-500 font-semibold">
                     Remarques
                  </h3>

                  {derniersConsultation.map((c) => (
                     <div key={c.idConsultation} className=" mb-8 border-b p-2">
                        <p className="text-gray-600 mb-2">{c.remarques}</p>
                        <div className="flex justify-end  mb-2">
                           <span className="font-light text-slate-500 italic">
                              {c.dateCreation}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export default PatientStatistique;
