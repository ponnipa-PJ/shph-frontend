import http from "../http-common";

class DoctorService {
    getdoctors(name){
        return http.get('/doctors?name='+name);
    }
    getdoctor(id) {
        return http.get('/doctors/' + id);
    }
    gettimebydoctor(id) {
        return http.get('/doctors/gettimebydoctor/' + id);
    }
    
    createdoctor(data) {
        return http.post('/doctors', data);
    }
    updatedoctor(id, data) {
        return http.put(`/doctors/${id}`, data);
    }
    deletedoctor(id) {
        return http.delete('/doctors/' + id);
    }
}

export default new DoctorService();