<template>
  <div class="container">
    <div v-if="printstatus">
      <div class="row">
        <div class="col-md-12">
          <div
            ref="printMe"
            id="my-node"
            style="width: 200px; height: 120px"
            :name="user.UID"
          >
            <br />
            <div style="text-align: left">&nbsp;{{ user.UID }}</div>
            <br />
            <div style="text-align: center">
              {{ user.firstname }} {{ user.lastname }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 mt-3">
        <label for="inputPassword"
                    >สิทธิ์การใช้งาน <span style="color: red">*</span></label
                  >
                  <div class="form-group">
                    <select
                      class="form-control form-control-sm"
                      v-model="role"
                      @change="selectrole"
                    >
                      <option v-for="(d, i) in roleslist" :key="i" :value="d.id">
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
      </div>
                  
                </div>
    <div style="text-align: right">
      <vue-excel-xlsx
      class="btn btn-success"
                id="excel"
                :data="list"
                :columns="columns"
                :file-name="filename"
                :file-type="'xlsx'"
                :sheet-name="'sheetname'"
              >
              <i class="fa fa-file-excel"></i>  Export Excel
              </vue-excel-xlsx>&nbsp;
      <!-- <button
              class="btn btn-success"
              style="color: white"
            >
              Export
            </button> -->
      <a>
        <button
          type="button"
          id="get_file"
          class="btn btn-success mt-3 mb-3"
          @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddUser"
        >
          <i class="fa fa-plus"></i> เพิ่มบัญชี
        </button></a
      >
    </div>
    <table class="table table-bordered" id="tblData">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อผู้ใช้งาน</th>
          <th scope="col">รหัสผ่าน</th>
          <th scope="col">สิทธิ์การใช้งาน</th>
          <th scope="col">รพ.สต.</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ l.no }}
          </td>
          <td>
            {{ l.username }}
          </td>
          <td>
            <span>1234</span>
          </td>
          <td>
            <span>{{ l.role }}</span>
          </td>
          <td>
            <span>{{ l.shph }}</span>
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
                <i class="fa fa-edit"></i></button></a
            >&nbsp;
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteUser"
              >
                <i class="fa fa-trash"></i></button></a
            >&nbsp;
            <button
              v-if="l.role_id == 2"
              type="button"
              id="get_file"
              class="btn btn-info mt-3 mb-3"
              @click="print(l.id)"
            >
              <i class="fa fa-print"></i>
            </button>
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

                <div class="form-group mt-3" v-if="user.id">
                  <label for="username">Username</label>
                  <input v-model="user.username" type="text" min="1" class="form-control form-control-sm" id="username" disabled
                    />
                </div>
                <div>
                  <label for="inputPassword"
                    >สิทธิ์การใช้งาน <span style="color: red">*</span></label
                  >
                  <div class="form-group">
                    <select
                      class="form-control form-control-sm"
                      v-model="user.type"
                    >
                      <option v-for="(d, i) in roles" :key="i" :value="d.id">
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="currentUser.role_id == 5">
                  <label for="inputPassword"
                    >รพ.สต. <span style="color: red">*</span></label
                  >
                  <div class="form-group">
                    <select
                      class="form-control form-control-sm"
                      v-model="user.shphId"
                    >
                      <option v-for="(d, i) in shphlist" :key="i" :value="d.id">
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group mt-3" v-if="!user.id">
                  <label for="username">จำนวนบัญชี</label>
                  <input
                    v-model="user.no"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                    id="username"
                  />
                </div>
                <!-- <div class="form-group mt-3">
                  <label for="password">รหัสผ่าน</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control form-control-sm"
                    id="password"
                    placeholder="กรุณากรอกรหัสผ่าน"
                  />
                </div> -->
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
    <div
      class="modal fade"
      id="DeleteUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนการการลบ</h5>
          </div>
          <div class="modal-footer mt-3">
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteuserid()"
            >
              ลบ
            </button>
            <button
              id="closeduserdelete"
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
import AdminshphService from "../services/AdminshphService";
import UserService from "../services/UserService";
import DistrictService from "../services/DistrictService";
import ProvinceService from "../services/ProvinceService";
import AmphuresService from "../services/AmphuresService";
import shphService from "../services/shphService";
import RoleService from '../services/RoleService';

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      columns: [],
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
      zipcode: "",
      shphlist: [],
      printstatus: false,
      image: "",
      nametype: {},
      types: [],
      role:0,
      roleslist:[],
      filename:'รายชื่อผู้ใช้งานทั้งหมด'
    };
  },
  mounted() {
    this.generatecolumn()
    this.nametype = JSON.parse(localStorage.getItem("types"));
    this.types.push(
      {
        id: 1,
        name: this.nametype.masseuse,
      },
      {
        id: 4,
        name: this.nametype.dentist,
      }
    );
    this.getUsers();
    this.getshph()
    this.getroles()
    this.user.username = "ID0001";
  },
  methods: {
    generatecolumn() {
      this.columns = [];
      this.columns.push(
        {
          label: "ลำดับที่",
          field: "no",
          align: "center",
        },
        {
          label: "ชื่อผู้ใช้งาน",
          field: "username",
        },
        {
          label: "รหัสผ่าน",
          field: "password",
        },
        {
          label: "สิทธิ์การใช้งาน",
          field: "role",
        },
        {
          label: "รพ.สต.",
          field: "shph",
        },
      );
    },
    exportTableToExcel(tableID, filename = "") {
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      // Specify file name
      var file = ''
      file = "รายชื่อ.xls"
      filename = filename
        ? filename + ".xls"
        : file;

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
    },
    selectrole(){
      RoleService.getRole(this.role).then((res) => {
        console.log(res.data);

      this.filename = 'รายชื่อผู้ใช้งานสิทธิ์' +res.data.name
      })
this.getUsers()
    },
    getroles() {
      UserService.getRoles().then((res) => {
        for (let r = 0; r < res.data.length; r++) {
          if (this.currentUser.role_id == 5) {
          if (res.data[r].id != 2) {
            this.roles.push(res.data[r])
          }
          }else  {
            if (res.data[r].id != 2 && res.data[r].id != 5) {
            this.roles.push(res.data[r])
          }
          }
        }
      })
      UserService.getRoles().then((res) => {
        this.roleslist.push({id:0,
          name:'ทั้งหมด'})
        for (let r = 0; r < res.data.length; r++) {
          if (this.currentUser.role_id == 5) {
          if (res.data[r].id != 2) {
            this.roleslist.push(res.data[r])
          }
          }else  {
            if (res.data[r].id != 2 && res.data[r].id != 5) {
            this.roleslist.push(res.data[r])
          }
          }
        }
      })
    },
    deleteuserid() {
      AdminshphService.deleteadminshph(this.user_id, 0).then(() => {
        document.getElementById("closeduserdelete").click();
        this.getUsers();
      });
    },
    getshph() {
      shphService.getShphs(1,'').then((res) => {
        this.shphlist = res.data;
      });
    },
    onChangeProvince() {
      // console.log(evt.target.value);
      this.getamphurs();
    },
    onChangeAmphur() {
      // console.log(evt.target.value);
      this.getdistricts();
    },
    onChangeDistrict() {
      // console.log(evt.target.value);
      this.getzipcode();
    },
    getprovinces() {
      ProvinceService.getprovinces().then((res) => {
        this.provinces = res.data;
        // console.log(res.data);
      });
    },
    getamphurs() {
      AmphuresService.getamphures(this.user.provinceId).then((res) => {
        this.amphurs = res.data;
        this.districts = {};
        this.zipcode = "";
        // console.log(res.data);
      });
    },
    getdistricts() {
      DistrictService.getdistricts(this.user.amphureId).then((res) => {
        this.districts = res.data;
        // console.log(res.data);
      });
    },
    getzipcode() {
      DistrictService.getdistrict(this.user.districtsId).then((res) => {
        this.zipcode = res.data.zip_code;
        // console.log(res.data);
      });
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขข้อมูลผู้ใช้งาน";
        // console.log(this.user_id);
        AdminshphService.getadminshph(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
          this.hash = this.user.password;

          this.getamphurs();
          this.getdistricts();
          this.getzipcode();
        });
      } else {
        //         var uid = ''
        //       AdminshphService.getadminshphs(1,'').then((res)=>{
        //         console.log(res.data);

        //         uid += 'ID'
        // var num = res.data.length
        // var coun = String(num).length
        // // console.log(coun);
        // console.log(num);
        // // 1 000000
        // // 10 00000
        // // 100 0000
        // var zero = 4-coun
        // console.log(zero);
        //   for (let z = 0; z < zero; z++) {
        //     uid += '0'
        //     // console.log(uid);
        //     if (z+1 == zero) {
        // uid += num+1

        //     }
        // }
        // console.log(uid);
        this.user = {};
        this.user.password= '1234'
        // this.user.username = uid
        // });
        this.title = "เพิ่มข้อมูลผู้ใช้งาน";
      }
      this.user.shphId = this.currentUser.shphId
    },
    save() {
      if (this.currentUser.role_id == 5) {
        if (this.user.shphId == "" || this.user.shphId == null) {
        alert("กรุณาเลือกรพ.สต.");
      } 
      else
      if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        this.saveUser();
      }
    }else
      if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        this.saveUser();
      }
    },
    saveUser() {
      if (this.user_id != 0) {
        var update = {
          password: this.user.password,
          hash: this.hash,
              shphId: this.user.shphId,
              type: this.user.type,
        };
        // console.log(this.user_id);
        AdminshphService.updateadminshph(this.user_id, update).then(() => {
          // console.log(res.data);
          document.getElementById("closeduser").click();
          this.getUsers();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
        });
      } else {
        var uid = "";
        AdminshphService.getadminshphs(1, "",0).then(async (res) => {
          console.log(res.data);
          for (let n = 0; n < this.user.no; n++) {
            uid = "UID";
            var num = res.data.length + n;
            var coun = String(num).length;
            var zero = 4 - coun;
            // console.log(zero);
            for (let z = 0; z < zero; z++) {
              uid += "0";
              // console.log(uid);
              if (z + 1 == zero) {
                uid += num + 1;
              }
            }
            console.log(uid);
            var userdata = {
              username: uid,
              shphId: this.user.shphId,
              password: this.user.password,
              adminId: this.currentUser.id,
              UID: uid,
              hash: this.hash,
              type: this.user.type,
            };
            await AdminshphService.createadminshph(userdata).then(() => {
              if (n + 1 == this.user.no) {
                document.getElementById("closeduser").click();
                this.getUsers();
              }
              //       setTimeout(function () {
              //   location.reload();
              // }, 500);
              // window.scrollTo(0, 0);
            });
          }
        });
      }
    },
    getUsers() {
      AdminshphService.getadminshphs(1, this.currentUser.id,this.role).then((res) => {
        this.list = res.data;
        for (let r = 0; r < this.list.length; r++) {
          this.list[r].no = r+1
          this.list[r].password = 1234
          
        }
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
