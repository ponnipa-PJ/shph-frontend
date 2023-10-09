import http from "../http-common";

class MapHistoryDoctorMasseuseService {
    getmap_history_doctor_dentists(name){
        return http.get('/map_history_doctor_dentist?name='+name);
    }
    getmap_history_doctor_dentist(id) {
        return http.get('/map_history_doctor_dentist/' + id);
    }
    gethistory_doctor_dentist(name,doctorId){
        return http.get('/history_doctor_dentist?name='+name+'&&doctorId='+doctorId);
    }
    getreportdoctor(userId,doctorId){
        return http.get('/history_doctor_dentist/getreportdoctor?userId='+userId+'&&doctorId='+doctorId);
    }
    createhistory_doctor_dentist(name) {
        return http.get('/eventsdentist/createcolumn?name=' + name);
    }
    createmap_history_doctor_dentist(data) {
        return http.post('/map_history_doctor_dentist', data);
    }
    updatemap_history_doctor_dentist(id, data) {
        return http.put(`/map_history_doctor_dentist/${id}`, data);
    }
    updatestatus(id, data) {
        return http.put(`/map_history_doctor_dentist/updatestatus/${id}`, data);
    }
    updateno(id, data) {
        return http.put(`/map_history_doctor_dentist/updateno/${id}`, data);
    }
    deletemap_history_doctor_dentist(id) {
        return http.delete('/map_history_doctor_dentist/' + id);
    }
}

export default new MapHistoryDoctorMasseuseService();