<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="color-white">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Detail POD</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- <ion-label class="font-black">Order</ion-label> -->


      <ion-card-content>
        <ion-list class="fur-el">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label class="cust-name font-monoscope">Nama Customer</ion-label>
              <!-- <ion-icon class="ic-chev-detail-black float-right-flex font-black"
                :icon="chevronDown"
                slot="end"></ion-icon> -->
            </div>
            
            <div class="display-flex font-black">
              <p> {{ pickups?.ConnoteCustName  }}</p>
            </div>
          </div>
        </ion-list>
      </ion-card-content>
      <ion-card-content class="color-white">
        <ion-list class="fur-el2">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label size="large" class="font-monoscope">Detail Data</ion-label>
              <!-- <ion-icon class="ic-chev-detail float-right-flex"
                :icon="chevronDown"
                slot="end"></ion-icon> -->
            </div>
            
            <div class="display-flex">
              <p>{{ pickups?.ConnoteCustAddr }}</p>           
            </div>
          <br>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Tanggal dibuat</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.CreateTime }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Penerima</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.ConnoteRecvName }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Customer</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.ConnoteCustName }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Pembuat</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.CreateBy ? pickups?.CreateBy : '-' }}</p>
            </div>            
          </div>
        </ion-list>
      </ion-card-content>

      <ion-card-content>
        <ion-list class="fur-el">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label size="large" class="cust-name font-monoscope">Detail Barang</ion-label>
              <!-- <ion-icon class="ic-chev-detail-black float-right-flex font-black"
                :icon="chevronDown"
                slot="end"></ion-icon> -->
            </div>
            
            <div class="display-flex font-black">
              <!-- <p> {{ pickups?.POrderMemo ? pickups?.POrderMemo : 'Tidak ada memo'   }}</p> -->
              <p>{{ pickups?.ConnoteMemo }}</p>
            </div>

            <div class="display-flex">
              <!-- <div class="desc-detail font-black flex-item">
                <h3 class="font-skyblue">ISI</h3>
                <p>{{ pickups?.POrderIsi }}</p>
            </div> -->

            <div class="desc-detail font-black flex-item">
              <h3 class="font-skyblue">QTY</h3>
              <p>{{ pickups?.ConnoteQty }}</p>
            </div>
            
            <div class="desc-detail font-black flex-item">
              <h3 class="font-skyblue">Berat</h3>
              <p>{{ pickups?.ConnoteWeight }}</p>
            </div>
            </div>
            

           

          </div>
        </ion-list>
      </ion-card-content>

      <!-- <div class="display-flex">
        <h1>sadasd</h1>
        <ion-icon :icon="arrowUp"></ion-icon>

      </div> -->
      <ion-card-content class="color-black">
        <ion-list>
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label size="large" class="font-monoscope">Check Point</ion-label>
            </div>
            
            <div class="display-flex">
              <p>{{ pickups?.ConnoteCustAddr }}</p>           
            </div>
          <br>
            <div v-for="l in tracking" :key="l">
              <ion-icon class="icon-checkpoint float-right-flex transform-180 color-black"
                :icon="thermometerSharp"
                slot="end"></ion-icon>
              <ion-label class="font-size-14">{{ l?.cpstatus_name }} - {{ l?.DefaultCityName ? l?.DefaultCityName : '-' }}</ion-label>
              <div class="checkpoint-desc">
                <p class="custom-ellipsis float-right-flex">{{ l?.CPCreateTime }}</p>
                <p>{{ l?.cpstatus_text }}</p>
              </div>
            </div>
                      
          </div>
        </ion-list>
      </ion-card-content>
    
    </ion-content>
    <ion-alert
    :is-open="isOpen"
    :message="message"
    :buttons="alertButtons"
    @didDismiss="setOpen(false)"
  ></ion-alert>

  <!-- Keterangan batal -->
  </ion-page>
 
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonContent,
  IonList,
  IonIcon,
  IonAlert,
  onIonViewWillEnter,
  loadingController
} from "@ionic/vue";
import { personCircle, chevronDown, chevronUp , arrowUp, thermometer, thermometerOutline, thermometerSharp} from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import router from "@/router";
import { IPickupItem } from '../api/conf-api/interface/dashboard'

const store = useStore()
const pickups = ref();
const history = ref<IPickupItem | null>(null);
const message = ""
const tracking = ref()


const isOpen = ref(false);
  const alertButtons = ['Tutup'];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
  

  

onMounted(async () => {
  await getDetailPickUp()
})

const getDetailPickUp = async () => {
  const pickup = store.getters['pickup/get']('checkPointList')  || {}
  pickups.value = pickup
  tracking.value = pickup.trackingLog
  console.debug('dataCheckpoint',pickups.value)
  
};

const getDetailHistory = async () => {
  const dataPickup = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
  // if (dataPickup) {
  //   dataPickup = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
  // }
  const filter = dataPickup.filter(item => item.POrderID == localStorage.idPickup)
  history.value = filter[0]
};

</script>

<style>
.alert-title.sc-ion-alert-md {
  color: black !important;
}
.alert-input.sc-ion-alert-md {
  color: black !important;
}
.cancel-button {
  color: red !important;
}
</style>
