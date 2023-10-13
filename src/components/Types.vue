<template>
  <div class="row">
  <div class="container">
    <div class="row mt-3">
    <div class="col-sm-6">

<div class="form-group">
<input type="text" class="form-control form-control-sm" v-model="data.masseuse">
</div>
</div>
<div class="col-sm-6">

<div class="form-group">
<input type="text" class="form-control form-control-sm" v-model="data.dentist">
</div>
</div>
<div class="col-md-12" style="text-align:center">

<button type="button" class="btn btn-success btn-sm" @click="save()">
              บันทึก
            </button>
</div>
  </div>
  </div>
</div>
</template>

<script>
import RoleService from "../services/RoleService";
import TypesService from "../services/TypesService";
export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      data:{}
    };
  },
  mounted() {
    TypesService.getType(1).then((res)=>{
      this.data = res.data
    })
  },
  methods: {
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขข้อมูลสิทธิ์การใช้งาน";
        // console.log(this.user_id);
        RoleService.getRole(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;
        });
      } else {
        this.title = "เพิ่มข้อมูลสิทธิ์การใช้งาน";
        this.user = [];
      }
    },
    save() {
      if (this.data.masseuse == "") {
        alert("กรุณากรอกข้อมูล");
      }else if (this.data.dentist == "") {
        alert("กรุณากรอกข้อมูล");
      } else {
        var userdata = {
          masseuse: this.data.masseuse,
          dentist: this.data.dentist,
        };
        TypesService.updateType(1,userdata).then(() => {
          alert("บันทึกสำเร็จ");
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
      }
    },
    getUsers() {
      RoleService.getRoles().then((res) => {
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
