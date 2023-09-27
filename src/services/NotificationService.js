import http from "../http-common";

class NotificationService {
    getnotifications(){
        return http.get('/notification');
    }
    getnotification(id) {
        return http.get('/notification/' + id);
    }
    createnotification(data) {
        return http.post('/notification', data);
    }
    updatenotification(id, data) {
        return http.put(`/notification/${id}`, data);
    }
    deletenotification(id) {
        return http.delete('/notification/' + id);
    }
}

export default new NotificationService();