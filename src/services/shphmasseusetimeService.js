import http from "../http-common";

class shphmasseusetimeService {
    getshph_masseuse_times() {
        return http.get('/shph_masseuse_time');
    }
    getshph_masseuse_time(id) {
        return http.get('/shph_masseuse_time/' + id);
    }
    createshph_masseuse_time(data) {
        return http.post('/shph_masseuse_time', data);
    }
    updateshph_masseuse_time(id, data) {
        return http.put(`/shph_masseuse_time/${id}`, data);
    }
}

export default new shphmasseusetimeService();