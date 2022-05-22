import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../api/api";
import defaultImageProfile from "../../../assets/images/default-img-profile.jpg";
import { setNotificationOn } from "../../../redux/notification/notification.actions";

function Profile() {
   const dispatch = useDispatch();
   const [previewImage, setPreviewImage] = useState(defaultImageProfile);

   const currentUser = useSelector((state) => state.user.currentUser);

   const medecin = useSelector(
      (state) =>
         state.medecin.filter(
            (m) => m.idUtilisateur === currentUser.idUtilisateur
         )[0]
   );

   // const service = useSelector(
   //    (state) => state.service.filter((s) => s.idService === 2)[0]
   // );

   useEffect(() => {
      if (medecin.imageProfile) {
         setPreviewImage(BASE_URL + medecin.imageProfile);
      }
   }, []);

   const showPreview = (e) => {
      if (e.target.files && e.target.files[0]) {
         setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (formData.get("decede")) {
         formData.set("decede", true);
      } else {
         formData.append("decede", false);
      }
      try {
         const res = await fetch(BASE_URL + "/api/medecin/put.php", {
            method: "post",
            body: formData,
         });

         if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "modification avec success",
               })
            );
         } else {
            throw Error;
         }
      } catch (error) {}
   };

   return (
      <div className="">
         <form id="medecinForm" className="form__2" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-12">
               <div className="w-48 h-48 mb-8 relative">
                  <img
                     className="w-full h-full rounded-full object-cover border border-black"
                     src={previewImage}
                     alt=""
                  />
                  <label
                     htmlFor="image-profile"
                     className="absolute -right-2 -bottom-2 cursor-pointer"
                  >
                     <i className="far fa-edit"></i>
                  </label>
               </div>
               <input
                  type="file"
                  accept="image/*"
                  onChange={showPreview}
                  id="image-profile"
                  name="imageProfile"
                  hidden
               />
            </div>
            <input
               type="number"
               name="idUtilisateur"
               defaultValue={medecin.idUtilisateur}
               hidden
            />

            <div className="input__group">
               <label htmlFor="nom">Nom :</label>
               <input type="text" name="nom" defaultValue={medecin.nom} />
            </div>

            <div className="input__group">
               <label htmlFor="prenom">Prenom :</label>
               <input type="text" name="prenom" defaultValue={medecin.prenom} />
            </div>
            <div className="input__group">
               <label htmlFor="cin">cin :</label>
               <input type="text" name="cin" defaultValue={medecin.cin} />
            </div>

            {/* <div className="input__group">
               <label htmlFor="situationFamilliale">service :</label>
               <input type="text" name="service" defaultValue={service.nom} />
            </div> */}
            <div className="input__group">
               <label htmlFor="email">Date de naissance :</label>
               <input
                  type="text"
                  name="dateNaissance"
                  defaultValue={medecin.dateNaissance}
               />
            </div>
            <div className="input__group">
               <label htmlFor="email">Email :</label>
               <input type="text" name="email" defaultValue={medecin.email} />
            </div>
            <div className="input__group">
               <label htmlFor="tel">Tel :</label>
               <input type="text" name="tel" defaultValue={medecin.tel} />
            </div>
            <div className="input__group">
               <label htmlFor="tel">Ville :</label>
               <input type="text" name="ville" />
            </div>
            <div className="input__group">
               <label htmlFor="adresse">Adresse :</label>
               <textarea
                  name="adresse"
                  rows="6"
                  defaultValue={medecin.adresse}
               ></textarea>
            </div>
            <br />
            <hr />
            <br />
         </form>
      </div>
   );
}

export default Profile;
