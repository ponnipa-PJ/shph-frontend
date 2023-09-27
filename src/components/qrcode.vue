<template>
<div class="container-fluid">
  <div v-if="statustable">
  <button type="button" class="btn btn-primary mt-3" @click="getstatus(1)">บุคคล</button>&nbsp;
<button type="button" class="btn btn-secondary mt-3" @click="getstatus(2)">หน่วยงาน</button>
</div>
<div v-else>
  <button type="button" class="btn btn-secondary mt-3" @click="getstatus(1)">บุคคล</button>&nbsp;
<button type="button" class="btn btn-primary mt-3" @click="getstatus(2)">หน่วยงาน</button>
</div>
<div class="container-fluid mt-3">
  <div style="text-align:right">
  <a :href="'/addqrcode/'+ type +'/0'">
          <button
            class="btn btn-success mt-3 mb-3"            
          >
            <i class="fa fa-plus"></i> เพิ่มข้อมูล{{ typename }}
          </button></a
        >
</div>
<table class="table table-striped" v-if="statustable">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">รูปภาพ</th>
      <th scope="col">ชื่อ-นามสกุล</th>
      <th scope="col">ตำแหน่ง</th>
      <th scope="col">หน่วยงาน</th>
      <th scope="col">qrcode</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(l,i) in list" :key="i">
      <th scope="row">{{ i+1 }}</th>
      <td style="width:150px"><img :src="l.path_image" style="width:100%"></td>
      <td>{{l.first_last_name}}</td>
      <td>{{ l.position }}</td>
      <td>{{ l.office_name }}</td>
      <td><qr-code v-if="l.qrcode" :text="l.qrcode" :size=100> </qr-code>
              </td>
              <td><a :href="'/addqrcode/'+ type +'/' + l.id"> <button
            class="btn btn-warning mt-3 mb-3"            
          >
            <i class="fa fa-edit"></i>
          </button></a>&nbsp;
            <a @click="deletedataIn(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteIn"
              >
                <i class="fa fa-trash"></i></button
            ></a></td>
    </tr>
  </tbody>
</table>
<table class="table table-striped" v-else>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">รูปภาพ</th>
      <th scope="col">ชื่อหน่วยงาน</th>
      <th scope="col">qrcode</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(l,i) in list" :key="i">
      <th scope="row">{{ i+1 }}</th>
      <td style="width:150px"><img :src="l.path_image" style="width:100%"></td>
      <td>{{l.office_name}}</td>
      <td><qr-code v-if="l.qrcode" :text="l.qrcode" :size=100> </qr-code>
              </td>
              <td><a :href="'/addqrcode/'+ type +'/' + l.id"> <button
            class="btn btn-warning mt-3 mb-3"            
          >
            <i class="fa fa-edit"></i>
          </button></a>&nbsp;
            <a @click="deletedataIn(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteIn"
              >
                <i class="fa fa-trash"></i></button
            ></a></td>
    </tr>
  </tbody>
</table>
</div>
<div
      class="modal fade"
      id="DeleteIn"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนยันการลบข้อมูล{{ typename }}</h5>
            
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-danger" @click="deletedatabyid()">
              ลบข้อมูล
            </button>
            <button
            id="closeddeleteinv"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import IndividualService from '../services/IndividualService'
import OfficeService from '../services/OfficeService'

export default {
  name: "Nav",  
  props: {
    msg: String,
  },
  data() {
    return {
      type:'',
      statustable:false,
      typename:'',
      list:[],
      id:''
    }
  },
  mounted() {
    this.getstatus(1)
  },
  methods: {
    deletedataIn(id){
this.id = id
    },
    deletedatabyid(){
      if (this.type == 1) {
        IndividualService.deleteindividual(this.id).then(()=>{
  document.getElementById("closeddeleteinv").click();
            this.getstatus(this.type);
})
      }else{
      OfficeService.deleteoffice(this.id).then(()=>{
  document.getElementById("closeddeleteinv").click();
            this.getstatus(this.type);
})
      }
    },
getstatus(type){
  this.type = type
  if (this.type == 1) {
      this.statustable = true
      this.typename = 'บุคคล'
    }else{
      this.statustable = false
      this.typename = 'หน่วยงาน'
    }
    this.getdata()
},
getdata(){
  // console.log(this.type);
if (this.type == 1) {
  IndividualService.getindividuals().then((res=>{
    // console.log(res.data);
    this.list = res.data
  }))
    
}else{
  OfficeService.getoffices().then((res)=>{
    this.list = res.data
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
  background-color: #04AA6D;
  color: white;
}
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
body{
background-color: gray;
}
</style>
