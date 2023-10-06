import http from "../http-common";

class MapEventsService {
    getmap_events(){
        return http.get('/map_events');
    }
    getmap_event(id) {
        return http.get('/map_events/' + id);
    }
    gettypesbook() {
        return http.get('/typesbook');
    }
    createmap_event(data) {
        return http.post('/map_events', data);
    }
    geteventbycreatedBy(date,id,userid,shphId){
        return http.get('/map_events/geteventbycreatedBy?date='+date+'&&id='+id+'&&userid='+userid+'&&shphId='+shphId);
    }
    updatemap_event(id, data) {
        return http.put(`/map_events/${id}`, data);
    }
    deletemap_event(id) {
        return http.delete('/map_events/' + id);
    }
}

export default new MapEventsService();