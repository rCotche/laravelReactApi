import axios from "axios";

//axios: Pour les requetes http
//crée une instace de axios
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`,
})

//intercepetor are function qui sont execute avant que la requete soit envoyé
//ou apres que la reponse soit reçus

//Avant d'envoyé à la requete

//config: config object (axiosrequestconfig)
//equivalent des api options
/*const API_OPTIONS = {
    method: 'GET',
    headers: {
         accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}*/

//use: accept 2 fonctions, la 1ere est appelée lorsque la requête
// est prête à être envoyée.
// Elle permet de modifier la configuration (config) de la requête
// (par exemple pour ajouter des en-têtes, un token d’authentification, etc.),
// et doit renvoyer config ou une version modifiée de celui-ci
//
//la 2e est appelée si une erreur se produit avant même que la requête ne soit envoyée
// (par exemple, problème de configuration).
// Elle doit renvoyer une promesse rejetée, souvent avec Promise.reject(error)
axiosClient.interceptors.request.use((config) => {
    //recupere le token
    const token = localStorage.getItem('ACCESS_TOKEN');
    //configure le header de la requete
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

//Apres la reception de la reponse

//use: accept 2 fonctions, la 1ere c'est lorsque la réponse est réussie
// (status HTTP 2xx).
// Elle peut modifier ou traiter la réponse, puis doit la retourner.
//
//la 2e c'est lorsque la reponse avec une erreur,
// est exécuté lorsqu'il y a une erreur
// (par exemple une réponse non 2xx ou un problème réseau).
// Typiquement, on s'en sert pour gérer les erreurs globalement avant de les propager.
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        //response du serveur
        const { response } = error;
        //401 unauthorized
        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
            // window.location.reload();
        } else if (response.status === 404) {
            //Show not found
        }
        throw error;
    } catch (error) {
        console.error(error);
    }
})

//axiosClient.interceptors.response.use(()=>{}, ()=>{})

export default axiosClient;