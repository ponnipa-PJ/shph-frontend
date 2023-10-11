<template>
  <div class="container">
    <div class="row">
    <div class="mt-3 col-md-6" v-if="currentUser.role_id == 5">
                  <div class="form-group">
                  <label for="password">หมอ<span style="color: red">*</span> </label>
                  <select class="form-control form-control-sm" v-model="doctorid" @change="getshph()">
  <option v-for="(i,r) in doctors" :key="r" :value="i.id">{{i.firstname}} {{i.lastname}}</option>
</select>
                </div>
                </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">รพ.สต.</th>
          <th scope="col">สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.name }} 
          </td>
          <td>
            <div class="form-group">
<div class="custom-control custom-switch">
<input type="checkbox" class="custom-control-input" :id="l.id" v-model="l.status" @change="savestatus(l.id,l.status)">
<label class="custom-control-label" :for="l.id"></label>
</div>
</div>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import shphService from "../services/shphService";
import DoctorShphService from "../services/DoctorShphService";
import UserService from "../services/UserService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      list: [],
      shphlist:[],
      doctorid:0,
      doctors:[]
    };
  },
  mounted() {
    // console.log(this.currentUser.role_id);
    this.doctorid = this.currentUser.id
    if (this.currentUser.role_id == 5) {
      UserService.getDoctors().then((res)=>{
        this.doctors = res.data
        this.doctorid = this.doctors[0].id
    this.createdoctorshph();
      });
    }else{

      this.createdoctorshph();
    }

  },
  methods: {
    savestatus(id,status){
var data={
  status:status
}
DoctorShphService.updatedoctorshph(id,data).then(()=>{
  this.getdoctorshph()
})
    },
    deleteshphid(){
shphService.deleteShph(this.user_id).then(()=>{
  document.getElementById("closedshph").click();
            this.getUsers();
      })
    },
    createdoctorshph(){
      // var list = []
      // var shph = []
      DoctorShphService.getnotdoctors(this.doctorid).then((res)=>{
        console.log(res.data);
        if (res.data.length > 0) {
          for (let r = 0; r < res.data.length; r++) {
            var doc = {
              docrtorId:this.doctorid,
              shphId:res.data[r],
              status:0
            }
            DoctorShphService.createdoctorshph(doc).then(()=>{
              if (r+1 == res.data.length) {
                this.getdoctorshph()
              }
            })
          }
          
        }else{
          this.getdoctorshph()
        }
      });
      
    },
    getdoctorshph(){
      DoctorShphService.getdoctorshphs(this.doctorid,'').then((res)=>{
        this.list = res.data
              });
    },
    getshph(){
      this.createdoctorshph()
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
