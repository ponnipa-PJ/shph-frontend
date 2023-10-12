<template>
  <div class="container">
    <div class="col mb-3 mt-3" style="text-align: right">
      <a>
        <button
          type="button"
          id="get_file"
          class="btn btn-success"
          @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddUser"
        >
          <i class="fa fa-plus"></i> เพิ่มข้อมูลหมอ{{nametype.masseuse}}
        </button></a
      >
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col" colspan="6" style="text-align: center;">รายชื่อหมอ{{nametype.masseuse}}</th>
        </tr>
      </thead>
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อ-นามสกุล</th>
          <th scope="col">รอบการบริการ</th>
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
            {{ l.dentistCourseId }}
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
              <div class="card-body">
                <div class="form-group">
                  <label for="username">ชื่อ</label>
                  <input
                    v-model="user.firstname"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                    placeholder="กรุณากรอกชื่อ"
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="username">นามสกุล</label>
                  <input
                    v-model="user.lastname"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                    placeholder="กรุณากรอกนามสกุล"
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="password">วันที่ให้บริการ</label>
                  <div class="form-group">
<div class="custom-control custom-checkbox"  v-for="(i,r) in day" :key="r" :value="i.id">
<input class="custom-control-input" type="checkbox" :id="i.nameen" :value="i.id" v-model="days">
<label :for="i.id" class="custom-control-label">{{i.nameth}}</label>
</div>
</div>
                </div>
                <div class="form-group mt-3">
                  <label for="password">รอบการบริการ</label>
                  <div class="form-group">
<div class="custom-control custom-checkbox"  v-for="(i,r) in courses" :key="r" :value="i.id">
<input class="custom-control-input" type="checkbox" :id="i.id" :value="i.id" v-model="course_id">
<label :for="i.id" class="custom-control-label">{{gettime(i.time_start,i.time_end)}}</label>
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
import DoctorService from "../services/DoctorService";

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
      courses:[],
      course_id:[],
      days:[],
      day:[{
        id:1,
        nameth:'วันจันทร์',
        nameen:'MON'
      },
      {
        id:2,
        nameth:'วันอังคาร',
        nameen:'TUE'
      },
      {
        id:3,
        nameth:'วันพุธ',
        nameen:'WED'
      },
      {
        id:4,
        nameth:'วันพฤหัสบดี',
        nameen:'THUR'
      },
      {
        id:5,
        nameth:'วันศุกร์',
        nameen:'FRI'
      }],
      nametype:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.getUsers();
    this.getcourses()
  },
  methods: {
    gettime(start,end){
var s = start.split(":")
var e = end.split(":")
var value = s[0]+'.'+s[1]+'-'+e[0]+'.'+e[1]+" น."
return value

    },
    getcourses(){
      CourseService.getcourses().then((res)=>{
        this.courses = res.data
        // console.log(res.data);
      })
    },
    getroles(){
      UserService.getRoles().then((res)=>{
        this.roles = res.data
      })
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขข้อมูลหมอนวด";
        // console.log(this.user_id);
        DoctorService.getdoctor(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.course_id = JSON.parse(this.user.dentistCourseId);
          this.days = JSON.parse(this.user.days);
          // console.log( this.course_id);
        });
      } else {
        this.course_id = []
        this.days =[]
        this.title = "เพิ่มข้อมูล"+this.nametype.masseuse;
        this.user = [];
      }
    },
    save() {
      if (this.user.firstname == "") {
        alert("กรุณากรอกชื่อ");
      } else if (this.user.lastname == "") {
        alert("กรุณากรอกนามสกุล");
      } else if(this.course_id.length < 0) {
        alert("กรุณาเลือกรอบการบริการ");
      }
      else {
        var userdata = {
          typeId:1,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          dentistCourseId:this.course_id,
          days:this.days,
          createdBy: this.currentUser.id,
          status:1
        };
        if (this.user_id == 0) {
          DoctorService.createdoctor(userdata).then(() => {
            document.getElementById("closeduser").click();
            this.course_id = []
            this.days = []
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
          // console.log(this.user_id);
          DoctorService.updatedoctor(this.user_id, userdata).then(() => {
            // console.log(res.data);
            document.getElementById("closeduser").click();
            this.course_id = []
            this.days = []
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
      DoctorService.getdoctors('').then((res) => {
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
