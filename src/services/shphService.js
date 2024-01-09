import http from "../http-common";

class shphService {
    getShphs(name,defaultshow) {
        return http.get('/shph?name='+name+'&&defaultshow='+defaultshow);
    }
    getShph(id) {
        return http.get('/shph/' + id);
    }
    getdoctorandshphmasseuse() {
        return http.get('/shph/getdoctorandshphmasseuse/');
    }
    getdoctorandshphdentist() {
        return http.get('/shph/getdoctorandshphdentist/');
    }
    createShph(data) {
        return http.post('/shph', data);
    }
    updateShph(id, data) {
        return http.put(`/shph/${id}`, data);
    }
    updatedefaultshow(id, data) {
        return http.put(`/shph/updatedefaultshow/${id}`, data);
    }
    deleteShph(id) {
        return http.delete(`/shph/${id}`);
    }
}

export default new shphService();