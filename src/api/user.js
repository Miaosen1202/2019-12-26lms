import axios from "axios";

export default {
    getUserInfo() {
        return axios.get("/api/getUserInfo").then(response => response.data);
    }
};
