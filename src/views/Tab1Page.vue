<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                    <ion-icon id="auto-trigger" class="ic-toolbar ic-filter"
                        :icon="menuOutline"
                        slot="start"></ion-icon>
                    <ion-popover trigger="auto-trigger" :dismiss-on-select="true">
                        <ion-content color="dark">
                            <ion-list :inset="true">
                        <ion-item :button="true" @click="openHistory" id="open-modal" expand="block">
                            <ion-icon color="tertiary" slot="start" :icon="listCircle" size="large"></ion-icon>
                            <ion-label class="font-black" >History</ion-label>
                            <ion-note class="font-black" slot="end">{{ pickupsHistory.length }}</ion-note>
                        </ion-item>
                        </ion-list>
                        </ion-content>
                    </ion-popover>
                            
                <div class="title-header">
                    <p class="font-monospace font-white">Selamat Datang,</p>
                    <p class="font-white">{{ dataUser.name }}</p>
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
            
            <ion-modal ref="modal" trigger="open-modal">
                <ion-header>
                    <ion-toolbar>
                        <ion-icon @click="cancel()" class="ic-toolbar arr-back-history"
                                    :icon="arrowBackOutline"
                                    slot="start"></ion-icon>
                    <ion-title class="title-history">History</ion-title>
                    <ion-icon @click="getPickupHistory" class="ic-toolbar refresh-icon"
                        :icon="refreshOutline"
                        slot="end"></ion-icon>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <div class="item-pick" v-for="pickup in pickupsHistory" :key="pickup.POrderNo">
                <ion-card-content @click="seeDetailHistory(pickup.POrderID)">
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
            </ion-modal>

    <div class="item-pick" v-for="pickup in onSearchData" :key="pickup.POrderNo">
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
    IonCardContent,
    IonIcon,
    useIonRouter,
    loadingController,
    IonList,
    IonItem,
    IonLabel,
    onIonViewWillEnter,
    IonPopover,
    IonNote,
    IonModal
} from '@ionic/vue'
import { personCircle, searchCircle, wifi, search, close, refreshOutline, menuOutline, listCircle,arrowBackOutline } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import { ref } from 'vue'
import { IPickupItem } from '../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()


// const pickups = ref<IPickupItem[]>([])
const pickupsHistory = ref<IPickupItem[]>([])
const searchData = ref("")
const dataUser = JSON.parse(localStorage.user)
const modal = ref();

onMounted(async () => {
    getPickupHistory()
    getPickupOrder()
    console.error("datas",pickups)
})

const pickups = computed(() => {
  return store.getters['pickup/get']('pickupsList') as IPickupItem
});
const isSearch = ref(false);
const inSearch = reactive({
    icon: search,
})
const onSearchData = computed(() => {
    const pickupArray = Object.values(store.getters['pickup/get']('pickupsList') as IPickupItem || {})
    return pickupArray.filter(data => 
    data.POrderCustName.toLocaleLowerCase().includes(searchData.value.toLowerCase())
    )
})

const cancel = () => modal.value.$el.dismiss();

const openHistory = () => {
    modal.value.$el.present()
    console.debug('History',modal.value.$el)
}

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
        // pickups.value = result.data
        loading.dismiss();
        // console.debug("After dispatch",pickups.value);
    }else{
        // pickups.value = result.data
        loading.dismiss();
        // console.debug("After dispatch",pickups.value);
    }
};

const getPickupHistory = async () => {
    const data = {
        customer_id: localStorage.pegawai_id
    };
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('pickup/pickupHistory',data);
    if (result.error == false) {
        pickupsHistory.value = result.data
        loading.dismiss();
        console.debug("pickupsHistory",pickupsHistory.value);
    }else{
        pickupsHistory.value = result.data
        loading.dismiss();
        console.debug("pickupsHistory",pickupsHistory.value);
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
const seeDetailHistory = (idPickup: any) => {
    localStorage.setItem("idPickup", idPickup)
    modal.value.$el.dismiss()
    router.push("/select-room");
}
onIonViewWillEnter(() => {
    console.warn('datassssss',onSearchData)
    console.warn('datassssss 22',pickups)
});

</script>