import http from "../http-common";

class MapEventsService {
    getmap_events(){
        return http.get('/map_events');
    }
    getmap_event(id) {
        return http.get('/map_events/' + id);
    }
    createmap_event(data) {
        return http.post('/map_events', data);
    }
    updatemap_event(id, data) {
        return http.put(`/map_events/${id}`, data);
    }
    deletemap_event(id) {
        return http.delete('/map_events/' + id);
    }
}

export default new MapEventsService();