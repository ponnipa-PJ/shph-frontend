<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card mt-3">
          <div class="card-body login-card-body">
                <div class="card-body">
                  
                  <h5 >{{ title }}</h5>

                  <!-- <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in time" :key="r" >
                      <input class="form-check-input" type="checkbox" :id="i.date" disabled
                        :value="i.id" v-model="event_id">
                      <label :for="i.date" class="form-check-label">{{ timeformat(i.date) }}</label>
                    </div>
                  </div> -->
                 <div class="form-group">
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
import EventService from "../services/EventService";
import MapEventsService from "../services/MapEventsService";

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
      time:[]
    };
  },
  mounted() {
   this.event_id = this.$route.query.id
    EventService.geteventbook(this.event_id).then((res) => {
// this.user = res.data
var breaktime = new Date(res.data.date)
// console.log(res.data);
this.title = 'คุณได้จองคิว '+res.data.typename+' หมอ'+ res.data.firstname+ ' '+ res.data.lastname+' วันที่ ' + breaktime.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) + res.data.time+' ที่'+ res.data.shph
})
  },
  methods: {
    save(){
      if (this.user.confirmstatus == null) {
        alert('กรุณายืนยันคิว')
      }else{
          var data ={
        confirmstatus:this.user.confirmstatus
      }
// console.log(data);
      MapEventsService.updateconfirm(this.event_id,data).then(()=>{
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
