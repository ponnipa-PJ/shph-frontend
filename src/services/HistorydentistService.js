import http from "../http-common";

class HistorydentistService {
    getHistoryhistorydentists() {
        return http.get('/historydentist');
    }
    gethistoryhistorydentist(id) {
        return http.get('/historydentist/' + id);
    }
    createhistoryhistorydentist(data) {
        return http.post('/historydentist', data);
    }
    updatehistoryhistorydentist(id, data) {
        return http.put(`/historydentist/${id}`, data);
    }
}

export default new HistorydentistService();