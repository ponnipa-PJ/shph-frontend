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
          <i class="fa fa-plus"></i> เพิ่มสิทธิ์การใช้งาน
        </button></a
      >
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">สิทธิ์การใช้งาน</th>
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
                <div class="form-group mt-3">
                  <label for="username">สิทธิ์การใช้งาน</label>
                  <input
                    v-model="user.name"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                    placeholder="กรุณากรอกสิทธิ์การใช้งาน"
                  />
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
import RoleService from "../services/RoleService";

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
      if (this.user.name == "") {
        alert("กรุณากรอกสิทธิ์การใช้งาน");
      } else {
        var userdata = {
          name: this.user.name,
        };
        if (this.user_id == 0) {
          RoleService.createRole(userdata).then(() => {
            document.getElementById("closeduser").click();
            this.getUsers();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
          RoleService.updateRole(this.user_id, userdata).then(() => {
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
