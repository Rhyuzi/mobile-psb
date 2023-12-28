<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab2"></ion-back-button>
        </ion-buttons>
        <ion-title class="font-white">Select City</ion-title>
        <!-- <ion-icon @click="onClickSearch" class="ic-toolbar"
                :icon="search"
                slot="end"></ion-icon> -->
        <p style="margin-right: 20px;" slot="end" class="font-white">select</p>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      
    <ion-content id="content-af" :fullscreen="true">
      <ion-searchbar  placeholder="Search Data ..."></ion-searchbar>
      <ion-card-content>
    
        <div v-for="c in city" :key="c.REC_ID">
          <div class="city-origin">
            <p>{{ c.KELURAHAN }}, {{ c.KECAMATAN }},{{ c.KOTA }},{{ c.PROPINSI }}</p>
          </div>
      </div> 
      
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
import { IArrivedItem,ICityOrigin,IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers } from "@vuelidate/validators";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { personCircle, searchCircle, wifi, search, close, refreshOutline, menuOutline, listCircle,arrowBackOutline } from 'ionicons/icons'


const store = useStore()
const city = ref<ICityOrigin[]>([])
onMounted( async () => {
  dataCity()
  console.debug('data city', city.value)
});

// const city = computed(() => {
//   dataCity()
//   return store.getters['arrive/get']('city') as IArrivedItem
// });

const dataCity = async () => {
  const loading = await loadingController.create({
    message: "Loading...",
    animated: true,
    backdropDismiss: false,
  });
  loading.present();
  const dbName = 'myDatabase';
  const objectStoreName = 'CityOrigin';

  const request = indexedDB.open(dbName);

  request.onsuccess = function(event) {
    
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(objectStoreName, 'readonly');
      const objectStore = transaction.objectStore(objectStoreName);

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function() {
          const allData = getAllRequest.result;
          city.value = allData
          console.debug('All data in the object store:', city.value);
          loading.dismiss();
      };

      getAllRequest.onerror = function(event : any) {
          console.error('Error getting all data:', event.target.error.message);
          loading.dismiss();
      };
  };

  request.onerror = function(event: any) {
      console.error('Error opening database:', event.target.error.message);
      loading.dismiss();
  };
}



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
