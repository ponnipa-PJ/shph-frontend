<template>
  <div class="container">
    <h5 class="mt-5" style="text-align:center">{{ head }}</h5>
    <h5 class="mb-5" style="text-align:center">{{ shphName }}</h5>

    <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
      <template v-slot:eventContent='arg'>
        <b>{{ converttime(arg.timeText,arg.event.end) }} </b>
        <i>{{ arg.event.title }} </i>
      </template>
    </FullCalendar>
    <div class="col mb-3 mt-3" style="text-align: right">
      <a>
        <button style="display: none;" type="button" id="AddEvent" class="btn btn-success" data-bs-toggle="modal"
          data-bs-target="#AddUser">
          <i class="fa fa-plus"></i> จองคิวเข้ารับการบริการ
        </button></a>
    </div>
    <!-- <table class="table table-bordered">
      <thead>
        <tr class="table-active">
          <th scope="col" colspan="6" style="text-align: center;">รายชื่อหมอนวด</th>
        </tr>
      </thead>
      <thead>
        <tr class="table-active">
          <th scope="col">ลำดับที่</th>
          <th scope="col">ชื่อ-นามสกุล</th>
          <th scope="col">รอบการบริการ</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ l.firstname }} {{ l.lastname }}
          </td>
          <td>
            {{ l.dentistCourseId }}
          </td>
          <td>
            <a @click="getid(l.id)">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#AddUser">
                <i class="fa fa-edit"></i></button></a>
          </td>
        </tr>
      </tbody>
    </table> -->

    <!-- Modal -->
    <!-- <div class="modal fade" id="AddUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>

          </div>
          <div class="modal-body">
            <form>
              <div class="card-body">
                <div class="form-group">
                  <label>วันที่เข้ารับการบริการ:</label>
                  <input @change="searchdoctor" type="date" class="form-control datetimepicker-input"
                    data-target="#reservationdate" v-model="user.date">
                  <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label for="password">หมอ</label>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in doctors" :key="r" :value="i.id">
                      <input @change="searchtime" class="form-check-input" type="radio" name="radio1" :id="i.id"
                        :value="i.id" v-model="doctor_id">
                      <label :for="i.id" class="form-check-label">{{ i.firstname }} {{ i.lastname }}</label>
                    </div>
                    <div v-if="doctors.length == 0">ไม่พบหมอที่ให้บริการวันที่เลือก</div>
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label for="password">รอบการบริการ</label>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in courses" :key="r" :value="i.id">
                      <input class="form-check-input" type="radio" name="radio2" :id="'r'+i.id" :value="i.id" v-model="course_id">
                      <label :for="'r'+i.id" class="custom-check-label">{{ gettime(i.time_start, i.time_end) }}</label>
                    </div>
                  </div>
                  <div v-if="courses.length == 0">ไม่พบรอบการให้บริการ</div>

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
    </div> -->
    <div class="modal fade" id="AddUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>

          </div>
          <div class="modal-body">
            <form>
              <div class="card-body" style="padding:0px">
                <div class="row" v-if="book.userId">
<div class="col-md-6">
  <div class="form-group">
                  <label>ชื่อผู้จอง</label><br />
                  <label>{{ book.userfirst }} {{ book.userlast }}</label>

                </div>
</div>
<div class="col-md-6" style="text-align: right;">
 <a :href="'/HistoryMasseuse?id='+mapId"> <i class="fa-regular fa-id-card fa-3x"></i></a></div>
                </div>
                
                <div class="form-group" v-if="book.confirmstatus">
                  <label>สถานะ</label><br />
                  <label v-if="book.confirmstatus == 1">ยืนยันการจองคิว</label>
                  <label v-if="book.confirmstatus == 0">ยกเลิกการจองคิว</label>

                </div>
                <div class="form-group" v-if="alltoken.length > 0">
                  <label>ข้อความแจ้งเตือนไลน์</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="book.noti">
                    <div class="input-group-append">
                      <span class="input-group-text"><i class="fa-brands fa-line"></i></span>
                    </div>
                  </div>

                </div>

                <button v-if="alltoken.length >0" type="button" class="btn btn-success btn-sm" @click="sentline()">
                  ส่งข้อความแจ้งเตือนไลน์
                </button>
                

                <div class="form-group" v-if="book.userId">
                  <label>ข้อความแจ้งเตือนไลน์</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="book.noti">
                    <div class="input-group-append">
                      <span class="input-group-text"><i class="fa-brands fa-line"></i></span>
                    </div>
                  </div>

                </div>

                <button v-if="book.userId" type="button" class="btn btn-success btn-sm" @click="sentline()">
                  ส่งข้อความแจ้งเตือนไลน์
                </button>
                
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-danger" @click="deletequeall()" v-if="allday">
              ลบคิวทั้งหมด
            </button>
            <button type="button" class="btn btn-danger" @click="deletequeandsendnotify()" v-if="!alltoken">
              แจ้งยกเลิกคิวทั้งหมดและส่งแจ้งเตือน
            </button>
            <button type="button" class="btn btn-danger" @click="deleteque()" v-if="book.userfirst">
              แจ้งยกเลิกคิวและส่งแจ้งเตือน
            </button>
            <button type="button" class="btn btn-danger" @click="deleteq()" v-if="!book.userId && !allday">
              ลบคิว
            </button>
            <!-- <button type="button" class="btn btn-success" @click="save()" v-if="book.bookstatus == 0">
              บันทึก
            </button> -->
            <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='../assets/locale/th'></script>

<script>
import DoctorService from "../services/DoctorService";
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventService from '../services/EventService'
import UserService from '../services/UserService'
import LinkImageService from '../services/LinkImageService'
import esLocale from '@fullcalendar/core/locales/th';
import HistorymasseuseService from '../services/HistorymasseuseService'
import shphService from '../services/shphService';

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin,],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        weekends: true,
        eventClick: this.handleEventClick,
        views: {
    dayGridMonth: {
      dayHeaderFormat: {
        weekday: 'long'
      }
    }
  },
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        },
        height:850,
        locale: esLocale,
        scrollTime: '08:00',
        omitZeroMinute: false,
        slotLabelFormat:
        {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          hour12: false
        },
        events: []

      },
      alltoken: [],
      book: {},
      events: [],
      list: [],
      user_id: 0,
      title: "",
      courses: [],
      course_id: [],
      days: [],
      doctor_id: '',
      day: [{
        id: 1,
        nameth: 'วันจันทร์',
        nameen: 'MON'
      },
      {
        id: 2,
        nameth: 'วันอังคาร',
        nameen: 'TUE'
      },
      {
        id: 3,
        nameth: 'วันพุธ',
        nameen: 'WED'
      },
      {
        id: 4,
        nameth: 'วันพฤหัสบดี',
        nameen: 'THUR'
      },
      {
        id: 5,
        nameth: 'วันศุกร์',
        nameen: 'FRI'
      }],
      doctors: [],
      header: '',
      allday: true,
      head:'',
      shphId:'',
      shphName:'',
      mapId:''
    };
  },
  mounted() {
    this.doctor_id = this.$route.query.id
    this.shphId = this.$route.query.shphId
    
    // console.log(this.doctor_id);
    UserService.getUser(this.doctor_id).then((res)=>{
      this.head = res.data.firstname +' '+res.data.lastname
    })
    shphService.getShph(this.shphId).then((res)=>{
    this.shphName = res.data.name
    });
    this.getEvents()
    this.getUsers();
    if (this.currentUser.firstname == null || this.currentUser.firstname == '') {
      alert('กรุณากรอกข้อมูลส่วนตัวให้ครบ')
      this.$router.push('/profile')
    }
  },
  methods: {
    deletequeall(){
      console.log(this.book.date);
EventService.deleteAll(this.book.date,this.doctor_id,this.shphId).then((res)=>{
  console.log(res.data);
  document.getElementById("closeduser").click();
                  this.getEvents();
})
    },
    deletequeandsendnotify(){
      if (this.book.noti == '' || this.book.noti == null) {
        alert('กรุณากรอกข้อความแจ้งเตือน')
      } else {
for (let a = 0; a < this.alltoken.length; a++) {
  var userdatak = {
          noti: this.book.noti,
          title: this.book.noti,
          userId: this.book.userId,
        };
        EventService.updateevent(this.alltoken[a].id, userdatak).then(() => {
              LinkImageService.sendNotify(this.book.noti + ' วันที่ ' + this.header + ' ที่'+ this.shphName, this.alltoken[a].line_token)
             
                var his = {
            eventId:this.alltoken[a].id,
            title:this.book.noti,
            createdBy:this.currentUser.id
          }
          HistorymasseuseService.createhistorymasseus(his).then(()=>{
                if (a + 1 == this.alltoken.length) {
                  document.getElementById("closeduser").click();
                  this.getEvents();
                }
              });});
          }
        }
    },
    deleteque() {
      if (this.book.noti == '' || this.book.noti == null) {
        alert('กรุณากรอกข้อความแจ้งเตือน')
      } else {
        var userdatak = {
          noti: this.book.noti,
          title: this.book.noti,
          userId: this.book.userId,
        };
        EventService.updateevent(this.user_id, userdatak).then(() => {
          var his = {
            eventId:this.user_id,
            title:this.book.noti,
            createdBy:this.currentUser.id
          }
          HistorymasseuseService.createhistorymasseus(his).then(()=>{
            LinkImageService.sendNotify(this.book.noti + ' วันที่ ' + this.header+ ' ที่'+ this.shphName, this.book.line_token)

          document.getElementById("closeduser").click();
                  this.getEvents();
          });

        });
        

      }
    },
    sentline() {
      UserService.getUser(this.book.userId).then((res) => {
        // console.log(res.data.line_token);
        LinkImageService.sendNotify(this.book.noti + ' วันที่ ' + this.header+ ' ที่'+ this.shphName, res.data.line_token)
        this.save()
      })
    },
    converttimeend(time){
return time
    },
    converttime(time,end) {
      // console.log(end);
      // console.log(time.length);
      if (time.length == 2 || time.length == 3) {
        time = time.split('a')
        time = time[0] + ':00 น.'
      } else if (time == '') {
        time = ''
      } else {
        time = time.replace('a', ' น.')
      }
      if (end) {
        var date = new Date(end)
        // console.log(end);
        time += " - "+date.getHours().toString().padStart(2, "0")+":"+date.getMinutes().toString().padStart(2, "0")+' น.'
      }
      // if (time.length == 2 || time.length == 3) {
      //   time = time.split('a')
      //   time = time[0] + ':00 น.'
      // } else if (time == '') {
      //   time = ''
      // } else {
      //   time = time.replace('a', ' น.')
      // }
      return time
    },
    
    getEvents() {
      EventService.getevents('',this.doctor_id,this.shphId).then((res) => {
        this.calendarOptions.events = res.data
        // console.log(res.data);
        // this.calendarOptions.events = this.events 
        //   this.calendarOptions.events.push({
        //   title:'test',
        //   date:'2023-09-01'
        // })
        // console.log(this.calendarOptions.events);
      })
    },
    handleDateClick: function (arg) {
      // console.log(arg);
      var breaktime = new Date(arg.dateStr)

      var d = breaktime.getFullYear() + '-' + (parseInt(breaktime.getUTCMonth()) + 1).toString().padStart(2, "0") + '-' + breaktime.getDate().toString().padStart(2, "0")
      console.log(d);
      EventService.getevents(d,this.doctor_id,this.shphId).then((res) => {
        console.log(res.data);
        if (res.data.length == 0) {
          var now = new Date()
      var selectdate = new Date(d)

      now = now.getFullYear() + '-' + (parseInt(now.getUTCMonth()).toString().padStart(2, "0") + 1) + '-' + now.getDate().toString().padStart(2, "0")
      now = new Date(now)
      
      
      console.log(selectdate,now);

      if (selectdate < now) {
        console.log(1);
      }else{
      var date = arg.dateStr
      var da = arg.dateStr.split(':')
      // console.log(da);
      if (da.length == 1) {
        var newevent = {
          title: 'ยกเลิกคิวทั้งวัน',
          date: date,
          doctorId: this.doctor_id,
          bookstatus: 2,
          status: 1,
          backgroundColor: 'red',
          borderColor: 'red',
          createdBy:this.currentUser.id,
          shphId:this.shphId
        }
        EventService.createevent(newevent).then(() => {
          this.getEvents()
        })
        var time = [8, 9, 10, 11, 12, 13, 14, 15, 16]
        for (let t = 0; t < time.length; t++) {
          var strtime = String((time[t]).toString().padStart(2, "0"));
          var datepertime = date + 'T' + strtime + ':00:00+07:00'
          var color = 'primary'
          var title = 'ว่าง'
          // console.log(strtime);
          if (strtime == 12) {
            console.log(1);
            title = 'พักเที่ยง'
            color = 'red'
          }
          var eventper = {
            title: title,
            date: datepertime,
            doctorId: this.doctor_id,
            bookstatus: 1,
            status: 1,
            backgroundColor: color,
            borderColor: color,
            createdBy:this.currentUser.id,
            shphId:this.shphId
          }
          // console.log(eventper);
          EventService.createevent(eventper).then(() => {
            if (t + 1 == time.length) {
              this.getEvents()
            }
          })
        }
      } else {
        var event = {
          title: 'ว่าง',
          date: date,
          doctorId: this.doctor_id,
          bookstatus: 1,
          status: 1,
          backgroundColor: 'primary',
          borderColor: 'primary',
          createdBy:this.currentUser.id,
          shphId:this.shphId
        }
        EventService.createevent(event).then(() => {
          this.getEvents()
        })
        // this.calendarOptions.events = this.events 
        //   this.calendarOptions.events.push({
        //   title:'test',
        //   date:arg.dateStr
        // })}
        // console.log(arg.dateStr);
        // console.log(this.calendarOptions.events);
      }
    }
        }
      });
      
    },
    handleEventClick(clickInfo) {
      this.mapId = clickInfo.event.groupId
      var id = clickInfo.event.id

      // console.log(this.mapId);
      var breaktime = new Date(clickInfo.event.start)

      var d = breaktime.getFullYear() + '-' + (parseInt(breaktime.getUTCMonth()) + 1).toString().padStart(2, "0") + '-' + breaktime.getDate().toString().padStart(2, "0")
      var now = new Date()
      var selectdate = new Date(d)

      now = now.getFullYear() + '-' + (parseInt(now.getUTCMonth()) + 1).toString().padStart(2, "0") + '-' + now.getDate().toString().padStart(2, "0")
      now = new Date(now)
      
      
      // console.log(selectdate,now);

      if (breaktime.getHours() != 12) {
        this.header = breaktime.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        this.title = 'แก้ไขข้อมูลคิว ' + breaktime.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        if (breaktime.getHours() != 0) {
          this.title += ' เวลา ' + this.timeformat(breaktime.toLocaleTimeString('th-TH'))
          this.header += ' เวลา ' + this.timeformat(breaktime.toLocaleTimeString('th-TH'))
          this.allday = false
        } else {
          this.allday = true
        }
        this.getid(id)
        document.getElementById("AddEvent").click();

      }
      // const result = date.toLocaleDateString('th-TH', {
      //   year: 'numeric',
      //   month: 'long',
      //   day: 'numeric',
      // })
      //       if (confirm(`ยืนการการลบ '${result}'`)) {
      //         // clickInfo.event.remove()
      //         var event = {
      //         status:0
      //       }
      //       EventService.updateevent(clickInfo.event.id,event).then(()=>{
      //         this.getEvents()
      //       })
      //       }
    },
    timeformat(time) {
      time = time.split(':')
      return time[0] + '.' + time[1] + ' น.'
    },
    searchdoctor() {
      var d = new Date(this.user.date)
      var day = d.getDay();
      DoctorService.getdoctors(day).then((res) => {
        this.doctors = res.data
      })
    },
    searchtime() {
      // console.log(this.doctor_id);
      DoctorService.gettimebydoctor(this.doctor_id).then((res) => {
        // console.log(res.data);
        this.courses = res.data
      })
    },
    gettime(start, end) {
      var s = start.split(":")
      var e = end.split(":")
      var value = s[0] + '.' + s[1] + '-' + e[0] + '.' + e[1] + " น."
      return value

    },
    getid(id) {
      this.alltoken = []
      // console.log(id);
      this.user_id = id;
      if (id != 0) {
        // console.log(this.user_id);
        EventService.getevent(id).then((res) => {
          // console.log(res.data);
          this.book = res.data;
          console.log(this.book);
          EventService.getevents(this.book.date,this.doctor_id,this.shphId).then((res) => {
            console.log(res.data);
            for (let a = 0; a < res.data.length; a++) {
              // console.log(res.data[a].id);
          if (res.data[a].userId != null) {
            this.alltoken.push(res.data[a])
        }
      }
          })
          console.log( this.alltoken);
        });
      } else {
        this.course_id = []
        this.days = []
        this.book = {};
      }
    },
    deleteq(){
        // var userdata = {
        //   noti: this.book.noti,
        //   title: this.book.title,
        //   userId: this.book.userId,
        // };
        EventService.deleteevent(this.user_id).then(() => {
          // console.log(res.data);
          var his = {
            eventId:this.user_id,
            title:'ลบคิว',
            createdBy:this.currentUser.id
          }
          HistorymasseuseService.createhistorymasseus(his).then(()=>{
          document.getElementById("closeduser").click();
          this.getEvents();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
          });
        });
      
    },
    save() {
        var userdata = {
          noti: this.book.noti,
          title: this.book.title,
          userId: this.book.userId,
        };
        EventService.updateevent(this.user_id,userdata).then(() => {
          // console.log(res.data);
          var his = {
            eventId:this.user_id,
            title:this.book.noti,
            createdBy:this.currentUser.id
          }
          HistorymasseuseService.createhistorymasseus(his).then(()=>{
          document.getElementById("closeduser").click();
          this.getEvents();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
          });
        });
      
    },
    getUsers() {
      DoctorService.getdoctors('').then((res) => {
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
