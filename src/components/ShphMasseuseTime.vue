<template>
  <div class="container">
    <div class="row">
    <div class="mt-3 col-md-6">
                  <div class="form-group">
                  <label for="password">รพ.สต.<span style="color: red">*</span> </label>
                  <select class="form-control form-control-sm" v-model="shphId" @change="changeshph()">
  <option v-for="(i,r) in list" :key="r" :value="i.id">{{i.name}} </option>
</select>
                </div>
                </div>
    </div>
  <div class="row">
    <div class="col-sm-6">

<div class="form-group">
<label>เวลาเริ่มต้น</label>
<input type="time" class="form-control form-control-sm" v-model="data.start">
</div>
</div>
<div class="col-sm-6">

<div class="form-group">
<label>เวลาสิ้นสุด</label>
<input type="time" class="form-control form-control-sm" v-model="data.finish">
</div>
</div>
<div class="col-md-12" style="text-align:center">

<button type="button" class="btn btn-success btn-sm" @click="save()">
              บันทึก
            </button>
</div>
  </div>
  </div>
</template>

<script>
import shphService from "../services/shphService";
import DoctorShphService from "../services/DoctorShphService";
import shphmasseusetimeService from "../services/shphmasseusetimeService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      list: [],
      shphId:0,
      data:{},
      doctorid:0
    };
  },
  mounted() {
    this.doctorid = this.currentUser.id
    this.getshph()
  },
  methods: {
    save(){
var time = {
  start:this.data.start,
  finish:this.data.finish
}
shphmasseusetimeService.updateshph_masseuse_time(this.data.id,time).then(()=>{
  alert('บันทึกสำเร็จ')
  
})
    },
    changeshph(){
      this.gettime()
    },
    gettime(){
      shphmasseusetimeService.getshph_masseuse_time(this.shphId).then((res)=>{
this.data = res.data
      });
    },
    getshph(){
      if (this.currentUser.role_id != 5) {
        DoctorShphService.getshphbydoc(this.doctorid).then((res)=>{
          this.list = res.data
          this.shphId = res.data[0].id
          this.gettime()
              });
      }else{
        shphService.getShphs(1).then((res)=>{
        this.list = res.data
        this.shphId = res.data[0].id
        this.gettime()
      })
      }
    }
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
  margin: 0 auto;
  /* Added */
  float: none;
  /* Added */
  margin-bottom: 10px;
  /* Added */
}

body {
  background-color: gray;
}
</style>
