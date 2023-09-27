import http from "../http-common";

class CourseService {
    getcourses(){
        return http.get('/courses');
    }
    getcourse(id) {
        return http.get('/courses/' + id);
    }
    createcourse(data) {
        return http.post('/courses', data);
    }
    updatecourse(id, data) {
        return http.put(`/courses/${id}`, data);
    }
    deletecourse(id) {
        return http.delete('/courses/' + id);
    }
}

export default new CourseService();