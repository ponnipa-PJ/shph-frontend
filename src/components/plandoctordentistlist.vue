<template>
    <div class="row">
      
      <div class="col-md-12" style="padding:0px">

<div class="card card-widget widget-user-2">

<div class="widget-user-header bg-warning">
<div class="widget-user-image">
  <img src="../assets/icon.png" alt="">
</div>

<h5 class="widget-user-desc">จัดการคิวหมอฟันประจำเดือน</h5>
<h5 class="widget-user-desc">โรงพยาบาลส่งเสริมสุขภาพ</h5>
<!-- <h5 class="widget-user-desc">Lead Developer</h5> -->

</div> 
<div class="col-md-12" style="background-color:#F4F6F9"  v-if="currentUser.role_id == 5">
          <div class="card mt-3" v-for="u in shphlist" :key="u.id">
<div class="card-header" >
<h3 class="card-title" >{{ u.firstname }} {{ u.lastname }}</h3>
<div class="card-tools">
</div>
</div>
<div class="card-body p-0" style="display: block;">
<ul class="nav nav-pills flex-column">
<li class="nav-item active" v-for="s in u.shph" :key="s.id"> 
  <a :href="'/plandoctordentist?id=' + u.id + '&&shphId=' + s.id" target="_blank" class="nav-link">
    <i class="fa fa-circle" aria-hidden="true"></i> {{ s.name }}
</a>
</li>
</ul>
</div>

</div>
        </div>

        <div class="card-body p-0" style="display: block;" v-if="currentUser.role_id == 1">
<ul class="nav nav-pills flex-column">
<li class="nav-item active" v-for="s in shphlist" :key="s.id"> 
  <a :href="'/plandoctordentist?id=' + currentUser.id + '&&shphId=' + s.id" target="_blank" class="nav-link">
    <i class="fa fa-circle" aria-hidden="true"></i> {{ s.name }}
</a>
</li>
</ul>
</div>

</div>
    </div>
  </div>
</template>

<script>
import DoctorShphService from "../services/DoctorShphService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id: 0,
      list: [],
      user: {},
      user_id: 0,
      hash: 0,
      title: "",
      roles:[],
      shphlist:[]
    };
  },
  mounted() {
    this.getshph()
    if (this.currentUser.firstname == null || this.currentUser.firstname == '') {
      alert('กรุณากรอกข้อมูลส่วนตัวให้ครบ')
      this.$router.push('/profile')
    }

  },
  methods: {
    getshph(){
      if (this.currentUser.role_id == 5) {
        // shphId = this.currentUser.shphId
        DoctorShphService.getdoctorandshpdentist(this.currentUser.role_id, '').then((res) => {
          this.shphlist = res.data
          console.log(this.shphlist);

        })
      }
      if (this.currentUser.role_id == 4 || this.currentUser.role_id == 7) {
        // shphId = this.currentUser.shphId
        DoctorShphService.getdoctorandshpdentist('', this.currentUser.id).then((res) => {
          this.shphlist = res.data
          console.log(this.shphlist);

        })
      }

    },
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
