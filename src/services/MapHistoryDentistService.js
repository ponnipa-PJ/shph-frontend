import http from "../http-common";

class MapHistoryDentistService {
    getmap_history_user_dentists(name){
        return http.get('/map_history_user_dentist?name='+name);
    }
    getmap_history_user_dentist(id) {
        return http.get('/map_history_user_dentist/' + id);
    }
    createhistory_user_dentist(name) {
        return http.get('/eventsdentist/createcolumn?name=' + name);
    }
    createmap_history_user_dentist(data) {
        return http.post('/map_history_user_dentist', data);
    }
    updatemap_history_user_dentist(id, data) {
        return http.put(`/map_history_user_dentist/${id}`, data);
    }
    updatestatus(id, data) {
        return http.put(`/map_history_user_dentist/updatestatus/${id}`, data);
    }
    updateno(id, data) {
        return http.put(`/map_history_user_dentist/updateno/${id}`, data);
    }
    deletemap_history_user_dentist(id) {
        return http.delete('/map_history_user_dentist/' + id);
    }
}

export default new MapHistoryDentistService();