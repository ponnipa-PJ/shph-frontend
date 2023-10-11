import http from "../http-common";

class DentistTypeService {
    getdentisttypes(name){
        return http.get('/dentisttype?name='+name);
    }
    getdentisttype(id) {
        return http.get('/dentisttype/' + id);
    }
    createdentisttype(data) {
        return http.post('/dentisttype', data);
    }
    updatedentisttype(id, data) {
        return http.put(`/dentisttype/${id}`, data);
    }
    deletedentisttype(id) {
        return http.delete('/dentisttype/' + id);
    }
}

export default new DentistTypeService();