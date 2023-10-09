import http from "../http-common";

class HistorymasseuseService {
    getHistorymasseuses() {
        return http.get('/historymasseuse');
    }
    gethistorymasseus(id) {
        return http.get('/historymasseuse/' + id);
    }
    getuserhistory(id) {
        return http.get('/history_user_masseuse/' + id);
    }
    getdoctorhistory(id) {
        return http.get('/history_doctor_masseuse/' + id);
    }
    createhistorymasseus(data) {
        return http.post('/historymasseuse', data);
    }
    updatehistorymasseus(id, data) {
        return http.put(`/historymasseuse/${id}`, data);
    }map_history_doctor_masseuse
}

export default new HistorymasseuseService();