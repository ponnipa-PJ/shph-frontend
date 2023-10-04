import http from "../http-common";

class MasseuseTypeService {
    getmasseusetypes(name){
        return http.get('/masseusetype?name='+name);
    }
    getmasseusetype(id) {
        return http.get('/masseusetype/' + id);
    }
    createmasseusetype(data) {
        return http.post('/masseusetype', data);
    }
    updatemasseusetype(id, data) {
        return http.put(`/masseusetype/${id}`, data);
    }
    deletemasseusetype(id) {
        return http.delete('/masseusetype/' + id);
    }
}

export default new MasseuseTypeService();