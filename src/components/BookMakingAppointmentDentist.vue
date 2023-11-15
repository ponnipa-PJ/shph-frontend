<template>
  <div class="row">
    <div class="container">
      <!-- <h5 class="mb-5" style="text-align:center">{{ shphName }}</h5> -->
      <div class="card mt-3">
        <h5 class="mt-5" style="text-align: center">ตารางนัดหมาย{{nametype.dentist}}</h5>
        <div class="card-body mt-3">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label
                  >ประเภทการนัดหมาย<span style="color: red"> *</span>
                </label>
                <div class="form-group">
                  <div
                    class="custom-control custom-checkbox"
                    v-for="(i, r) in typeappointments"
                    :key="r"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'radiotypeappointments' + i.id"
                      :id="'radiotypeappointments' + i.id"
                      :value="i.id"
                      v-model="data.typeappointmentId"
                    />
                    <label
                      :for="'radiotypeappointments' + i.id"
                      class="form-check-label"
                      >{{ i.name }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="form-group">
                <label
                  >ประเภทการ{{nametype.dentist}}<span style="color: red"> *</span>
                </label>
                <div class="form-group">
                  <div
                    class="custom-control custom-checkbox"
                    v-for="(i, r) in types"
                    :key="r"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="'checkbox' + i.id"
                      :value="i.id"
                      :name="'checkbox' + i.id"
                      v-model="masseusetype"
                    />
                    <label :for="'checkbox' + i.id" class="form-check-label">{{
                      i.name
                    }}</label>
                  </div>
                </div>
                <div class="form-group"></div>
              </div>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="username"
                  >เลขบัตรประชาชน <span style="color: red"> *</span>
                </label>
                <input
                  v-model="UID"
                  type="number"
                  class="form-control form-control-sm"
                  id="UID"
                />
              </div>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="form-group">
                <label>สถานที่ตรวจ<span style="color: red"> *</span> </label>
                <div class="form-group">
                  <div
                    class="custom-control custom-checkbox"
                    v-for="(i, r) in locations"
                    :key="r"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'radiolocations' + i.id"
                      :id="'radiolocations' + i.id"
                      :value="i.id"
                      v-model="data.locationId"
                    />
                    <label
                      :for="'radiolocations' + i.id"
                      class="form-check-label"
                      >{{ i.name }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FullCalendar class="demo-app-calendar" :options="calendarOptions">
            <template v-slot:eventContent="arg">
              <b>{{ converttime(arg.timeText, arg.event.end) }} </b>
              <i>{{ arg.event.title }} </i>
            </template>
          </FullCalendar>

          <div class="row mt-3">
            <div class="col-md-3"></div>
            <div class="col-md-6 text-center">
              <button
                @click="save()"
                type="button"
                class="btn btn-success btn-md"
              >
                บันทึก
              </button>
            </div>
            <div class="col-md-3"></div>
          </div>

          <div class="col mb-3 mt-3" style="text-align: right">
            <a>
              <button
                style="display: none"
                type="button"
                id="AddEvent"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#AddUser"
              >
                <i class="fa fa-plus"></i> จองคิวเข้ารับการบริการ
              </button></a
            >
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
          <div
            class="modal fade"
            id="AddUser"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ title }}
                  </h5>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="card-body" style="padding: 0px">
                      <div class="row" v-if="book.userId">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>ชื่อผู้จอง</label><br />
                            <label
                              >{{ book.userfirst }} {{ book.userlast }}</label
                            >
                          </div>
                        </div>
                        <div class="col-md-6" style="text-align: right">
                          <a :href="'/HistoryDentist?id=' + mapId">
                            <i class="fa-regular fa-id-card fa-3x"></i
                          ></a>
                        </div>
                      </div>

                      <div class="form-group" v-if="book.confirmstatus">
                        <label>สถานะ</label><br />
                        <label v-if="book.confirmstatus == 1"
                          >ยืนยันการจองคิว</label
                        >
                        <label v-if="book.confirmstatus == 0"
                          >ยกเลิกการจองคิว</label
                        >
                      </div>
                      <div class="form-group" v-if="alltoken.length > 0">
                        <label>ข้อความแจ้งเตือนไลน์</label>
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            v-model="book.noti"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text"
                              ><i class="fa-brands fa-line"></i
                            ></span>
                          </div>
                        </div>
                      </div>

                      <button
                        v-if="alltoken.length > 0"
                        type="button"
                        class="btn btn-success btn-sm"
                        @click="sentline()"
                      >
                        ส่งข้อความแจ้งเตือนไลน์
                      </button>

                      <div class="form-group" v-if="book.userId">
                        <label>ข้อความแจ้งเตือนไลน์</label>
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            v-model="book.noti"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text"
                              ><i class="fa-brands fa-line"></i
                            ></span>
                          </div>
                        </div>
                      </div>

                      <button
                        v-if="book.userId"
                        type="button"
                        class="btn btn-success btn-sm"
                        @click="sentline()"
                      >
                        ส่งข้อความแจ้งเตือนไลน์
                      </button>
                    </div>
                  </form>
                </div>
                <div class="modal-footer mt-3">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deletequeall()"
                    v-if="allday"
                  >
                    ลบคิวทั้งหมด
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deletequeandsendnotify()"
                    v-if="!alltoken"
                  >
                    แจ้งยกเลิกคิวทั้งหมดและส่งแจ้งเตือน
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteque()"
                    v-if="book.userfirst"
                  >
                    แจ้งยกเลิกคิวและส่งแจ้งเตือน
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteq()"
                    v-if="!book.userId && !allday"
                  >
                    ลบคิว
                  </button>
                  <!-- <button type="button" class="btn btn-success" @click="save()" v-if="book.bookstatus == 0">
              บันทึก
            </button> -->
                  <button
                    id="closeduser"
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='../assets/locale/th'></script>

<script>
import DoctorService from "../services/DoctorService";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UserService from "../services/UserService";
import LinkImageService from "../services/LinkImageService";
import esLocale from "@fullcalendar/core/locales/th";
import AppointmentTypeService from "../services/AppointmentTypeService";
import DentistTypeService from "../services/DentistTypeService";
import LocationTypeService from "../services/LocationTypeService";
import MakingAppointmentsService from "../services/MakingAppointmentsService";
import EventDentistService from "../services/EventDentistService";
import MapEventsDentistService from "../services/MapEventsDentistService";
import HistorydentistService from "../services/HistorydentistService";
import MapHistoryDentistService from "../services/MapHistoryDentistService";
import NotificationService from "../services/NotificationService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      nametype:{},
      typeappointments: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        weekends: true,
        eventClick: this.handleEventClick,
        views: {
          dayGridMonth: {
            dayHeaderFormat: {
              weekday: "long",
            },
          },
        },
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,dayGridMonth",
        },
        height: 850,
        locale: esLocale,
        scrollTime: "08:00",
        omitZeroMinute: false,
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        },
        events: [],
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
      doctor_id: "",
      data: {},
      day: [
        {
          id: 1,
          nameth: "วันจันทร์",
          nameen: "MON",
        },
        {
          id: 2,
          nameth: "วันอังคาร",
          nameen: "TUE",
        },
        {
          id: 3,
          nameth: "วันพุธ",
          nameen: "WED",
        },
        {
          id: 4,
          nameth: "วันพฤหัสบดี",
          nameen: "THUR",
        },
        {
          id: 5,
          nameth: "วันศุกร์",
          nameen: "FRI",
        },
      ],
      doctors: [],
      header: "",
      allday: true,
      head: "",
      shphId: "",
      shphName: "",
      mapId: "",
      time: {},
      types: [],
      locations: [],
      masseusetype: [],
      timeline: "",
      docname: "",
      userId: 0,
      history: [],
      historyraw: "",
      makeId: 0,
      UID: "",
      eventId:[],
      noti:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));
    this.doctor_id = this.$route.query.id;
    if (this.$route.query.makeId) {
    this.makeId = this.$route.query.makeId;
    }
    if (this.$route.query.userId) {
    this.userId = this.$route.query.userId;
    }
    
    if(this.userId != 0){
      UserService.getUID(this.userId).then((res) => {
        // console.log(res.data.UID);
        this.UID = res.data.UID;
        this.userId = res.data.id;
        this.getEvents()
      });
    }else{
      this.getEvents();
    }
    // console.log(this.makeId);
    // console.log(this.userId);
    if (this.makeId != 0) {
      MakingAppointmentsService.findOnedentist(this.makeId).then((res) => {
      this.data = res.data;
      // console.log(this.data);
      this.masseusetype = JSON.parse(res.data.type);
      this.eventId = JSON.parse(res.data.eventId);
      UserService.getUID(this.data.userId).then((res) => {
        // console.log(res.data.UID);
        this.UID = res.data.UID;
        this.userId = res.data.id;
        this.getEvents()
      });
    });
    
    }
    // this.shphId = this.$route.query.shphId
    // shphmasseusetimeService.getshph_masseuse_time(this.shphId).then((res)=>{
    //   var start = res.data.start.split(":")
    //   var finish = res.data.finish.split(":")
    //   this.time.start = parseInt(start)
    //   this.time.finish = parseInt(finish)
    //   // console.log(this.time);
    // })
    // console.log(this.doctor_id);
    UserService.getUser(this.doctor_id).then((res) => {
      this.head = res.data.firstname + " " + res.data.lastname;
    });
    // shphService.getShph(this.shphId).then((res)=>{
    // this.shphName = res.data.name
    // });
    this.getUsers();
    this.gettypeappointments();
    this.gettypes();
    this.getlocations();
    this.gethistory();
    if (
      this.currentUser.firstname == null ||
      this.currentUser.firstname == ""
    ) {
      alert("กรุณากรอกข้อมูลส่วนตัวให้ครบ");
      this.$router.push("/profile");
    }
    NotificationService.getnotification(1).then((res)=>{
      this.noti = res.data
    })
  },
  methods: {
    gethistory() {
      MapHistoryDentistService.getmap_history_user_dentists(1).then((res) => {
        this.history = res.data;
        // console.log(this.history);
      });
    },
    getlocations() {
      LocationTypeService.getlocations(1).then((res) => {
        this.locations = res.data;
      });
    },
    gettypeappointments() {
      AppointmentTypeService.getappointments(1).then((res) => {
        this.typeappointments = res.data;
      });
    },
    gettypes() {
      DentistTypeService.getdentisttypes(1).then((res) => {
        this.types = res.data;
      });
    },
    sentline() {
      UserService.getUser(this.book.userId).then((res) => {
        // console.log(res.data.line_token);
        LinkImageService.sendNotify(
          this.book.noti + " วันที่ " + this.header + " ที่" + this.shphName,
          res.data.line_token
        );
      });
    },
    converttimeend(time) {
      return time;
    },
    converttime(time, end) {
      // console.log(end);
      // console.log(time.length);
      if (time.length == 2 || time.length == 3) {
        time = time.split("a");
        time = time[0] + ":00 น.";
      } else if (time == "") {
        time = "";
      } else {
        time = time.replace("a", " น.");
      }
      if (end) {
        var date = new Date(end);
        // console.log(end);
        time +=
          " - " +
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0") +
          " น.";
      }
      // if (time.length == 2 || time.length == 3) {
      //   time = time.split('a')
      //   time = time[0] + ':00 น.'
      // } else if (time == '') {
      //   time = ''
      // } else {
      //   time = time.replace('a', ' น.')
      // }
      return time;
    },

    getEvents() {
      EventDentistService.getevents("", this.doctor_id, "",this.userId).then((res) => {
        this.calendarOptions.events = res.data;
        // console.log(res.data);
        // this.calendarOptions.events = this.events
        //   this.calendarOptions.events.push({
        //   title:'test',
        //   date:'2023-09-01'
        // })
        // console.log(this.calendarOptions.events);
      });
    },
    handleEventClick(clickInfo) {
      this.mapId = clickInfo.event.groupId;
      var id = clickInfo.event.id;

      // console.log(this.mapId);
      var breaktime = new Date(clickInfo.event.start);

      var d =
        breaktime.getFullYear() +
        "-" +
        (parseInt(breaktime.getMonth()) + 1).toString().padStart(2, "0") +
        "-" +
        breaktime.getDate().toString().padStart(2, "0");
      var now = new Date();
      var selectdate = new Date(d);

      now =
        now.getFullYear() +
        "-" +
        (parseInt(now.getMonth()) + 1).toString().padStart(2, "0") +
        "-" +
        now.getDate().toString().padStart(2, "0");
      now = new Date(now);

      // console.log(selectdate,now);

      if (breaktime.getHours() != 12) {
        console.log(clickInfo.event.id);
        console.log(this.calendarOptions.events);
        for (let c = 0; c < this.calendarOptions.events.length; c++) {
          if (this.calendarOptions.events[c].id == clickInfo.event.id) {
            if (this.calendarOptions.events[c].title == "จองแล้ว") {
              this.calendarOptions.events[c].title = "ว่าง";
              this.calendarOptions.events[c].backgroundColor = "green";
              this.calendarOptions.events[c].borderColor = "green";
            } else {
              this.calendarOptions.events[c].title = "จองแล้ว";
              this.calendarOptions.events[c].backgroundColor = "green";
              this.calendarOptions.events[c].borderColor = "green";
            }
          }
        }
      }
    },
    timeformat(time) {
      time = time.split(":");
      return time[0] + "." + time[1] + " น.";
    },
    searchdoctor() {
      var d = new Date(this.user.date);
      var day = d.getDay();
      DoctorService.getdoctors(day).then((res) => {
        this.doctors = res.data;
      });
    },
    searchtime() {
      // console.log(this.doctor_id);
      DoctorService.gettimebydoctor(this.doctor_id).then((res) => {
        // console.log(res.data);
        this.courses = res.data;
      });
    },
    gettime(start, end) {
      var s = start.split(":");
      var e = end.split(":");
      var value = s[0] + "." + s[1] + "-" + e[0] + "." + e[1] + " น.";
      return value;
    },
    getid(id) {
      this.alltoken = [];
      // console.log(id);
      this.user_id = id;
      if (id != 0) {
        // console.log(this.user_id);
        EventDentistService.getevent(id).then((res) => {
          // console.log(res.data);
          this.book = res.data;
          console.log(this.book);
          EventDentistService.getevents(
            this.book.date,
            this.doctor_id,
            this.shphId,
            0
          ).then((res) => {
            console.log(res.data);
            for (let a = 0; a < res.data.length; a++) {
              // console.log(res.data[a].id);
              if (res.data[a].userId != null) {
                this.alltoken.push(res.data[a]);
              }
            }
          });
          console.log(this.alltoken);
        });
      } else {
        this.course_id = [];
        this.days = [];
        this.book = {};
      }
    },
    deleteq() {
      // var userdata = {
      //   noti: this.book.noti,
      //   title: this.book.title,
      //   userId: this.book.userId,
      // };
      EventDentistService.deleteevent(this.user_id).then(() => {
        // console.log(res.data);
        var his = {
          eventId: this.user_id,
          title: "ลบคิว",
          createdBy: this.currentUser.id,
        };
        HistorydentistService.createhistoryhistorydentist(his).then(() => {
          document.getElementById("closeduser").click();
          this.getEvents();
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);
        });
      });
    },
    Script_checkID(id) {
      var i = 0;
      var sum = 0;
      if (id.substring(0, 1) == 0) return false;
      if (id.length != 13) return false;
      for (i = 0, sum = 0; i < 12; i++)
        sum += parseFloat(id.charAt(i)) * (13 - i);
      if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
      return true;
    },
    gettimeline(events) {
      var time = " เวลา ";
      // var docname = ''
      // console.log(this.event_id);
      for (let ee = 0; ee < events.length; ee++) {
        EventDentistService.getevent(events[ee]).then((res) => {
          // console.log(res.data);
          if (events.length > 1 && ee + 1 == events.length) {
            time += " - ";
          }
          if (ee == 0 || ee + 1 == events.length) {
            time += this.timeformat(res.data.date);
            // console.log(time);
          }
          // docname = res.data.firstname +' '+ res.data.lastname
          // console.log(ee+1 , events.length);
          if (ee + 1 == events.length) {
            this.timeline = time;
            this.docname = res.data.firstname + " " + res.data.lastname;
            console.log(this.timeline);
          }
        });
      }
    },
    save() {
      console.log(this.userId);
      if (
        this.data.typeappointmentId == "" ||
        this.data.typeappointmentId == null
      ) {
        alert("กรุณาเลือกประเภทการนัดหมาย");
      } else if (this.masseusetype.length == 0) {
        alert("กรุณาเลือกประเภทการ"+this.nametype.dentist);
      } else if (this.UID == "" || this.UID == null) {
        alert("กรุณากรอกเลขบัตรประชาชน");
      } else if (!this.Script_checkID(this.UID)) {
        alert("กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง");
      } else if (this.data.locationId == "" || this.data.locationId == null) {
        alert("กรุณาเลือกสถานที่ตรวจ");
      } else {
        if (this.userId == 0) {
          UserService.checkUID(this.UID,'').then(async (res) => {
            console.log(res.data);
            if (res.data.length == 0) {
              alert("ไม่พบเลขบัตรประชาชนนี้ในระบบ");
            } else {
              this.userId = res.data[0].id;
              // console.log(res.data);
              this.saveBook();
            }
          });
        } else {
          this.saveBook();
        }
      }
    },
    saveBook() {
      if (this.makeId != 0) {
        for (let e = 0; e < this.eventId.length; e++) {
          var userdata = {
            bookstatus: 1,
            title: "ว่าง",
            userId: null,
          };
          // console.log(userdata);
          // console.log(res.data);
          EventDentistService.updateuser(this.eventId[e], userdata).then(() => {
            if (e + 1 == this.eventId.length) {
              var his = 'UPDATE map_events SET status = 0'

              var sql = his + ` WHERE id = ${this.data.id}`
              // console.log(sql);
              EventDentistService.createsql(sql).then(() => {
                var his = 'DELETE FROM history_user_dentist'

              var sql = his + ` WHERE eventId = ${this.data.id}`
              // console.log(sql);
              EventDentistService.createsql(sql).then(() => {
                this.saveAppoint()
              });
              });
            }
          })
        }
      }else{
        this.saveAppoint()
      }
    },
    saveAppoint(){

      MapEventsDentistService.findbyuserId(this.userId).then((res) => {
        console.log(res.data);
        if (res.data) {
          for (let h = 0; h < this.history.length; h++) {
            this.history[h].detail =
              res.data[this.history[h].historyuserdentistId];
            // this.historyraw += "'" + res.data[this.history[h].historyuserdentistId] + "'" + ','
          }
        }else{
          for (let h = 0; h < this.history.length; h++) {
            this.history[h].detail = '-'
          }
        }
      });
      var checkbook = false;
      var checkdate= false;
      var events = [];
      var time = "";
      var day = "";
      var shphId = "";
      for (let c = 0; c < this.calendarOptions.events.length; c++) {
        if (this.calendarOptions.events[c].title == "จองแล้ว") {
          checkbook = true;
          // console.log(this.calendarOptions.events[c]);
          var date = new Date(this.calendarOptions.events[c].date);
          shphId = this.calendarOptions.events[c].shphId;
          // console.log(day);
          if (
            day != "" &&
            day !=
              parseInt(date.getFullYear()) +
                "-" +
                (parseInt(date.getMonth()) + 1).toString().padStart(2, "0") +
                "-" +
                parseInt(date.getDate()).toString().padStart(2, "0")
          ) {
            checkdate = true
            // alert("กรุณาเลือกวันนัดหมายให้ตรงกัน");
          } else {
            var day =
              parseInt(date.getFullYear()) +
              "-" +
              (parseInt(date.getMonth()) + 1).toString().padStart(2, "0") +
              "-" +
              parseInt(date.getDate()).toString().padStart(2, "0");
            // console.log(day);

            if (events.length == 0) {
              time += "เวลา ";
            }
            if (events.length != 0) {
              time += " - ";
            }
            time +=
              parseInt(date.getHours()).toString().padStart(2, "0") +
              "." +
              parseInt(date.getMinutes()).toString().padStart(2, "0");
            time += " น.";

            // console.log(time);
            events.push(this.calendarOptions.events[c].id);
          }
        }
      }
      // console.log(checkdate);
      if (checkbook == false) {
        alert("กรุณาเลือกวันและเวลานัดหมาย");
      }else if (checkdate == true) {
        alert("กรุณาเลือกวันนัดหมายให้ตรงกัน");
      } 
      else {
        console.log(events);
        for (let e = 0; e < events.length; e++) {
          var userdata = {
            bookstatus: 0,
            title: "จองแล้ว",
            userId: this.userId,
          };
          console.log(userdata);
          // console.log(res.data);
          EventDentistService.updateuser(events[e], userdata).then(() => {
            if (e + 1 == events.length) {
              var map = {
                date: day,
                shphId: shphId,
                doctorId: this.doctor_id,
                eventId: events,
                userId: this.userId,
                createdBy: this.currentUser.id,
                time: time,
                typebook: 3,
                type: this.masseusetype,
              };
              // console.log(map);
              MapEventsDentistService.createmap_event(map).then((res) => {
                var mapId = res.data.id;
                // console.log(this.history);
                // console.log(this.historyraw);
                var his = "INSERT INTO history_user_dentist (id, eventId,";
                var value = "VALUES (NULL, " + mapId + ",";
                for (let h = 0; h < this.history.length; h++) {
                  // console.log(this.history[h].historyuserdentistId);
                  // console.log(this.history[h].text);
                  his += this.history[h].historyuserdentistId + ",";
                  value += "'" + this.history[h].detail + "'" + ",";
                }
                his = his.slice(0, -1);
                his = his + ") ";
                value = value.slice(0, -1);
                value = value + ") ";
                // console.log(his);
                // console.log(value);
                var sql = his + value;
                // console.log(sql);
                EventDentistService.createsql(sql).then(() => {
                  var make = {
                    mapeventdentistId: mapId,
                    typeappointmentId: this.data.typeappointmentId,
                    locationId: this.data.locationId,
                    date: day,
                    time: time,
                  };
                  // console.log(make);
                  if (this.makeId == 0) {
                    MakingAppointmentsService.createmaking_appointment(make).then(
                    (res) => {
                      EventDentistService.getappointbyId(res.data.id).then((res)=>{
                        var message_appointment = ''
                            if (res.data.eventtype == 1) {
                                message_appointment = this.noti.message_appointment_chiropractor
                            }else{
                                message_appointment = this.noti.message_appointment_dentist
                            }
                        var breaktime = new Date(res.data.date)
                            var header = breaktime.toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) + res.data.time
                            UserService.getUser(this.userId).then((user)=>{
                            var messagedoc = 'คุณได้นัดหมาย' + ' '+user.data.firstname+ ' '+user.data.lastname+' '+res.data.appoint+' '+res.data.typename+ ' วันที่ ' + header + ' ที่ ' + res.data.location
                            var message = message_appointment + ' '+res.data.appoint+' '+res.data.typename+' หมอ' + res.data.firstname + ' ' + res.data.lastname + ' วันที่ ' + header + ' ที่ ' + res.data.location
                            LinkImageService.sendNotify(messagedoc, this.currentUser.line_token)
if (user.data.line_token) {
  LinkImageService.sendNotify(message, user.data.line_token)
}
                            })
                      alert("บันทึกสำเร็จ");
                      })
                    }
                  );
                  }else{
                  MakingAppointmentsService.updatemaking_appointment(this.makeId,make).then(
                    () => {
                      alert("บันทึกสำเร็จ");
                    }
                  );
                  }
                });
              });
            }
          });
        }
      }
    },
    getUsers() {
      DoctorService.getdoctors("").then((res) => {
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
