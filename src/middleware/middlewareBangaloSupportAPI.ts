import Axios from "axios"
import JSSHA from "jssha"

function dec2hex (s) {
  return (s < 15.5 ? "0" : "") + Math.round(s).toString(16)
}
function hex2dec (s) {
  return parseInt(s, 16)
}
function leftpad (str, len, pad) {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join(pad) + str
  }
  return str
}
function base32tohex (secret) {
  let bits = ""
  let hex = ""
  for (let i = 0; i < secret.length; i++) {
    const val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(secret.charAt(i).toUpperCase())
    bits += leftpad(val.toString(2), 5, "0")
  }
  for (let i = 0; i + 4 <= bits.length; i += 4) {
    const chunk = bits.substr(i, 4)
    hex = hex + parseInt(chunk, 2).toString(16)
  }
  return hex
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function getTotp () {
  const DATE_NOW = new Date()
  const UTC_DATE = `${DATE_NOW.getFullYear()}-${String(DATE_NOW.getMonth() + 1).padStart(2, "00")}-${String(DATE_NOW.getDate()).padStart(2, "00")}T`
  const UTC_TIME = `${String(DATE_NOW.getHours()).padStart(2, "00")}:${String(DATE_NOW.getMinutes()).padStart(2, "00")}:${String(DATE_NOW.getSeconds()).padStart(2, "00")}.${String(DATE_NOW.getMilliseconds()).padStart(3, "000")}-03:00`
  const DATE_TIME = new Date(`${UTC_DATE}${UTC_TIME}`).getTime()
  const SHA_OBJ = new JSSHA("SHA-1", "HEX")
  SHA_OBJ.setHMACKey(base32tohex(process.env.VUE_APP_BANGALO_SUPPORT_OTP_KEY), "HEX")
  SHA_OBJ.update(leftpad(dec2hex(Math.floor(Math.round(DATE_TIME / 1000.0) / 30)), 16, "0"))
  const HMAC = SHA_OBJ.getHMAC("HEX")
  let otp = (hex2dec(HMAC.substr(hex2dec(HMAC.substring(HMAC.length - 1)) * 2, 8)) & hex2dec("7fffffff")) + ""
  otp = (otp).substr(otp.length - 6, 6)
  return otp
}

const CONNECT_API = Axios.create({
  baseURL: process.env.VUE_APP_BANGALO_SUPPORT_API_URL,
  headers: {
    responseType: "json"
  }
})

CONNECT_API.interceptors.request.use((request) => {
  const TOKEN_CACHE = sessionStorage.getItem("token-user")

  if (TOKEN_CACHE) request.headers.Authorization = `Bearer ${TOKEN_CACHE}` || ""
  request.headers["x-api-key"] = process.env.VUE_APP_BANGALO_SUPPORT_API_KEY

  return request
}, function(error) {
  return Promise.reject(error)
})

CONNECT_API.interceptors.response.use((response) => {
  return response
}, function(error) {
  return Promise.reject(error)
})

export {
  CONNECT_API as MiddlewareConnectAPI
}
