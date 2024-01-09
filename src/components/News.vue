<template>
  <div class="row">
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
            <i class="fa fa-plus"></i> เพิ่ม
          </button></a
        >
      </div>
      <table class="table table-bordered">
        <thead>
          <tr class="table-active">
            <th scope="col">ลำดับที่</th>
            <th scope="col">หัวข้อ</th>
            <!-- <th scope="col"></th> -->
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i">
            <td>
              {{ i + 1 }}
            </td>
            <td>
              <p v-html="l.title"></p>
            </td>
            <!-- <td>{{ l.content }} </td> -->
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
                  data-bs-target="#Deleteshph"
                >
                  <i class="fa fa-trash"></i></button
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
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            </div>
            <div class="modal-body">
              <div class="card-body mt-3">
                <div class="form-group mt-3">
                  <label for="username">หัวข้อ</label>

                  <vue-editor
                    use-custom-image-handler
                    @image-added="handleImageAdded"
                    v-model="user.title"
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="username">รายละเอียด</label>

                  <vue-editor
                    use-custom-image-handler
                    @image-added="handleImageAddedcontent"
                    v-model="user.content"
                  />
                </div>
              </div>
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
        id="Deleteshph"
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
                @click="deleteshphid()"
              >
                ลบ
              </button>
              <button
                id="closedshph"
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
  </div>
</template>

<script>
import shphService from "../services/shphService";
import LinkImageService from "../services/LinkImageService";
import axios from "axios";
import NewsService from "../services/NewsService";

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
      roles: [],
      provinces: [],
      amphurs: [],
      districts: [],
      zipcode: "",
      shphlist: [],
      link: "",
    };
  },
  mounted() {
    this.getUsers();
    this.link = LinkImageService.getLinkFrontend() + "/evaluation";
  },
  methods: {
    handleImageAddedcontent(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      var http = LinkImageService.getLink() + "/uploadimage?name=" + file.name;
      axios
        .post(http, formData)
        .then(() => {
          Editor.insertEmbed(
            cursorLocation,
            "image",
            LinkImageService.getLink() + "/uploads/" + file.name
          );
          resetUploader();

          var im = this.user.content.split("img");
          this.user.content = im[0] + 'img style="width:30%;"' + im[1];
          var q = this.user.content;
          this.user.content =
            q +
            '<img style="width:30%" src="' +
            LinkImageService.getLink() +
            "/uploads/" +
            file.name +
            '"/>';
          // console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      var http = LinkImageService.getLink() + "/uploadimage?name=" + file.name;
      axios
        .post(http, formData)
        .then(() => {
          Editor.insertEmbed(
            cursorLocation,
            "image",
            LinkImageService.getLink() + "/uploads/" + file.name
          );
          resetUploader();

          var im = this.user.title.split("img");
          this.user.title = im[0] + 'img style="width:30%;"' + im[1];
          var q = this.user.title;
          this.user.title =
            q +
            '<img style="width:30%" src="' +
            LinkImageService.getLink() +
            "/uploads/" +
            file.name +
            '"/>';
          // console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteshphid() {
      shphService.deleteShph(this.user_id).then(() => {
        document.getElementById("closedshph").click();
        this.getUsers();
      });
    },
    getshph() {
      shphService.getShphs(1,'').then((res) => {
        this.shphlist = res.data;
      });
    },
    getid(id) {
      this.user_id = id;
      if (this.user_id != 0) {
        this.title = "แก้ไขข่าว";
        // console.log(this.user_id);
        NewsService.getnew(this.user_id).then((res) => {
          // console.log(res.data);
          this.user = res.data;
        });
      } else {
        this.title = "เพิ่มข่าว";
        this.user = [];
      }
    },
    save() {
      if (this.user.title == "" || this.user.title == null) {
        alert("กรุณากรอกหัวข้อ");
      } else if (this.user.content == "" || this.user.content == null) {
        alert("กรุณากรอกรายละเอียด");
      } else {
        this.saveUser();
      }
    },
    saveUser() {
      var userdata = {
        title: this.user.title,
        status: 1,
        createdBy: this.currentUser.id,
        content: this.user.content,
      };
      if (this.user_id == 0) {
        NewsService.createnew(userdata).then(() => {
          document.getElementById("closeduser").click();
          this.getUsers();
        });
      } else {
        // console.log(this.user_id);
        NewsService.updatenew(this.user_id, userdata).then(() => {
          // console.log(res.data);
          document.getElementById("closeduser").click();
          this.getUsers();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
        });
      }
    },
    getUsers() {
      NewsService.getnews(1).then((res) => {
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
