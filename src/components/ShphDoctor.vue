<template>
  <div class="container">
    <div class="col mb-3 mt-3" style="text-align: right">
    </div>
    <div class="col-md-6" v-if="currentUser.role_id == 5">
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
    this.doctorid = this.currentUser.id
    if (this.currentUser.role_id == 5) {
      UserService.getDoctors().then((res)=>{
        this.doctors = res.data
        this.doctorid = this.doctors[0].id
      });
    }

    this.getshph();
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
    getdoctorshph(){
      var list = []
      var shph = []
      DoctorShphService.getdoctorshphs(this.doctorid).then((res)=>{
        this.list = res.data
        for (let li = 0; li < this.list.length; li++) {
          list.push(this.list[li].shphId)
          
        }
        for (let ss = 0; ss < this.shphlist.length; ss++) {
          shph.push(this.shphlist[ss].id)
          
        }
        if (this.list.length == 0) {
          for (let s = 0; s < this.shphlist.length; s++) {
            var doc = {
              docrtorId:this.doctorid,
              shphId:this.shphlist[s].id,
              status:0
            }
            DoctorShphService.createdoctorshph(doc).then(()=>{
              if (s+1 == this.shphlist.length) {
                this.getdoctorshph()
              }
            })
          }
        }else if(this.list.length != this.shphlist.length){
          console.log(shph);
          console.log(list);
          var resultArr = shph.filter(function(val){
    return !list.find(function(obj){
        return val===obj;
    });
});
console.log(resultArr);
         for (let r = 0; r < resultArr.length; r++) {
          var docnew = {
              docrtorId:this.doctorid,
              shphId:resultArr[r],
              status:0
            }
            DoctorShphService.createdoctorshph(docnew).then(()=>{
              if (r+1 == resultArr.length) {
                this.getshph()
              }
            })
         }
        }
              });
    },
    getshph(){
      shphService.getShphs(1).then((res)=>{
        this.shphlist = res.data
        console.log(this.shphlist);
        this.getdoctorshph()
        
    });
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
