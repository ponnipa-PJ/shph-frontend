<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body login-card-body mt-3">
              <div class="card-body mt-3">
               <div class="social-auth-links text-center mb-3 mt-3">
                <a target="_blank" :href="urlAuth" >
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                  >
                    ยืนยันตัวตน
                  </button>
                </a>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";
import LinkImageService from "../services/LinkImageService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      token: 0,
      menu: [],
      user: {},
      user_id:0
    };
  },
  mounted() {
   this.token = this.$route.params.id
   console.log(this.token);
  if (this.token) {
     this.activate()
    //  console.log(1);
  }
  },
  methods: {
    activate(){
      var data ={}
UserService.updateToken(this.token,data).then((res)=>{
  // console.log(res.data);
  if (res.data.id) {
    UserService.getUserBytoken(this.token).then((res)=>{
      // console.log(res.data);

      this.user = res.data
      // window.open(this.urlAuth(res.data.id), '_blank');

       var user = {
          email: res.data.email,
          type:'token',
          accessToken:res.data.token
        };
        this.$store.dispatch("auth/login", user).then(
          () => {
           
          },
          (error) => {
            alert("ชื่อหรือรหัสผ่านไม่ถูกต้อง");
            console.log(error);
          }
        );
    })
 }
})
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    urlAuth() {
      var clientId = 'do6mzoSxLMNnOTXkr7USva'
      var engine = LinkImageService.getLinkFrontend()+'/line'
      return `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${engine}&scope=notify&state=${this.token}`
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
