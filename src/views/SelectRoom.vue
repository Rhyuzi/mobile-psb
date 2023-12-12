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

      <ion-card-content v-if="pickups?.POrderStatus == '3'">
        <ion-list class="bg-aquamarine">
          <div class="content-furniture">
            <!-- <div class="display-flex">
              <ion-label class="cust-name font-monoscope">Nama Customer</ion-label>
            </div>
            
            <div class="display-flex font-black">
              <p> {{ pickups?.POrderCustName }}</p>
            </div> -->
            <h2 class="font-black">Pesanan sudah terambil</h2>
          </div>
        </ion-list>
      </ion-card-content>

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
              <p> {{ pickups?.POrderCustName }}</p>
            </div>
          </div>
        </ion-list>
      </ion-card-content>
      <ion-card-content>
        <ion-list class="fur-el2">
          <div class="content-furniture">
            <div class="display-flex">
              <ion-label size="large" class="font-monoscope">Detail Data</ion-label>
              <!-- <ion-icon class="ic-chev-detail float-right-flex"
                :icon="chevronDown"
                slot="end"></ion-icon> -->
            </div>
            
            <div class="display-flex">
              <p>{{ pickups?.POrderIsi }}, {{ pickups?.POrderCustAddr }}</p>           
            </div>
          <br>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Tanggal dibuat</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.POrderDate }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Pengirim</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.POrderDEO }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Customer</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.POrderCustName   }}</p>
            </div>
            <div class="display-flex">
              <ion-label class="font-cont-detail">Nama Pembuat</ion-label>
              <p class="custom-ellipsis float-right-flex">{{ pickups?.POrderCSO ? pickups?.POrderCSO : '-'   }}</p>
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
              <p>{{ pickups?.POrderIsi }}</p>
            </div>

            <div class="display-flex">
              <!-- <div class="desc-detail font-black flex-item">
                <h3 class="font-skyblue">ISI</h3>
                <p>{{ pickups?.POrderIsi }}</p>
            </div> -->

            <div class="desc-detail font-black flex-item">
              <h3 class="font-skyblue">QTY</h3>
              <p>{{ pickups?.POrderQty }}</p>
            </div>
            
            <div class="desc-detail font-black flex-item">
              <h3 class="font-skyblue">Berat</h3>
              <p>{{ pickups?.POrderWeight }}</p>
            </div>
            </div>
            

           

          </div>
        </ion-list>
      </ion-card-content>

      <div class="display-flex btn-bottom">

        <div v-if="pickups?.POrderStatus == '1'" class="desc-detail font-black flex-item">
          <ion-button color="success" @click="updateSetujui">Setuju</ion-button>
        </div>

        <div v-if="pickups?.POrderStatus == '2'" class="desc-detail font-black flex-item">
          <ion-button color="success" @click="updateTerambil">Terambil</ion-button>
        </div>

        <div class="desc-detail font-black flex-item">
          <ion-button v-if="pickups?.POrderStatus != '3'" color="danger" id="present-alert">Batalkan</ion-button>
        </div>

      </div>
    
    </ion-content>
    <ion-alert
    :is-open="isOpen"
    :message="message"
    :buttons="alertButtons"
    @didDismiss="setOpen(false)"
  ></ion-alert>

  <!-- Keterangan batal -->
  <ion-alert
    ref="ketBatal"
    trigger="present-alert"
    header="Alasan Pembatalan"
    :buttons="alertSubmit"
    :inputs="alertInputs"
  ></ion-alert>
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
import { personCircle, chevronDown, chevronUp } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import router from "@/router";
import { IPickupItem } from '../api/conf-api/interface/dashboard'

const store = useStore()
const pickups = ref<IPickupItem | null>(null);
let message = ""

const alertSubmit = [
  {
    text: 'Cancel',
    role: 'cancel',
    cssClass: 'cancel-button',
    handler: () => {
      console.log('Cancel clicked');
    },
  },
  {
    text: 'Submit',
    handler: async (event: any) => {
      if (event[0] == "") {
        message = "Harap isi keterangan pembatalan"
        setOpen(true)
        return
      }
      updateBatalkan(event[0])
      console.log('Submit clicked', event[0]);
    },
  },
];

  const alertInputs = [
    {
      type: 'textarea',
      placeholder: 'Keterangan Pembatalan',
    },
  ];

const isOpen = ref(false);
  const alertButtons = ['Tutup'];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
  

  onIonViewWillEnter(() => {
  // This function will be executed each time the view is about to enter
  getDetailPickUp()
});

// onMounted(async () => {
//   getDetailPickUp()
// })

const getDetailPickUp = async () => {
  const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('pickup/getDetailPickup');
    if (result.error == false) {
        pickups.value = result.data
        loading.dismiss();
        console.debug("After dispatch",pickups.value);
    }else{
        pickups.value = result.data
        loading.dismiss();
        console.debug("After dispatch",pickups.value);
    }
};

const updateSetujui = async () => {
  
  const param = {
    pickup_id: pickups.value?.POrderID,
    status: 1,
  }
    const result = await store.dispatch('pickup/updateStatus',param);
    message = result.message
    router.push("/tabs/");
    setOpen(true)
};

const updateTerambil = async () => {
  
  const param = {
    pickup_id: pickups.value?.POrderID,
    status: 2,
  }
    const result = await store.dispatch('pickup/updateStatus',param);
    message = result.message
    router.push("/tabs/");
    setOpen(true)
};

const updateBatalkan = async (ketBatalkan: string) => {
  const param = {
    pickup_id: pickups.value?.POrderID,
    status: 0,
    keterangan: ketBatalkan
  }
    const result = await store.dispatch('pickup/updateStatus',param);
    message = result.message
    router.push("/tabs/");
    setOpen(true)
  console.debug('update batalkan')
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
