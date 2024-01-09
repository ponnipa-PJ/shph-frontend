<template>
    <div class="row">

  <div class="container">
    <h4 class="mt-5" style="text-align:center;font-size: 1.5rem;">{{ shphName }}</h4>
    <h5 class="mb-5" style="text-align:center;font-size: 1.5rem;">จองคิว{{nametype.masseuse}}ประจำเดือน</h5>

    <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
      <template v-slot:eventContent='arg'>
        <!-- <b>{{ converttime(arg.timeText) }}</b> -->
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
    <div class="col mb-3 mt-3" style="text-align: right">
      <a>
        <button style="display: none;" type="button" id="AddEventDentist" class="btn btn-success" data-bs-toggle="modal"
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }} {{ docname }}</h5>

          </div>
          <div class="modal-body">
            <div class="col-12 col-sm-12">
              <div class="card card-primary card-tabs">
                <div class="card-header p-0 pt-1">
                  <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" @click="selectbook()" id="booknew" data-toggle="pill"
                        href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home"
                        aria-selected="true">จองคิว</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="booktab" data-toggle="pill" @click="selecthis()" 
                        href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile"
                        aria-selected="false">ประวัติการจอง</a>
                    </li>
                    <!-- <li class="nav-item">
                      <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill"
                        href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages"
                        aria-selected="false">Messages</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="custom-tabs-one-settings-tab" data-toggle="pill"
                        href="#custom-tabs-one-settings" role="tab" aria-controls="custom-tabs-one-settings"
                        aria-selected="false">Settings</a>
                    </li> -->
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="custom-tabs-one-tabContent">
                    <div class="tab-pane fade active show" id="custom-tabs-one-home" role="tabpanel"
                      aria-labelledby="custom-tabs-one-home-tab">
                      <form>
                        <div class="card-body" style="padding:0px">
                          <div class="form-group mt-3">
                  <label for="password">ประเภทการจอง</label>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in booktype" :key="r" :value="i.id">
                      <input class="form-check-input" type="radio" name="radio1" :id="i.id" @change="gettype()"
                        :value="i.id" v-model="typebook">
                      <label :for="i.id" class="form-check-label">{{ i.name }}</label>
                    </div>
                  </div>
                </div>
                <div class="form-group mt-3" style="margin-bottom: 0px;" v-if="typebook == 2">
                  <label for="password">เลขบัตรประชาชน</label>
                </div>

                <div class="input-group input-group-sm" v-if="typebook == 2">
<input type="text" class="form-control" v-model="uid">
<span class="input-group-append">
<button type="button" class="btn btn-info btn-flat" @click="searchuid()">ค้นหา</button>
</span>
</div>
<div class="form-group mt-3" style="margin-bottom: 0px;" v-if="cusname!={}">
                  <label for="password">
                    <span v-if="cusname">{{ cusname.UID }} {{cusname.firstname}} {{cusname.lastname}}</span>
                  <span v-else>ไม่พบข้อมูล</span></label>
                </div>
                

                          <div class="form-group mt-3">
                            <label>เวลา</label><br />
                            <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in doctors" :key="r">
                                <input class="form-check-input" type="checkbox" :id="i.date" :value="i.id"
                                  v-model="event_id">
                                <label :for="i.date" class="form-check-label">{{ timeformat(i.date) }}</label>
                              </div>
                            </div>
                            <label>ประเภทการ{{nametype.masseuse}}</label><br />
                              <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in masseusetypes" :key="r">
                                <input class="form-check-input" type="checkbox" :id="'checkbox' + i.id" :value="i.id" :name="'checkbox' + i.id"
                                  v-model="masseusetype">
                                <label :for="'checkbox' + i.id" class="form-check-label">{{ i.name }}</label>
                              </div>
                            </div>
                            <div class="form-group" v-for="(h, r) in history" :key="r">
                              <label>{{ h.name }}</label>
                              <div class="input-group">
                                <input type="text" class="form-control form-control-sm" v-model="h.detail">
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </form>
                      <button type="button" class="btn btn-success" @click="save()">
                        จองคิว
                      </button>
                      <!-- <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button> -->
                    </div>
                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel"
                      aria-labelledby="custom-tabs-one-profile-tab">
                      <table class="table table-bordered" v-if="showbook">
                        <thead>
                          <tr>
                            <th style="width: 10px">#</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ประเภทการจอง</th>
                            <th>เวลา</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(b,i) in booklist" :key="i">
                            <td>{{ i+1 }}</td>
                            <td>{{ b.firstname }} {{ b.lastname }}</td>
                            <td>
                              {{b.type}}
                            </td>
                            <td>
                            {{b.time}}</td>
                            <td><button type="button" class="btn btn-warning" @click="edit(b.id)">
                        แก้ไข
                      </button></td>
                          </tr>
                        </tbody>
                      </table>
                      <div v-else>
                        <form>
                        <div class="card-body" style="padding:0px">
                          <div class="form-group mt-3">
                  <label for="password">ประเภทการจอง</label>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox" v-for="(i, r) in booktype" :key="r" :value="i.id">
                      <input class="form-check-input" type="radio" name="radio1" :id="i.id" disabled
                        :value="i.id" v-model="typebookupdate">
                      <label :for="i.id" class="form-check-label">{{ i.name }}</label>
                    </div>
                  </div>
                </div>
                          <div class="form-group">
                            <label>เวลา</label><br />
                            <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in doctorsupdate" :key="r">
                                <input class="form-check-input" type="checkbox" :id="i.date" :value="i.id"
                                  v-model="event_id_update">
                                <label :for="i.date" class="form-check-label">{{ timeformat(i.date) }}</label>
                              </div>
                            </div>
                            <label>ประเภทการ{{nametype.masseuse}}</label><br />
                              <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in masseusetypes" :key="r">
                                <input class="form-check-input" type="checkbox" :id="'checkboxupdate' + i.id" :value="i.id" :name="'checkboxupdate' + i.id"
                                  v-model="masseusetypeupdate">
                                <label :for="'checkboxupdate' + i.id" class="form-check-label">{{ i.name }}</label>
                              </div>
                            </div>
                            <div class="form-group" v-for="(h, r) in history_update" :key="r">
                              <label>{{ h.name }}</label>
                              <div class="input-group">
                                <input type="text" class="form-control form-control-sm" v-model="h.detail">
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <button type="button" class="btn btn-success" @click="update()">
                        บันทึก
                      </button>&nbsp;
                      <button type="button" class="btn btn-danger" @click="deleteque()">
                        ยกเลิกการจอง
                      </button>&nbsp;
                      <button type="button" class="btn btn-info" @click="back()">
                        ย้อนกลับ
                      </button>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel"
                      aria-labelledby="custom-tabs-one-messages-tab">
                      Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus volutpat augue id
                      mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce nec hendrerit sem, ac
                      tristique nulla. Integer vestibulum orci odio. Cras nec augue ipsum. Suspendisse ut velit
                      condimentum, mattis urna a, malesuada nunc. Curabitur eleifend facilisis velit finibus tristique.
                      Nam vulputate, eros non luctus efficitur, ipsum odio volutpat massa, sit amet sollicitudin est
                      libero sed ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum
                      metus arcu vel metus. Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.
                    </div>
                    <div class="tab-pane fade" id="custom-tabs-one-settings" role="tabpanel"
                      aria-labelledby="custom-tabs-one-settings-tab">
                      Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus turpis ac,
                      ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis vulputate. Morbi
                      euismod molestie tristique. Vestibulum consectetur dolor a vestibulum pharetra. Donec interdum
                      placerat urna nec pharetra. Etiam eget dapibus orci, eget aliquet urna. Nunc at consequat diam. Nunc
                      et felis ut nisl commodo dignissim. In hac habitasse platea dictumst. Praesent imperdiet accumsan ex
                      sit amet facilisis.
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div class="modal-footer mt-3">
            <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button>
          </div>
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
import EventService from '../services/EventService'
import UserService from '../services/UserService'
import LinkImageService from '../services/LinkImageService'
import NotificationService from '../services/NotificationService'
import esLocale from '@fullcalendar/core/locales/th';
import shphService from '../services/shphService'
import HistorymasseuseService from '../services/HistorymasseuseService'
import MapHistoryMasseuseService from '../services/MapHistoryMasseuseService'
import MapEventsService from '../services/MapEventsService'
import MasseuseTypeService from '../services/MasseuseTypeService'

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
        locale: esLocale,
        height: 850,
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
      event_id: [],
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
      noti: {},
      eventold: [],
      date: '',
      shphId: 0,
      shphName: '',
      history: [],
      eventId: 0,
      timeline: '',
      docname: '',
      booklist: [],
      showbook:true,
      booktype:[],
      typebook:1,
      typebookupdate:1,
doctorsupdate:[],
event_id_update:0,
history_update:[],
eventId_update:0,
userId:0,
uid:'',
cusname:{},
masseusetypes:[],
masseusetype:[],
masseusetypeupdate:[],
nametype:{},
masseusetypebook:''
    };
  },
  
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));
    // console.log(this.nametype);
    this.shphId = this.$route.query.id
    // console.log(this.$route.query.id);
this.userId = this.currentUser.id
    shphService.getShph(this.shphId).then((res) => {
      this.shphName = res.data.name
    })
    NotificationService.getnotification(1).then((res) => {
      this.noti = res.data
    this.getEvents()
    })
    this.gettypebook()
    this.getUsers();
    this.gethistory()
    this.getmasseusetypes()
    // console.log(this.currentUser);
  },
  methods: {
    gettype(){
      this.uid = ''
      this.cusname = {}
      if (this.typebook == 2) {
this.userId = ""
        
      }else{
        this.userId = this.currentUser.id
      }
    },
    getmasseusetypes(){
      MasseuseTypeService.getmasseusetypes(1).then((res) => {
      this.masseusetypes = res.data
    })
    },
    selecthis(){
      this.showbook = true
    },
    selectbook(){
this.getid(1,this.date)
    },
    searchuid(){
      this.cusname = {}
UserService.searchuid(this.uid).then((res)=>{
  this.cusname = res.data
        if (this.cusname) {
          this.userId = res.data.id
        }
      })
    },
    gettypebook(){
      MapEventsService.gettypesbook().then((res)=>{
        this.booktype = res.data
      })
    },
    changebook(){

    },
    back(){
      this.showbook = true
    },
    edit(id){
      this.gethistoryupdate()
this.showbook = false
this.getmap(id)
    },
    getmap(id){
      // console.log(id);
      this.eventIdupdate = id
            // console.log(this.doctors);
            // console.log(this.book);
            MapEventsService.getmap_event(this.eventIdupdate).then((res) => {
              if (res.data) {
              this.userId = res.data.userId
                this.eventId_update = res.data.eventId
                this.event_id_update = JSON.parse(res.data.eventIdlist)
                this.eventold = JSON.parse(res.data.eventIdlist)
                this.allday = false
                this.typebookupdate = res.data.typebook
                this.masseusetypeupdate = JSON.parse(res.data.type)
                // console.log(this.history_update);
                for (let h = 0; h < this.history_update.length; h++) {
                  this.history_update[h].detail = res.data[this.history_update[h].historyuserdentistId]
                }
              }
              EventService.gettimebydoctoranddate(this.date, this.doctor_id, this.userId, this.shphId,2).then((res) => {
          
          this.doctorsupdate = res.data
              // console.log(res.data);
              
            });
            // console.log(this.allday);
          });
      
    },
    gethistoryupdate() {
      MapHistoryMasseuseService.getmap_history_user_masseuses(1).then((res) => {
        this.history_update = res.data
        // console.log(this.history);
      })
    },
    gethistory() {
      MapHistoryMasseuseService.getmap_history_user_masseuses(1).then((res) => {
        this.history = res.data
        // console.log(this.history);
      })
    },
    deleteque() {
      for (let e = 0; e < this.eventold.length; e++) {
        var updatenull = {
          bookstatus: 1,
          title: 'ว่าง',
          userId: null,
        };
        // console.log(userdata);
        // console.log(this.eventold[e]);
        EventService.updateuser(this.eventold[e], updatenull).then(() => {
          // console.log(e + 1, this.eventold.length);
          if (e + 1 == this.eventold.length) {
            var hisd = {
              eventId: this.eventId,
              title: 'ลบคิว',
              createdBy: this.currentUser.id
            }
            HistorymasseuseService.createhistorymasseus(hisd).then(() => {
              var his = 'UPDATE map_events SET status = 0'

              var sql = his + ` WHERE id = ${this.eventId_update}`
              console.log(sql);
              EventService.createsql(sql).then(() => {

                var message = this.noti.cancel_chiropractor + ' หมอ' + this.docname + ' วันที่ ' + this.header + this.timeline + ' ที่' + this.shphName
                // console.log(message);
                LinkImageService.sendNotify(message, this.currentUser.line_token)
                this.showbook = true
                              this.getalleventbycreatedBy()
                              EventService.gettimebydoctoranddate(this.date, this.doctor_id, this.currentUser.id, this.shphId,1).then((res) => {
            this.getalleventbycreatedBy()
            this.doctors = res.data
            // console.log(this.doctors);
          });
                // document.getElementById("closeduser").click();
                //  location.reload();

              })
            });

          }

        })
      }


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
      console.log(this.noti);
      EventService.getbooks('', this.noti.hour, this.shphId).then((res) => {
        console.log(res.data);
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
      var id = clickInfo.event.id
      var breaktime = new Date(clickInfo.event.start)

      var d = breaktime.getFullYear() + '-' + ((parseInt(breaktime.getMonth()) + 1).toString().padStart(2, "0")) + '-' + (breaktime.getDate().toString().padStart(2, "0"))

      // console.log(id);
      this.getid(id, d)
this.date = d
document.getElementById("booknew").click();
      document.getElementById("AddEventDentist").click();
      //   EventService.getevent(id).then((res) => {
      //     this.book = res.data
      //   // console.log(clickInfo.event.id);
      //   var breaktime = new Date(clickInfo.event.start)

      //   var d = breaktime.getFullYear() + '-' + ((parseInt(breaktime.getMonth()) + 1).toString().padStart(2, "0"))+ '-' + (breaktime.getDate().toString().padStart(2, "0"))

      //   EventService.geteventbyuseranddate(d,this.currentUser.id).then((res) => {
      //     // console.log(res.data);
      //     if (res.data.length == this.noti.hour && this.book.bookstatus == 1) {
      //       alert('ไม่สามารถจองคิวหมอนวดเกิน '+this.noti.hour+ ' ชั่วโมง')
      //     }else{
      //       var now = new Date()
      //   var selectdate = new Date(d)

      //   now = now.getFullYear() + '-' + (parseInt(now.getMonth()) + 1) + '-' + now.getDate()
      //   now = new Date(now)


      //   // console.log(d);

      //   if (selectdate < now || breaktime.getHours() == 12) {
      //     // console.log(1);
      //   } else{
      this.header = breaktime.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      //     this.getid(id)
      this.title = 'จองคิว'+this.nametype.masseuse+' วันที่ ' + breaktime.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      //     if (breaktime.getHours() != 0) {
      //       this.title += ' เวลา ' + this.timeformat(breaktime.toLocaleTimeString('th-TH'))
      //       this.header += ' เวลา ' + this.timeformat(breaktime.toLocaleTimeString('th-TH'))
      //       this.allday = false
      //     } else {
      //       this.allday = true
      //     }
      //   this.getid(id)

      //     document.getElementById("AddEventDentist").click();

      //   }
      //   // const result = date.toLocaleDateString('th-TH', {
      //   //   year: 'numeric',
      //   //   month: 'long',
      //   //   day: 'numeric',
      //   // })
      //   //       if (confirm(`ยืนการการลบ '${result}'`)) {
      //   //         // clickInfo.event.remove()
      //   //         var event = {
      //   //         status:0
      //   //       }
      //   //       EventService.updateevent(clickInfo.event.id,event).then(()=>{
      //   //         this.getEvents()
      //   //       })
      //   //       }
      //     }
      //   });
      // });

    },
    timeformat(date) {
      var time = date.split('T')
      time = time[1].split(':')
      // console.log(time);
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
    getalleventbycreatedBy() {
      this.masseusetype = []
      MapEventsService.geteventbycreatedBy(this.date, this.doctor_id, this.currentUser.id, this.shphId).then((res) => {
        console.log(res.data);
        this.booklist = res.data
      })
    },
    getid(id, date) {
      // console.log(date);
      this.date = date
      this.event_id = []
      this.eventold = []


      this.gethistory()
      if (id != 0) {
        EventService.getevent(id).then((res) => {
          // console.log(res.data);
          if (!this.doctor_id) {
          this.doctor_id = res.data.doctorId;
            
          }
          UserService.getUser(this.doctor_id).then((res) => {
            this.docname = res.data.firstname + ' '+ res.data.lastname
          })

          EventService.gettimebydoctoranddate(date, this.doctor_id, this.currentUser.id, this.shphId,1).then((res) => {
            this.getalleventbycreatedBy(date)
            this.doctors = res.data
            // console.log(this.doctors);
          });
        })
      } else {
        this.course_id = []
        this.days = []
        this.book = {};
      }

    },
    // getid(id, date) {
    //   // console.log(date);
    //   this.date = date
    //   this.event_id = []
    //   this.eventold = []


    //   this.gethistory()
    //   if (id != 0) {
    //     EventService.getevent(id).then((res) => {
    //       // console.log(res.data);
    //       this.doctor_id = res.data.doctorId;
    //       EventService.gettimebydoctoranddate(date, this.doctor_id, this.currentUser.id, this.shphId).then((res) => {
    //         this.getalleventbycreatedBy(date)
    //         this.doctors = res.data
    //         console.log(this.doctors);
    //         // console.log(this.book);
    //         EventService.getquebyuserid(date, this.currentUser.id, this.doctor_id, this.shphId).then((res) => {
    //           // console.log(res.data[0]);
    //           if (res.data.length != 0) {
    //             this.eventId = res.data[0].event_id
    //             this.event_id = JSON.parse(res.data[0].eventIdlist)
    //             this.eventold = JSON.parse(res.data[0].eventIdlist)
    //             this.allday = false
    //             console.log(this.history);
    //             for (let h = 0; h < this.history.length; h++) {
    //               this.history[h].detail = res.data[0][this.history[h].historyuserdentistId]
    //             }
    //           } else {
    //             this.allday = true
    //             this.eventId = 0

    //           }
    //         });
    //         // console.log(this.allday);
    //       });
    //     })
    //   } else {
    //     this.course_id = []
    //     this.days = []
    //     this.book = {};
    //   }

    // },
    save() {
      // console.log(this.history);

      this.gettimeline()
      var statushis = false
      var txt = ''
      for (let h = 0; h < this.history.length; h++) {
        if (this.history[h].detail == null || this.history[h].detail == "") {
          statushis = true
          txt = this.history[h].name
          break;
        }
      }
      // console.log(statushis);
      EventService.geteventbyuseranddate(this.date, this.userId,this.shphId).then((res) => {
        console.log((this.event_id.length+res.data.length) , this.noti.hour); 
        if (this.currentUser.role_id == 6 && this.event_id.length > this.noti.no_masseuse_worker) {
          alert('ไม่สามารถจองคิว'+this.nametype+'เกิน ' + this.noti.no_masseuse_worker + ' ชั่วโมง')
        }
        else if (this.currentUser.role_id != 6 && this.event_id.length > this.noti.hour) {
          alert('ไม่สามารถจองคิว'+this.nametype+'เกิน ' + this.noti.hour + ' ชั่วโมง')
        } else if(this.typebook == 2 && this.userId == null ||this.userId == ''){
alert('กรุณาเลือกประเภทการจองและกรอกข้อมูลให้ถูกต้อง')
        }else
          if (this.event_id.length == 0) {
            alert('กรุณาเลือกเวลา')
          }
          else if (this.masseusetype.length == 0) {
            alert('กรุณาประเภทการ'+this.nametype.masseuse)
          }
          
          else if (statushis == true) {
            alert('กรุณากรอก' + txt)
          } else {
            // var time = ' เวลา '
            this.masseusetypebook = ''
            for (let m = 0; m < this.masseusetype.length; m++) {
               MasseuseTypeService.getmasseusetype(this.masseusetype[m]).then((res)=>{
                this.masseusetypebook += ' '+res.data.name
               })
              }
            if (this.eventId == 0) {
              
              for (let e = 0; e < this.event_id.length; e++) {
                var userdata = {
                  bookstatus: 0,
                  title: 'จองแล้ว',
                  userId: this.userId,
                };
                console.log(userdata);
                // console.log(res.data);
                EventService.updateuser(this.event_id[e], userdata).then(() => {
                  // var his = {
                  //   eventId: this.event_id[e],
                  //   title: 'จองแล้ว',
                  //   createdBy: this.currentUser.id
                  // }
                  // HistorymasseuseService.createhistorymasseus(his).then(()=>{
                  // EventService.getevent(this.event_id[e]).then((res)=>{
                  //   console.log(res.data);

                  // if (this.event_id.length > 1 && e+1 == this.event_id.length) {
                  //   time+= ' - '
                  // }
                  // if (e== 0 || e+1 == this.event_id.length) {
                  // time += this.timeformat(res.data.date)
                  // }
                  // console.log(e+1 , this.event_id.length);
                  if (e + 1 == this.event_id.length) {
                    var map = {
                      date: this.date,
                      shphId: this.shphId,
                      doctorId: this.doctor_id,
                      eventId: this.event_id,
                      userId: this.userId,
                      createdBy: this.currentUser.id,
                      time:this.timeline,
                      typebook:this.typebook,
                      type:this.masseusetype
                    }
                    MapEventsService.createmap_event(map).then((res) => {
                      var his = 'INSERT INTO history_user_masseuse (id, eventId,'
                      var value = "VALUES (NULL, " + res.data.id + ","
                      for (let h = 0; h < this.history.length; h++) {
                        his += this.history[h].historyuserdentistId + ','
                        value += "'" + this.history[h].detail + "'" + ','
                      }
                      his = his.slice(0, -1)
                      his = his + ') '
                      value = value.slice(0, -1);
                      value = value + ') '
                      // console.log(his);
                      // console.log(value);
                      var sql = his + value
                      // console.log(sql);
                      EventService.createsql(sql).then(() => {
                        var message = this.noti.message_chiropractor  + ' '+this.masseusetypebook+ ' หมอ' + this.docname + ' วันที่ ' + this.header + this.timeline + ' ที่' + this.shphName
                        // console.log(message);
                        LinkImageService.sendNotify(message, this.currentUser.line_token)
                        document.getElementById("booktab").click();
                        this.getalleventbycreatedBy()

                      })
                    })
                    //           console.log(time);
                    // console.log(this.noti.message_chiropractor+' หมอ'+ res.data.firstname +' '+ res.data.lastname+' วันที่ ' + this.header + time);
                    //            LinkImageService.sendNotify(this.noti.message_chiropractor+' หมอ'+ res.data.firstname +' '+ res.data.lastname+' วันที่ ' + this.header + time, this.currentUser.line_token)
                    //            document.getElementById("closeduser").click();
                    //           //  location.reload();
                  }
                })
                // })
                //   });
              }
            } else {
              // UPDATE `map_events` SET `status` = '1' WHERE `map_events`.`id` = 1;
              for (let e = 0; e < this.eventold.length; e++) {
                var updatenull = {
                  bookstatus: 1,
                  title: 'ว่าง',
                  userId: null,
                };
                // console.log(userdata);
                console.log(this.eventold[e]);
                EventService.updateuser(this.eventold[e], updatenull).then(() => {
                  console.log(e + 1, this.eventold.length);
                  if (e + 1 == this.eventold.length) {
                    for (let ee = 0; ee < this.event_id.length; ee++) {
                      userdata = {
                        bookstatus: 0,
                        title: 'จองแล้ว',
                        userId: this.userId,
                      };
                      // console.log(userdata);
                      // console.log(res.data);
                      EventService.updateuser(this.event_id[ee], userdata).then(() => {



                        if (ee + 1 == this.event_id.length) {
                          var his = 'UPDATE history_user_masseuse SET '
                          for (let h = 0; h < this.history.length; h++) {
                            his += this.history[h].historyuserdentistId + " = " + "'" + this.history[h].detail + "'" + ','
                          }
                          his = his.slice(0, -1)
                          // his = his + ') '
                          // console.log(his);
                          // console.log(value);
                          var sql = his + ` WHERE id = ${this.eventId}`
                          // console.log(sql);
                          EventService.createsql(sql).then(() => {
                            var map_events = 'UPDATE map_events SET eventId = "[' + this.event_id + ']"' + ' and time = ' + this.timeline
                            map_events = map_events + ` WHERE id = ${this.eventId}`
                            // console.log(map_events);
                            EventService.createsql(map_events).then(() => {

                              var message = this.noti.message_chiropractor + ' หมอ' + this.docname + ' วันที่ ' + this.header + this.timeline + ' ที่' + this.shphName
                              // console.log(message);
                              LinkImageService.sendNotify(message, this.currentUser.line_token)
                              document.getElementById("booktab").click();
                              this.getalleventbycreatedBy()
                              //  location.reload();

                            })
                          })
                        }
                      });
                    }
                  }

                })
              }
            }
          }



      });



    },
    update() {
      this.gettimelineupdate()
      var statushis = false
      var txt = ''
      for (let h = 0; h < this.history_update.length; h++) {
        if (this.history_update[h].detail == null || this.history_update[h].detail == "") {
          statushis = true
          txt = this.history_update[h].name
          break;
        }
      }
      // console.log(statushis);
      EventService.geteventbyuseranddate(this.date, this.currentUser.id).then((res) => {
        console.log(res.data.length, this.noti.hour, this.event_id_update.length);
        if (this.event_id_update.length > this.noti.hour) {
          alert('ไม่สามารถจองคิว'+this.nametype+'เกิน ' + this.noti.hour + ' ชั่วโมง')
        } else
          if (this.event_id_update.length == 0) {
            alert('กรุณาเลือกเวลา')
          }
          else if (statushis == true) {
            alert('กรุณากรอก' + txt)
          } else {
              // UPDATE `map_events` SET `status` = '1' WHERE `map_events`.`id` = 1;
              for (let e = 0; e < this.eventold.length; e++) {
                var updatenull = {
                  bookstatus: 1,
                  title: 'ว่าง',
                  userId: null,
                };
                console.log(updatenull);
                console.log(this.eventold[e]);
                EventService.updateuser(this.eventold[e], updatenull).then(() => {
                  console.log(e + 1, this.eventold.length);
                  if (e + 1 == this.eventold.length) {
                    for (let ee = 0; ee < this.event_id_update.length; ee++) {
                      var userdata = {
                        bookstatus: 0,
                        title: 'จองแล้ว',
                        userId: this.userId,
                      };
                      // console.log(userdata);
                      // console.log(res.data);
                      EventService.updateuser(this.event_id_update[ee], userdata).then(() => {



                        if (ee + 1 == this.event_id_update.length) {
                          var his = 'UPDATE history_user_masseuse SET '
                          for (let h = 0; h < this.history_update.length; h++) {
                            his += this.history_update[h].historyuserdentistId + " = " + "'" + this.history_update[h].detail + "'" + ','
                          }
                          his = his.slice(0, -1)
                          // his = his + ') '
                          // console.log(his);
                          // console.log(value);
                          var sql = his + ` WHERE id = ${this.eventIdupdate}`
                          // console.log(this.event_id_update);
                          // console.log(this.timeline);
                          EventService.createsql(sql).then(() => {
                            var map_events = 'UPDATE map_events SET eventId = "[' + this.event_id_update + ']"' + ', type = "[' + this.masseusetypeupdate + ']"' + ' , time = ' + '"'+ this.timeline+ '"'
                            map_events = map_events + ` WHERE id = ${this.eventIdupdate}`
                            // console.log(map_events);
                            EventService.createsql(map_events).then(() => {

                              var message = this.noti.message_chiropractor + ' หมอ' + this.docname + ' วันที่ ' + this.header + this.timeline + ' ที่' + this.shphName
                              // console.log(message);
                              LinkImageService.sendNotify(message, this.currentUser.line_token)
                              // document.getElementById("closeduser").click();
                              this.showbook = true
                              this.getalleventbycreatedBy()
                              //  location.reload();

                            })
                          })
                        }
                      });
                    }
                  }

                })
              }
            }

      });



    },
    gettimelineupdate() {
      var time = ' เวลา '
      // var docname = ''
      // console.log(this.event_id);
      for (let ee = 0; ee < this.event_id_update.length; ee++) {
        EventService.getevent(this.event_id_update[ee]).then((res) => {
          // console.log(res.data);
          if (this.event_id_update.length > 1 && ee + 1 == this.event_id_update.length) {
            time += ' - '
          }
          if (ee == 0 || ee + 1 == this.event_id_update.length) {
            time += this.timeformat(res.data.date)
            // console.log(time);
          }
          // docname = res.data.firstname +' '+ res.data.lastname
          // console.log(ee+1 , this.event_id.length);
          if (ee + 1 == this.event_id_update.length) {
            this.timeline = time
            this.docname = res.data.firstname + ' ' + res.data.lastname
          }
        });

      }
    },
    gettimeline() {
      var time = ' เวลา '
      // var docname = ''
      // console.log(this.event_id);
      for (let ee = 0; ee < this.event_id.length; ee++) {
        EventService.getevent(this.event_id[ee]).then((res) => {
          // console.log(res.data);
          if (this.event_id.length > 1 && ee + 1 == this.event_id.length) {
            time += ' - '
          }
          if (ee == 0 || ee + 1 == this.event_id.length) {
            time += this.timeformat(res.data.date)
            // console.log(time);
          }
          // docname = res.data.firstname +' '+ res.data.lastname
          // console.log(ee+1 , this.event_id.length);
          if (ee + 1 == this.event_id.length) {
            this.timeline = time
            this.docname = res.data.firstname + ' ' + res.data.lastname
          }
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
}</style>
