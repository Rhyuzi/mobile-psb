<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="font-white">Check Point</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      

    <!-- </ion-content> -->
    <ion-content id="content-af" :fullscreen="true">
      <div class="disp-flex">
          <ion-card-content class="flex-item-menu" @click="toArrived">
            <img class="border-6" src="../assets/image/arrived-facility.png" alt="">
          </ion-card-content>
          <ion-card-content class="flex-item-menu" @click="toWithCourier">
            <img class="border-6" src="../assets/image/with-courier.png" alt="">
          </ion-card-content>
          <ion-card-content class="flex-item-menu-wide" @click="toShipment">
            <img class="border-6" src="../assets/image/shipment-delivered.png" alt="">
          </ion-card-content>
      </div>

      <!-- <div class="disp-flex">
          <ion-card-content>
            <img class="border-6" src="../assets/image/shipment-delivered.png" alt="">
          </ion-card-content>
          <ion-card-content>
            <img class="border-6" src="../assets/image/shipment-delivered.png" alt="">
          </ion-card-content>
      </div> -->
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
import { locationOutline,menuOutline } from 'ionicons/icons';
import router from "@/router";

const toArrived = () => {
  router.push("/arrived-hub");
}
const toWithCourier = () => {
  router.push("/with-courier");
}

const toShipment = () => {
  router.push("/shipment-delivered");
}
</script>
<style>
.flex-item-menu {
  flex: 1;
  min-width: 50%;
}

.flex-item-menu-wide {
  flex: 2;
  min-width: 100%;
}
.flex-item-menu img {
  width: 100%; /* Make the image fill the container width */
  height: auto; /* Maintain the aspect ratio */
}
.flex-item-menu-wide {
  flex: 2;
  min-width: 100%;
  margin: 8px;
  text-align: center;
  padding: 16px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
