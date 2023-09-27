import http from "../http-common";

class ProvinceService {
    getprovinces() {
        return http.get('/provinces');
    }
    getprovince(id) {
        return http.get('/provinces/' + id);
    }
    createprovince(data) {
        return http.post('/provinces', data);
    }
    updateprovince(id, data) {
        return http.put(`/provinces/${id}`, data);
    }
    deleteprovince(id,status) {
        return http.delete('/provinces/' + id+'/'+status);
    }
}

export default new ProvinceService();