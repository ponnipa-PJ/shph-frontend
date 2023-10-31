import http from "../http-common";

class MakingAppointmentsService {
    getmaking_appointments(name){
        return http.get('/making_appointments?name='+name);
    }
    getmaking_appointment(id) {
        return http.get('/making_appointments/' + id);
    }
    findOnedentist(id) {
        return http.get('/making_appointments/findOnedentist/' + id);
    }
    getreportdoctor(userId,doctorId){
        return http.get('/making_appointments/getreportdoctor?userId='+userId+'&&doctorId='+doctorId);
    }
    getreportdoctordentist(userId,doctorId){
        return http.get('/making_appointments/getreportdoctordentist?userId='+userId+'&&doctorId='+doctorId);
    }
    createmaking_appointment(data) {
        return http.post('/making_appointments', data);
    }
    updatemaking_appointment(id, data) {
        return http.put(`/making_appointments/${id}`, data);
    }
    deletemaking_appointment(id) {
        return http.delete('/making_appointments/' + id);
    }
}

export default new MakingAppointmentsService();