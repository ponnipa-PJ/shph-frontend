import http from "../http-common";

class EventDentistService {
    getevents(name,id,shphId){
        return http.get('/eventsdentist?name='+name+'&&id='+id+name+'&&shphId='+shphId);
    }
    getbooks(name,id,shphId){
        return http.get('/eventsdentist/book?name='+name+'&&id='+id+'&&shphId='+shphId);
    }
    getdoctorbydate(date,id,doctor,shphId){
        return http.get('/eventsdentist/getdoctorbydate?date='+date+'&&id='+id+'&&doctor='+doctor+'&&shphId='+shphId);
    }
    deleteAll(date,id){
        return http.get('/eventsdentist/deleteevent?date='+date+'&&id='+id);
    }
    getquebyuserid(date,id,shphId){
        return http.get('/eventsdentist/getquebyuserid?date='+date+'&&id='+id+'&&shphId='+shphId);
    }
    geteventbyuseranddate(date,id,shphId){
        return http.get('/eventsdentist/geteventbyuseranddate?date='+date+'&&id='+id+'&&shphId='+shphId);
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
    deleteevent(id,shphId) {
        return http.delete('/eventsdentist/' + id+'?shphId='+shphId);
    }
    updateconfirm(id, data) {
        return http.put(`/eventsdentist/updateconfirm/${id}`, data);
    }
}

export default new EventDentistService();