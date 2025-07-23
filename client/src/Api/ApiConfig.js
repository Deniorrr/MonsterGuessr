import axios from "axios";

const instance = axios.create({
  baseURL:
    // "https://mhguessrbackend-ajgxfhgsgac0brg7.polandcentral-01.azurewebsites.net",
    "http://localhost:3001/",
});

export default instance;
