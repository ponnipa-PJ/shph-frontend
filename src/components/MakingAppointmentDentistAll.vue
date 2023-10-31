<template>
  <div class="row">
    <div class="container">
   <div class=" mb-3 mt-3" style="text-align: right">
     <a :href="'BookMakingAppointmentDentist?id='+currentUser.id" target="_blank">
       <button type="button" id="get_file" class="btn btn-success" >
         <i class="fa fa-plus"></i> เพิ่ม
       </button></a>
   </div>
    <div class="container mt-3" v-if="hiscases.length > 0">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">การนัดหมาย{{nametype.dentist}}</h3>
        </div>

        <div class="card-body">
          <div v-for="(c, i) in hiscases" :key="i">
          <table class="table table-bordered" >
            <thead>
              <tr :style="'background-color:'+c.color">
                <th colspan="10" style="width: 20px">{{changedate(c.date)}}</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>ลำดับที่</th>
                <th>เวลารับบริการ</th>
                <!-- <th>เลขบัตรประชาชน</th> -->
                <th>ชื่อ-นามสกุล</th>
                <th style="width: 120px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, i) in c.case" :key="i">
                <td>{{i+1}}</td>
                <td>{{ h.time }}</td>
                <!-- <td>{{ h.UID }}</td> -->
                <td>{{ h.firstname }} {{ h.lastname }} </td>
                <td>
                  <a :href="'/HistoryDentist?id='+h.id" target="_blank"
                    ><button type="button" class="btn btn-success">
                      <i class="fa-solid fa-file-lines"></i></button
                  ></a>&nbsp;&nbsp;
                  <a :href="'/BookMakingAppointmentDentist?id='+h.doctorId+'&&makeId='+h.makeId" target="_blank"
                    ><button type="button" class="btn btn-warning">
                      <i class="fa-solid fa-edit"></i></button
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-5" v-else>
      <h4 style="text-align: center">ไม่พบประวัติการรับบริการ{{nametype.dentist}}</h4>
    </div>
  </div>
  </div>
</template>

<script>
import MakingAppointmentsService from "../services/MakingAppointmentsService";
import MapHistoryDoctorDentistService from "../services/MapHistoryDoctorDentistService";

export default {
  name: "Carlist",
  components: {
    // VueHtml2pdf,
    // ContentToPrint,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      hiscases: [],
      mapcase: [],
      nametype:{}
    };
  },
  methods: {
    getmapcases() {
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists(1).then(
        (res) => {
          this.mapcase = res.data;
          // console.log(this.history_doctor);
          // this.getmap()
        }
      );
    },
    changedate(date) {
      var d = new Date(date);
      var result = d.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday:"long"
      });
      return result;
    },
    gethistorycases() {
      var userId = this.currentUser.id;
      if (this.currentUser.role_id == 3 || this.currentUser.role_id == 5) {
        userId = "";
      }
      MakingAppointmentsService.getreportdoctordentist("", userId).then(
        (res) => {
          console.log(res.data);
          this.hiscases = res.data;
        }
      );
    },
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.getmapcases();
    this.gethistorycases();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
  text-decoration: none;
}
#app {
  font-family: "Niramit";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
