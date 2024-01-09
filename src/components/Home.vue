<template>
  <div :style="color">
    <table>
      <td style="width:30%"><br><br>
    <div style="text-align:right"> <img src="../assets/icon.png" style="display: inline-block;width:50%"></div></td>
      <td style="width:70%"></td>
    </table>
    <span class="fixed end-3 z-50 top-3 cursor-pointer">
      <!-- <img src="../assets/home.png" style="display: inline-block;"> -->
      <a href="/">
        <div style="display: inline-block">
          <i id="iconhome" class="fa-solid fa-house" :style="iconcolor+';font-size: 25px'"></i></div></a
      >&nbsp;&nbsp;
      <a href="?link=login" v-if="!currentUser">
        <div style="display: inline-block">
          <i id="iconlogin"
            class="fa-solid fa-right-to-bracket"
            :style="iconcolor+';font-size: 25px'"
          ></i></div></a
      >&nbsp;&nbsp;
      <a
        v-if="currentUser && currentUser.role_id != 2"
        href=""
        @click="gotoadmin()"
      >
        <div style="display: inline-block">
          <i id="iconadmin" class="fa-solid fa-gears" :style="iconcolor+';font-size: 25px'"></i></div></a
      >&nbsp;&nbsp;
      <a v-if="currentUser" @click.prevent="logOut">
        <div style="display: inline-block">
          <i id="iconlogout"
            class="fa-solid fa-right-from-bracket"
            :style="iconcolor+';font-size: 25px'"
          ></i></div></a
      >&nbsp;&nbsp;
      <input
        class="relative w-[52px] h-7 bg-slate-200 checked:bg-none checked:bg-indigo-500 border-2 rounded-full cursor-pointer transition-colors ease-in-out border-transparent appearance-none dark:bg-slate-700 dark:checked:bg-indigo-500 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-indigo-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:transition before:ease-in-out before:duration-200 dark:before:bg-slate-400 dark:checked:before:bg-indigo-200 fc-theme"
        data-fc-trigger="switch"
        data-fc-type="theme_switcher"
        type="checkbox"
        v-model="bg"
        @change="savebg()"
      />
    </span>
    <section class="pt-48 pb-10" :style="color">
      <div class="container 2xl:px-20">
        <div class="grid xl:grid-cols-2 grid-cols-1 gap-6 items-center">
          <div>
            <img
              :src="imgbg"
              class="md:h-[600px] rounded-2xl"
              alt=""
            />
          </div>

          <div>
            <h2 class="text-2xl leading-snug font-semibold mb-5" :style="titlecolor+';font-size: 1.5rem;'">
              {{fullname}}
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mb-5" v-if="currentUser" :style="contentcolor">
              ยินดีต้อนรับ คุณ {{currentUser.firstname}} {{currentUser.lastname}}
            </p>
            <div
              class="grid md:grid-cols-2 grid-cols-1 gap-6"
              v-if="status"
            >
              <div :style="bgcardcolor"
                class="rounded-xl shadow-xl p-10 dark:bg-neutral-800/70"
                v-for="(m, i) in menu"
                :key="i"
              >
                <a href="" @click="gotopage(m.url)"
                  ><div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                  >
                  <img src="../assets/icon.png"/>
                    <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="h-4 w-4 mx-auto text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                      />
                    </svg> -->
                  </div>

                  <h4 class="text-2xl font-semibold mt-5 mb-2" :style="titlecolor">{{ m.name }}</h4>
                  <!-- <p class="text-gray-500 dark:text-gray-400">Design For every Owner to feeel comfort and relax.</p> -->
                </a>
              </div>

              <!-- <div class="bg-white rounded-xl shadow-xl p-10 dark:bg-neutral-800/70">
                            <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-4 w-4 mx-auto text-white">
                                    <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                </svg>
                            </div>

                            <h3 class="text-2xl font-semibold mt-5 mb-2">Luxury</h3>
                            <p class="text-gray-500 dark:text-gray-400">Perfect Combination of simpliceity and Luxury.</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-xl p-10 dark:bg-neutral-800/70">
                            <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4 mx-auto text-white">
                                    <path fill="currentColor" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" />
                                </svg>
                            </div>

                            <h3 class="text-2xl font-semibold mt-5 mb-2">Straegic</h3>
                            <p class="text-gray-500 dark:text-gray-400">Property For every Owner to freel comfort and relax.</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-xl p-10 dark:bg-neutral-800/70">
                            <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-4 w-4 mx-auto text-white">
                                    <path fill="currentColor" d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
                                </svg>
                            </div>

                            <h3 class="text-2xl font-semibold mt-5 mb-2">High Quality</h3>
                            <p class="text-gray-500 dark:text-gray-400">Our Property made by high qualilty material.</p>
                        </div> -->
            </div>
            <div v-else> <Login /></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
// import MenuSuperAdmin from "../components/MenuSuperAdmin.vue";
import Login from "../components/Login.vue";
import shphService from "../services/shphService";

export default {
  name: "Nav",
  components: {
    Login,
  },
  data() {
    return {
      menu: [],
      status: true,
      iconcolor:"color:#374151",
      color: "background-color:#FFFFFF",
      titlecolor:"color:#374151",
      contentcolor:"color:#6B7280",
      bgcardcolor:"background-color:#FFFFFF",
      bg:true,
      imgbg:'',
      fullname:''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    
    // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    if (this.currentUser) {
      if (this.currentUser.shphId) {
        shphService.getShph(this.currentUser.shphId).then((res) => {

        this.imgbg = res.data.img_path
        this.fullname = res.data.fullname
      });
    }else{
    shphService.getShphs(1,1).then((res) => {       
      //  console.log(res.data);
       if (res.data) {
        this.imgbg = res.data[0].img_path
        this.fullname = res.data[0].fullname
       }else{
        shphService.getShphs(1,'').then((res) => {       
      //  console.log(res.data);
        this.imgbg = res.data[0].img_path
        this.fullname = res.data[0].fullname
        
       })
       }
      });
    }
  }else{
    shphService.getShphs(1,1).then((res) => {
      if (res.data) {
        this.imgbg = res.data[0].img_path
        this.fullname = res.data[0].fullname
       }else{
        shphService.getShphs(1,'').then((res) => {       
      //  console.log(res.data);
        this.imgbg = res.data[0].img_path
        this.fullname = res.data[0].fullname
        
       })
       }
      });
    }
      
    UserService.getmenuuser(2).then((res) => {
      // console.log(res.data);
      this.menu = res.data;
    });
    this.bg = JSON.parse(localStorage.getItem('color')).status
    this.changecolor()
    // console.log(this.bg)
    // console.log(this.currentUser);
    // console.log(this.$route.query.link);
    if (this.$route.query.link == 'login') {
      this.status = false
    }else{
      this.status = true
    }
    // console.log(this.status);
    

    // console.log(this.menu);
  },
  methods: {
    savebg(){
      localStorage.removeItem('color');
    localStorage.setItem('color', JSON.stringify({status:this.bg}));
    this.bg = JSON.parse(localStorage.getItem('color')).status
    this.changecolor()
    },
    changecolor() {
      var iconhome = document.getElementById( 'iconhome' );
      var iconadmin = document.getElementById( 'iconadmin' );
      var iconlogout = document.getElementById( 'iconlogout' );
      var iconlogin = document.getElementById('iconlogin');
      if (this.bg == true) {
        this.color = "background-color:#171717";
        this.titlecolor="color:#D1D5DB!important"
      this.contentcolor="color:#9CA3AF"
      this.bgcardcolor="background-color:#262626B3"
      this.iconcolor ="color:white!important"
      if (iconlogin) {
      iconlogin.style.color = "#D1D5DB";
      }
      if (iconhome) {
      iconhome.style.color = "#D1D5DB";
        
      }
      if (iconlogout) {
      iconlogout.style.color = "#D1D5DB";
        
      }
      if (iconadmin) {
      iconadmin.style.color = "#D1D5DB";
        
      }

      } else {
        this.color = "background-color:#FFFFFF";
        this.titlecolor="color:#374151!important"
      this.contentcolor="color:#6B7280"
      this.bgcardcolor="background-color:#FFFFFF"
      this.iconcolor ="color:#374151"
      if (iconlogin) {
      iconlogin.style.color = "#374151";
        
      }
      if (iconhome) {
        
      iconhome.style.color = "#374151";
      }
      if (iconlogout) {
      iconlogout.style.color = "#374151";
        
      }
      if (iconadmin) {
      iconadmin.style.color = "#374151";
        
      }
      }
    },
    gotoadmin() {
      if (this.currentUser.role_id == 3 || this.currentUser.role_id == 5) {
        this.$router.push("/MenuSuperAdmin");
        location.reload();
      } else {
        this.$router.push("/MenuManager");
        location.reload();
      }
    },
    gotopage(url) {
      if (this.currentUser) {
        this.$router.push(url);
      } else {
        this.$router.push("/?link=login");
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      setTimeout(function () {
        location.reload();
      }, 500);
      this.$router.push("/?link=login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
