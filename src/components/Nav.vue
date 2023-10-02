<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" v-if="currentUser">{{currentUser.firstname}}</a>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>    <div class="container-fluid">      
     
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="currentUser">
          <li class="nav-item"  v-for="m in menu" :key="m.id">
            <a class="nav-link" :href="m.url">{{m.name}}</a>
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
  </nav>
</template>

<script>
import UserService from '../services/UserService.js'
export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      menu:[]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },    
  },
  mounted() {
      if (this.currentUser) {
        UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
          this.menu = res.data
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
<style scoped>
</style>
