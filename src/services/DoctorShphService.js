import http from "../http-common";

class DoctorShphService {
    getdoctorshphs(name){
        return http.get('/doctorshph?name='+name);
    }
    getdoctorandshphmasseuse(roleId,userId){
        return http.get('/doctorshph/getdoctorandshphmasseuse?roleId='+roleId+'&&userId='+userId);
    }
    getnotdoctors(doctorId,userId){
        return http.get('/doctorshph/getnotdoctors?doctorId='+doctorId+'&&userId='+userId);
    }
    getdoctorandshpdentist(roleId,userId){
        return http.get('/doctorshph/getdoctorandshpdentist?roleId='+roleId+'&&userId='+userId);
    }
    getdoctorshph(id) {
        return http.get('/doctorshph/' + id);
    }
    getshphbydoc(id) {
        return http.get('/doctorshph/getshphbydoc?doctorId=' + id);
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