<template>
  <div>
    <div style="background-color: white">
      <div class="container-fluid" style="background-color: white">
        <div class="vlt-header-inner">
          <div class="vlt-header-left">
            <a class="vlt-site-logo">
              <img
                src="../assets/icon.png"
                alt="Vinero"
                style="max-height: 60px; margin: 10px"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="vlt-hero-title-holder jarallax"
      style="
        background-image: url('https://www.hdwallpapers.in/download/geometric_squres_shapes_pattern_white_background_hd_white_background-1600x900.jpg');
        position: relative;
        z-index: 0;
        background-attachment: scroll;
        background-size: auto;
      "
    >
      <div class="vlt-hero-title-inner">
        <h1 class="vlt-hero-title">{{ data.title }}</h1>
        <!-- <p class="vlt-hero-subtitle">Work hard. Dream big.</p> -->
      </div>

      <!-- <div id="jarallax-container-0" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -100;"><img src="#" style="max-width: none; position: fixed; top: 0px; left: 0px; width: 1301.79px; height: 732.259px; overflow: hidden; pointer-events: none; margin-left: -141.897px; margin-top: 23.3707px; visibility: visible; background-position: 50% 50%; transform: translateY(-23.3707px) translateZ(0px);"></div> -->
    </div>
    <main class="vlt-main-holder vlt-main-padding" style="background-color:white">
      <div class="container">
        <div class="vlt-portfolio-grid-filters">
          <div
            data-filter=".portfolio_category"
            :class="i.class"
            v-for="(i, c) in icon"
            :key="c"
          >
            <a @click="gotopage(i.url)"><span>{{ i.name }}</span></a>
          </div>
          <div v-if="currentUser"
          class="cbp-filter-item"
            data-filter=".portfolio_category"
          >
            <a @click.prevent="logOut"><span>ออกจากระบบ</span></a>
          </div>
        </div>
        <router-view />
       
      </div>
    </main>
    <footer class="vlt-footer-holder vlt-footer-minimal">
      <div class="vlt-footer-inner">
        <div class="container">
          <div class="text-center">
            <!-- <a href="index.html" class="vlt-site-logo">
              <img
                src="assets/img/logo.png"
                alt="Vinero"
                style="max-height: 13px"
              />
            </a> -->
            <!-- <div class="vlt-footer-menu">
              <div>
                <ul>
                  <li>
                    <a href="#">Works</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Purchase</a>
                  </li>
                </ul>
              </div>
            </div> -->
            <div class="vlt-footer-copyright">
              <p>
                Copyright © 2023 
                <a href="#" >โรงพยาบาลส่งเสริมสุขภาพตำบลแม่กา จังหวัดพะเยา</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <a href="#" class="vlt-back-to-top visible"
      ><i class="fa fa-angle-up"></i
    ></a>
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
      data: {},
      news: [],
      icon: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {

    // console.log(this.currentUser);
    if (this.currentUser) {
      if (this.currentUser.role_id == 3 || this.currentUser.role_id == 5) {
        this.icon.push({
        class: "cbp-filter-item",
        url:'/',
        name: "หน้าหลัก",
      });
      this.icon.push({
        class: "cbp-filter-item",
        name: "การจัดการระบบ",
        url:'/MenuSuperAdmin',
      });
      }else{
        this.icon.push({
        class: "cbp-filter-item",
        url:'/',
        name: "หน้าหลัก",
      });
      this.icon.push({
        class: "cbp-filter-item",
        name: "การจัดการระบบ",
        url:'/MenuManager',
      });
      }
    } else {
      this.icon.push({
        class: "cbp-filter-item",
        url:'/',
        name: "หน้าหลัก",
      });
      this.icon.push({
        class: "cbp-filter-item",
        name: "เข้าสู่ระบบ",
        url:'/login',
      });
      UserService.getmenuuser(2).then((res) => {
        console.log(res.data);
        this.menu = res.data;
      });
    }

    this.activemenu()
    // console.log(this.$route.path);
    this.getNoti();
    // UserService.getUID(20).then((res) => {
    //   console.log(res.data);
    // })
    // if (
    //   this.$route.path == "/MenuSuperAdmin" ||
    //   this.$route.path == "/plandoctor"
    // ) {
    //   this.status = false;
    // }
    // if (this.currentUser) {
    //   // UserService.getmenuuser(this.currentUser.role_id).then((res) => {
    //   //   console.log(res.data);
    //   //   for (let cu = 0; cu < res.data.length; cu++) {
    //   //     if (this.$route.path == res.data[cu].url) {
    //   //       this.status = false;
    //   //     }
    //   //   }
    //   // });
    //   if (
    //     this.currentUser.role_id != 3 &&
    //     this.currentUser.role_id != 5 &&
    //     this.currentUser.role_id != 2
    //   ) {
    //     UserService.getMenubyRoleID(this.currentUser.role_id).then((res) => {
    //       this.menu = res.data;
    //       // console.log(this.menu);
    //       for (let l = 0; l < this.menu.length; l++) {
    //         for (let m = 0; m < this.menu[l].menu.length; m++) {
    //           this.menu[l].menu[m].class = "";
    //           // console.log(this.menu[l].menu[m].url);
    //           if (this.menu[l].menu[m].url == this.$route.path) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //           if (
    //             this.$route.path == "/DetailHistoryDoctorMasseuse" &&
    //             this.menu[l].menu[m].url == "/HistoryDoctor"
    //           ) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //           if (
    //             this.$route.path == "/DetailHistoryDoctorDentist" &&
    //             this.menu[l].menu[m].url == "/HistoryDoctor"
    //           ) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //           if (
    //             this.$route.path == "/book" &&
    //             this.menu[l].menu[m].url == "/shphmasseuse"
    //           ) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //           if (
    //             this.$route.path == "/BookMakingAppointmentMasseuse" &&
    //             this.menu[l].menu[m].url == "/MakingAppointmentMasseuseAll"
    //           ) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //           if (
    //             this.$route.path == "/BookMakingAppointmentDentist" &&
    //             this.menu[l].menu[m].url == "/MakingAppointmentDentistAll"
    //           ) {
    //             this.menu[l].menu[m].class = "active";
    //           }
    //         }
    //       }
    //     });
    //   }
    // }
    this.getNews();
  },
  methods: {
    activemenu(){
      for (let i = 0; i < this.icon.length; i++) {
        this.icon[i].class = 'cbp-filter-item'
      if (this.$route.path == this.icon[i].url) {
        var classactive = this.icon[i].class + ' cbp-filter-item-active'
        this.icon[i].class = classactive
      } 
    }
    },
    gotopage(url){
      this.$router.push(url);
      this.activemenu()
    },
    getNews() {
      NewsService.getnews(1).then((res) => {
        this.news = res.data;
      });
    },
    getNoti() {
      NotificationService.getnotification(1).then((res) => {
        this.data = res.data;
      });
    },
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
<style scoped>
.block {
  background-color: gray;
  width: 100%;
  border: 15px solid gray;
}
.box {
  position: relative;
}
.bet_time {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
