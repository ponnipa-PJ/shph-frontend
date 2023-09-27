import http from "../http-common";

class RoleService {
    getRoles() {
        return http.get('/roles');
    }
    getRole(id) {
        return http.get('/roles/' + id);
    }
    createRole(data) {
        return http.post('/roles', data);
    }
    updateRole(id, data) {
        return http.put(`/roles/${id}`, data);
    }
}

export default new RoleService();