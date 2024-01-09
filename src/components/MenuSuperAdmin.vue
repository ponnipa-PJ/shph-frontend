<template>
  <div>
    <div>
      <div
        class="col-md-12" style="padding-right: 0px;"
      >
      <!-- <nav class="navbar navbar-expand-md navbar-dark bg-dark" style="background-color: white!important;padding: 0px;">
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/Mains" style="color:black;background-color: wheat;"> หน้าหลัก </a>
            </li>&nbsp;
            <li class="nav-item">
                <a class="nav-link" href="#" style="color:black;background-color: wheat;" @click.prevent="logOut"><i class="nav-icon fa-solid fa-right-from-bracket"></i> ออกจากระบบ</a>
            </li>
        </ul>
    </div>
</nav> -->
        <div class="row mt-3" style="margin: 5px">
          <div class="col-sm-4" v-for="(l, i) in menu" :key="i">
            <a :href="l.url"
              ><div class="card" style="height: 900px">
                <div class="card-body">
                  <h5 style="text-align: center;font-size: 1rem;">
                    <i :class="'nav-icon ' + l.icon"></i>
                    {{ l.name }}
                  </h5>
                  <ul class="nav flex-column">
                    <li class="nav-item" v-for="m in l.menu" :key="m.id">
                      <a :href="m.url"  class="nav-link">
                        {{ m.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div></a
            >
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      menu: [],
      status: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    console.log(this.currentUser);
    if (this.$route.path == "/") {
      this.status = true;
    } else {
      this.status = false;
    }
    if (this.currentUser.role_id == 3 || this.currentUser.role_id == 5) {
      UserService.getMenubyRoleID(this.currentUser.role_id).then((res) => {
        this.menu = res.data;
        console.log(this.menu);
        for (let l = 0; l < this.menu.length; l++) {
          for (let m = 0; m < this.menu[l].menu.length; m++) {
            this.menu[l].menu[m].class = "";
            // console.log(this.menu[l].menu[m].url);
            if (this.menu[l].menu[m].url == this.$route.path) {
              this.menu[l].menu[m].class = "active";
            }
            if (
              this.$route.path == "/DetailHistoryDoctorMasseuse" &&
              this.menu[l].menu[m].url == "/HistoryDoctor"
            ) {
              this.menu[l].menu[m].class = "active";
            }
            if (
              this.$route.path == "/DetailHistoryDoctorDentist" &&
              this.menu[l].menu[m].url == "/HistoryDoctor"
            ) {
              this.menu[l].menu[m].class = "active";
            }
            if (
              this.$route.path == "/book" &&
              this.menu[l].menu[m].url == "/shphmasseuse"
            ) {
              this.menu[l].menu[m].class = "active";
            }
            if (
              this.$route.path == "/BookMakingAppointmentMasseuse" &&
              this.menu[l].menu[m].url == "/MakingAppointmentMasseuseAll"
            ) {
              this.menu[l].menu[m].class = "active";
            }
            if (
              this.$route.path == "/BookMakingAppointmentDentist" &&
              this.menu[l].menu[m].url == "/MakingAppointmentDentistAll"
            ) {
              this.menu[l].menu[m].class = "active";
            }
          }
        }
      });
    }else{
    UserService.getmenuuser(2).then((res) => {
      // console.log(res.data);
      this.menu = res.data;
    });
    }
    console.log(this.menu);
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      setTimeout(function () {
        location.reload();
      }, 500);
      this.$router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
