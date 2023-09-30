import http from "../http-common";

class shphService {
    getShphs() {
        return http.get('/shph');
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
}

export default new shphService();