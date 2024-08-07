import http from "../http-common";

class EventDentistService {
    getevents(name,id,shphId,userId){
        return http.get('/eventsdentist?name='+name+'&&id='+id+name+'&&shphId='+shphId+'&&userId='+userId);
    }
    getbooks(name,id,shphId){
        return http.get('/eventsdentist/book?name='+name+'&&id='+id+'&&shphId='+shphId);
    }
    getdoctorbydate(date,id,doctor,shphId,type){
        return http.get('/eventsdentist/getdoctorbydate?date='+date+'&&id='+id+'&&doctor='+doctor+'&&shphId='+shphId+'&&type='+type);
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
    geteventbook(id){
        return http.get('/eventsdentist/geteventbook?id='+id);
    }
    getappointbyId(id){
        return http.get('/events/getappointbyId?id='+id);
    }
    geteventbydocanddate(date,id,shphId){
        return http.get('/eventsdentist/geteventbydocanddate?date='+date+'&&id='+id +'&&shphId='+shphId);
    }
    createsql(name){
        return http.get('/eventsdentist/createsql?name='+name);
    }
    getevent(id) {
        return http.get('/eventsdentist/' + id);
    }
    gettimebydoctoranddate(date,id,userid,shphId,type){
        return http.get('/eventsdentist/gettimebydoctoranddate?date='+date+'&&id='+id+'&&userid='+userid+'&&shphId='+shphId+'&&type='+type);
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
    updateconfirm(id, data) {
        return http.put(`/eventsdentist/updateconfirm/${id}`, data);
    }
}

export default new EventDentistService();