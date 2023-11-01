import http from "../http-common";

class AdminshphService {
    getadminshphs(name,adminId,role) {
        return http.get('/adminshph?name='+name+'&&adminId='+adminId+'&&role='+role);
    }
    getadminshph(id) {
        return http.get('/adminshph/' + id);
    }
    createadminshph(data) {
        return http.post('/adminshph', data);
    }
    signin(data) {
        return http.post('/adminshph/signin', data);
    }
    updateadminshph(id, data) {
        return http.put(`/adminshph/${id}`, data);
    }
    deleteadminshph(id, status) {
        return http.delete(`/adminshph/${id}/${status}`);
    }
}

export default new AdminshphService();