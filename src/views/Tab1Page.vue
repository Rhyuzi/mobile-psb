<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                    <ion-icon id="auto-trigger" class="ic-toolbar ic-filter"
                        :icon="menuOutline"
                        slot="start"></ion-icon>
                    <ion-popover trigger="auto-trigger" size="auto">
                        <ion-content color="dark">
                            <ion-list :inset="true">
                        <ion-item :button="true">
                            <ion-icon color="danger" slot="start" :icon="listCircle" size="large"></ion-icon>
                            <ion-label class="font-black">General</ion-label>
                            <ion-note class="font-black" slot="end">6</ion-note>
                        </ion-item>
                        <ion-item :button="true">
                            <ion-icon color="tertiary" slot="start" :icon="listCircle" size="large"></ion-icon>
                            <ion-label class="font-black" >Shopping</ion-label>
                            <ion-note class="font-black" slot="end">15</ion-note>
                        </ion-item>
                        <ion-item :button="true">
                            <ion-icon color="success" slot="start" :icon="listCircle" size="large"></ion-icon>
                            <ion-label class="font-black" >Cleaning</ion-label>
                            <ion-note class="font-black" slot="end">3</ion-note>
                        </ion-item>
                        <ion-item :button="true">
                            <ion-icon color="warning" slot="start" :icon="listCircle" size="large"></ion-icon>
                            <ion-label class="font-black">Reminders</ion-label>
                            <ion-note class="font-black" slot="end">8</ion-note>
                        </ion-item>
                        </ion-list>
                        </ion-content>
                    </ion-popover>
                            
                <div class="title-header">
                    <p class="font-monospace">Selamat Datang,</p>
                    <p>{{ dataUser.name }}</p>
                </div>
                <ion-icon @click="onClickRefresh" class="ic-toolbar refresh-icon"
                        :icon="refreshOutline"
                        slot="end"></ion-icon>
                <ion-icon @click="onClickSearch" class="ic-toolbar"
                        :icon="inSearch.icon"
                        slot="end"></ion-icon>
            </ion-toolbar>
            <ion-searchbar v-if="isSearch" placeholder="Search Data ..." v-model="searchData"></ion-searchbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="item-pick" v-for="pickup in onSearchData" :key="pickup.POrderNo">
       <ion-card-content @click="seeDetail(pickup.POrderID)">
        <!-- <ion-card-content @click="seeDetail(pickup.POrderID)" class="ion-activatable ripple-parent rectangle"></ion-card-content> -->
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
    onIonViewWillEnter,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonPopover,
    IonNote
} from '@ionic/vue'
import { personCircle, searchCircle, wifi, search, close, refreshOutline, menuOutline, listCircle } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import { ref } from 'vue'
import { IPickupItem } from '../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()


const pickups = ref<IPickupItem[]>([])
const searchData = ref("")
const dataUser = JSON.parse(localStorage.user)

// onMounted(async () => {
//     getPickupOrder()
// })
const isSearch = ref(false);
const inSearch = reactive({
    icon: search,
})
const onSearchData = computed(() => {
    const pickupArray = Object.values(pickups.value || {})
    return pickupArray.filter(data => 
    data.POrderCustName.toLocaleLowerCase().includes(searchData.value.toLowerCase()) ||
    data.POrderCustAddr.toLocaleLowerCase().includes(searchData.value.toLowerCase())
    )
})

const onClickRefresh = () => {
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon!.classList.add('spin');
    getPickupOrder()
    setTimeout(() => {
        refreshIcon!.classList.remove('spin');
    }, 1000); 
}
const getPickupOrder = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('pickup/getPickupData');
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
    getPickupOrder()
});

</script>