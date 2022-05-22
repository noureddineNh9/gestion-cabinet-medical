export const setServiceData = (data) => ({
   type: "SET_SERVICE_DATA",
   payload: data,
});

export const ajouterService = (data) => ({
   type: "AJOUTER_SERVICE",
   payload: data,
});

export const updateService = (data) => ({
   type: "UPDATE_SERVICE",
   payload: data,
});

export const deleteService = (data) => ({
   type: "DELETE_SERVICE",
   payload: data,
});
