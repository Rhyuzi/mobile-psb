<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons class="color-whites" slot="start">
                    <ion-back-button default-href="/tabs/tab1"></ion-back-button>
                </ion-buttons>
                <div class="title-header">
                    <h3 class="font-monospace font-white">Data POD</h3>
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
                <div class="item-pick" v-for="pickup in paginatedHistoryData" :key="pickup.POrderNo">
                    <ion-card-content @click="seeDetail(pickup.POrderID)">
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pickup.POrderCustName }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ pickup.POrderDate }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ pickup.POrderCustAddr
                                    }}</p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ pickup.POrderIsi }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ pickup.POrderQty }} qty</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pickup.POrderDEO }}</ion-label>
                            </div>
                        </ion-list>
                    </ion-card-content>
                </div>
            </div>

            <div v-if="state.selectedSegment == 'request'" class="main-request">
                <div v-if="onSearchData.length == 0" class="centered-text">
                    <div>Tidak Ada Data POD</div>
                </div>
                <div class="item-pick" v-for="pickup in onSearchData" :key="pickup.POrderNo">
                    <ion-card-content @click="seeDetail(pickup.POrderID)">
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pickup.POrderCustName }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ pickup.POrderDate }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ pickup.POrderCustAddr }}
                                </p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ pickup.POrderIsi }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ pickup.POrderQty }} qty</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pickup.POrderDEO }}</ion-label>
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
import { IPickupItem } from '../api/conf-api/interface/dashboard'
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
    if (pickups.value.length == 0) {
        getPickupOrder()
    }

    if (pickupsHistory.value.length == 0) {
        getPickupHistory()
    }
    if (localStorage.getItem('segment-pod')) {
        if (localStorage.getItem('segment-pod') == 'history') {
            state.selectedSegment = 'history'
        } else {
            state.selectedSegment = 'request'
        }
    }
    console.error('totalPages', totalPages.value)
})

const pickups = computed(() => {
    return store.getters['pickup/get']('pickupsList') as IPickupItem
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

const filteredHistoryData = computed(() => {
    const pickupArray = Object.values(store.getters['pickup/get']('historyList') as IPickupItem || {})
    return pickupArray.filter(data =>
        data.POrderCustName.toLocaleLowerCase().includes(searchData.value.toLowerCase())
    )
})

const paginatedHistoryData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredHistoryData.value.slice(startIndex, endIndex);
});

const onClickRefresh = () => {
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon!.classList.add('spin');
    getPickupOrder()
    getPickupHistory()
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
    } else {
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

const totalPages = computed(() => {
    const totalItems = Object.values(store.getters['pickup/get']('historyList') as IPickupItem[] || []).length;
    return Math.ceil(totalItems / itemsPerPage);
});

onIonViewWillEnter(() => {
    // console.warn('datassssss',onSearchData)
    // console.warn('datassssss 22',pickups)
});

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
    margin-bottom: 62px;
    background: lightgray;
}

.main-request {
    overflow-x: hidden;
    height: 100%;
    background: lightgray;
}
</style>