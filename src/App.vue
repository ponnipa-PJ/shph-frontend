<template>
  <div id="app">
    <div v-if="!statuseva">
      <Main />
      <!-- <Nav  msg="Welcome to Your Vue.js App"/> -->
    </div>
    <div v-else>
      <table width="100%">
        <tr>
          <td width="3%"></td>
          <td width="0.1%" bgcolor="#ffffff"></td>

          <td width="93.8%" bgcolor="#of1527">
            <table width="100%">
              <tr>
                <td width="5%"></td>
                <td>
                  <br /><br /><br /><br />
                  <font size="5" color="#1099f0"
                    >{{title}}</font
                  >
                  <br /><br />
                  <font size="5" color="#ffffff"
                    >โรงพยาบาลส่งเสริมสุขภาพตำบลแม่กา จังหวัดพะเยา</font
                  >
                </td>
              </tr>

              <tr>
                <td width="5%"></td>
                <td height="100" valign="top">
                  <font> <br /><br /><span v-html="header.title"></span></font>
                </td>
              </tr>

              <tr>
                <td width="5%"></td>
                <td>
                  <div style="background-color: #5472cc">
                    <router-view />
                  </div>
                </td>
              </tr>
            </table>
          </td>

          <td width="0.1%" bgcolor="#ffffff"></td>
          <td width="3%"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import Nav from './components/Nav.vue'
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    // Nav,
    Main,
  },
  data() {
    return {
      statuseva: false,
      header: {},
      title:''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (this.$route.path == '/evaluation' || this.$route.path == '/Confirmmasseuse' || this.$route.path == '/Confirmdentist') {
       this.statuseva = true
       if (this.$route.path == '/evaluation') {
        this.title = 'แบบประเมินความพึงพอใจการให้บริการ'
       }
      } 
    // console.log(this.currentUser);
  },
};
</script>

<style>
div {
  font-family: "Niramit", sans-serif;
  font-size: 14px;
}
</style>