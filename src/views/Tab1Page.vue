<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="display-fl">
                <!-- <ion-icon id="auto-trigger" class="ic-toolbar ic-filter"
                        :icon="menuOutline"
                        slot="start"></ion-icon> -->

                <div class="display-fl">
                    <img src="../assets/image/logo-pandu.png" class="logo-header-home" alt="">
                    <div class="title-header">
                        <p class="font-monospace font-white">Selamat Datang,</p>
                        <p class="font-white">{{ dataUser.name }}</p>
                    </div>

                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-content class="ion-padding">
                <div class="display-fl align-center">
                    <h5>{{ dataUser.name }}</h5>
                    <img src="../assets/image/psb-logo-head.png" class="margin-left-auto img-user-icon" alt="">
                </div>
                <div class="content-pickup">
                    <div class="display-fl align-center">
                        <p>PENGANTARAN (Delivery)</p>
                        <p class="margin-left-auto label-kg">({{
                            calculateTotalDeliveryWeight(countDeliveryReq) +calculateTotalDeliveryWeight(countDeliveryHist) }} kg)</p>
                    </div>
                    <div class="display-fl align-center">
                        <button @click="toDelReq" class="btn-pickup">{{ countDeliveryReq.length }}</button>
                        <button @click="toDelHist" class="btn-pickup margin-left-auto"> {{ countDeliveryHist.length }}</button>
                    </div>
                </div>

                <div class="content-pickup">
                    <div class="display-fl align-center">
                        <p>PENJEMPUTAN (Pick-Up)</p>
                        <p class="margin-left-auto label-kg">({{
                            calculateTotalPOrderWeight(pickups) +calculateTotalPOrderWeight(pickupsHistory) }} kg)</p>
                    </div>
                    <div class="display-fl align-center">
                        <button @click="toPodReq" class="btn-pickup"
                            :class="{ 'background-blue color-white': pickups.length !== 0 }">{{ pickups.length
                            }}</button>
                        <button @click="toPodHist" class="btn-pickup margin-left-auto">{{ pickupsHistory.length
                            }}</button>
                    </div>
                </div>
            </ion-content>
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
import { personCircle, searchCircle, wifi, search, close, refreshOutline, menuOutline, listCircle, arrowBackOutline } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import { ref } from 'vue'
import { IPickupItem, IDeliveryOrder } from '../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()


// const pickups = ref<IPickupItem[]>([])
// const pickupsHistory = ref<IPickupItem[]>([])
const searchData = ref("")
const dataUser = JSON.parse(localStorage.user)
const modal = ref();

onMounted(async () => {
    getPickupHistory()
    getPickupOrder()
    getDelivery()
    console.error("datas", pickups)
})

const pickups = computed(() => {
    return store.getters['pickup/get']('pickupsList') as IPickupItem
});

const delivery = computed(() => {
    return store.getters['arrive/get']('delivery') as IDeliveryOrder
});


const pickupsHistory = computed(() => {
    return store.getters['pickup/get']('historyList') as IPickupItem || {}
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

const countDeliveryReq = computed(() => {
    const deliveryArr = Object.values(store.getters['arrive/get']('delivery') as IDeliveryOrder || {})
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return deliveryArr.filter(data => data.dlvdate == formattedDate)
})

const countDeliveryHist = computed(() => {
    const deliveryArr = Object.values(store.getters['arrive/get']('delivery') as IDeliveryOrder || {})
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return deliveryArr.filter(data => data.dlvdate != formattedDate)
})

const cancel = () => modal.value.$el.dismiss();

const openHistory = () => {
    modal.value.$el.present()
    console.debug('History', modal.value.$el)
}

const onClickRefresh = () => {
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon!.classList.add('spin');
    getPickupOrder()
    setTimeout(() => {
        refreshIcon!.classList.remove('spin');
    }, 1000);
}

const getDelivery = async () => {
    const data = {
        courier_id: localStorage.pegawai_id
    };
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('arrive/getDelivery', data);
    if (result.error == false) {
        // pickupsHistory.value = result.data
        loading.dismiss();
        // console.debug("pickupsHistory",pickupsHistory.value);
    } else {
        // pickupsHistory.value = result.data
        loading.dismiss();
        // console.debug("pickupsHistory",pickupsHistory.value);
    }
};

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
        console.debug("After dispatch", result);
    } else {
        // pickups.value = result.data
        loading.dismiss();
        console.debug("After dispatch", result);
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
    const result = await store.dispatch('pickup/pickupHistory', data);
    if (result.error == false) {
        // pickupsHistory.value = result.data
        loading.dismiss();
        // console.debug("pickupsHistory",pickupsHistory.value);
    } else {
        // pickupsHistory.value = result.data
        loading.dismiss();
        // console.debug("pickupsHistory",pickupsHistory.value);
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
    console.debug('idPickup', idPickup)
    router.push("/select-room");
}
const seeDetailHistory = (idPickup: any) => {
    localStorage.setItem("idPickup", idPickup)
    modal.value.$el.dismiss()
    router.push("/select-room");
}
onIonViewWillEnter(() => {
    // console.warn('datassssss',onSearchData)
    // console.warn('datassssss 22',pickups)
});

const calculateTotalPOrderWeight = (orders: any) => {
    let totalWeight = 0;

    // Iterate through each order
    orders.forEach(order => {
        // Convert POrderWeight to a number and add to totalWeight
        if (!order.POrderWeight) return
        totalWeight += parseFloat(order.POrderWeight);
    });
    return totalWeight;
}

const calculateTotalDeliveryWeight = (orders: any) => {
    let totalWeight = 0;

    // Iterate through each order
    orders.forEach(order => {
        // Convert POrderWeight to a number and add to totalWeight
        if (!order.connoteweight) return
        totalWeight += parseFloat(order.connoteweight);
    });
    return totalWeight;
}

const toPodReq = () => {
    localStorage.setItem('segment-pod', 'request')
    router.push("/pod");
}

const toPodHist = () => {
    localStorage.setItem('segment-pod', 'history')
    router.push("/pod");
}

const toDelReq = () => {
    localStorage.setItem('segment-delivery', 'request')
    router.push("/delivery");
}

const toDelHist = () => {
    localStorage.setItem('segment-delivery', 'history')
    router.push("/delivery");
}


</script>