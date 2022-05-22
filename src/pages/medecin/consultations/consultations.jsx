import React from "react";
import { useSelector } from "react-redux";
import ConsultationList from "../../../components/consultation-list/consultation-list";

function Consultations() {
   const currentUser = useSelector((state) => state.user.currentUser);

   const consultations = useSelector((state) =>
      state.consultation.filter((c) => c.idMedecin == currentUser.idUtilisateur)
   );

   return (
      <div className="">
         <ConsultationList mode="read" consultations={consultations} />
      </div>
   );
}

export default Consultations;
