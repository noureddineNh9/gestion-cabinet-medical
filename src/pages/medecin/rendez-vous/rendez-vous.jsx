import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MyDataTable from "../../../components/utils/my-data-table/my-data-table";
import { selectRdvByMedecin } from "../../../redux/rendez-vous/rendez-vous.selectors";

function RendezVous() {
   const [filteredItems, setFilteredItems] = useState([]);

   const currentUser = useSelector((state) => state.user.currentUser);

   const RendezVousData = useSelector((state) =>
      selectRdvByMedecin(state, currentUser.idUtilisateur)
   );

   useEffect(() => {
      setFilteredItems(RendezVousData);
   }, [RendezVousData]);

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
      <div className="">
         <h3 className="mb-6">Mes Rendez-vous</h3>

         <MyDataTable
            columns={columns}
            data={filteredItems}
            // defaultSortField="idElement"
            striped
            pagination
         />
      </div>
   );
}

export default RendezVous;
