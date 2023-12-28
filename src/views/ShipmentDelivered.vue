<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title class="font-white">Shipment Delivered</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      
    <!-- </ion-content> -->
    <ion-content id="content-af" :fullscreen="true">
      <ion-card class="form-input">
        <ion-card-content>
          <form action="" ref="formAF">
            <div class="display-flex container-arrive">
              <ion-input
              ref="nomor"
              color="dark"
              label="Nomor"
              label-placement="floating"
              fill="outline"
              placeholder="Nomor"
              :class="v$.nomor.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.nomor.$error
                  ? v$.nomor.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.nomor"
              @ion-blur="markTouched"
            ></ion-input>
            
            <ion-button color="dark" @click="checkAWB">Submit AWB</ion-button>
            </div>
            <br>
            <ion-input
              readonly
              type="date"
              ref="tanggal"
              color="dark"
              label="Tanggal"
              label-placement="floating"
              fill="outline"
              placeholder="Tanggal"
              :class="v$.tanggal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.tanggal.$error
                  ? v$.tanggal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.tanggal"
              @ion-blur="markTouched"
            ></ion-input>
            <br>
            <ion-input
              readonly
              class="font-black"
              type="text"
              ref="namapengirim"
              color="dark"
              label="Nama Pengirim"
              label-placement="floating"
              fill="outline"
              placeholder="Nama Pengirim"
              v-model="state.namapengirim"
            ></ion-input>
            <br>
            
            <ion-input
              readonly
              class="font-black"
              v-model="state.alamatpengirim"
              color="primary"
              label="Alamat Pengirim"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              readonly
              class="font-black"
              v-model="state.namadituju"
              color="primary"
              label="Nama Dituju"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              readonly
              class="font-black"
              v-model="state.alamatdituju"
              color="primary"
              label="Alamat Dituju"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <!-- <ion-select readonly label="Tujuan" placeholder="Pilih Tujuan" default-href="/shipment-delivered/section-city">
            </ion-select> -->
            <ion-input
              class="font-black"
              v-model="state.tujuan"
              color="primary"
              label="Tujuan"
              label-placement="floating"
              fill="outline"
              readonly
            ></ion-input
            >
            
            <br />

            <div class="display-flex container-arrive">
              <ion-input
                readonly  
                class="font-black"
                v-model="state.berat"
                color="primary"
                label="Berat (Kg.)"
                label-placement="floating"
                fill="outline"
              ></ion-input
              >
              <ion-input
                readonly
                class="font-black"
                v-model="state.koli"
                color="primary"
                label="Koli/Qty"
                label-placement="floating"
                fill="outline"
            ></ion-input
            >
            <ion-input
              readonly
              class="font-black"
              v-model="state.ketisi"
              color="primary"
              label="Ket.isi"
              label-placement="floating"
              fill="outline"
            ></ion-input
            >
            
            </div>
            <br>

            <div class="display-flex container-arrive">
              <ion-input
                readonly
                class="font-black"
                v-model="state.namakurir"
                color="dark"
                label="Nama Kurir"
                label-placement="floating"
                fill="outline"
              ></ion-input
              >
              <ion-input
              readonly
              class="font-black"
              v-model="state.tgldelivery"
              type="date"
              ref="tgldelivery"
              color="dark"
              label="Tanggal Delivery"
              label-placement="floating"
              fill="outline"
              placeholder="Tanggal Delivery"
            ></ion-input>
            </div>
            <br>
          
            
            <ion-select 
              ref="Lokasi Diterima"
              color="dark"
              label="Lokasi Diterima"
              label-placement="floating"
              fill="outline"
              placeholder="Lokasi Diterima"
              :class="v$.asal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.asal.$error
                  ? v$.asal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.lokasiditerima"
              @ion-blur="markTouched"
              >
              <div v-for="c in city" :key="c.LocationID">
                <ion-select-option class="font-black" :value="c.DefaultCityNo">{{ c.DefaultCityName }}</ion-select-option>
              </div>
            </ion-select>
            <br>

            <!-- <ion-input
              class="font-black"
              v-model="state.status"
              color="primary"
              label="Status Penerimaan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            > -->
            <ion-select 
              ref="Status"
              color="dark"
              label="Status"
              label-placement="floating"
              fill="outline"
              placeholder="Masukan Status"
              :class="v$.asal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.asal.$error
                  ? v$.asal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.status"
              @ion-blur="markTouched"
              >
                <ion-select-option class="font-black" value="7">NOT HOME</ion-select-option>
                <ion-select-option class="font-black" value="8">CLOSE ARRIVAL</ion-select-option>
                <ion-select-option class="font-black" value="9">NOT ENOUGH TIME</ion-select-option>
                <ion-select-option class="font-black" value="10">BAD ADDRESS</ion-select-option>

                <ion-select-option class="font-black" value="11">MOVE</ion-select-option>
                <ion-select-option class="font-black" value="13">OTHER</ion-select-option>
                <ion-select-option class="font-black" value="14" selected>OK/DITERIMA</ion-select-option>
            </ion-select>
            <br>
            <ion-input
              class="font-black"
              v-model="state.ketpenerima"
              color="primary"
              label="Keterangan Penerimaan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br>

            <!-- <input type="file">
            <br>
            <br> -->
            <ion-tab-bar slot="bottom" id="tab-bar">
              <ion-tab-button tab="tab1" @click="isImage = true">
                <ion-icon class="btn-tabs" aria-hidden="true" :icon="cameraOutline" />
                <ion-label>Image</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab2" @click="isImage = false">
                <ion-icon class="btn-tabs" aria-hidden="true" :icon="personCircleOutline" />
                <ion-label>Tanda Tangan</ion-label>
              </ion-tab-button>
      </ion-tab-bar>

            <div v-if="isImage" class="content-image">

            </div>

            <div v-if="!isImage" class="content-ttd">

            </div>
            
            <ion-button
              color="success"
              expand="full"
              shape="round"
              @click="submitForm"
              size="default"
              >Masukan Data</ion-button
            >
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-toast
      :is-open="isOpen"
      :message="errMessage"
      :duration="5000"
      @didDismiss="setOpen(false)"
    ></ion-toast>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonActionSheet,
  loadingController,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonButtons,
  IonBackButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon

  
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem,IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers } from "@vuelidate/validators";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import router from "@/router";
import { homeOutline, personCircleOutline,cameraOutline } from 'ionicons/icons';



const headers = ref([
                    { text: "No.AWB", value: "ConnoteNo" },
                    { text: "Pengirim", value: "ConnoteCustName"},
                    { text: "Nama Dituju", value: "ConnoteRecvName"},
                    { text: "Kota Tujuan", value: "ConnoteRecvAddr"},
                ])
const isOpen = ref(false);
const isImage = ref(true);
const errMessage = ref("");
const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    nomor: "",
    tanggal: "",
    namapengirim: "",
    alamatpengirim: "",
    namadituju: "",
    alamatdituju: "",
    tujuan: "",
    berat: "",
    koli: "",
    namakurir: "",
    ketisi: "",
    lokasiditerima: "",
    tgldelivery: "",
    status: "",
    ketpenerima: ""
});
const formAF = ref<HTMLFormElement | null>(null);

onMounted( async () => {
  getCity()
  // console.debug('ge',await generateCounter())
});

const checkAWB = async () => {
  const data = {
    pickup_id: state.nomor
  };
  const result = await store.dispatch('pickup/getDetailPickup',data);
  if (result.error == false) {
    state.tanggal = result.data.ConnoteDate
    state.namapengirim = result.data.ConnoteCustName
    state.alamatpengirim = result.data.ConnoteCustAddr
    state.namadituju = result.data.ConnoteRecvName
    state.alamatdituju = result.data.ConnoteRecvAddr
    state.tujuan = result.data.ConnoteDest
    state.berat = result.data.ConnoteWeight
    state.koli = result.data.ConnoteQty
    state.ketisi = result.data.ConnoteContents
    state.namakurir = JSON.parse(localStorage.user).name
    if (result.data.ConnoteDateDeli) {
      state.tgldelivery = result.data.ConnoteDateDeli.split(' ')[0]
    }
    errMessage.value = result.message;
    setOpen(true);
  }else{
    errMessage.value = result.message;
    setOpen(true);
  }
  console.debug('data awb', result.data.ConnoteDateDeli)
}
const setOpen = (state: boolean) => {
  isOpen.value = state;
  if (!state) {
    errMessage.value = "";
  }
};

const toSelectCity = () => {
  router.push('/shipment-delivered/section-city')
}

const dataAwb = computed(() => {
  return store.getters['arrive/get']('awb') as IConnoteAWB
});

const generateCounter = async () => {
  const param = {
    code: 'WC',
    location: JSON.parse(localStorage.user).UserLocation
  }
  const res = await store.dispatch('arrive/genCounter',param);
  if (res.error == false) {
    return res.data
  }else{
    errMessage.value = res.message;
    setOpen(true);
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const randomNo = async () => {
  const username = JSON.parse(localStorage.user).username
  const timestamp = new Date().getTime()
  state.nomor = username+timestamp
}

const rules = computed(() => {
  return {
    nomor: {
      required: helpers.withMessage("Nomor harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
    tanggal: {
      required: helpers.withMessage("Tanggal harus diisi", required),
      maxlength: helpers.withMessage(
        "Password tidak boleh lebih dari 16 karakter",
        maxLength(16)
      ),
    },
    asal: {
      required: helpers.withMessage("Asal harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
    awb: {
      required: helpers.withMessage("AWB harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);
const markTouched = (event: Event) => {
  const target = event.target as HTMLInputElement;

  v$.value.$validate();

  target.classList.add("ion-touched");
};
const getCity = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('arrive/getCity');
    if (result.error == false) {
        city.value = result.data
        loading.dismiss();
        console.debug("After dispatch",city.value);
    }else{
        city.value = result.data
        loading.dismiss();
        console.debug("After dispatch",city.value);
    }
};

const submitForm = async () => {
  // errMessage.value = "waoasaspjgapsgjoasp";
  // setOpen(true);
  v$.value.$validate();
  if (v$.value.$error) {
    const inputs = formAF.value?.querySelectorAll("input");
    inputs?.forEach((input) => input.focus());

    return;
  }
  await getAWB()
  console.debug('Kisi kabeh',dataAwb)
}

const submitData = async () => {
  const keys = Object.keys(dataAwb.value) as (keyof IConnoteAWB)[];

  for (const key of keys) {
      console.log(dataAwb.value[key]);
      const datas = dataAwb.value[key] 
      const data = {
        username: JSON.parse(localStorage.user).username,
        cloc: JSON.parse(localStorage.user).UserLocation,
        wctgl : datas.DataFromInput.tanggalInpt,
        wcdesc: datas.DataFromInput.catatan,
        wckurir: JSON.parse(localStorage.user).pegawai_id,
        temp_key : datas.DataFromInput.temp_key,
        nowc : await generateCounter()
      }
      const res = await store.dispatch('arrive/saveWCourier',data);
      errMessage.value = res.message;
      setOpen(true);
      console.error('parsed asdta', data);
  }
    store.dispatch('arrive/resetArrive')
  // console.debug('submit data', dataAwb.value);
  // console.debug('submit data keys', keys);

}

const scanBarcode = async () => {
  await BarcodeScanner.checkPermission({ force: true })
  BarcodeScanner.hideBackground()
  document.querySelector('body')!.classList.add('scanner-active')
  document.querySelector('#content-af')!.classList.add('hide-comp')
  document.querySelector('#tab-bar')!.classList.add('hide-comp')
  isScan.value = true
  const result = await BarcodeScanner.startScan()
  if (result.hasContent) {
    console.error(result.content); // log the raw scanned content
    state.awb = result.content
    isScan.value = false
    document.querySelector('body')!.classList.remove('scanner-active')
    document.querySelector('#frame-scanner')!.classList.remove('frame-scanner')
    document.querySelector('#content-af')!.classList.remove('hide-comp')
    document.querySelector('#tab-bar')!.classList.remove('hide-comp')
  }
}

const stopScan = () => {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  isScan.value = false
  document.querySelector('body')!.classList.remove('scanner-active')
  document.querySelector('#frame-scanner')!.classList.remove('frame-scanner')
  document.querySelector('#content-af')!.classList.remove('hide-comp')
  document.querySelector('#tab-bar')!.classList.remove('hide-comp')
};

const getAWB = async () => {
  const param = {
    noAWB: state.awb
  }
  const data = {
    nomor: state.nomor,
    asal: state.asal,
    tanggalInpt: state.tanggal,
    catatan: state.catatan,
    noawb: state.awb,
    temp_key: tempKeyGenerate(JSON.parse(localStorage.user).name)
  }
  const res = await store.dispatch('arrive/getAWB',{param,data});
  if (res.error == true) {
    errMessage.value = res.message;
    setOpen(true);
  }else{
    const dataTemp = {
      userId: JSON.parse(localStorage.user).id,
      noawb: state.awb,
      temp_key: data.temp_key
    }
    await store.dispatch('arrive/addTemp',dataTemp)
    state.nomor= "",
    state.tanggal= "",
    state.asal= "",
    state.catatan= "",
    state.awb= ""
  }
}




const logout = () => {
  localStorage.clear();
  location.reload();
};
</script>
<style>
.alert-radio-label.sc-ion-alert-md { 
  color: black !important;
}
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
.header-row,
.data-row {
  border: 1px solid #ddd; /* Border color */
}

.column {
  padding: 10px;
  text-align: center;
}

.header-row {
  background-color: #f2f2f2; /* Header background color */
  font-weight: bold;
}
.scanner-active {
  --background: transparent !important;
  --ion-background-color: transparent !important;

  background: transparent !important;
  background-color: transparent !important;
}
.hide-comp {
  visibility: hidden;
}
.frame-scanner {
  border: solid 6px #fff;
    height: 41%;
    width: 80%;
    margin: 56% 37px 0px;
}
</style>
