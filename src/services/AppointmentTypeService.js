import http from "../http-common";

class AppointmentTypeService {
    getappointments(name){
        return http.get('/appointments?name='+name);
    }
    getappointment(id) {
        return http.get('/appointments/' + id);
    }
    createappointment(data) {
        return http.post('/appointments', data);
    }
    updateappointment(id, data) {
        return http.put(`/appointments/${id}`, data);
    }
    deleteappointment(id) {
        return http.delete('/appointments/' + id);
    }
}

export default new AppointmentTypeService();