export const setRendezVousData = (data) => ({
   type: "SET_RENDEZ_VOUS_DATA",
   payload: data,
});

export const setRendezVous = (data) => ({
   type: "SET_RENDEZ_VOUS",
   payload: data,
});

export const updateRendezVous = (data) => ({
   type: "UPDATE_RENDEZ_VOUS",
   payload: data,
});

export const deleteRendezVous = (data) => ({
   type: "DELETE_RENDEZ_VOUS",
   payload: data,
});
