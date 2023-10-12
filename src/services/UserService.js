import http from "../http-common";

class UserService {
    getUsers(email,roleId) {
        return http.get('/user?name='+email+'&&roleId='+roleId)
    }
    searchuid(uid) {
        return http.get('/user/searchUID?uid='+uid)
    }
    getDoctors() {
        return http.get('/user/getdoctor')
    }
    getdatabyrole(role,shphId) {
        return http.get('/user/getdatabyrole?role='+role+'&&shphId='+shphId)
    }
    updateToken(id, data) {
        return http.put(`/user/token/${id}`, data);
    }
    getUserBytoken(id) {
        return http.get('/user/getbytoken/' + id);
    }
    getUser(id) {
        return http.get('/user/' + id);
    }
    findByadminshphId(id) {
        return http.get('/user/findByadminshphId/' + id);
    }
    createUser(data) {
        return http.post('/user', data);
    }
    updateUser(id, data) {
        return http.put(`/user/${id}`, data);
    }
    updatetokenline(id, data) {
        return http.put(`/user/updatetokenline/${id}`, data);
    }
    getRoles() {
        return http.get('/roles');
    }
    getMenu() {
        return http.get('/user/getmenuall');
    }
    getMenubyRoleID(id) {
        return http.get('/user/getmenu/' + id);
    }
    getMenubyRoleIDAll(id) {
        return http.get('/user/getmenuarray/' + id);
    }
    createRoleMenu(data) {
        return http.post('/role_menu', data);
    }
    deleteRoleMenu(id) {
        return http.delete(`/role_menu/` + id);
    }
    deleteUser(id) {
        return http.delete(`/user/` + id);
    }
}

export default new UserService();