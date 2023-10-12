<template>
  <div class="row">
  <div class="container">
    <div class="form-group mt-3 col-md-3">
                  <label for="password">รพ.สต.<span style="color: red">*</span> </label>
                  <select class="form-control form-control-sm" v-model="shphId" @change="changeshph()">
  <option v-for="(i,r) in shphlist" :key="r" :value="i.id">{{i.name}}</option>
</select>
                </div>
    <table class="table table-bordered" v-if="list.length > 0">
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">คะแนน</th>
          <th scope="col">ข้อเสนอแนะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.score }} 
          </td>
          <td>
            {{ l.suggestion || '-' }} 
          </td>
          
        </tr>
      </tbody>
    </table>
    <div class="col-md-12 mt-5" v-else>
      <h4 style="text-align: center">ไม่พบข้อมูลการประเมิน</h4>
    </div>
  </div>
</div>
</template>

<script>
import shphService from "../services/shphService";
import EvaluationService from "../services/EvaluationService";
export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      list:[],
      shphlist:[],
      shphId:0
    };
  },
  mounted() {
    this.getshph();
  },
  methods: {
   getshph(){
    shphService.getShphs(1).then((res)=>{
      this.shphlist = res.data
      this.shphId = res.data[0].id
    this.getevaluations()
    })
   },
   changeshph(){
    this.getevaluations()
   },
   getevaluations()
   {
    EvaluationService.getevaluations(this.shphId).then((res)=>{
      this.list = res.data
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
