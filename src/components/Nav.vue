<template>

<!-- <div style="text-align:center;margin-top:150px">
    <h3><a href="https://www.hpkmaeka.com/"> https://www.hpkmaeka.com</a> </h3>
  </div> -->
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" v-if="currentUser">{{ currentUser.firstname }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-fluid">

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="currentUser">
          <li class="nav-item" v-for="m in menu" :key="m.id">
            <a class="nav-link" :href="m.url">{{ m.name }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logOut">ออกจากระบบ</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <a class="nav-link" href="/">เข้าสู่ระบบ</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
  <div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light" >

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars "></i></a>
        </li>

      </ul>

    </nav>

    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <div style="text-align:right"><a style="color: white;" class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a></div>

      <a href="#" class="brand-link" style="line-height: 3.5;"> 
<img src="../assets/icon.png" alt="AdminLTE Logo" class="brand-image" style="opacity: .8;max-height: 80px;margin-left: 0rem!important;">
<span class="brand-text font-weight-light">รพ.สต.</span>
</a>
      <div class="sidebar" id="myDiv" style="max">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex" v-if="currentUser">
<div class="image">
  <i class="fa fa-user fa-3x" aria-hidden="true"></i>
<!-- <img src="../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
</div>
<div class="info">
<a href="#" class="d-block">{{ currentUser.firstname }}</a>
</div>
</div>
        <nav class="mt-3">
          
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"
            v-if="currentUser">
            <li class="nav-item menu-is-opening menu-open">
              <div v-for="l in menu" :key="l.id" class="mt-3">
<a href="#" class="nav-link active">
<i :class="'nav-icon ' + l.icon"></i>
<p>
  {{ l.name }}
</p>
</a>
<ul class="nav nav-treeview" style="display: block;">
<li class="nav-item" v-for="m in l.menu" :key="m.id">
<a :href="m.url" :class="'nav-link ' + m.class">
&nbsp;&nbsp;&nbsp;&nbsp;
<!-- <i :class="'nav-icon '+m.icon "></i> -->
<p> {{ m.name }}</p>
</a>
</li>
</ul>
</div>
</li>
            <!-- <li class="nav-item menu-open" v-for="m in menu" :key="m.id">
              <a :href="m.url" :class="'nav-link ' + m.class">
                <i :class="'nav-icon '+m.icon "></i>
                <p>
                  {{ m.name }}
                </p>
              </a>
            </li> -->
            <li class="nav-item menu-open">
              <a href="#" class="nav-link" @click.prevent="logOut">
                <i class="nav-icon fa-solid fa-right-from-bracket"></i>
                <p>
                  ออกจากระบบ
                </p>
              </a>
            </li>
          </ul>
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"
            v-else>
            <li class="nav-item menu-open">
              <a href="/" class="nav-link" @click.prevent="logOut">
                <i class="nav-icon fa-solid fa-right-to-bracket"></i>
                <p>
                  เข้าสู่ระบบ
                </p>
              </a>
            </li>
          </ul>

        </nav>

      </div>

    </aside>
    <div class="content-wrapper" style="min-height: 1302.26px;">
      <div class="content">
<router-view />

      </div>

    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService.js'
import TypesService from '../services/TypesService'

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      menu: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
//     var myDiv = document.getElementById('myDiv');

// var myDivWidth = myDiv.clientWidth || myDiv.offsetWidth || (myDiv.getBoundingClientRect()).width;
// var myDivHeight= myDiv.clientHeight || myDiv.offsetHeight  || (myDiv.getBoundingClientRect()).height;
          
// console.log("Width: "+ myDivWidth + "px");
// console.log("Height: "+ myDivHeight + "px");
    TypesService.getTypes().then((res)=>{
    localStorage.removeItem('types');
    localStorage.setItem('types', JSON.stringify(res.data[0]));
    })
    // console.log(this.$route.path);
    if (this.currentUser) {
      UserService.getMenubyRoleID(this.currentUser.role_id).then((res) => {
        this.menu = res.data
        // console.log(this.menu);
        for (let l = 0; l < this.menu.length; l++) {
          for (let m = 0; m < this.menu[l].menu.length; m++) {
            this.menu[l].menu[m].class = ''
          // console.log(this.menu[l].menu[m].url);
          if (this.menu[l].menu[m].url == this.$route.path) {
            this.menu[l].menu[m].class = 'active'
          }
          if (this.$route.path == '/DetailHistoryDoctorMasseuse' && this.menu[l].menu[m].url =='/HistoryDoctor') {
              this.menu[l].menu[m].class = 'active'
          }
          if (this.$route.path == '/DetailHistoryDoctorDentist' && this.menu[l].menu[m].url =='/HistoryDoctor') {
              this.menu[l].menu[m].class = 'active'
          }
          if (this.$route.path == '/book' && this.menu[l].menu[m].url =='/shphmasseuse') {
              this.menu[l].menu[m].class = 'active'
          }
          if (this.$route.path == '/BookMakingAppointmentMasseuse' && this.menu[l].menu[m].url =='/MakingAppointmentMasseuseAll') {
              this.menu[l].menu[m].class = 'active'
          }
          if (this.$route.path == '/BookMakingAppointmentDentist' && this.menu[l].menu[m].url =='/MakingAppointmentDentistAll') {
              this.menu[l].menu[m].class = 'active'
          }
          }
          
        }
      })
    }
    // console.log(this.currentUser);
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
