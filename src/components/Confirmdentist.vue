<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card mt-3">
          <div class="card-body login-card-body">
                <div class="card-body">
                  
                  <h5 class="card-title">{{ title }}</h5>
                 <br> <div class="form-group mt-5">
<div class="custom-control custom-radio">
<input class="custom-control-input" type="radio" id="customRadio1" name="customRadio" value="1" v-model="user.confirmstatus">
<label for="customRadio1" class="custom-control-label">ยืนยัน</label>
</div>
<div class="custom-control custom-radio">
<input class="custom-control-input" type="radio" id="customRadio2" name="customRadio" value="0" v-model="user.confirmstatus">
<label for="customRadio2" class="custom-control-label">ยกเลิก</label>
</div>
</div>
<button @click="save()"
                    type="button"
                    class="btn btn-success btn-sm"
                  >
                    บันทึก
                  </button>
</div>
              </div>
          </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import EventDentistService from "../services/EventDentistService";
import MapEventsDentistService from "../services/MapEventsDentistService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      menu: [],
      user: {},
      event_id:0,
      title:'',
    };
  },
  mounted() {
   this.event_id = this.$route.query.id
   EventDentistService.geteventbook(this.event_id).then((res)=>{
this.user = res.data
console.log(this.user);
var breaktime = new Date(this.user.date)

      // var d = breaktime.getFullYear() + '-' + ((parseInt(breaktime.getMonth()) + 1).toString().padStart(2, "0"))+ '-' + (breaktime.getDate().toString().padStart(2, "0"))
      
this.title = 'คุณได้จองคิว'+this.user.typename+' หมอ'+ this.user.firstname+ ' '+ this.user.lastname+' วันที่ ' + breaktime.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) + res.data.time+' ที่'+ res.data.shph
})
  },
  methods: {
    timeformat(date) {
      var time = date.split('T')
      time = time[1].split(':')
// console.log(time);
      return time[0] + '.' + time[1] + ' น.'
    },
    save(){
      if (this.user.confirmstatus == null) {
        alert('กรุณายืนยันคิว')
      }else{
        var data ={
        confirmstatus:this.user.confirmstatus
      }
console.log(data);
MapEventsDentistService.updateconfirm(this.event_id,data).then(()=>{
        alert('บันทึกสำเร็จ')
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
