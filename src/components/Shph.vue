<template>
  <div class="row">
  <div class="container">
    <div class="col mb-3 mt-3" style="text-align: right">
      <a>
        <button type="button" id="get_file" class="btn btn-success" @click="getid(0)" data-bs-toggle="modal"
          data-bs-target="#AddUser">
          <i class="fa fa-plus"></i> เพิ่ม
        </button></a>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">รพ.สต.</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.name }} 
          </td>
          <td><qr-code :text="link+'?id='+l.id" :size=100> </qr-code></td>
          <td>
            <a @click="getid(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
                <i class="fa fa-edit"></i></button></a>&nbsp;
                <a @click="getid(l.id)">
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Deleteshph">
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
                  <label for="username">รพ.สต.</label>
                  <input v-model="user.name" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกรพ.สต." />
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
    <div class="modal fade" id="Deleteshph" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนการการลบ</h5>

          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-danger" @click="deleteshphid()">
              ลบ
            </button>
            <button id="closedshph" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DistrictService from "../services/DistrictService";
import ProvinceService from "../services/ProvinceService";
import AmphuresService from "../services/AmphuresService";
import shphService from "../services/shphService";
import LinkImageService from "../services/LinkImageService";
import shphmasseusetimeService from "../services/shphmasseusetimeService";

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
      link:''
    };
  },
  mounted() {
    this.getUsers();
    this.link = LinkImageService.getLinkFrontend()+'/evaluation';
  },
  methods: {
    deleteshphid(){
shphService.deleteShph(this.user_id).then(()=>{
  document.getElementById("closedshph").click();
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
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขรพ.สต.";
        // console.log(this.user_id);
        shphService.getShph(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;
          
          this.getamphurs()
          this.getdistricts()
          this.getzipcode()
        });
      } else {
        this.title = "เพิ่มรพ.สต.";
        this.user = [];
      }
      if (this.currentUser.role_id != 5) {
            this.user.shphId = this.currentUser.shphId
          }
    },
    save() {
      if (this.user.name == "" || this.user.name == null) {
        alert("กรุณากรอกรพ.สต.");
      }else{
this.saveUser()
      }
    },
    saveUser(){
      var userdata = {
          name: this.user.name,
          status: 1,
          createdBy:this.currentUser.id
        };
        if (this.user_id == 0) {

              shphService.createShph(userdata).then((res) => {
                var time = {
                  shphId:res.data.id,
                  start:'08:00',
                  finish:'15:00'
                }
                shphmasseusetimeService.createshph_masseuse_time(time).then(() => {
                document.getElementById("closeduser").click();
                this.getUsers();

                //       setTimeout(function () {
                //   location.reload();
                // }, 500);
                // window.scrollTo(0, 0);
                });
              });
            
        } else {
          // console.log(this.user_id);
          shphService.updateShph(this.user_id, userdata).then(() => {
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
  shphService.getShphs(1).then((res) => {
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
