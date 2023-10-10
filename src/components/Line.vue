<template>
  <div class="container">
    
  </div>
</template>

<script>
import UserService from "../services/UserService";
import LinkImageService from "../services/LinkImageService";

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
      roles:[]
    };
  },
  mounted() {
    this.getUsers();
    this.getroles()
    // console.log(this.$route.query.code)
    LinkImageService.gettoken(this.$route.query.code).then((res)=>{
      // console.log(res.data);
      // console.log(this.currentUser);
      var d = {
        line_token:res.data
      }
      UserService.updatetokenline(this.currentUser.id,d).then(()=>{
        // console.log(res.data);
        UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
          var menu = res.data[0].url
          // console.log(menu);
        this.$router.push(menu);
        setTimeout(function () {
          location.reload();
        }, 1000);
        });

      })

    })


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
      UserService.getUsers('','').then((res) => {
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
