import http from "../http-common";

class LogNotifyService {
    getlog_notifys() {
        return http.get('/log_notify');
    }
    getlog_notify(id) {
        return http.get('/log_notify/' + id);
    }
    createlog_notify(data) {
        return http.post('/log_notify', data);
    }
    updatelog_notify(id, data) {
        return http.put(`/log_notify/${id}`, data);
    }
}

export default new LogNotifyService();