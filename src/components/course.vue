<template>
  <div class="container">
    <!-- <div class="col mb-3 mt-3" style="text-align: right">
     
    </div> -->
    <table class="table table-bordered mt-3">
      <thead>
        <tr class="table-active">
          <th scope="col" colspan="6" style="text-align: center;">รอบการบริการของหมอ{{nametype.dentist}}</th>
        </tr>
      </thead>
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">เวลาเริ่มต้น</th>
          <th scope="col">เวลาสิ้นสุด</th>
          <th scope="col">
            <a>
        <button
          type="button"
          id="get_file"
          class="btn btn-success"
          @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddUser"
        >
          <i class="fa fa-plus"></i> 
        </button></a
      >
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.time_start }} 
          </td>
          <td>
            {{ l.time_end }}
          </td>
         
          <!-- <td>{{ l.firstname }} {{ l.lastname }}</td> -->
          <td>
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#AddUser"
              >
                <i class="fa fa-edit"></i></button
            ></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="AddUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            
          </div>
          <div class="modal-body">
            <form>
              <div class="card-body mt-3">
                <div class="form-group">
<label>เวลาเริ่มต้น:</label>
<div class="input-group">
<div class="input-group-prepend">
<span class="input-group-text"><i class="far fa-clock"></i></span>
</div>
<input v-model="user.time_start" type="time" class="form-control form-control-sm float-right" id="reservationtime">
</div>

</div>
<div class="form-group">
<label>เวลาสิ้นสุด:</label>
<div class="input-group">
<div class="input-group-prepend">
<span class="input-group-text"><i class="far fa-clock"></i></span>
</div>
<input v-model="user.time_end" type="time" class="form-control form-control-sm float-right" id="reservationtime">
</div>

</div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
            <button
            id="closeduser"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
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
import CourseService from "../services/CourseService";

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
      roles:[],
      nametype:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.getUsers();
    this.getroles()
  },
  methods: {
    getroles(){
      UserService.getRoles().then((res)=>{
        this.roles = res.data
      })
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขรอบการบริการของหมอ"+this.nametype.dentist;
        // console.log(this.user_id);
        CourseService.getcourse(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
        });
      } else {
        this.title = "เพิ่มรอบการบริการของหมอ"+this.nametype.dentist;
        this.user = [];
      }
    },
    save() {
      if (this.user.time_start == "" || this.user.time_start == null) {
        alert("กรุณาเลือกเวลาเริ่มต้น");
      } else if (this.user.time_end == "" || this.user.time_end == null) {
        alert("กรุณาเลือกเวลาสิ้นสุด");
      } else {
        var userdata = {
          typeId:1,
          time_start: this.user.time_start,
          time_end: this.user.time_end,
          status: 1,
          created_by: this.currentUser.id,
        };
        // console.log(userdata);
        if (this.user_id == 0) {
          CourseService.createcourse(userdata).then(() => {
            document.getElementById("closeduser").click();
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
          // console.log(this.user_id);
          CourseService.updatecourse(this.user_id, userdata).then(() => {
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
    },
    getUsers() {
      CourseService.getcourses('').then((res) => {
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
