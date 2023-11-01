import http from "../http-common";

class NewsService {
    getnews(status){
        return http.get('/news?name='+status);
    }
    getnew(id) {
        return http.get('/news/' + id);
    }
    createnew(data) {
        return http.post('/news', data);
    }
    updatenew(id, data) {
        return http.put(`/news/${id}`, data);
    }
    deletenew(id) {
        return http.delete('/news/' + id);
    }
}

export default new NewsService();