<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="card mt-5">
          <div class="card-body login-card-body mt-3" v-if="status">
            <h3 class="login-box-msg" style="text-align: center">
              สมัครสมาชิก
            </h3>
            <form ref="form" @submit.prevent="sendEmail">
              <div class="card-body mt-3">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">ชื่อ<span style="color: red">*</span> </label>
                  <input v-model="user.firstname" name="to_name" v-on:keyup.enter="signIn()" type="text" min="1"
                    class="form-control form-control-sm" id="username" />
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">นามสกุล<span style="color: red">*</span> </label>
                  <input v-model="user.lastname" v-on:keyup.enter="signIn()" type="text" min="1"
                    class="form-control form-control-sm" id="username" />
                </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">อีเมล<span style="color: red">*</span> ใช้ Gmail เท่านั้น</label>
                  <input name="to_email" v-model="user.email" v-on:keyup.enter="signIn()" type="email" min="1"
                    class="form-control form-control-sm" id="username" />
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group" style="margin-bottom:0px">
                  <label for="password">รหัสผ่าน<span style="color: red">*</span> </label>
                </div>
                <div class="input-group mb-3" v-if="eye">
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" />
                  <div class="input-group-append">
                    <button type="button" class="btn btn-secondary btn-sm" @click="showPassword(true)"> <i
                        class="bi bi-eye-fill"></i></button>
                  </div>
                </div>
                <div class="input-group mb-3" v-else>
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="text"
                    class="form-control form-control-sm" id="password" />
                  <div class="input-group-append">
                    <button type="button" class="btn btn-secondary btn-sm" @click="showPassword(false)"> <i
                        class="bi bi-eye-slash"></i></button>
                  </div>
                </div>
                  </div>
                </div>
                <div class="form-group mb-3" style="display:none;">
                  <label for="username">form_name</label>
                  <input v-model="user.from_name" v-on:keyup.enter="signIn()" type="text" min="1"
                    class="form-control form-control-sm" name="from_name" />
                </div>
                <div class="form-group mb-3" style="display:none;">
                  <label for="username">Message</label>
                  <input v-model="user.message" v-on:keyup.enter="signIn()" type="text" min="1"
                    class="form-control form-control-sm" name="message" />
                </div>
               <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                  <label for="password">เบอร์โทรศัพท์<span style="color: red">*</span> </label>
                  <input v-model="user.phone" v-on:keyup.enter="signIn()" type="text" class="form-control form-control-sm"
                    id="phone" />
                </div>
                </div>
                <!-- <div class="col-md-6">
                  <div class="form-group">
                  <label for="password">ประเภทผู้ใช้งาน<span style="color: red">*</span> </label>
                  <select class="form-control form-control-sm" v-model="user.role_id">
  <option v-for="(i,r) in roles" :key="r" :value="i.id">{{i.name}}</option>
</select>
                </div>
                </div> -->
               </div>
                
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="password">บ้านเลขที่<span style="color: red">*</span> </label>
                      <input v-model="user.number" v-on:keyup.enter="signIn()" type="text"
                        class="form-control form-control-sm" id="phone" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="password">หมู่ </label>
                      <input v-model="user.moo" v-on:keyup.enter="signIn()" type="text"
                        class="form-control form-control-sm" id="phone" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="password">ซอย </label>
                      <input v-model="user.soi" v-on:keyup.enter="signIn()" type="text"
                        class="form-control form-control-sm" id="phone" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <label for="password">จังหวัด<span style="color: red">*</span> </label>
                    <div class="form-group">
                      <select class="form-control form-control-sm" @change="onChangeProvince" v-model="user.provinceId">
                        <option v-for="(l, i) in provinces" :key="i" :value="l.id"> {{ l.name_th }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="password">อำเภอ<span style="color: red">*</span> </label>
                    <div class="form-group">
                      <select class="form-control form-control-sm" @change="onChangeAmphur" v-model="user.amphureId">
                        <option v-for="(a, i) in amphurs" :key="i" :value="a.id"> {{ a.name_th }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label for="inputPassword">ตำบล <span style="color:red">*</span></label>
                    <div class="form-group">
                      <select class="form-control form-control-sm" @change="onChangeDistrict" v-model="user.districtsId">
                        <option v-for="(d, i) in districts" :key="i" :value="d.id"> {{ d.name_th }}</option>
                      </select>
                    </div>

                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                  <label for="password">รหัสไปรษณีย์</label>
                  <input v-model="zipcode" v-on:keyup.enter="signIn()" type="text" class="form-control form-control-sm"
                    id="phone" />
                </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-3"></div>
                  <div class="col-md-6 text-center">
                    <button @click="signIn()" type="button" class="btn btn-success btn-md">
                      สมัครสมาชิก
                    </button>
                  </div>
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
      <div class="col-md-1"></div>
    </div>
    <!-- <a target="_blank" :href="urlAuth">เชื่อมต่อ LINE</a> -->
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
import emailjs from 'emailjs-com';
import LinkImageService from "../services/LinkImageService";
import DistrictService from "../services/DistrictService";
import ProvinceService from "../services/ProvinceService";
import AmphuresService from "../services/AmphuresService";


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
      status: true,
      line: '',
      eye: true,
      provinces: [],
      amphurs: [],
      districts: [],
      zipcode:'',
      roles:[],
      // line: "<h1 style='color:red'>Hello Gowtham</h1>"
    };
  },
  async mounted() {
    this.getprovinces()
    this.getroles()
    this.user.from_name = 'ระบบจองคิวของรพ.สต.'
    this.user.message = this.generateGuid()
  },
  methods: {
    getroles(){
      UserService.getRoles().then((res)=>{
        this.roles = res.data
      })
    },
    onChangeProvince() {
      // console.log(evt.target.value);
      this.getamphurs()
    },
    onChangeAmphur() {
      // console.log(evt.target.value);
      this.getdistricts()
    },
    onChangeDistrict() {
      // console.log(evt.target.value);
      this.getzipcode()
    },
    getprovinces() {
      ProvinceService.getprovinces().then((res) => {
        this.provinces = res.data
        // console.log(res.data);
      })
    },
    getamphurs() {
      AmphuresService.getamphures(this.user.provinceId).then((res) => {
        this.amphurs = res.data
        this.districts = {}
        this.zipcode = ''
        // console.log(res.data);
      })
    },
    getdistricts() {
      DistrictService.getdistricts(this.user.amphureId).then((res) => {
        this.districts = res.data
        // console.log(res.data);
      })
    },
    getzipcode() {
      DistrictService.getdistrict(this.user.districtsId).then((res) => {
        this.zipcode = res.data.zip_code
        // console.log(res.data);
      })
    },
    showPassword(status) {
      // console.log(status);
      if (status == true) {
        this.eye = false
      } else {
        this.eye = true
      }

    },
    generateGuid() {
      var result, i, j;
      result = '';
      for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20)
          result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
      }
      return result;
    },
    sendEmail() {
      emailjs.sendForm('service_k0p8m0h', 'template_txzigtj', this.$refs.form,
        'AmJ8sSugegSIUpFkw').then((result) => {
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
      } else if (this.user.number == "" || this.user.number == null) {
        alert("กรุณากรอกบ้านเลขที่");
      } else if (this.user.provinceId == "" || this.user.provinceId == null) {
        alert("กรุณาเลือกจังหวัด");
      } else if (this.user.amphureId == "" || this.user.amphureId == null) {
        alert("กรุณาเลือกอำเภอ");
      } else if (this.user.districtsId == "" || this.user.amphureId == null) {
        alert("กรุณาเลือกตำบล");
      }  else {
        UserService.getUsers(this.user.email).then((res) => {
          // console.log(res.data);
          if (res.data.length == 0) {
            var user = {
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              email: this.user.email,
              password: this.user.password,
              role_id: 2,
              active: 1,
              token: this.user.message,
              phone: this.user.phone,
              number: this.user.number,
              moo: this.user.moo,
              soi: this.user.soi,
              provinceId: this.user.provinceId,
              amphureId: this.user.amphureId,
              districtsId: this.user.districtsId,
            };
            // console.log(user);
            UserService.createUser(user).then(() => {
              // console.log(res.data);
              // console.log(this.user);
              this.sendEmail()
            })
          } else {
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
    urlAuth() {
      var clientId = 'qdyGSt6zjPxHwIrnFqaEzZ'
      var engine = LinkImageService.getLinkFrontend() + '/line'
      var username = '1'
      return `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${engine}&scope=notify&state=${username}`
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
  margin: 0 auto;
  /* Added */
  float: none;
  /* Added */
  margin-bottom: 10px;
  /* Added */
}

body {
  background-color: gray;
}
</style>
