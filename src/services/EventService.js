import http from "../http-common";

class EventService {
    getevents(name,id){
        return http.get('/events?name='+name+'&&id='+id);
    }
    getbooks(name,id,shphId){
        return http.get('/events/book?name='+name+'&&id='+id+'&&shphId='+shphId);
    }
    getdoctorbydate(date,id){
        return http.get('/events/getdoctorbydate?date='+date+'&&id='+id);
    }
    gettimebydoctoranddate(date,id,userid){
        return http.get('/events/gettimebydoctoranddate?date='+date+'&&id='+id+'&&userid='+userid);
    }
    deleteAll(date,id){
        return http.get('/events/deleteevent?date='+date+'&&id='+id);
    }
    getquebyuserid(date,id,doctorid){
        return http.get('/events/getquebyuserid?date='+date+'&&id='+id+'&&doctorid='+doctorid);
    }
    geteventbyuseranddate(date,id){
        return http.get('/events/geteventbyuseranddate?date='+date+'&&id='+id);
    }
    geteventbydocanddate(date,id){
        return http.get('/events/geteventbydocanddate?date='+date+'&&id='+id);
    }
    getevent(id) {
        return http.get('/events/' + id);
    }
    createevent(data) {
        return http.post('/events', data);
    }
    updateevent(id, data) {
        return http.put(`/events/${id}`, data);
    }
    pdateevent(id, data) {
        return http.put(`/events/${id}`, data);
    }
    updateuser(id, data) {
        return http.put(`/events/updateuser/${id}`, data);
    }
    deleteevent(id) {
        return http.delete('/events/' + id);
    }
}

export default new EventService();