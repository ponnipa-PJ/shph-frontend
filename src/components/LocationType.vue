<template>
  <div class="row">
   <div class="container">
   <div class=" mb-3 mt-3" style="text-align: right">
     <a>
       <button type="button" id="get_file" class="btn btn-success" @click="getid(0)" data-bs-toggle="modal"
         data-bs-target="#AddUser">
         <i class="fa fa-plus"></i> เพิ่ม
       </button></a>
   </div>
   <table class="table table-bordered">
     <thead>
       <tr class="table-active">
         <th scope="col">ลำดับที่</th>
         <th scope="col">ประเภทสถานที่ตรวจ</th>
         <th scope="col"></th>
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
           <a @click="getid(l.id)">
             <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
               <i class="fa fa-edit"></i></button></a>&nbsp;
               <a @click="getid(l.id)">
             <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Deleteshph">
               <i class="fa fa-trash"></i></button></a>
         </td>
       </tr>
     </tbody>
   </table>

   <!-- Modal -->
   <div class="modal fade" id="AddUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>

         </div>
         <div class="modal-body">
           <form>
             <div class="card-body mt-3">

               <div class="form-group mt-3">
                 <label for="username">ประเภทสถานที่ตรวจ</label>
                 <input v-model="user.name" type="text" min="1" class="form-control form-control-sm" id="username"
                   :placeholder="'กรุณากรอกประเภทสถานที่ตรวจ'+nametype.masseuse" />
               </div>
             </div>
           </form>
         </div>
         <div class="modal-footer mt-3">
           <button type="button" class="btn btn-success" @click="save()">
             บันทึก
           </button>
           <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
             ปิด
           </button>
         </div>
       </div>
     </div>
   </div>
   <div class="modal fade" id="Deleteshph" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="exampleModalLabel">ยืนการการลบ</h5>

         </div>
         <div class="modal-footer mt-3">
           <button type="button" class="btn btn-danger" @click="deleteshphid()">
             ลบ
           </button>
           <button id="closedshph" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
             ปิด
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>
  </div>
</template>

<script>
import LocationTypeService from "../services/LocationTypeService";

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
     roles: [],
     provinces: [],
     amphurs: [],
     districts: [],
     zipcode: '',
     shphlist:[],
     nametype:{}
   };
 },
 mounted() {
   this.getUsers();
   this.nametype = JSON.parse(localStorage.getItem('types'));

 },
 methods: {
   deleteshphid(){
    LocationTypeService.deletelocation(this.user_id).then(()=>{
 document.getElementById("closedshph").click();
           this.getUsers();
     })
   },
   getid(id) {
     this.user_id = id;
     if (this.user_id != 0) {
       this.title = "แก้ไขประเภทสถานที่ตรวจ";
       // console.log(this.user_id);
       LocationTypeService.getlocation(this.user_id).then((res) => {
         // console.log(res.data);
         this.user = res.data;
       });
     } else {
       this.title = "เพิ่มประเภทสถานที่ตรวจ";
       this.user = [];
     }
   },
   save() {
     if (this.user.name == "" || this.user.name == null) {
       alert("กรุณากรอกประเภทสถานที่ตรวจ");
     }else{
this.saveUser()
     }
   },
   saveUser(){
     var userdata = {
         name: this.user.name,
         status: 1,
       };
       if (this.user_id == 0) {

        LocationTypeService.createlocation(userdata).then(() => {
               document.getElementById("closeduser").click();
               this.getUsers();
               //       setTimeout(function () {
               //   location.reload();
               // }, 500);
               // window.scrollTo(0, 0);
             });
           
       } else {
         // console.log(this.user_id);
         LocationTypeService.updatelocation(this.user_id, userdata).then(() => {
           // console.log(res.data);
           document.getElementById("closeduser").click();
           this.getUsers();
           //       setTimeout(function () {
           //   location.reload();
           // }, 500);
           // window.scrollTo(0, 0);
         });
       }
   }
,    getUsers() {
  LocationTypeService.getlocations(1).then((res) => {
       this.list = res.data;
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
