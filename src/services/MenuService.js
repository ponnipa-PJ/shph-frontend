import http from "../http-common";

class MenuService {
  getmenus() {
    return http.get(`/menus`);
  }
  getmenu(id) {
    return http.get(`/menus/`+id);
  }
  gettypes_menu(id) {
    return http.get(`/types_menu/`+id);
  }
  updatetypes_menu(id, data) {
    return http.put(`/types_menu/${id}`, data);
  }
  updatemenu(id, data) {
    return http.put(`/menus/${id}`, data);
  }
  updateorder(id, data) {
    return http.put(`/menus/updateorder/${id}`, data);
  }
}

export default new MenuService();