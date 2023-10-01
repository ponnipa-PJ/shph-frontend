import http from "../http-common";

class shphService {
    getShphs(name) {
        return http.get('/shph?name='+name);
    }
    getShph(id) {
        return http.get('/shph/' + id);
    }
    createShph(data) {
        return http.post('/shph', data);
    }
    updateShph(id, data) {
        return http.put(`/shph/${id}`, data);
    }
    deleteShph(id) {
        return http.delete(`/shph/${id}`);
    }
}

export default new shphService();