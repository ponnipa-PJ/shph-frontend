<template>
  <div class="row">
    <div class="col-sm-5"></div>
    <div class="col-sm-4" ref="printMe" id="my-node" :name="name">
      <div class="mt-5 mb-5" style="text-align: center; margin: auto">
        <qr-code
          style="margin: auto"
          :text="link"
          error-level="Q"
        >
        </qr-code>
        <!-- <div>{{ name }}</div> -->
      </div>
    </div>
    <div class="col-sm-12">
      <div style="text-align: center">
        <button
          type="button"
          id="get_file"
          class="btn btn-info mt-3 mb-3"
          @click="printThis()"
        >
          <i class="fa fa-print"></i> ดาวน์โหลดคิวอาร์โค้ด
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LinkImageService from "../services/LinkImageService";
import html2canvas from "html2canvas";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      link: "",
      name: "",
    };
  },
  mounted() {
    // console.log(this.currentUser);
    this.link = LinkImageService.getLinkFrontend();
    
  },
  methods: {
    async printThis() {
      console.log("printing..");

      const el = this.$refs.printMe;

      const options = {
        type: "dataURL",
        width: "500px",
      };
      const printCanvas = await this.$html2canvas(el, options);
      this.image = printCanvas;
      //   var a = document.createElement("a"); //Create <a>
      // a.href = printCanvas; //Image Base64 Goes here
      // a.download = this.concert_name+ ".jpg"; //File name Here
      // a.target = '_blank';
      // a.click(); //Downloaded file

      html2canvas(document.getElementById("my-node")).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        var c =
          document.getElementById("my-node").getAttribute("name") + ".jpg";
        link.download = c;
        link.href = canvas.toDataURL();
        link.target = "_blank";
        link.click();
      });

      // this. printstatus = false
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
img {
  display: inline !important;
}
.qrcode {
  display: inline-block !important;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}
</style>
