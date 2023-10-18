<template>
  <div class="row">
    <div class="container mt-3 mb-5">
      <table class="table table-bordered" v-for="(l, i) in list" :key="i">
        <thead>
          <tr class="table-active">
            <th scope="col">{{l.name}}</th>
            <th scope="col">
              <a @click="getidhead(l.id)">
                <button
                  type="button"
                  class="btn btn-info btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#Updatehead"
                >
                  <i class="fa fa-edit"></i></button
              ></a></th>
          </tr>
        </thead>
        <tbody is="draggable" :list="l.menu" tag="tbody">
          <tr style="cursor: move" v-for="m in l.menu" :key="m.id">
            
            <td>
              {{ m.name }}
            </td>
            <td style="width:80px">
              <a @click="getid(m.id)">
                <button
                  type="button"
                  class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#AddUser"
                >
                  <i class="fa fa-edit"></i></button
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-12" style="text-align: center">
          <button
            class="btn btn btn-success btn-sm"
            style="color: white; text-align: center"
            @click="saveorderlist()"
          >
            บันทึก
          </button>
        </div>
    </div> 
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
                  <label for="username">ชื่อเมนู</label>
                  <input
                    v-model="user.name"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button
              type="button"
              class="btn btn-success btn-sm"
              @click="save()"
            >
              บันทึก
            </button>
            <button
            id="closedmenu"
              type="button"
              class="btn btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
     <!-- Modal -->
     <div
      class="modal fade"
      id="Updatehead"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">แก้ไขหัวข้อ</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="card-body mt-3">
                <div class="form-group">
                  <label for="username">หัวข้อ</label>
                  <input
                    v-model="head.name"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button
              type="button"
              class="btn btn-success btn-sm"
              @click="savehead()"
            >
              บันทึก
            </button>
            <button
            id="closedmenu"
              type="button"
              class="btn btn btn-secondary btn-sm"
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
import MenuService from "../services/MenuService";
import draggable from "vuedraggable";

export default {
  name: "Nav",
  components: {
    draggable,
  },
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
      head:{}
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    saveorderlist() {
      for (let m = 0; m < this.list.length; m++) {
for (let l = 0; l < this.list[m].menu.length; l++) {
   // console.log(l+1);
   var list = {
          no: l + 1,
        };
        console.log(list,this.list[m].menu[l].id);
        MenuService.updateorder(this.list[m].menu[l].id, list).then(() => {
          if (m + 1 == this.list.length && l+1 == this.list[m].menu.length) {
            alert("บันทึกสำเร็จ");
            setTimeout(function () {
              location.reload();
            }, 500);
          }
        });
}
       
      }
    },
    getRoles() {
      UserService.getRolesAll().then((res) => {
        // console.log(res.data);
        this.roles = res.data;
      });
    },
    getidhead(id) {
      this.head.id = id;
        MenuService.gettypes_menu(this.head.id).then((res) => {
          this.head = res.data;
        })
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขชื่อเมนู";
        MenuService.getmenu(this.user_id).then((res) => {
          this.user = res.data;
          // console.log(res.data);
        });
      }
    },
    savehead() {
      if (this.head.name == null) {
        alert("กรุณากรอกหัวข้อ");
      } else {
        var userdata = {
          name: this.head.name,
        };
          MenuService.updatetypes_menu(this.head.id, userdata).then((res) => {
            // console.log(res.data);
            if (res.data) {
              document.getElementById("closedmenu").click();
              this.getMenus();
              setTimeout(function () {
                location.reload();
              }, 1000);
              window.scrollTo(0, 0);
            }
          });
      }
    },
    save() {
      if (this.user.name == null) {
        alert("กรุณากรอกชื่อ");
      } else {
        var userdata = {
          name: this.user.name,
        };
        // console.log(userdata);
        if (this.user_id == 0) {
          UserService.getUsers(this.user.email,'','','').then((res) => {
            // console.log(res.data);
            if (res.data.length == 0) {
              UserService.createUser(userdata).then(() => {
                document.getElementById("closedmenu").click();
                this.getMenus();
              });
            } else {
              alert("อีเมลล์นี้มีในระบบแล้ว");
            }
          });
        } else {
          MenuService.updatemenu(this.user_id, userdata).then((res) => {
            // console.log(res.data);
            if (res.data) {
              document.getElementById("closedmenu").click();
              this.getMenus();
              setTimeout(function () {
                location.reload();
              }, 1000);
              window.scrollTo(0, 0);
            }
          });
        }
      }
    },
    getMenus() {
      MenuService.getmenus().then((res) => {
        this.list = res.data;
        console.log(res.data);
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
