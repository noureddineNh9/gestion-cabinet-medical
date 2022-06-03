import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CanvasJSReact from "../../../assets/canvasjs-3.6.3/canvasjs.react";
import MyDataTable from "../../../components/utils/my-data-table/my-data-table";

import "./home-page.styles.scss";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HomePage() {
   const currentUser = useSelector((state) => state.user.currentUser);

   const consultations = useSelector((state) =>
      state.consultation.filter((c) => c.idMedecin == currentUser.idUtilisateur)
   );

   const rendezVous = useSelector((state) =>
      state.rendezVous.filter(
         (r) =>
            r.idMedecin == currentUser.idUtilisateur && r.status === "confirme"
      )
   );

   const prochainRDV = rendezVous.sort(
      (a, b) => new Date(b.dateRDV).getTime() - new Date(a.dateRDV).getTime()
   )[0];

   const nbConsultations = consultations.length;
   const nbRDV = rendezVous.length;

   const columns = [
      {
         name: "patient",
         selector: (row) => row.nomPatient,
         sortable: true,
      },
      {
         name: "type",
         selector: (row) => row.type,
         sortable: true,
      },
      {
         name: "date de RDV",
         selector: (row) => row.dateRDV,
         sortable: true,
      },
      {
         name: "",
         cell: (row) => (
            <>
               <Link className="lien" to={`/medecin/dossier/${row.idPatient}`}>
                  le dossier de patient
               </Link>
            </>
         ),
      },
   ];
   return (
      <div>
         <div className="flex flex-wrap gap-8">
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

            <div className="statistique__item flex">
               <div className="w-full">
                  <h4 className="title">Rendez Vous</h4>
                  <h3 className="desc">{nbRDV}</h3>
               </div>
               <div className="flex items-center ml-4">
                  <div className="icon">
                     <i className="fas fa-book-medical"></i>
                  </div>
               </div>
            </div>
         </div>
         <br />
         <hr />
         <br />
         <div>
            <h3 className="text-slate-500 font-semibold mb-4">
               le prochain rendez vous
            </h3>
            <div>
               <MyDataTable
                  columns={columns}
                  data={[prochainRDV]}
                  // defaultSortField="idElement"
                  striped
                  pagination
               />
            </div>
         </div>
      </div>
   );
}

export default HomePage;
