import http from "../http-common";

class HistorymasseuseService {
    getHistorymasseuses() {
        return http.get('/historymasseuse');
    }
    gethistorymasseus(id) {
        return http.get('/historymasseuse/' + id);
    }
    createhistorymasseus(data) {
        return http.post('/historymasseuse', data);
    }
    updatehistorymasseus(id, data) {
        return http.put(`/historymasseuse/${id}`, data);
    }
}

export default new HistorymasseuseService();