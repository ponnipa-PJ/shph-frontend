import http from "../http-common";

class QueueService {
    getqueues(name,status ){
        return http.get('/queues?name='+name+'&&status='+status);
    }
    getqueue(id) {
        return http.get('/queues/' + id);
    }
    createqueues(data) {
        return http.post('/queues', data);
    }
    updatequeues(id, data) {
        return http.put(`/queues/${id}`, data);
    }
    deletequeues(id) {
        return http.delete('/queues/' + id);
    }
}

export default new QueueService();