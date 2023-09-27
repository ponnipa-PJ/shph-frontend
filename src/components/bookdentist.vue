<template>
  <div class="container">
    <h5 class="mt-5 mb-5" style="text-align:center">จองคิวหมอฟัน</h5>
    <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
      <template v-slot:eventContent='arg'>
        <b>{{ converttime(arg.timeText) }}</b>
        <i>{{ arg.event.title }}</i>
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
                <div class="form-group">
                  <label>หมอฟัน</label><br/>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in doctors" :key="r" >
                      <input class="form-check-input" type="radio" name="radio1" :id="i.id"
                        :value="i.id" v-model="event_id">
                      <label :for="i.id" class="form-check-label">{{ i.firstname }} {{ i.lastname }}</label>
                    </div>
                    <div v-if="doctors.length == 0">ไม่พบหมอที่ให้บริการวันที่เลือก</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-danger" @click="deleteque()" v-if="!allday">
              ยกเลิกการจอง
            </button>
            <button type="button" class="btn btn-success" @click="save()" v-else>
              ยืนยันการจอง
            </button>

            <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorService from "../services/DoctorService";
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventDentistService from '../services/EventDentistService'
import UserService from '../services/UserService'
import LinkImageService from '../services/LinkImageService'

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
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        },
        height:850,
        locale: 'en-GB',
        scrollTime: '08:00',
        omitZeroMinute: false,
        slotLabelFormat:
        {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          hour12: false
        },
        events: [],
      },
      event_id:0,
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
      allday: true
    };
  },
  mounted() {
    this.getEvents('',this.currentUser.id)
    this.getUsers();
  },
  methods: {
    deleteque() {
        var userdatak = {
          bookstatus: 1,
          title: 'ว่าง',
          userId: null,
        };
        EventDentistService.updateuser(this.user_id, userdatak).then(() => {
          document.getElementById("closeduser").click();
          this.getEvents();

        });
    },
    sentline() {
      UserService.getUser(this.book.userId).then((res) => {
        console.log(res.data.line_token);
        LinkImageService.sendNotify(this.book.noti + ' วันที่ ' + this.header, res.data.line_token)
        this.save()
      })
    },
    converttime(time) {
      // console.log(time);
      // console.log(time.length);
      if (time.length == 2 || time.length == 3) {
        time = time.split('a')
        time = time[0] + ':00 น.'
      } else if (time == '') {
        time = ''
      } else {
        time = time.replace('a', ' น.')
      }
      return time
    },
    getEvents() {
      EventDentistService.getbooks('',this.currentUser.id).then((res) => {
        this.calendarOptions.events = res.data
        // this.calendarOptions.events = this.events 
        //   this.calendarOptions.events.push({
        //   title:'test',
        //   date:'2023-09-01'
        // })
        // console.log(this.calendarOptions.events);
      })
    },
    handleEventClick(clickInfo) {
      // console.log(clickInfo.event.id);
      var id = clickInfo.event.id
      var breaktime = new Date(clickInfo.event.start)

      var d = breaktime.getFullYear() + '-' + (parseInt(breaktime.getUTCMonth()) + 1) + '-' + breaktime.getDate()
      var now = new Date()
      var selectdate = new Date(d)

      now = now.getFullYear() + '-' + (parseInt(now.getUTCMonth()) + 1) + '-' + now.getDate()
      now = new Date(now)
      
      
      // console.log(selectdate,now);

      if (selectdate < now || breaktime.getHours() == 12) {
        console.log(1);
      }else{
        this.header = breaktime.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        this.getid(id)
        this.title = 'จองคิวหมอฟันวันที่ ' + breaktime.toLocaleDateString('th-TH', {
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
      //       EventDentistService.updateevent(clickInfo.event.id,event).then(()=>{
      //         this.getEvents()
      //       })
      //       }
    },
    timeformat(time) {
      time = time.split(':')
      return time[0] + '.' + time[1] + ' น.'
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
      // console.log(id);
      this.event_id = ''
      this.user_id = id;
      if (id != 0) {
        // console.log(this.user_id);
        EventDentistService.getevent(id).then((res) => {
          // console.log(res.data);
          this.book = res.data;
          EventDentistService.getdoctorbydate(this.book.date,this.currentUser.id).then((res) => {
        this.doctors = res.data
        // console.log(this.doctors);
        // console.log(this.book);
        EventDentistService.getquebyuserid(this.book.date,this.currentUser.id).then((res) => {
        this.event_id = res.data.id
        // console.log(this.event_id);
        if (this.event_id) {
          this.allday = false
        }else{
          this.allday = true
        }
        });
        // console.log(this.allday);
      })
          // console.log( this.course_id);
        });
      } else {
        this.course_id = []
        this.days = []
        this.book = {};
      }
    },
    save() {
      if (this.event_id == '' || this.event_id == null) {
        alert('กรุณาเลือกหมอฟัน')
      }else{
        var userdata = {
          bookstatus: 0,
          title: 'จองแล้ว',
          userId: this.currentUser.id,
        };
        EventDentistService.updateuser(this.user_id, userdata).then(() => {
          // console.log(res.data);
          document.getElementById("closeduser").click();
          this.getEvents();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
        });
      }
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
