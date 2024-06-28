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
      <ion-list lines="none">
        <ion-item :button="true">
          <ion-label><strong>Customer</strong></ion-label>
          <ion-label>{{ pickups?.POrderCustName || history?.POrderCustName }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Nama Pengirim</strong></ion-label>
          <ion-label>{{ pickups?.POrderDEO || history?.POrderDEO }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Alamat Customer</strong></ion-label>
          <ion-label>{{ pickups?.POrderCustAddr || history?.POrderCustAddr }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>No Telp Cust</strong></ion-label>
          <ion-label>{{ pickups?.CustTelp || history?.CustTelp }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Tanggal</strong></ion-label>
          <ion-label>{{ pickups?.POrderDate || history?.POrderDate }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Isi</strong></ion-label>
          <ion-label>{{ pickups?.POrderIsi || history?.POrderIsi }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Qty</strong></ion-label>
          <ion-label>{{ pickups?.POrderQty || history?.POrderQty }}</ion-label>
        </ion-item>
        <ion-item :button="true">
          <ion-label><strong>Berat</strong></ion-label>
          <ion-label>{{ pickups?.POrderWeight || history?.POrderWeight }}</ion-label>
        </ion-item>
      </ion-list>
      <div class="display-flex btn-bottom">

        <div v-if="pickups?.POrderStatus == '1'" class="desc-detail font-black flex-item">
          <ion-button color="success" @click="updateSetujui">Terima</ion-button>
        </div>

        <div v-if="pickups?.POrderStatus == '2'" class="desc-detail font-black flex-item">
          <ion-button color="success" @click="updateTerambil">Terambil</ion-button>
        </div>

        <div class="desc-detail font-black flex-item">
          <ion-button v-if="history?.POrderStatus != '3' && pickups?.POrderStatus == '1'" color="danger" id="present-alert">Tolak</ion-button>
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
const history = ref<IPickupItem | null>(null);
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
  getDetailHistory()
  console.error('id pickup', history.value || pickups.value)
});

// onMounted(async () => {
//   getDetailPickUp()
// })

const getDetailPickUp = async () => {
  const dataPickup = Object.values(store.getters['pickup/get']('pickupsList') as IPickupItem || {})
  // if (dataPickup) {
  //   dataPickup = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
  // }
  const filter = dataPickup.filter(item => item.POrderID == localStorage.idPickup)
  pickups.value = filter[0]
  // console.error('data pickup', filter)
  // console.error('id pickup', localStorage.idPickup)
  // pickups.value
  // const loading = await loadingController.create({
  //       message: "Loading...",
  //       animated: true,
  //       backdropDismiss: false,
  //   });
  //   loading.present();
  //   const result = await store.dispatch('pickup/getDetailPickup');
  //   if (result.error == false) {
  //       pickups.value = result.data
  //       loading.dismiss();
  //       console.debug("After dispatch",pickups.value);
  //   }else{
  //       pickups.value = result.data
  //       loading.dismiss();
  //       console.debug("After dispatch",pickups.value);
  //   }
};

const getDetailHistory = async () => {
  const dataPickup = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
  // if (dataPickup) {
  //   dataPickup = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
  // }
  const filter = dataPickup.filter(item => item.POrderID == localStorage.idPickup)
  history.value = filter[0]
};

const updateSetujui = async () => {
  
  const param = {
    pickup_id: pickups.value?.POrderID,
    status: 1,
    setujui: true
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
    setujui: false
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
    keterangan: ketBatalkan,
    setujui: false
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
