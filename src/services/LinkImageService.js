import axios from "axios";

class LinkImageService {
  getLinkImage() {
    // return 'http://localhost:8081/uploadimage?name='
    // return 'https://api-hpkmae.ci2ict.com/uploadimage?name='
    return 'https://api.hpkmaeka.com/uploadimage?name='
  } 
  getLink() {
    // return 'http://localhost:8081'
    // return 'https://api-hpkmae.ci2ict.com'
    return 'https://api.hpkmaeka.com'
  } 
  getLinkFrontend(){
    // return 'http://localhost:8082'
    // return 'https://hpkmaeka.ci2ict.com'
    return 'https://www.hpkmaeka.com'
  }
  sendNotify(message,token){
    // return axios.get('http://localhost:8081/notify?message=' + message+'&&token=' + token);
    // return axios.get('https://api-hpkmae.ci2ict.com/notify?message=' + message+'&&token=' + token);
    return axios.get('https://api.hpkmaeka.com/notify?message=' + message+'&&token=' + token);
  }
  gettoken(code){
    // return axios.get('http://localhost:8081/gettoken?code=' + code);
    // return axios.get('https://api-hpkmae.ci2ict.com/gettoken?code=' + code);
    return axios.get('https://api.hpkmaeka.com/gettoken?code=' + code);
  }
}

export default new LinkImageService();