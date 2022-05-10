import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const ConsulationsData = [
   {
      idConsultation: 2,
      date: "3/4/2022",
      type: "Visite",
   },
   {
      idConsultation: 4,
      date: "3/4/2022",
      type: "Controle",
   },
   {
      idConsultation: 9,
      date: "3/4/2022",
      type: "Visite",
   },
   {
      idConsultation: 7,
      date: "3/4/2022",
      type: "Visite",
   },
];

function ConsultationList({ match, consultations }) {
   useEffect(() => {});
   return (
      <div>
         <div className="flex justify-between mb-8">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
               </div>
               <input
                  type="text"
                  id="table-search"
                  className="search__input"
                  placeholder="Search for items"
               />
            </div>
         </div>
         <hr />
         <br />
         <table className="table__1 mb-16">
            <thead>
               <tr>
                  <th>id</th>
                  <th>date</th>
                  <th>type</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {consultations.map((c, index) => (
                  <tr key={c.idConsultation}>
                     <td>{c.idConsultation}</td>
                     <td>{c.date.toString()}</td>
                     <td>{c.type}</td>
                     <td>
                        <div className="flex justify-around items-end">
                           <Link
                              to={`${match.url}/${c.idConsultation}`}
                              className="lien"
                           >
                              consulter
                           </Link>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default ConsultationList;
