<template>
  <div>
    <div>
      <div class="row">
        <div
          class="col-sm-3 mt-3"
          style="text-align: center; border-bottom: 5px solid #e7038f"
        >
          <img src="../assets/icon1.jpg" style="width: 80%" />
        </div>
        <div
          class="col-sm-9"
          style="margin-top: 5%; border-bottom: 5px solid #e7038f"
        >   
        <!-- <a href="#" style="padding-right: 15px;bottom:0px;right:0px;position:absolute;" @click.prevent="logOut" v-if="currentUser"> 
          <img src="../assets/logout.png" style="width:60px;" />&nbsp;
        </a>  -->
        <!-- {{icon}}
        <div v-for="c in icon" :key="c.id">
        <a :href="c.url" :style="c.style"> 
          <img :src="s.src" style="width:60px;" />&nbsp;
        </a> 
      </div> -->
        <!-- <a href="/MenuSuperAdmin" style="padding-right: 80px;bottom:0px;right:0px;position:absolute;" v-if="currentUser && (currentUser.role_id == 3 ||
                currentUser.role_id == 5)"> 
          <img src="../assets/setting.png" style="width:50px;" />&nbsp;
        </a> 
        <a href="/Mains" style="padding-right: 140px;bottom:0px;right:0px;position:absolute;"> 
          <img src="../assets/home.png" />&nbsp;
        </a>  -->
        <!-- <img src="../assets/setting.png" style="width:110px;padding-right: 70px;bottom:0px;right:0px;position:absolute;" v-if="currentUser && (currentUser.role_id == 3 ||
                currentUser.role_id == 5)"/>&nbsp;
          <img src="../assets/home.png" style="padding-right: 120px;bottom:0px;right:0px;position:absolute;" />&nbsp; -->
         <!-- <p class="bet_time" style="margin: 0px;">
          <img src="../assets/home.png" style="padding-right: 70px;" width="100%" />&nbsp;
         </p> -->

          <h1>{{data.title}}</h1>
          
        </div>
      </div>
      <div class="row" v-if="status">
        <div class="col-md-3" style="padding: 0px">
          <a href="/login" v-if="!currentUser">
            <div class="block" style="color: black">
              <h5>&nbsp;&nbsp;เข้าสู่ระบบ</h5>
            </div>
          </a>
          <div v-if="currentUser" class="block" style="color: black">
            <h5>
              &nbsp;&nbsp;สวัสดี คุณ{{ currentUser.firstname }}
              {{ currentUser.lastname }}
            </h5>
          </div>

          <div v-if="currentUser">
            <nav
              v-if="
                currentUser.role_id != 3 ||
                currentUser.role_id != 5 ||
                currentUser.role_id != 2
              "
            >
              <ul
                class="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
                v-if="currentUser"
              >
                <li class="nav-item menu-is-opening menu-open">
                  <div v-for="l in menu" :key="l.id" class="mt-3">
                    <a href="#" class="nav-link" style="background-color:gray;color:black">
                      <i :class="'nav-icon ' + l.icon"></i>
                      <p>
                        {{ l.name }}
                      </p>
                    </a>
                    <ul class="nav nav-treeview" style="display: block">
                      <li class="nav-item" v-for="m in l.menu" :key="m.id">
                        <a :href="m.url" :class="'nav-link ' + m.class">
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <!-- <i :class="'nav-icon '+m.icon "></i> -->
                          <p style="color:black">{{ m.name }}</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          class="col-md-9"
          style="
            border-left: 5px solid #e7038f;
            border-bottom: 5px solid #e7038f;
          "
        >
          <div class="col-md-12" style="padding-right: 0px">
            <nav
              class="navbar navbar-expand-md navbar-dark bg-dark"
              style="background-color: white !important; padding: 0px"
            >
              <div
                class="navbar-collapse collapse w-100 order-3 dual-collapse2"
              >
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                <a class="nav-link" href="/home" style="color:black;background-color: wheat;"> หน้าหลัก </a>
            </li>&nbsp;
            <li class="nav-item" v-if="currentUser && (currentUser.role_id == 3 ||
                currentUser.role_id == 5)">
                <a class="nav-link" href="/MenuSuperAdmin" style="color:black;background-color: wheat;"> การจัดการระบบ </a>
            </li>&nbsp;
                  <li class="nav-item" v-if="currentUser">
                    <a
                      class="nav-link"
                      href="#"
                      style="color: black; background-color: wheat"
                      @click.prevent="logOut"
                      ><i class="nav-icon fa-solid fa-right-from-bracket"></i>
                      ออกจากระบบ</a
                    >
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <!-- <ul>
        <li class="nav-item menu-open" v-if="currentUser">
              <a href="#" class="nav-link" @click.prevent="logOut">
                <i class="nav-icon fa-solid fa-right-from-bracket"></i>
                <p>
                  ออกจากระบบ
                </p>
              </a>
            </li>
            </ul> -->
          <router-view />
        </div>
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <div
            class="row"
            style="
              border-left: 5px solid #e7038f;
              border-bottom: 5px solid #e7038f;
            "
          >
            <div class="row mt-3" style="margin: 5px">
              <div class="col-sm-12">
              <h4 class="mb-3">ข่าวสาร</h4>

              </div>
              <!-- <div class="col-sm-12">
              <div class="callout callout-info" v-for="n in news" :key="n.id">
                <h5 v-html="n.title"></h5>
<p v-html="n.content"></p>
              </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
// import MenuSuperAdmin from "../components/MenuSuperAdmin.vue";
import NotificationService from "../services/NotificationService";
import NewsService from "../services/NewsService";

export default {
  name: "Nav",
  components: {
    // MenuSuperAdmin,
  },
  data() {
    return {
      menu: [],
      status: true,
      data:{},
      news:[],
      icon:[]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (this.currentUser) {
      this.icon.push({
        url:'/Mains',
        style:'padding-right: 15px;bottom:0px;right:0px;position:absolute;',
        src:'../assets/logout.png'
      })
    }else{
      this.icon.push({
        url:'/Mains',
        style:'padding-right: 15px;bottom:0px;right:0px;position:absolute;',
        src:'../assets/logout.png'
      })
    }
    // console.log(this.$route.path);
    this.getNoti()
    if (
      this.$route.path == "/MenuSuperAdmin" ||
      this.$route.path == "/plandoctor"
    ) {
      this.status = false;
    }
    if (this.currentUser) {
      // UserService.getmenuuser(this.currentUser.role_id).then((res) => {
      //   console.log(res.data);
      //   for (let cu = 0; cu < res.data.length; cu++) {
      //     if (this.$route.path == res.data[cu].url) {
      //       this.status = false;
      //     }
      //   }
      // });
      if (
        this.currentUser.role_id != 3 &&
        this.currentUser.role_id != 5 &&
        this.currentUser.role_id != 2
      ) {
        UserService.getMenubyRoleID(this.currentUser.role_id).then((res) => {
          this.menu = res.data;
          // console.log(this.menu);
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
      }
    }
    this.getNews()
  },
  methods: {
    getNews(){
      NewsService.getnews(1).then((res) => {
        this.news = res.data;
      });
    },
    getNoti(){
      NotificationService.getnotification(1).then((res)=>{
        this.data = res.data
      })
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      setTimeout(function () {
        location.reload();
      }, 500);
      this.$router.push("/Mains");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  background-color: gray;
  width: 100%;
  border: 15px solid gray;
}
.box {
    position:relative;
}
.bet_time {
    position:absolute;
    bottom:0;
    right:0;
}
</style>
