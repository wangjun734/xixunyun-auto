const qs = require('qs')
global.navigator = {appName: 'nodejs'}; // fake the navigator object
global.window = {}; // fake the window object
const jsencrypt = require('jsencrypt');

const base64 = require('js-base64').Base64;
const pubkey = require('./pubkey')
const encrypt = new jsencrypt()
encrypt.setPublicKey(pubkey)
const data = qs.stringify({
account: process.env.ACCOUNT,
password: process.env.PASSWORD,
school_id: process.env.SCHOOL_ID,
request_source: 3,
system: '5.1.1'
})


const signdata = qs.stringify({
  address: process.env.ADDRESS,
  address_name: process.env.ADDRESS_NAME,
  latitude: base64.encode(encrypt.encrypt(process.env.LATITUDE)),
  longitude:base64.encode(encrypt.encrypt(process.env.LONGITUDE)),
  remark: 0,
  change_sign_resource: 0
})

const reportdata = (family_name, family_phone) => {
  return qs.stringify({
    health_type: 1,
    province_id: 0,
    city_id: 0,
    district_id: 0,
    hubei: 0,
    ill: 0,
    state: 1,
    family_name,
    family_phone,
    temperature: (36 + Math.random()).toFixed(1),
    safe: [],
    file: ''
  })
}

const headers = {
  "Host": "api.xixunyun.com",
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept-Encoding": "gzip",
  "User-Agent": "okhttp/3.8.1"
}
const loginApi = 'https://api.xixunyun.com/login/api?from=app&version=5.1.1&platform=android'
const signApi = (token) => {
  return `https://api.xixunyun.com/signin_rsa?token=${token}&from=app&version=5.1.1&platform=android&entrance_year=0&graduate_year=0&school_id=${process.env.SCHOOL_ID}`
}
const studentReportApi = (token) => {
  return `https://api.xixunyun.com/health/studentlist?token=${token}&page_no=1&page_size=1`
}
const studentReportCommitApi = (token) => {
  return `https://api.xixunyun.com/health/add?token=${token}`
}
const mail = process.env.MAIL
const code = process.env.CODE
const token = process.env.TOKEN
module.exports = {
  data,
  signdata,
  reportdata,
  loginApi,
  signApi,
  studentReportApi,
  studentReportCommitApi,
  headers,
  mail,
  code,
  token
}
