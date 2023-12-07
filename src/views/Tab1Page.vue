<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div class="title-header">
                    <p class="font-monospace">Selamat Datang,</p>
                    <p>{{ dataUser.name }}</p>
                </div>
                <ion-icon @click="onClickSearch" class="ic-toolbar"
                        :icon="inSearch.icon"
                        slot="end"></ion-icon>
            </ion-toolbar>
            <ion-searchbar v-if="isSearch" placeholder="Search Data ..."></ion-searchbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="item-pick" v-for="pickup in pickups" :key="pickup.POrderNo">
       <ion-card-content @click="seeDetail(pickup.POrderID)">
            <ion-list>
                <div class="display-flex">
                    <ion-icon class="img-ic"
                        :icon="personCircle"
                        color="secondary"
                        slot="start"></ion-icon>
                    <ion-label class="cust-name font-monospace">{{ pickup.POrderCustName }}</ion-label>
                    <p class="font-black float-right-flex font-none">{{ pickup.POrderDate }}</p>
                </div>
                <div class="display-flex">
                    <p class="font-black pick-addr custom-ellipsis font-bold">{{ pickup.POrderCustAddr }}</p>
                    <!-- <p class="font-black float-right-flex">{{ pickup.POrderQty }} qty</p> -->
                </div>
                <p class="font-black margin-memo font-bold">{{ pickup.POrderIsi }}</p>
               

                <div class="display-flex">
                    <p class="font-black cont-qty">{{ pickup.POrderQty }} qty</p>
                    <ion-icon class="img-ic float-right-flex"
                    :icon="personCircle"
                    color="secondary"
                    slot="start"></ion-icon>
                    <ion-label class="cust-name font-monospace">{{ pickup.POrderDEO }}</ion-label>
                </div>
            </ion-list>
        </ion-card-content>
    </div>  
        </ion-content>
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
    IonAvatar,
    onIonViewWillEnter
} from '@ionic/vue'
import { personCircle, searchCircle, wifi, search, close } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, reactive } from 'vue'
import { ref } from 'vue'
import { IPickupItem } from '../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()


const pickups = ref<IPickupItem[]>([])
const dataUser = JSON.parse(localStorage.user)

// onMounted(async () => {
//     getPickupOrder()
// })
const isSearch = ref(false);
const inSearch = reactive({
    icon: search,
})
const getPickupOrder = async () => {
    const result = await store.dispatch('pickup/getPickupData');
    pickups.value = result.data
    console.debug("After dispatch",pickups.value);
};

const onClickSearch = () => {
    if (!isSearch.value) {
        inSearch.icon = close;
        setOpenSearch(true)
    } else {
        inSearch.icon = search;
        setOpenSearch(false)
    }
}

const setOpenSearch = (state: boolean) => {
    isSearch.value = state;
};

const seeDetail = (idPickup: any) => {
    localStorage.setItem("idPickup", idPickup)
    console.debug('idPickup',idPickup)
    router.push("/select-room");
}
onIonViewWillEnter(() => {
  // This function will be executed each time the view is about to enter
  getPickupOrder()
});

</script>