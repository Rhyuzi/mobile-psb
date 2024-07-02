<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons class="color-whites" slot="start">
                    <ion-back-button default-href="/tabs/tab1"></ion-back-button>
                </ion-buttons>
                <div class="title-header">
                    <h3 class="font-monospace font-white">Delivery</h3>
                </div>
                <ion-icon @click="onClickRefresh" class="ic-toolbar refresh-icon" :icon="refreshOutline"
                    slot="end"></ion-icon>
                <ion-icon @click="onClickSearch" class="ic-toolbar" :icon="inSearch.icon" slot="end"></ion-icon>
            </ion-toolbar>
            <ion-searchbar class="bg-menu-bar" v-if="isSearch" placeholder="Search Data ..."
                v-model="searchData"></ion-searchbar>
            <ion-segment value="default" class="segment-main">
                <ion-segment-button @click="state.selectedSegment = 'request'" value="request" class="color-white"
                    :class="{ 'segment-button-checked': state.selectedSegment == 'request' }">
                    <ion-label>Request</ion-label>
                </ion-segment-button>
                <ion-segment-button @click="state.selectedSegment = 'history'" value="history" class="color-white"
                    :class="{ 'segment-button-checked': state.selectedSegment == 'history' }">
                    <ion-label>History</ion-label>
                </ion-segment-button>
            </ion-segment>
        </ion-header>
        <ion-content :fullscreen="true">
            <div v-if="state.selectedSegment == 'history'" class="main-history">
                <div class="item-pick" v-for="del in paginatedHistoryDelivery" :key="del">
                    <ion-card-content>
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ del.connotecustname }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ del.dlvdate }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ del.destination }}
                                </p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ del.servicename }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ del.connoteqty }} qty</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ del.pegawainama }}</ion-label>
                            </div>
                        </ion-list>
                    </ion-card-content>
                </div>
            </div>

            <div v-if="state.selectedSegment == 'request'" class="main-request">
                <div v-if="onSearchData.length == 0" class="centered-text">
                    <div>Tidak Ada Data Delivery</div>
                </div>
                <div class="item-pick" v-for="del in onSearchData" :key="del">
                    <ion-card-content @click="toShipment(del.connoteno)">
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ del.connotecustname }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ del.dlvdate }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ del.destination }}
                                </p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ del.servicename }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ del.connoteqty }} qty</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ del.pegawainama }}</ion-label>
                            </div>
                        </ion-list>
                    </ion-card-content>
                </div>
            </div>
            <div v-if="state.selectedSegment == 'history'" class="pagination-controls">
                <ion-button @click="prevPage" :disabled="currentPage === 1">Previous</ion-button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <ion-button @click="nextPage" :disabled="currentPage === totalPages">Next</ion-button>
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
    IonModal,
    IonButton,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonButtons
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
const state = reactive({
    selectedSegment: 'request', // Mulai dengan request sebagai default

});
const searchData = ref("")
const dataUser = JSON.parse(localStorage.user)
const modal = ref();
const currentPage = ref(1); // Current page number
const itemsPerPage = 20;

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
onMounted(async () => {

    if (delivery.value.length == 0) {
        getDelivery()
    }
    if (deliveryHist.value.length == 0) {
        getDeliveryHistory()
    }
    if (localStorage.getItem('segment-delivery')) {
        if (localStorage.getItem('segment-delivery') == 'history') {
            state.selectedSegment = 'history'
        } else {
            state.selectedSegment = 'request'
        }
    }
    console.error('totalPages', totalPages.value)
})

const delivery = computed(() => {
    return store.getters['arrive/get']('delivery') as IDeliveryOrder
});

const deliveryHist = computed(() => {
    return store.getters['arrive/get']('deliveryHist') as IDeliveryOrder
});


const isSearch = ref(false);
const inSearch = reactive({
    icon: search,
})
const onSearchData = computed(() => {
    const pickupArray = Object.values(store.getters['arrive/get']('delivery') as IDeliveryOrder || {})
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return pickupArray.filter(data => data.dlvdate == formattedDate &&
        data.connotecustname.toLocaleLowerCase().includes(searchData.value.toLowerCase())
    )
})

const filteredHistoryDelivery = computed(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const pickupArray = Object.values(store.getters['arrive/get']('deliveryHist') as IDeliveryOrder || {})
    return pickupArray.filter(data => data.dlvdate != formattedDate &&
        data.connotecustname.toLocaleLowerCase().includes(searchData.value.toLowerCase())
    )
})

const paginatedHistoryDelivery = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredHistoryDelivery.value.slice(startIndex, endIndex);
});

const onClickRefresh = () => {
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon!.classList.add('spin');
    getDelivery()
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

const getDeliveryHistory = async () => {
    const data = {
        courier_id: localStorage.pegawai_id
    };
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('arrive/getDeliveryHistory', data);
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

const totalPages = computed(() => {
    const totalItems = Object.values(store.getters['arrive/get']('deliveryHist')).length;
    return Math.ceil(totalItems / itemsPerPage);
});

const toShipment = (connoteno: any) => {
    localStorage.setItem('shipment-delivered', connoteno)
    router.push("/shipment-delivered");
}

</script>
<style scoped>
.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.main-history {
    margin-bottom: 100px;
}
</style>