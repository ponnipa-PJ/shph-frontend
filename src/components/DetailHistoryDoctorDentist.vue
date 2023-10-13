<template>
  <div class="row">
    <div class="container" v-if="hiscases.length > 0">
      <h4 class="mt-5 mb-3">ประวัติการบริการ{{nametype.dentist}}</h4>
      <h5 class="mb-5"></h5>  <h5>{{user.firstname}} {{user.lastname}}</h5>
      <div class="accordion" id="accordionExample">
        <div class="card" v-for="(h, i) in hiscases" :key="i">
          <div class="card-header" :id="h.idtab">
            <div class="modal-header">
              <h5 class="modal-title">
                <div style="text-align: left">
                  {{ changedate(h.date) }} {{ h.time }} 
                </div>
              </h5>
              <button
                type="button"
                class="close"
                data-toggle="collapse"
                :data-target="h.target"
                aria-expanded="true"
                :aria-controls="h.controls"
              >
                <i class="fa fa-angle-down"></i>
              </button>
            </div>
          </div>

          <div
            :id="h.controls"
            class="collapse show"
            :aria-labelledby="h.idtab"
            data-parent="#accordionExample"
          >
    <!-- <ul class="list-group mb-3 mt-3" style="margin: 20px !important">
              <li class="">
                <b>เลขบัตรประชาชน</b>
                <a class="float-right">{{h.case.UID}}</a>
              </li>
              <li class="">
                <b>ชื่อ-นามสกุล</b>
                <a class="float-right">{{h.case.firstname}} {{h.case.lastname}}</a>
              </li>
            </ul> -->

            <ul class="list-group mb-3 mt-3" style="margin: 20px !important">
              <li class="" v-for="(m, r) in mapcase" :key="r">
                <b>{{ m.name }}</b>
                <a class="float-right">{{ h.case[m.historyuserdentistId] }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapHistoryDoctorDentistService from "../services/MapHistoryDoctorDentistService";
import UserService from '../services/UserService';

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
      user:{},
      nametype:{}
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
      MapHistoryDoctorDentistService.gethistory_doctor_dentist(
        this.userId,''
      ).then((res) => {
        console.log(res.data);
        this.hiscases = res.data;
      });
    },
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.userId = this.$route.query.id;
    UserService.getUser(this.userId).then((res)=>{
      this.user = res.data
    })
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
