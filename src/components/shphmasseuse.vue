<template>
    <div class="row">
      
      <div class="col-md-12" style="padding:0px">

<div class="card card-widget widget-user-2">

<div class="widget-user-header bg-warning">
<div class="widget-user-image">
  <img src="../assets/icon.png" alt="">
</div>

<h5 class="widget-user-desc">จองคิว{{nametype.masseuse}}ประจำเดือน</h5>
<h5 class="widget-user-desc">โรงพยาบาลส่งเสริมสุขภาพ</h5>
<!-- <h5 class="widget-user-desc">Lead Developer</h5> -->

</div>
<div class="card-footer p-0" v-if="shphlist">
<ul class="nav flex-column">
<li class="nav-item" v-for="s in shphlist" :key="s.id">
<a :href="'/book?id='+s.id" target="_blank" class="nav-link">
{{s.name}} 
</a>
</li>
</ul>
</div>
<div class="col-md-12 mt-5" v-else>
  <h4 style="text-align:center">ไม่พบคิวบริการ{{nametype.masseuse}}</h4>
        </div>
</div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";
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
      roles:[],
      shphlist:[],
      nametype:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));
    this.getUsers();
    this.getroles()
    this.getshph()
    // console.log(this.$route.query.code)

  },
  methods: {
    getshph(){
shphService.getdoctorandshphmasseuse().then((res)=>{
  this.shphlist = res.data
  console.log(this.shphlist);
  // if (this.shphlist.length == 1) {
  //     this.$router.push('/book?id='+this.shphlist[0].id)
  //   }
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
        this.title = "แก้ไขข้อมูลผู้ใช้งาน";
        // console.log(this.user_id);
        UserService.getUser(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;
        });
      } else {
        this.title = "เพิ่มข้อมูลผู้ใช้งาน";
        this.user = [];
      }
    },
    save() {
      if (this.user.email == "") {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.role_id == "") {
        alert("กรุณาเลือกสิทธิ์");
      }else if (this.user.password == "") {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        var userdata = {
          email: this.user.email,
          role_id: this.user.role_id,
          password: this.user.password,
          hash: this.hash,
        };
        if (this.user_id == 0) {
          UserService.createUser(userdata).then(() => {
            document.getElementById("closeduser").click();
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
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
    },
    getUsers() {
      UserService.getUsers('','','','').then((res) => {
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
