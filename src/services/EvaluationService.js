import http from "../http-common";

class EvaluationService {
    getevaluations(name ){
        return http.get('/evaluation?name='+name);
    }
    getqueue(id) {
        return http.get('/evaluation/' + id);
    }
    createevaluation(data) {
        return http.post('/evaluation', data);
    }
    updateevaluation(id, data) {
        return http.put(`/evaluation/${id}`, data);
    }
    deleteevaluation(id) {
        return http.delete('/evaluation/' + id);
    }
}

export default new EvaluationService();