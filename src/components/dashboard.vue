<template>
    <div class="row">
      
      <div class="col-md-12">
        <h5 class="mt-5" style="text-align:center">{{ title }}</h5>

    </div>
  </div>
</template>

<script>

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      title:''
    };
  },
  mounted() {
    if (this.currentUser.firstname == null || this.currentUser.firstname == '') {
      this.$router.push('/profile')
    }
if (this.currentUser.role_id == 5) {
  this.title = 'แดชบอร์ดรวม'
}else if (this.currentUser.role_id == 3) {
  this.title = 'แดชบอร์ดรพ.สต.'
}else {
  this.title = 'แดชบอร์ด'
}
  },
  methods: {
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
