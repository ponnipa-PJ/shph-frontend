import http from "../http-common";

class MapHistoryMasseuseService {
    getmap_history_user_masseuses(name){
        return http.get('/map_history_user_masseuse?name='+name);
    }
    getmap_history_user_masseuse(id) {
        return http.get('/map_history_user_masseuse/' + id);
    }
    createhistory_user_dentist(name) {
        return http.get('/events/createcolumn?name=' + name);
    }
    createmap_history_user_masseuse(data) {
        return http.post('/map_history_user_masseuse', data);
    }
    updatemap_history_user_masseuse(id, data) {
        return http.put(`/map_history_user_masseuse/${id}`, data);
    }
    updatestatus(id, data) {
        return http.put(`/map_history_user_masseuse/updatestatus/${id}`, data);
    }
    updateno(id, data) {
        return http.put(`/map_history_user_masseuse/updateno/${id}`, data);
    }
    deletemap_history_user_masseuse(id) {
        return http.delete('/map_history_user_masseuse/' + id);
    }
}

export default new MapHistoryMasseuseService();