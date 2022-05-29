import CompteRenduList from "../compte-rendu-list/compte-rendu-list";
import ExamenList from "../examen-list/examen-list";

export const Diagnostique = ({ idConsultation, userType }) => {
   return (
      <>
         <div>
            <CompteRenduList
               idConsultation={idConsultation}
               userType={userType}
            />
            <ExamenList idConsultation={idConsultation} userType={userType} />
         </div>
      </>
   );
};
