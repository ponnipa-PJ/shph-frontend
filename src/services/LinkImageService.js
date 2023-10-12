import axios from "axios";

class LinkImageService {
  getLinkImage() {
    // return 'http://localhost:8081/uploadimage?name='
    return 'https://api.shphQueue.ponnipa.in.th/uploadimage?name='
  } 
  getLink() {
    return 'http://localhost:8081'
    // return 'https://api.shphQueue.ponnipa.in.th'
  } 
  getLinkFrontend(){
    // return 'http://localhost:8082'
    return 'https://shphqueue.ponnipa.in.th'
  }
  sendNotify(message,token){
    // return axios.get('http://localhost:8081/notify?message=' + message+'&&token=' + token);
    return axios.get('https://api.shphQueue.ponnipa.in.th/notify?message=' + message+'&&token=' + token);
  }
  gettoken(code){
    // return axios.get('http://localhost:8081/gettoken?code=' + code);
    return axios.get('https://api.shphQueue.ponnipa.in.th/gettoken?code=' + code);
  }
}

export default new LinkImageService();