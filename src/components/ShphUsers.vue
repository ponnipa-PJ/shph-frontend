<template>
  <div class="container">
    <div v-if="printstatus">
      <div class="row">
        <div class="col-md-12">
    <div ref="printMe" id="my-node" style="width:200px;height:120px;" :name="user.UID">
      <br>
      <div style="text-align:left">&nbsp;{{user.UID}}</div><br>
      <div style="text-align:center">{{user.firstname}} {{user.lastname}}</div>
    </div>
  </div>
</div>
  </div>
    <div style="text-align: right">
      <a>
        <button type="button" id="get_file" class="btn btn-success mt-3 mb-3" @click="getid(0)" data-bs-toggle="modal"
          data-bs-target="#AddUser">
          <i class="fa fa-plus"></i> เพิ่มหมอ
        </button></a>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">Username</th>
          <th scope="col">หมอ</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.username }}
          </td>
          <td> 
            <span v-if="l.type == 1">หมอ{{nametype.masseuse}}</span>
            <span v-if="l.type == 4">หมอ{{nametype.dentist}}</span>
          </td>
          <!-- <td>{{ l.firstname }} {{ l.lastname }}</td> -->
          <td>
            <a @click="getid(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
                <i class="fa fa-edit"></i></button></a>&nbsp;
                <a @click="getid(l.id)">
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteUser">
                <i class="fa fa-trash"></i></button></a>&nbsp;
                <button v-if="l.role_id == 2" type="button" id="get_file" class="btn btn-info mt-3 mb-3" @click="print(l.id)" 
          >
          <i class="fa fa-print"></i> 
        </button>
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
                <div>
                    <label for="inputPassword">ประเภทหมอ <span style="color:red">*</span></label>
                    <div class="form-group">
                      <select class="form-control form-control-sm" v-model="user.type">
                        <option v-for="(d, i) in types" :key="i" :value="d.id"> {{ d.name}}</option>
                      </select>
                    </div>

                  </div>
                <div class="form-group mt-3">
                  <label for="username">Username</label>
                  <input v-model="user.username" type="text" min="1" class="form-control form-control-sm" id="username" disabled
                    />
                </div>
                <div class="form-group mt-3">
                  <label for="password">รหัสผ่าน</label>
                  <input v-model="user.password" type="password" class="form-control form-control-sm" id="password"
                    placeholder="กรุณากรอกรหัสผ่าน" />
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
import AdminshphService from "../services/AdminshphService";
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
      shphlist:[],
      printstatus:false,
      image:'',
      nametype:{},
      types:[]
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));
    this.types.push({
      id:1,
      name: this.nametype.masseuse
    },
    {
      id:4,
      name:this.nametype.dentist
    })
    this.getUsers();
    this.user.username = 'ID0001'
  },
  methods: {
    deleteuserid(){
AdminshphService.deleteadminshph(this.user_id,0).then(()=>{
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
        AdminshphService.getadminshph(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;
          
          this.getamphurs()
          this.getdistricts()
          this.getzipcode()
        });
      } else {
        var uid = ''
      AdminshphService.getadminshphs(1,'').then((res)=>{
        console.log(res.data);

        uid += 'ID'
var num = res.data.length
var coun = String(num).length
// console.log(coun);
console.log(num);
// 1 000000
// 10 00000
// 100 0000
var zero = 4-coun
console.log(zero);
  for (let z = 0; z < zero; z++) {
    uid += '0'
    // console.log(uid);
    if (z+1 == zero) {
uid += num+1
      
    }
}
console.log(uid);
this.user={}
this.user.username = uid
      });
        this.title = "เพิ่มข้อมูลผู้ใช้งาน";

      }
      
    },
    save() 
    { if (this.user.username == "" || this.user.username == null) {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else{
        this.saveUser()
      }
      
    },
    saveUser(){
      var uid = ''
      AdminshphService.getadminshphs(1,'').then((res)=>{
        uid += 'UID'
var num = res.data.length
var coun = String(num).length
// console.log(coun);
// console.log(num);
// 1 000000
// 10 00000
// 100 0000
var zero = 4-coun
console.log(zero);
  for (let z = 0; z < zero; z++) {
    uid += '0'
    // console.log(uid);
    if (z+1 == zero) {
uid += num+1
      
    }
}
// console.log(uid);
        
      
      var userdata = {
        username:this.user.username,
        shphId:this.currentUser.shphId,
          password:this.user.password,
          adminId:this.currentUser.id,
          UID:uid,
          hash:this.hash,
          type:this.user.type
        };
        if (this.user_id == 0) {
              AdminshphService.createadminshph(userdata).then(() => {
                document.getElementById("closeduser").click();
                this.getUsers();
                //       setTimeout(function () {
                //   location.reload();
                // }, 500);
                // window.scrollTo(0, 0);
          });
        } else {
          // console.log(this.user_id);
          AdminshphService.updateadminshph(this.user_id, userdata).then(() => {
            // console.log(res.data);
            document.getElementById("closeduser").click();
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        }

      })
    }
,    getUsers() {
  AdminshphService.getadminshphs('',this.currentUser.id).then((res) => {
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
