<template>
  <div class="container">
    <div style="text-align: right">
      <a>
        <button type="button" id="get_file" class="btn btn-success mb-3 mt-3" @click="getiddoc(0)" data-bs-toggle="modal"
          data-bs-target="#AddDoctorHis">
          <i class="fa fa-plus"></i> เพิ่ม
        </button></a>
    </div>
    <h6>ฟอร์มซักประวัติของหมอฟัน</h6>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อหัวข้อ</th>
          <th scope="col">สถานะ</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody is="draggable" :list="listdoctor" tag="tbody">
        <tr  style="cursor: move" v-for="(l, i) in listdoctor" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.name }} 
          </td>
          <td>
            <div class="form-group">
<div class="custom-control custom-switch">
<input type="checkbox" class="custom-control-input" :id="l.id+l.name" v-model="l.status" @change="savestatusdoctor(l.id,l.status)">
<label class="custom-control-label" :for="l.id+l.name"></label>
</div>
</div>
          </td>
          <td>
            <a @click="getiddoc(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddDoctorHis">
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

    <!-- Modal -->
    <div class="modal fade" id="AddDoctorHis" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <button id="closeddoctorhis" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shphService from "../services/shphService";
import MapHistoryDoctorDentistService from "../services/MapHistoryDoctorDentistService";
import draggable from "vuedraggable";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components: {
    draggable,
  },
  data() {
    return {
      concert_id: 0,
      listdoctor: [],
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
    this.getshph();
  },
  methods: {
    saveorderlist() {
      for (let l = 0; l < this.list.length; l++) {
        // console.log(l+1);
        var list = {
          no: l + 1,
        };
        MapHistoryDoctorDentistService.updateno(this.list[l].id, list).then(() => {
          if (l + 1 == this.list.length) {
            alert("บันทึกสำเร็จ");
            setTimeout(function () {
              location.reload();
            }, 500);
          }
        });
      }
    },
    savestatusdoctor(id,status){
var data={
  status:status
}
MapHistoryDoctorDentistService.updatestatus(id,data).then(()=>{
  // console.log(res.data);
})
    },
    deleteshphid(){
shphService.deleteShph(this.user_id).then(()=>{
  document.getElementById("closeddoctorhis").click();
            this.getUsers();
      })
    },
    getshph(){
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists('').then((res)=>{
        this.listdoctor = res.data
      })
    },
    getiddoc(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขชื่อหัวข้อ";
        // console.log(this.user_id);
        MapHistoryDoctorDentistService.getmap_history_doctor_dentist(this.user_id).then((res) => {
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
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists('').then((res)=>{
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
MapHistoryDoctorDentistService.createhistory_doctor_dentist(no).then(()=>{
  MapHistoryDoctorDentistService.createmap_history_doctor_dentist(userdata).then(() => {
                document.getElementById("closeduser").click();
                this.getshph();
                //       setTimeout(function () {
                //   location.reload();
                // }, 500);
                // window.scrollTo(0, 0);
              });
});
        } else {
          // console.log(this.user_id);
          MapHistoryDoctorDentistService.updatemap_history_doctor_dentist(this.user_id, userdata).then(() => {
            // console.log(res.data);
            document.getElementById("closeduser").click();
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
