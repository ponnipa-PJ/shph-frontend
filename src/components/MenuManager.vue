<template>
  <div>
    <div class="row mt-3" style="margin: 5px">
            <div class="col-sm-4" v-for="(m, i) in menu" :key="i">
              <a style="cursor: pointer" @click="gotopage(m.url)"
                ><div class="card" style="height: 200px">
                  <div class="card-body">
                    <h4 style="text-align: center" class="mt-5">
                      <!-- <i :class="'nav-icon ' + m.icon"></i><br> -->
                      {{ m.name }}
                    </h4>
                  </div>
                </div></a
              >
            </div>
          </div>
         
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
// import MenuSuperAdmin from "../components/MenuSuperAdmin.vue";

export default {
  name: "Nav",
  components: {
    // MenuSuperAdmin,
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
    // console.log(this.currentUser);
    if (this.$route.path == "/") {
      this.status = true;
    } else {
      this.status = false;
    }
    UserService.getmenuuser(this.currentUser.role_id).then((res) => {
      // console.log(res.data);
      this.menu = res.data;
    });
    
    // console.log(this.menu);
  },
  methods: {
    gotopage(url){
if (this.currentUser) {
  this.$router.push(url);
}else{
  this.$router.push('/login');
}
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
<style scoped></style>
