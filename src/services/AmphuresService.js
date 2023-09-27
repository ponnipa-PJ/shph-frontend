import http from "../http-common";

class AmphuresService {
    getamphures(name) {
        return http.get('/amphures?name='+name);
    }
    getamphure(id) {
        return http.get('/amphures/' + id);
    }
    createamphure(data) {
        return http.post('/amphures', data);
    }
    updateamphure(id, data) {
        return http.put(`/amphures/${id}`, data);
    }
    deleteamphure(id,status) {
        return http.delete('/amphures/' + id+'/'+status);
    }
}

export default new AmphuresService();