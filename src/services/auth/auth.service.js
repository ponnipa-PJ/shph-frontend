import http from "../../http-common";

class AuthService {
  async login(user) {
    // console.log(user)
    return http.post('user/signin', user)
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem('usershph', JSON.stringify(response.data));
        }
        return response.data;
      },
        error => {
          console.log(error);
          this.$router.push("/login");
          alert('ชื่อหรือรหัสผ่านไม่ถูกต้อง')
        }
      );
  }
  async loginperson(user) {
    // console.log(user)
    return http.post('user/signinperson', user)
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem('usershph', JSON.stringify(response.data));
        }
        return response.data;
      },
        error => {
          console.log(error);
          this.$router.push("/login");
          alert('ชื่อหรือรหัสผ่านไม่ถูกต้อง')
        }
      );
  }
  logout() {
    localStorage.removeItem('usershph');
  }

  role() {
    return http.get('role');
  }

  getpage(id) {
    return http.get(`menu/menubyuserid/`+id);
  }

  
  getname(id) {
    return http.get(`user/`+id);
  }

}
export default new AuthService();