'use strict'

const MAIN_URL_MARKETING_PROSPEK = 'https://pandusiwibandung.co.id/mpsb/data/images/prospek/'
// ACCOUNT RELATED INTERFACE
const ACCOUNT_LOGIN = 'api/auth/login.php' // method post
const PICKUP_DATA = 'api/pickup/getpickuporder.php' // method post
const DETAIL_PICKUP_DATA = 'api/pickup/detailpickup.php' // method post
const UPDATE_STATUS_PICKUP = 'api/pickup/updatestatuskurir.php' // method post
const PICKUP_HISTORY = 'api/pickup/pickuphistory.php'
const GET_CITY = 'api/master/getcity.php'
const GET_AWB = 'api/pickup/getawb.php'
const ADD_TEMP = 'api/temporary/addtemp.php'
const SAVE_ARRIVED = 'api/arrive/savearrived.php'
const GENERATE_COUNTER = 'api/temporary/counter_api.php'
const SAVE_WITH_COURIER = 'api/wc/savewithcourier.php'
const GET_DELIVERY = 'api/wc/getdelivery.php'
const GET_DELIVERY_HISTORY = 'api/wc/getdeliveryhistory.php'
const CITY_ORIG = 'api/master/gettujuan.php'
const ADD_SHIPMENT = 'api/shipment/addshipment.php'
const PICKUP_CHECKPOINT = 'api/pickup/pickupcheckpoint.php'

//marketing
const GET_PROSPEK = 'api/marketing/getprospek.php'
const GET_KUNJUNGAN = 'api/marketing/getkunjungan.php'

// const ACCOUNT_LOGIN = 'siapx/mobile_psb/android_login.php' // method post
// const PICKUP_DATA = 'siapx/mobile_psb/android_getpickuporder.php' // method post
// const DETAIL_PICKUP_DATA = 'siapx/mobile_psb/android_detailpickup.php' // method post
// const UPDATE_STATUS_PICKUP = 'siapx/mobile_psb/android_updatestatuskurir.php' // method post
// const PICKUP_HISTORY = 'siapx/mobile_psb/android_pickuphistory.php'
// const GET_CITY = 'siapx/mobile_psb/android_getcity.php'
// const GET_AWB = 'siapx/mobile_psb/android_getawb.php'
// const ADD_TEMP = 'siapx/mobile_psb/android_addtemp.php'
// const SAVE_ARRIVED = 'siapx/mobile_psb/android_savearrived.php'
// const GENERATE_COUNTER = 'siapx/mobile_psb/counter_api.php'
// const SAVE_WITH_COURIER = 'siapx/mobile_psb/android_savewithcourier.php'
// const CITY_ORIG = 'siapx/mobile_psb/android_gettujuan.php'
// const ADD_SHIPMENT = 'siapx/mobile_psb/android_addshipment.php'
// const PICKUP_CHECKPOINT = 'siapx/mobile_psb/android_pickupcheckpoint.php'

export {
    ACCOUNT_LOGIN,   
    PICKUP_DATA,
    DETAIL_PICKUP_DATA,
    UPDATE_STATUS_PICKUP,
    PICKUP_HISTORY,
    GET_CITY,
    GET_AWB,
    ADD_TEMP,
    SAVE_ARRIVED,
    GENERATE_COUNTER,
    SAVE_WITH_COURIER,
    GET_DELIVERY,
    GET_DELIVERY_HISTORY,
    CITY_ORIG,
    ADD_SHIPMENT,
    PICKUP_CHECKPOINT,
    GET_PROSPEK,
    GET_KUNJUNGAN,
    MAIN_URL_MARKETING_PROSPEK
}

export default {
    ACCOUNT_LOGIN,
    PICKUP_DATA,
    DETAIL_PICKUP_DATA,
    UPDATE_STATUS_PICKUP,
    PICKUP_HISTORY,
    GET_CITY,
    GET_AWB,
    ADD_TEMP,
    SAVE_ARRIVED,
    GENERATE_COUNTER,
    SAVE_WITH_COURIER,
    GET_DELIVERY,
    GET_DELIVERY_HISTORY,
    CITY_ORIG,
    ADD_SHIPMENT,
    PICKUP_CHECKPOINT,
    GET_PROSPEK,
    GET_KUNJUNGAN,
    MAIN_URL_MARKETING_PROSPEK
}
