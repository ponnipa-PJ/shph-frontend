import http from "../http-common";

class DistrictService {
    getdistricts(name) {
        return http.get('/districts?name='+name);
    }
    getdistrict(id) {
        return http.get('/districts/' + id);
    }
    createdistrict(data) {
        return http.post('/districts', data);
    }
    updatedistrict(id, data) {
        return http.put(`/districts/${id}`, data);
    }
    deletedistrict(id,status) {
        return http.delete('/districts/' + id+'/'+status);
    }
}

export default new DistrictService();