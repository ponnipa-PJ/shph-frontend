import http from "../http-common";

class LocationTypeService {
    getlocations(name){
        return http.get('/locations?name='+name);
    }
    getlocation(id) {
        return http.get('/locations/' + id);
    }
    createlocation(data) {
        return http.post('/locations', data);
    }
    updatelocation(id, data) {
        return http.put(`/locations/${id}`, data);
    }
    deletelocation(id) {
        return http.delete('/locations/' + id);
    }
}

export default new LocationTypeService();