import axios from "axios";
import hostAdress from "./HostAdress.ts";

const httpClient = axios.create({
    headers: {
    },

    baseURL: hostAdress + "/api/"
});

export default httpClient;