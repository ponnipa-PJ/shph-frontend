<template>
  <div class="container">
    <div style="text-align: right">
      <a>
        <button type="button" id="get_file" class="btn btn-success mt-3 mb-3" @click="getid(0)" data-bs-toggle="modal"
          data-bs-target="#AddUser">
          <i class="fa fa-plus"></i> เพิ่ม
        </button></a>
    </div>
    <h6>ฟอร์มซักประวัติของลูกค้าหมอ{{nametype.dentist}}</h6>

    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อหัวข้อ</th>
          <th scope="col">สถานะ</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody is="draggable" :list="list" tag="tbody">
        <tr  style="cursor: move" v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.name }} 
          </td>
          <td>
            <div class="form-group">
<div class="custom-control custom-switch">
<input type="checkbox" class="custom-control-input" :id="l.id" v-model="l.status" @change="savestatus(l.id,l.status)">
<label class="custom-control-label" :for="l.id"></label>
</div>
</div>
          </td>
          <td>
            <a @click="getid(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
                <i class="fa fa-edit"></i></button></a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
        <div class="col-4"></div>
        <div class="col-2" style="text-align: center">
          <button
            class="btn btn btn-success"
            style="color: white; text-align: center"
            @click="saveorderlist()"
          >
            บันทึก
          </button>
        </div>
        <div class="col-2"></div>
        <div class="col-4"></div>
      </div>
      <HistoryDoctorDentist/>
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
                  <label for="username">ชื่อหัวข้อ</label>
                  <input v-model="user.name" type="text" min="1" class="form-control form-control-sm" id="username"
                    placeholder="กรุณากรอกชื่อหัวข้อ" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
            <button id="closedusermasseuse" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
            <button id="closedusermasseusemasseuse" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
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
import MapHistoryDentistService from "../services/MapHistoryDentistService";
import draggable from "vuedraggable";
import HistoryDoctorDentist from "../components/HistoryDoctorDentist.vue";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components: {
    draggable,
    HistoryDoctorDentist
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
      nametype:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.getshph();
  },
  methods: {
    saveorderlist() {
      for (let l = 0; l < this.list.length; l++) {
        // console.log(l+1);
        var list = {
          no: l + 1,
        };
        MapHistoryDentistService.updateno(this.list[l].id, list).then(() => {
          if (l + 1 == this.list.length) {
            alert("บันทึกสำเร็จ");
            setTimeout(function () {
              location.reload();
            }, 500);
          }
        });
      }
    },
    savestatus(id,status){
var data={
  status:status
}
MapHistoryDentistService.updatestatus(id,data).then(()=>{
  
})
    },
    deleteshphid(){
shphService.deleteShph(this.user_id).then(()=>{
  document.getElementById("closedusermasseusemasseuse").click();
            this.getUsers();
      })
    },
    getshph(){
      MapHistoryDentistService.getmap_history_user_dentists('').then((res)=>{
        this.list = res.data
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
        this.title = "แก้ไขชื่อหัวข้อ";
        // console.log(this.user_id);
        MapHistoryDentistService.getmap_history_user_dentist(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
        });
      } else {
        this.title = "เพิ่มชื่อหัวข้อ";
        this.user = [];
      }
    },
    save() {
      if (this.user.name == "" || this.user.name == null) {
        alert("กรุณากรอกชื่อหัวข้อ");
      }else{
this.saveUser()
      }
    },
    saveUser(){
      var no = ''
      MapHistoryDentistService.getmap_history_user_dentists('').then((res)=>{
        console.log(res.data.length);
        if (this.user.historyuserdentistId == null) {
           no = parseInt(res.data.length) + 1
          this.user.historyuserdentistId = 'ID'+no
        }
        console.log(this.user.historyuserdentistId );
      var userdata = {
        name: this.user.name,
          status: 1,
          historyuserdentistId:this.user.historyuserdentistId,
          no:no
        };
        console.log(userdata);
        if (this.user_id == 0) {
          console.log(no);
MapHistoryDentistService.createhistory_user_dentist(no).then(()=>{
          MapHistoryDentistService.createmap_history_user_dentist(userdata).then(() => {
                document.getElementById("closedusermasseuse").click();
                this.getshph();
                //       setTimeout(function () {
                //   location.reload();
                // }, 500);
                // window.scrollTo(0, 0);
              });
});
        } else {
          // console.log(this.user_id);
          MapHistoryDentistService.updatemap_history_user_dentist(this.user_id, userdata).then(() => {
            // console.log(res.data);
            document.getElementById("closedusermasseuse").click();
            this.getshph();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        }
      })
    }
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
