<template>
  <div class="mt-5">
    <div class="container" v-if="hiscases.length > 0">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">ประวัติการบริการทันตกรรม</h3>
        </div>

        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th style="width: 10px"></th>
                <th>เลขบัตรประชาชน</th>
                <th>ชื่อ-นามสกุล</th>
                <th style="width: 40px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, i) in hiscases" :key="i">
                <td>{{i+1}}</td>
                <td>{{ h.UID }}</td>
                <td>{{ h.userfirstname }} {{ h.userlastname }}</td>
                <td>
                  <a :href="'DetailHistoryDoctorDentist?id=' + h.userId"
                    ><button type="button" class="btn btn-success">
                      <i class="fa-solid fa-file-lines"></i></button
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-md-12 mt-5" v-else>
      <h4 style="text-align: center">ไม่พบประวัติการรับบริการทันตกรรม</h4>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    getmapcases() {
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists(1).then(
        (res) => {
          this.mapcase = res.data;
          console.log(this.mapcase);
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
      });
      return result;
    },
    gethistorycases() {
      var userId = this.currentUser.id;
      if (this.currentUser.role_id == 3 || this.currentUser.role_id == 5) {
        userId = "";
      }
      MapHistoryDoctorDentistService.getreportdoctor("", userId).then((res) => {
        console.log(res.data);
        this.hiscases = res.data;
      });
    },
  },
  mounted() {
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
.center {
  text-align: center;
  border: 3px solid green;
}
</style>
