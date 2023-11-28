<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Detail Pick</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- <ion-label class="font-black">Order</ion-label> -->

      <ion-card-content>
        <ion-list class="fur-el">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label class="cust-name">Furniture</ion-label>
              <ion-icon class="ic-chev-detail-black float-right-flex font-black"
                :icon="chevronDown"
                slot="end"></ion-icon>
            </div>
            
            <div class="display-flex font-black">
              <p >Tracking ID :</p>
              <p> 34533727344</p>
            </div>
  
            <ion-button shape="round" size="small">Pending</ion-button>
          </div>
        </ion-list>
      </ion-card-content>

      <ion-card-content>
        <ion-list class="fur-el2">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label>Stationary Item</ion-label>
              <ion-icon class="ic-chev-detail float-right-flex"
                :icon="chevronDown"
                slot="end"></ion-icon>
            </div>
            <div class="display-flex">
              <p>Tracking ID </p>
              <p class="float-right-flex"> 34533727344</p>
            </div>

            <div class="display-flex">
              <p>Origin </p>
              <p class="float-right-flex"> 34533727344</p>
            </div>
            <div class="display-flex">
              <p class>Destination</p>
              <p class="float-right-flex"> 34533727344</p>
            </div>

            <div class="display-flex">
              <p class="color-white">Shipper Name</p>
              <p class="float-right-flex"> 34533727344</p>
            </div>

            <div class="display-flex">
              <p class="color-white">Commodity</p>
              <p class="float-right-flex"> 34533727344</p>
            </div>

            <div class="display-flex">
              <p class>Status</p>
              <p class="float-right-flex"> 34533727344</p>
            </div>
  
            <!-- <ion-button shape="round" size="small">Pending</ion-button> -->
          </div>
        </ion-list>
      </ion-card-content>
    </ion-content>
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
  IonIcon
} from "@ionic/vue";
import { personCircle, chevronDown, chevronUp } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { DataPlans } from '@/interfaces/jumpaRtcSDK'
import router from "@/router";
const store = useStore()


const meetingPlans = ref<DataPlans>()
// onMounted(async () => {

// })


</script>
