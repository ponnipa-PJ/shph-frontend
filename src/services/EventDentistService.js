import http from "../http-common";

class EventDentistService {
    getevents(name,id){
        return http.get('/eventsdentist?name='+name+'&&id='+id);
    }
    getbooks(name,id){
        return http.get('/eventsdentist/book?name='+name+'&&id='+id);
    }
    getdoctorbydate(date,id,doctor){
        return http.get('/eventsdentist/getdoctorbydate?date='+date+'&&id='+id+'&&doctor='+doctor);
    }
    deleteAll(date,id){
        return http.get('/eventsdentist/deleteevent?date='+date+'&&id='+id);
    }
    getquebyuserid(date,id){
        return http.get('/eventsdentist/getquebyuserid?date='+date+'&&id='+id);
    }
    geteventbyuseranddate(date,id){
        return http.get('/eventsdentist/geteventbyuseranddate?date='+date+'&&id='+id);
    }
    geteventbydocanddate(date,id){
        return http.get('/eventsdentist/geteventbydocanddate?date='+date+'&&id='+id);
    }
    
    getevent(id) {
        return http.get('/eventsdentist/' + id);
    }
    createevent(data) {
        return http.post('/eventsdentist', data);
    }
    updateevent(id, data) {
        return http.put(`/eventsdentist/${id}`, data);
    }
    pdateevent(id, data) {
        return http.put(`/eventsdentist/${id}`, data);
    }
    updateuser(id, data) {
        return http.put(`/eventsdentist/updateuser/${id}`, data);
    }
    deleteevent(id) {
        return http.delete('/eventsdentist/' + id);
    }
}

export default new EventDentistService();