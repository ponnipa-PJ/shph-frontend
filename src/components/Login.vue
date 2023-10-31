<template>
<div class="row">
    <div class="card mt-5" style="width: 80%">
    <div class="card-body login-card-body mt-3">
      <h3 class="login-box-msg" style="text-align:center">เข้าสู่ระบบ</h3>
      <form>
        <div class="card-body mt-3">
          <div class="form-group">
<div class="custom-control custom-radio">
<input class="custom-control-input" type="radio" id="customRadio1" name="customRadio" value="2" v-model="type" @click="cleardata()">
<label for="customRadio1" class="custom-control-label">บุคคลทั่วไป</label>
</div>
<div class="custom-control custom-radio">
<input class="custom-control-input" type="radio" id="customRadio2" name="customRadio" value="1" v-model="type" @click="cleardata()">
<label for="customRadio2" class="custom-control-label">เจ้าหน้าที่</label>
</div>
</div>
<div class="form-group" v-if="type == 2">
            <label for="uid">เลขบัตรประชาชน<span style="color: red">*</span> </label>
            <input
              v-model="user.UID"
              v-on:keyup.enter="signIn()"
              type="number"
              class="form-control form-control-sm"
              id="uid"
              placeholder="กรุณากรอกเลขบัตรประชาชน"
            />
          </div>
          <div class="form-group" v-else>
            <label for="email">อีเมล<span style="color: red">*</span> </label>
            <input
              v-model="user.email"
              v-on:keyup.enter="signIn()"
              type="email"
              min="1"
              class="form-control form-control-sm"
              id="email"
              placeholder="กรุณากรอกอีเมล"
            />
          </div>
          <div class="form-group mt-3" style="margin-bottom:0px">
                  <label for="password">รหัสผ่าน<span style="color: red">*</span> </label>
                  <!-- <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" />
                    <input v-model="user.text" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" />
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                    <i class="bi bi-eye-fill"></i> -->
                    
                </div>
                <div class="input-group mb-3" v-if="eye">
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" placeholder="กรุณากรอกรหัสผ่าน"/>
                    <div class="input-group-append">
<button type="button" class="btn btn-secondary btn-sm" @click="showPassword(true)"> <i class="bi bi-eye-fill"></i></button>
</div>
</div>
<div class="input-group mb-3" v-else>
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="text"
                    class="form-control form-control-sm" id="password" placeholder="กรุณากรอกรหัสผ่าน"/>
                    <div class="input-group-append">
<button type="button" class="btn btn-secondary btn-sm" @click="showPassword(false)"> <i class="bi bi-eye-slash"></i></button>
</div>
</div>
          <div class="social-auth-links text-center mb-3 mt-3">
           <a href="/register"> <button type="button" class="btn btn-warning">สมัครสมาชิก</button></a>&nbsp;
            <button @click="signIn()" type="button" class="btn btn-success">เข้าสู่ระบบ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import UserService from '../services/UserService.js'
import LinkImageService from "../services/LinkImageService";
import AdminshphService from '../services/AdminshphService'

export default {
  name: "Nav",  
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id:0,
      menu:[],
      user:{},
      eye:true,
      type:2
    }
  },
  mounted() {
    if (this.currentUser) {
      UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
          this.menu = res.data
          console.log(this.menu);
          this.$router.push(res.data[0].url);
        })
      }
  },
  methods: {
    cleardata(){
this.user = {}
    },
    showPassword(status){
      // console.log(status);
      if (status == true) {
        this.eye =false
      }else{
        this.eye = true
      }

    },
    urlAuth() {
      var clientId = 'do6mzoSxLMNnOTXkr7USva'
      var engine = LinkImageService.getLinkFrontend()+'/line'
      return `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${engine}&scope=notify&state=1`
    },
    Script_checkID(id) {
      var i =0
      var sum = 0
      if (id.substring(0, 1) == 0) return false;
      if (id.length != 13) return false;
      for (i = 0, sum = 0; i < 12; i++)
        sum += parseFloat(id.charAt(i)) * (13 - i);
      if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
      return true;
    },
     signIn() {
      if (this.type == 2) {
        if (this.user.UID == "" || this.user.UID == null) {
        alert("กรุณากรอกเลขบัตรประชาชน");
      } else if(!this.Script_checkID(this.user.UID)){
        alert("กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง");
      }else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        var userindividual = {
          UID: this.user.UID,
          password: this.user.password,
        };
        this.$store.dispatch("auth/loginperson", userindividual).then(
          () => {
            // this.loading = true;
            UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
              // console.log(this.urlAuth());
          var menu = res.data[0].url
          // console.log(menu);
          // console.log(this.currentUser);
          
          if (this.currentUser.line_token == null) {
            window.open(this.urlAuth(), "_blank");
          }else{
  this.$router.push(menu);
  location.reload();
        
          }
        
          //   setTimeout(function () {
          //     location.reload();
          //   }, 500);
        })
            
          },
          (error) => {
            alert("เลขบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง");
            console.log(error);
            // this.loading = false;
            // this.message =
            //   (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            //   error.message ||
            //   error.toString();
          }
        );
      }
    
      }else{
      if (this.user.email == "" || this.user.email == null) {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        var user = {
          email: this.user.email,
          password: this.user.password,
        };
        // console.log(this.user.email.includes('@'));
        if (!this.user.email.includes('@')) {
          AdminshphService.signin(user).then((res)=>{
            console.log(res.data);
            if (res.data.status == false) {
              alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
            }else if(res.data.status == 2){
              UserService.findByadminshphId(res.data.id).then((res)=>{
                alert("ชื่อผู้ใช้งานนี้สมัครสมาชิกเรียบร้อยแล้ว ด้วยอีเมล " +res.data.email);
              })
            }else{
              this.$router.push('/register?id='
              +res.data.id)
            }
          })
        }else{
        this.$store.dispatch("auth/login", user).then(
          () => {
            // this.loading = true;
            UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
              // console.log(this.urlAuth());
          var menu = res.data[0].url
          // console.log(menu);
          // console.log(this.currentUser);
          
          if (this.currentUser.line_token == null) {
            window.open(this.urlAuth(), "_blank");
          }else{
  this.$router.push(menu);
  location.reload();
        
          }
        
          //   setTimeout(function () {
          //     location.reload();
          //   }, 500);
        })
            
          },
          (error) => {
            alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            console.log(error);
            // this.loading = false;
            // this.message =
            //   (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            //   error.message ||
            //   error.toString();
          }
        );
      }
    }
  }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vertical-menu {
  background-color: #eee;
}

.vertical-menu a {
  background-color: #eee;
  color: black;
  display: block;
  padding: 12px;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color: #ccc;
}

.vertical-menu a.active {
  background-color: #04AA6D;
  color: white;
}
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
body{
background-color: gray;
}
</style>
