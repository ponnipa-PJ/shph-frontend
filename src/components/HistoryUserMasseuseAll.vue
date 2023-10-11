<template>
  <div class="row">
    <div class="container" v-if="hiscases.length > 0">
      <h4 class="mt-5 mb-3">ประวัติการรับบริการนวด</h4>
<div class="accordion" id="accordionExample">
  <div class="card"  v-for="(h,i) in hiscases" :key="i">
    <div class="card-header" :id="h.idtab">
      <div class="modal-header">
        <h5 class="modal-title"><div style="text-align:left">{{changedate(h.date)}} {{h.time}} </div> </h5>
        <button type="button" class="close" data-toggle="collapse" :data-target="h.target" aria-expanded="true"  :aria-controls="h.controls">
          <i class="fa fa-angle-down"></i>
        </button>
      </div>
    </div>

    <div :id="h.controls" class="collapse" :aria-labelledby="h.idtab" data-parent="#accordionExample">
<!--      
      <div class="row" >
        <div class="container-fluid" v-for="(m, r) in mapcase" :key="r">
        <div class="col-md-6">{{ m.name }}</div>
        <div class="col-md-6">{{h.case[m.historyuserdentistId]}}</div>
      </div>
    </div> -->

      <ul class="list-group mb-3 mt-3" style="margin: 20px!important;">
<li class="" v-for="(m, r) in mapcase" :key="r">
  <b>{{ m.name }}</b> <a class="float-right">{{h.case[m.historyuserdentistId]}}</a>
</li>
</ul>
    </div>
  </div>
</div>
      </div>
      <div class="col-md-12 mt-5" v-else>
  <h4 style="text-align:center">ไม่พบประวัติการรับบริการนวด</h4>
        </div>
    </div>
</template>

<script>
import MapHistoryDoctorMasseuseService from '../services/MapHistoryDoctorMasseuseService'

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
      hiscases:[],
      mapcase:[]
    };
  },
  methods: {
    getmapcases() {
      MapHistoryDoctorMasseuseService.getmap_history_doctor_masseuses(1).then((res) => {
        this.mapcase = res.data
        // console.log(this.history_doctor);
        // this.getmap()
      })
    },
    changedate(date){
      var d = new Date(date)
      var result = d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return result
    },
    gethistorycases(){
      MapHistoryDoctorMasseuseService.gethistory_doctor_masseuse(this.currentUser.id,'').then((res)=>{
        console.log(res.data);
        this.hiscases = res.data
      })
    },
  },
  mounted() {
    this.getmapcases()
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
