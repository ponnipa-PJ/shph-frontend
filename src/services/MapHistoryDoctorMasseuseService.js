import http from "../http-common";

class MapHistoryDoctorMasseuseService {
    getmap_history_doctor_masseuses(name){
        return http.get('/map_history_doctor_masseuse?name='+name);
    }
    gethistory_doctor_masseuse(name,doctorId){
        return http.get('/history_doctor_masseuse?name='+name+'&&doctorId='+doctorId);
    }
    
    getreportdoctor(userId,doctorId){
        return http.get('/history_doctor_masseuse/getreportdoctor?userId='+userId+'&&doctorId='+doctorId);
    }
    getmap_history_doctor_masseuse(id) {
        return http.get('/map_history_doctor_masseuse/' + id);
    }
    createhistory_doctor_dentist(name) {
        return http.get('/events/createcolumn?name=' + name);
    }
    createmap_history_doctor_masseuse(data) {
        return http.post('/map_history_doctor_masseuse', data);
    }
    updatemap_history_doctor_masseuse(id, data) {
        return http.put(`/map_history_doctor_masseuse/${id}`, data);
    }
    updatestatus(id, data) {
        return http.put(`/map_history_doctor_masseuse/updatestatus/${id}`, data);
    }
    updateno(id, data) {
        return http.put(`/map_history_doctor_masseuse/updateno/${id}`, data);
    }
    deletemap_history_doctor_masseuse(id) {
        return http.delete('/map_history_doctor_masseuse/' + id);
    }
}

export default new MapHistoryDoctorMasseuseService();