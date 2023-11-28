<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Pick Up Order</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-searchbar show-cancel-button="focus" placeholder="Search data ..."></ion-searchbar>
            <!-- <ion-searchbar placeholder="Search Data ..."></ion-searchbar> -->
            <!-- <ion-searchbar :search-icon="searchCircle" placeholder="Custom Search Icon"></ion-searchbar> -->
        <div v-for="pickup in pickups" :key="pickup.POrderNo">
        <!-- <ion-card>
            <ion-card-header>
            <ion-card-title color="default">{{ pickup.POrderCustName }}</ion-card-title>
            <div class="ion-text-right">
                <ion-card-subtitle>{{ pickup.POrderDEO }}</ion-card-subtitle>
            </div>
            <ion-card-subtitle>{{ pickup.POrderDate }}</ion-card-subtitle>
            <div class="ion-text-right">
                <ion-card-subtitle>{{ pickup.POrderQty }} qty</ion-card-subtitle>
            </div>
            </ion-card-header>

            <ion-card-content>
           {{ pickup.POrderCustAddr }}
            </ion-card-content>
            <ion-card-content>Memo <br>
           {{ pickup.POrderMemo ? pickup.POrderMemo : 'Tidak ada memo'   }}
            </ion-card-content>
        </ion-card> -->
        
        <ion-card-content>
            <ion-list>
                <ion-item>
                    <img class="img-ic" alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                <ion-label class="cust-name">{{ pickup.POrderCustName }}</ion-label>
                <p class="font-black">{{ pickup.POrderDate }}</p>
                </ion-item>
                <p class="font-black">{{ pickup.POrderCustAddr }}</p>
            </ion-list>
        </ion-card-content>
        
    </div>
           
            
        </ion-content>

        <!-- <ion-content>
      <ion-list>
        <ion-item class="chat-item">
          <ion-avatar slot="start">
            <img src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
          </ion-avatar>
          <ion-label>
            <h2>Rhyuzi</h2>
            <p>Haloo Banggg</p>
          </ion-label>
          <ion-note slot="end">2020</ion-note>
        </ion-item>
      </ion-list>
    </ion-content> -->
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonSearchbar,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonText,
    IonRippleEffect,
    useIonRouter,
    loadingController,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonAvatar
} from '@ionic/vue'
import { personCircle, searchCircle } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { IPickupItem } from '../api/conf-api/interface/dashboard'
const store = useStore()
const ionRouter = useIonRouter()

const pickups = ref<IPickupItem[]>([])

onMounted(async () => {
    getPickupOrder()
    // meetingPlans()
})
const getPickupOrder = async () => {
    // console.debug("Before dispatch");
    const result = await store.dispatch('pickup/getPickupData');
    // console.debug("After dispatch");
    // console.debug("Data pickup 2", store.getters['pickup/get']('pickupsList'));
    pickups.value = result.data
    console.debug("After dispatch",pickups.value);
};

// const meetingList = async () => {
//     const loading = await loadingController.create({
//         message: 'Loading...',
//         animated: true,
//         backdropDismiss: false
//     })
//     loading.present()

//     try {
//         const res0 = await store.dispatch('dashboard/fetchList', {
//             pageSize: '15',
//             meetingState: '0'
//         })
//         const res1 = await store.dispatch('dashboard/fetchList', {
//             pageSize: '15',
//             meetingState: '1'
//         })
//         console.error('res0', res0)
//         console.error('res1', res1)
//         meetings.value = store.getters['dashboard/get'](
//             'meetingList'
//         ) as IMeetingItem[]
//         histories.value = store.getters['dashboard/get'](
//             'historyList'
//         ) as IMeetingItem[]
//         console.error('meets', meetings.value)
//     } catch (error) {
//         console.error(error)
//     }
    
//     loading.dismiss()
// }
const stateFormat = (state: number) => {
    switch (state) {
        case 3:
            return 'Berakhir'
        case 2:
            return 'Berlangsung'
        case 1:
            return 'Akan Diselenggarakan'
        case 0:
            return 'Belum Dimulai'
        case -2:
            return 'Kadaluarsa'
        default:
            return 'NOTSET'
    }
}
</script>
<style scoped>
ion-card {
    background-color: white !important;
    border: 4px solid #ccc;
    border-radius: 10px;
}
ion-searchbar input{
    background-color: black;
    color: black;
}
.sc-ion-searchbar-md-h {
    color: black;
    --icon-color: var(--ion-card-background) !important;
}
ion-icon{
    color: black;
}
.searchbar-input.sc-ion-searchbar-md {
    color: black !important;
}
.img-ic{
    max-width: 7%;
    margin: 0px 12px 18px 2px;
}
.cust-name{
    color: black;
    margin: 0px 12px 18px 2px;
}
.font-black{
    color: black;
}
.item-inner{
    border-style: none !important;
}





.chat-item {
    ion-avatar {
      margin-right: 8px;
    }

    ion-label {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding-right: 8px;
    }

    ion-note {
      font-size: 12px;
    }
  }
</style>