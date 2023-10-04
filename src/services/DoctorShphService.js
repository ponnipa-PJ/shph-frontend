import http from "../http-common";

class DoctorShphService {
    getdoctorshphs(name){
        return http.get('/doctorshph?name='+name);
    }
    getdoctorandshphmasseuse(roleId,userId){
        return http.get('/doctorshph/getdoctorandshphmasseuse?roleId='+roleId+'&&userId='+userId);
    }
    getdoctorshph(id) {
        return http.get('/doctorshph/' + id);
    }
    createdoctorshph(data) {
        return http.post('/doctorshph', data);
    }
    updatedoctorshph(id, data) {
        return http.put(`/doctorshph/${id}`, data);
    }
    deletedoctorshph(id) {
        return http.delete('/doctorshph/' + id);
    }
}

export default new DoctorShphService();