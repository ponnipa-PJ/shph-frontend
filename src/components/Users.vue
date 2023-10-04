<template>
  <div class="container">
    <div class="col mb-3 mt-3" style="text-align: right">
      <a>
        <button type="button" id="get_file" class="btn btn-success" @click="getid(0)" data-bs-toggle="modal"
          data-bs-target="#AddUser">
          <i class="fa fa-plus"></i> เพิ่มผู้ใช้งาน
        </button></a>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อ-นามสกุล</th>
          <th scope="col">อีเมล</th>
          <th scope="col">เบอร์โทรศัพท์</th>
          <th scope="col">รพ.สต.</th>
          <th scope="col">สิทธิ์การใช้งาน</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.firstname }} {{ l.lastname }}
          </td>
          <td>
            {{ l.email }}
          </td>
          <td>
            {{ l.phone }}
          </td>
          <td>
            {{ l.shphname }}
          </td>
          
          <td>
            {{ l.role_name }}
          </td>
          <!-- <td>{{ l.firstname }} {{ l.lastname }}</td> -->
          <td>
            <a @click="getid(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
                <i class="fa fa-edit"></i></button></a>&nbsp;
                <a @click="getid(l.id)">
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteUser">
                <i class="fa fa-trash"></i></button></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="AddUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>

          </div>
          <div class="modal-body">
            <form>
              <div class="card-body mt-3">

                <div class="form-group mt-3">
                  <label for="username">อีเมล</label>
                  <input v-model="user.email" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกอีเมล" />
                </div>
                <div class="form-group mt-3">
                  <label for="password">รหัสผ่าน</label>
                  <input v-model="user.password" type="password" class="form-control form-control-sm" id="password"
                    placeholder="กรุณากรอกรหัสผ่าน" />
                </div>
                <div class="form-group mt-3">
                  <label for="password">สิทธิ์การใช้งาน</label>
                  <select class="form-control form-control-sm" v-model="user.role_id">
                    <option v-for="(i, r) in roles" :key="r" :value="i.id">{{ i.name }}</option>
                  </select>
                </div>
                <div class="form-group mt-3">
                  <label for="password">รพ.สต.</label>
                  <select class="form-control form-control-sm" v-model="user.shphId" v-if="currentUser.role_id != 5" disabled>
                    <option v-for="(i, r) in shphlist" :key="r" :value="i.id">{{ i.name }}</option>
                  </select>
                  <select class="form-control form-control-sm" v-model="user.shphId" v-else >
                    <option v-for="(i, r) in shphlist" :key="r" :value="i.id">{{ i.name }}</option>
                  </select>
                </div>
                <div class="form-group mt-3">
                  <label for="username">ชื่อ</label>
                  <input v-model="user.firstname" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกชื่อ" />
                </div>
                <div class="form-group mt-3">
                  <label for="username">นามสกุล</label>
                  <input v-model="user.lastname" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกนามสกุล" />
                </div>
                <div class="form-group mt-3">
                  <label for="username">เบอร์โทรศัพท์</label>
                  <input v-model="user.phone" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์" />
                </div>
               
                
                <div class="form-group mt-3">
                  <label for="username">Line Token</label>
                  <input v-model="user.line_token" type="text" min="1" class="form-control form-control-sm"
                    id="username" />
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
                      <input v-model="zipcode" v-on:keyup.enter="signIn()" type="text"
                        class="form-control form-control-sm" id="phone" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
            <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="DeleteUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนการการลบ</h5>

          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-danger" @click="deleteuserid()">
              ลบ
            </button>
            <button id="closeduserdelete" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import DistrictService from "../services/DistrictService";
import ProvinceService from "../services/ProvinceService";
import AmphuresService from "../services/AmphuresService";
import shphService from "../services/shphService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id: 0,
      list: [],
      user: {},
      user_id: 0,
      hash: 0,
      title: "",
      roles: [],
      provinces: [],
      amphurs: [],
      districts: [],
      zipcode: '',
      shphlist:[]
    };
  },
  mounted() {
    this.getprovinces()
    this.getUsers();
    this.getroles()
    this.getshph()
  },
  methods: {
    deleteuserid(){
UserService.deleteUser(this.user_id).then(()=>{
  document.getElementById("closeduserdelete").click();
            this.getUsers();
      })
    },
    getshph(){
      shphService.getShphs(1).then((res)=>{
        this.shphlist = res.data
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
    getroles() {
      UserService.getRoles().then((res) => {
        this.roles = res.data
      })
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขข้อมูลผู้ใช้งาน";
        // console.log(this.user_id);
        UserService.getUser(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;
          
          this.getamphurs()
          this.getdistricts()
          this.getzipcode()
        });
      } else {
        this.title = "เพิ่มข้อมูลผู้ใช้งาน";
        this.user = [];
      }
      if (this.currentUser.role_id != 5) {
            this.user.shphId = this.currentUser.shphId
          }
    },
    save() {
      if (this.user.role_id == 1 || this.user.role_id == 4) {
        if (this.user.email == "" || this.user.email == null) {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      }else{
this.saveUser()
      }
      }else if (this.user.role_id == ""|| this.user.role_id == null) {
        alert("กรุณาเลือกสิทธิ์");
      } else{
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
      } else if (this.currentUser.role_id == 5 && (this.user.shphId == null || this.user.shphId == '')) {
        alert("กรุณาเลือกรพ.สต.");}else{
        this.saveUser()
      }
      }
    },
    saveUser(){
      var userdata = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          role_id: this.user.role_id,
          password: this.user.password,
          line_token: this.user.line_token,
          hash: this.hash,
          active: 0,
          phone: this.user.phone,
          number: this.user.number,
          moo: this.user.moo,
          soi: this.user.soi,
          provinceId: this.user.provinceId,
          amphureId: this.user.amphureId,
          districtsId: this.user.districtsId,
          shphId:this.user.shphId,
        };
        if (this.user_id == 0) {

          UserService.getUsers(this.user.email).then((res) => {
            // console.log(res.data);
            if (res.data.length == 0) {
              UserService.createUser(userdata).then(() => {
                document.getElementById("closeduser").click();
                this.getUsers();
                //       setTimeout(function () {
                //   location.reload();
                // }, 500);
                // window.scrollTo(0, 0);
              });
            } else {
              alert('อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น')
            }
          });
        } else {
          // console.log(this.user_id);
          UserService.updateUser(this.user_id, userdata).then(() => {
            // console.log(res.data);
            document.getElementById("closeduser").click();
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        }
    }
,    getUsers() {
  console.log(this.currentUser.role_id);
  var shphId = ''
  if (this.currentUser.role_id !=5) {
    shphId = this.currentUser.shphId
  }
  console.log(shphId);
      UserService.getUsers('',shphId).then((res) => {
        this.list = res.data;
      });
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
