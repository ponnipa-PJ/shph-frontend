import http from "../http-common";

class MapEventsDentistService {
    getmap_events_dentists(){
        return http.get('/map_events_dentist');
    }
    getmap_events_dentist(id){
        return http.get('/map_events_dentist/'+id);
    }
    getmap_event(id) {
        return http.get('/map_events_dentist/' + id);
    }
    findbyuserId(id) {
        return http.get('/map_events_dentist/findbyuserId/' + id);
    }
    gettypesbook() {
        return http.get('/typesbook');
    }
    createmap_event(data) {
        return http.post('/map_events_dentist', data);
    }
    geteventbycreatedBy(date,id,userid,shphId){
        return http.get('/map_events_dentist/geteventbycreatedBy?date='+date+'&&id='+id+'&&userid='+userid+'&&shphId='+shphId);
    }
    updatemap_event(id, data) {
        return http.put(`/map_events_dentist/${id}`, data);
    }
    updateconfirm(id, data) {
        return http.put(`/map_events_dentist/updateconfirm/${id}`, data);
    }
    deletemap_event(id) {
        return http.delete('/map_events_dentist/' + id);
    }
}

export default new MapEventsDentistService();