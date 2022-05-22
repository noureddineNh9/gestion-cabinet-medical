export const setSecretaireData = (data) => ({
   type: "SET_SECRETAIRE_DATA",
   payload: data,
});
export const ajouterSecretaire = (data) => ({
   type: "AJOUTER_SECRETAIRE",
   payload: data,
});

export const updateSecretaire = (data) => ({
   type: "UPDATE_SECRETAIRE",
   payload: data,
});

export const deleteSecretaire = (data) => ({
   type: "DELETE_SECRETAIRE",
   payload: data,
});
