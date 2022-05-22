export const setCompteRenduData = (data) => ({
   type: "SET_COMPTE_RENDU_DATA",
   payload: data,
});

export const setCompteRendu = (data) => ({
   type: "SET_COMPTE_RENDU",
   payload: data,
});

export const updateCompteRendu = (data) => ({
   type: "UPDATE_COMPTE_RENDU",
   payload: data,
});

export const deleteCompteRendu = (data) => ({
   type: "DELETE_COMPTE_RENDU",
   payload: data,
});

export const setAudio = (data) => ({
   type: "SET_AUDIO",
   payload: data,
});

export const deleteAudio = (data) => ({
   type: "DELETE_AUDIO",
   payload: data,
});

export const deleteFichier = (data) => ({
   type: "DELETE_FICHIER",
   payload: data,
});
