<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="font-white">Arrived Hub</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      <div v-if="isScan" class="frame-scanner" id="frame-scanner">

      </div>
      <div v-if="isScan" class="center-button" id="center-button">
        <ion-button
        class="close-scanner"
        color="light"
        shape="round"
        @click="stopScan"
        size="default"
        >BATALKAN</ion-button
      >
      </div>
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
            
            <ion-input
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
            ></ion-input
            >
            </div>
            <br>
            <ion-select 
              ref="Asal"
              color="dark"
              label="Asal"
              label-placement="floating"
              fill="outline"
              placeholder="Masukan Kota Asal"
              :class="v$.asal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.asal.$error
                  ? v$.asal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.asal"
              @ion-blur="markTouched"
              >
              <div v-for="c in city" :key="c.LocationID">
                <ion-select-option class="font-black" :value="c.DefaultCityNo">{{ c.DefaultCityName }}</ion-select-option>
              </div>
            </ion-select>
            <br>
            
            <ion-input
              color="primary"
              label="Catatan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              ref="Scan AWB"
              color="dark"
              label="Scan AWB"
              label-placement="floating"
              fill="outline"
              placeholder="Scan AWB"
              :class="v$.awb.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.awb.$error
                  ? v$.awb.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.awb"
              @ion-blur="markTouched"
            ></ion-input
            >
            
            <br />
            <br />
            <ion-button
              color="success"
              expand="full"
              shape="round"
              @click="submitForm"
              size="default"
              >Masukan Data</ion-button
            >
            <ion-button
              color="light"
              expand="full"
              shape="round"
              size="default"
              @click="scanBarcode"
              >Scan Barcode</ion-button>
              
          </form>
        </ion-card-content>
      </ion-card>
      

      <ion-card>
        <ion-card-content>
          <Vue3EasyDataTable :headers="headers" :items="dataAwb" />
          <ion-button
              color="success"
              expand="full"
              shape="round"
              @click="submitData"
              size="default"
              >Submit</ion-button
            >
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
  IonToast
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


const headers = ref([
                    { text: "No.AWB", value: "ConnoteNo" },
                    { text: "Pengirim", value: "ConnoteCustName"},
                    { text: "Nama Dituju", value: "ConnoteRecvName"},
                    { text: "Kota Tujuan", value: "ConnoteRecvAddr"},
                ])
const isOpen = ref(false);
const isScan = ref(false);
const errMessage = ref("");
const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    nomor: "",
    tanggal: "",
    asal: "",
    catatan: "",
    awb: ""
});
const formAF = ref<HTMLFormElement | null>(null);

onMounted(() => {
  getCity()
  // document.querySelector('.center-button ')!.classList.add('hide-comp')
//   document.querySelector('body')!.classList.add('scanner-active')
//   document.querySelector('#content-af')!.classList.add('hide-comp')
//   document.querySelector('#frame-scanner')!.classList.add('frame-scanner')
//   document.querySelector('#tab-bar')!.classList.add('hide-comp')
});

const setOpen = (state: boolean) => {
  isOpen.value = state;
  if (!state) {
    errMessage.value = "";
  }
};

const dataAwb = computed(() => {
  return store.getters['arrive/get']('awb') as IConnoteAWB
});

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
        aftgl : datas.DataFromInput.tanggalInpt,
        afdesc: datas.DataFromInput.catatan,
        aforig: datas.DataFromInput.asal,
        temp_key : datas.DataFromInput.temp_key,
        noaf : datas.DataFromInput.nomor
      }
      store.dispatch('arrive/saveArrive',data);
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
  }
}

const tempKeyGenerate = (username: string) => {
  const date = new Date();
  const date_time = + date.getFullYear() + ""
      + (date.getMonth()+1) + ""
      + date.getDate() + ""
      + date.getHours() + ""
      + date.getMinutes() + ""
      + date.getSeconds();

  return username + date_time
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
