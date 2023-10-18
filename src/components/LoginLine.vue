<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body login-card-body mt-3" v-if="status">
            <h3 class="login-box-msg" style="text-align: center">
              สมัครสมาชิก
            </h3>
            <form ref="form" @submit.prevent="sendEmail">
              <div class="card-body mt-3">
                <div class="form-group mb-3">
                  <label for="username">ชื่อ<span style="color: red">*</span> </label>
                  <input
                    v-model="user.firstname"
                    name="to_name"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="username">นามสกุล<span style="color: red">*</span> </label>
                  <input
                    v-model="user.lastname"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="username">อีเมล<span style="color: red">*</span>  ใช้ Gmail เท่านั้น</label>
                  <input
                  name="to_email"
                    v-model="user.email"
                    v-on:keyup.enter="signIn()"
                    type="email"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
                <!-- <div class="form-group mb-3">
                  <label for="username">LineID</label>
                  <input
                    v-model="user.lineid"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div> -->
                    
                <div class="form-group mb-3" style="display:none;">
                  <label for="username">form_name</label>
                  <input
                  v-model="user.from_name"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    name="from_name"
                  />
                </div>
                <div class="form-group mb-3" style="display:none;">
                  <label for="username">Message</label>
                  <input
                  v-model="user.message"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    name="message"
                  />
                </div>
                <div class="form-group mt-3 mb-3">
                  <label for="password">รหัสผ่าน<span style="color: red">*</span> </label>
                  <input
                    v-model="user.password"
                    v-on:keyup.enter="signIn()"
                    type="password"
                    class="form-control form-control-sm"
                    id="password"
                  />
                </div>
                <div class="form-group mt-3 mb-3">
                  <label for="line_token">Line Token<span style="color: red">*</span> </label>
                  <input
                    v-model="user.line_token"
                    v-on:keyup.enter="signIn()"
                    type="text"
                    class="form-control form-control-sm"
                    id="line_token"
                  />
                </div>
                 <div class="row mt-3">
                  <div class="col-md-3"></div>
                  <div class="col-md-6 text-center">
                   <button
                    @click="signIn()"
                    type="button"
                    class="btn btn-success btn-sm"
                  >
                    สมัครสมาชิก
                  </button></div>
                  <div class="col-md-3"></div>
                </div>
              </div>
            </form>
          </div>
           <div class="card-body login-card-body mt-3" v-else>
            <h5 class="login-box-msg" style="text-align: center">
              กรุณายืนยันตัวตนในอีเมล
            </h5>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    <iframe :src="line" width="100%" 
    height="650" frameborder="0" style="position:relative;
    index:999" ref="frame">
  </iframe>
    {{ line }}
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
import emailjs from 'emailjs-com';
import LinkImageService from '../services/LinkImageService';

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id: 0,
      menu: [],
      user: {},
      status:true,
      line:'',
      // line: "<h1 style='color:red'>Hello Gowtham</h1>"
    };
  },
  async mounted() {    
    await LinkImageService.gettoken().then((res)=>{
      // console.log(res.data);
      this.line = res.data
    })
        // this.$router.push("/permissiondocedit/" + this.car_id);
			
    this.user.from_name = 'ระบบ'
    this.user.message = this.generateGuid()
  },
  methods: {
    generateGuid() {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
},
    sendEmail() {
        emailjs.sendForm('service_3aw9uiu', 'template_4dplcdz',this.$refs.form,
        'OAdn-sTsvwbkXQcRD').then((result) => {
            console.log('SUCCESS!', result.text);
            this.status = false
        }, (error) => {
            console.log('FAILED...', error.text);
        }
        )
    },
    signIn() {
      if (this.user.firstname == "" || this.user.firstname == null) {
        alert("กรุณากรอกชื่อผู้ใช้งาน");
      } else if (this.user.lastname == "" || this.user.lastname == null) {
        alert("กรุณากรอกนามสกุลผู้ใช้งาน");
      } else if (this.user.email == "" || this.user.email == null) {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        UserService.getUsers(this.user.email,'','','').then((res)=>{
          // console.log(res.data);
          if (res.data.length == 0) {
            var user = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password,
          role_id: 1,
          active: 1,
          token: this.user.message,
        };
        // console.log(user);
        UserService.createUser(user).then(()=>{
          // console.log(res.data);
          // console.log(this.user);
          this.sendEmail()
        })
          }else{
            alert('อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น')
          }
        });
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
  background-color: #04aa6d;
  color: white;
}
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
