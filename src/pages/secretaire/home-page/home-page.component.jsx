import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import CanvasJSReact from "../../../assets/canvasjs-3.6.3/canvasjs.react";

import "./home-page.styles.scss";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HomePage() {
   // const [rdvEnAttente , setRdvEnAttente] = useState([]);
   const currentUser = useSelector((state) => state.user.currentUser);
   // fetch rdvEnattent
   const rendezVous = useSelector((state) =>
      state.rendezVous.filter((m) => m.status === "confirme")
   );

   const rdvAujourdhui = rendezVous.filter(
      (r) =>
         new Date().toLocaleDateString() ===
         new Date(r.dateRDV).toLocaleDateString()
   );

   console.log(rendezVous);

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
   //
   // const RendezVousData = useSelector((state) => state.rendezVous);
   // setRdvEnAttente(RendezVousData.filter((r) => r.status == "enAttente"));

   // option
   var sum = nbRDVConfirme + nbRDVenAttente;
   var options = {
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
                  y: Math.floor((nbRDVenAttente / sum) * 100),
                  label: "rendez-vous En attent ",
                  color: "#8F8E93",
               },
               {
                  y: Math.floor((nbRDVConfirme / sum) * 100),
                  label: "rendez-vous confirmé",
                  color: "#F9D552",
               },
            ],
         },
      ],
   };

   return (
      <div className="">
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
                  <h4 className="title">RDV Confirmée</h4>
                  <h3 className="desc">{nbRDVConfirme}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i class="fas fa-clipboard-check"></i>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="mb-8 col-span-full lg:col-span-7">
               <h1 className="title__1 text-3xl mb-8 font-medium">
                  Statistiques des RDV confirmé par rapport à les EDV en Attente
               </h1>
               <CanvasJSChart
                  options={options}
                  /* onRef={ref => this.chart = ref} */
               />
            </div>
            <div className="mb-8 col-span-full lg:col-span-5 mt-24">
               <div className="calendier__container px-8 mb-12">
                  <h3 className="mb-8 text-slate-500 font-semibold">
                     Rendez-vous d'aujourd'hui
                  </h3>
                  <div>
                     {rdvAujourdhui.map((m) => (
                        <div className="border-t py-4">
                           <h5>
                              <span className="mr-6 text-red-800">
                                 à {new Date(m.dateRDV).toLocaleTimeString()}
                              </span>
                              -
                              <a className="lien__3 ml-6">
                                 <i class="fas fa-male mr-2"></i>
                                 {m.nomPatient}
                              </a>
                           </h5>
                           <p>
                              <strong> medecin </strong>: {m.nomMedecin}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomePage;

// import React from "react";
// import { useSelector } from "react-redux";

// import MyDataTable from "../../../components/utils/my-data-table/my-data-table";

// import "./home-page.styles.scss";

// function HomePage() {
//    const currentUser = useSelector((state) => state.user.currentUser);

//    const nbPatients = useSelector((state) => state.patient).length;
//    const nbAudio = useSelector((state) =>
//       state.compteRendu.filter(
//          (c) => c.audio && c.audio.idSecretaire == currentUser.idUtilisateur
//       )
//    ).length;
//    const nbRDVenAttente = useSelector((state) =>
//       state.rendezVous.filter((r) => r.status === "enAttente")
//    ).length;
//    const nbRDVConfirme = useSelector((state) =>
//       state.rendezVous.filter((r) => r.status === "confirme")
//    ).length;

//    const RendezVousData = useSelector((state) =>
//       state.rendezVous
//          .filter(
//             (r) =>
//                r.status == "confirme" &&
//                new Date(r.dateRDV).toLocaleDateString() ===
//                   new Date().toLocaleDateString()
//          )
//          .sort(
//             (a, b) =>
//                new Date(a.dateRDV).getTime() - new Date(b.dateRDV).getTime()
//          )
//    );

//    const columns = [
//       {
//          name: "patient",
//          selector: (row) => row.nomPatient,
//          sortable: true,
//       },
//       {
//          name: "medecin",
//          selector: (row) => row.nomMedecin,
//          sortable: true,
//       },
//       {
//          name: "type",
//          selector: (row) => row.type,
//          sortable: true,
//       },
//       {
//          name: "date de RDV",
//          selector: (row) => new Date(row.dateRDV).toLocaleTimeString(),
//          sortable: true,
//       },
//    ];

//    return (
//       <div className="">
//          <div className="flex flex-wrap gap-8">
//             <div className="statistique__item flex">
//                <div className="w-full">
//                   <h4 className="title">Patient</h4>
//                   <h3 className="desc">{nbPatients}</h3>
//                </div>
//                <div className="flex items-center ml-4">
//                   <div className="icon">
//                      <i class="fas fa-user"></i>
//                   </div>
//                </div>
//             </div>
//             <div className="statistique__item w-max flex">
//                <div className="w-full">
//                   <h4 className="title">Diagnostiques audio</h4>
//                   <h3 className="desc">{nbAudio}</h3>
//                </div>
//                <div className="flex items-center ml-4">
//                   <div className="icon">
//                      <i class="far fa-file-audio"></i>
//                   </div>
//                </div>
//             </div>
//             <div className="statistique__item flex">
//                <div className="w-full">
//                   <h4 className="title">RDV En Attente</h4>
//                   <h3 className="desc">{nbRDVenAttente}</h3>
//                </div>
//                <div className="flex items-center ml-4">
//                   <div className="icon">
//                      <i class="far fa-bell"></i>
//                   </div>
//                </div>
//             </div>
//             <div className="statistique__item flex">
//                <div className="w-full">
//                   <h4 className="title">RDV Confirme</h4>
//                   <h3 className="desc">{nbRDVConfirme}</h3>
//                </div>
//                <div className="flex items-center ml-4">
//                   <div className="icon">
//                      <i class="fas fa-clipboard-check"></i>
//                   </div>
//                </div>
//             </div>
//          </div>
//          <br />
//          <hr />
//          <br />
//          <div>
//             <h3 className="mb-4">Randez vous d'aujourd'hui</h3>
//             <MyDataTable
//                columns={columns}
//                data={RendezVousData}
//                // defaultSortField="idElement"
//                striped
//                pagination
//             />
//          </div>
//       </div>
//    );
// }

// export default HomePage;
