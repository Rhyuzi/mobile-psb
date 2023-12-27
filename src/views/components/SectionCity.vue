<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title class="font-white">Select City</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      
    <ion-content id="content-af" :fullscreen="true">
      <ion-card-content>
      <!-- <ion-list>
        <div v-for="c in city" :key="c.LocationID">
        <ion-item>
          
          <ion-label>{{ c.DefaultCityName }}</ion-label>
        </ion-item>
      </div>

      </ion-list> -->
    </ion-card-content>
    </ion-content>
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
  IonBackButton
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

const store = useStore()
const city = ref<IArrivedItem[]>([])
onMounted( async () => {
  getCity()
});

const getCity = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('arrive/cityOrig');
    if (result.error == false) {
        city.value = result.data
        loading.dismiss();
        console.debug("orig dispatch",city.value);
    }else{
        city.value = result.data
        loading.dismiss();
        console.debug("orig dispatch",city.value);
    }
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
