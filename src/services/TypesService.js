import http from "../http-common";

class TypesService {
    getTypes() {
        return http.get('/types');
    }
    getType(id) {
        return http.get('/types/' + id);
    }
    createType(data) {
        return http.post('/types', data);
    }
    updateType(id, data) {
        return http.put(`/types/${id}`, data);
    }
}

export default new TypesService();