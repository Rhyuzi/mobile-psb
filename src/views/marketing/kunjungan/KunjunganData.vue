<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons class="color-whites" slot="start">
                    <ion-back-button default-href="/marketing/tabs"></ion-back-button>
                </ion-buttons>
                <div class="title-header">
                    <h3 class="font-monospace font-white">Data Kunjungan</h3>
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
                <div class="item-pick" v-for="pros in paginatedHistoryData" :key="pros.VisitID">
                    <ion-card-content @click="seeDetail(pros.VisitID)">
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pros.VisitGuestName }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ pros.VisitCreateTime }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ pros.VisitAreaKirim
                                    }}</p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ pros.VisitMemo }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ pros.VisitStatusName }}</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pros.VisitCreateBy }}</ion-label>
                            </div>
                        </ion-list>
                    </ion-card-content>
                </div>
            </div>

            <div v-if="state.selectedSegment == 'request'" class="main-request">
                <div v-if="onSearchData.length == 0" class="centered-text">
                    <div class="font-size-14">Tidak Ada Data Kunjungan Hari Ini</div>
                </div>
                <div class="item-pick" v-for="pros in onSearchData" :key="pros.VisitID">
                    <ion-card-content @click="seeDetail(pros.VisitID)">
                        <ion-list>
                            <div class="display-flex">
                                <ion-icon class="img-ic" :icon="personCircle" color="secondary" slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pros.VisitGuestName }}</ion-label>
                                <p class="font-black float-right-flex font-none">{{ pros.VisitCreateTime }}</p>
                            </div>
                            <div class="display-flex">
                                <p class="font-black pick-addr custom-ellipsis font-bold">{{ pros.VisitAreaKirim
                                    }}</p>
                            </div>
                            <p class="font-black margin-memo font-bold">{{ pros.VisitMemo }}</p>


                            <div class="display-flex">
                                <p class="font-black cont-qty">{{ pros.VisitStatusName }}</p>
                                <ion-icon class="img-ic float-right-flex" :icon="personCircle" color="secondary"
                                    slot="start"></ion-icon>
                                <ion-label class="cust-name font-monospace">{{ pros.VisitCreateBy }}</ion-label>
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
import { VisitData } from '../../../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()
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
    if (kunjungan.value.length == 0) {
        getKunjungan()
    }

    if (localStorage.getItem('segment-kunjungan')) {
        if (localStorage.getItem('segment-kunjungan') == 'history') {
            state.selectedSegment = 'history'
        } else {
            state.selectedSegment = 'request'
        }
    }
    console.error('totalPages', totalPages.value)
})

const kunjungan = computed(() => {
    return store.getters['marketing/get']('kunjunganList') as VisitData
});

const isSearch = ref(false);
const inSearch = reactive({
    icon: search,
})
const onSearchData = computed(() => {
    const pickupArray = Object.values(store.getters['marketing/get']('kunjunganList') as VisitData || {})
    const now = new Date();

    // Format current date to match with GuestCreate date format
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return pickupArray.filter(data => {
        const guestCreateDate = data.VisitCreateTime.split(' ')[0];
        return guestCreateDate === formattedDate && data.VisitGuestName.toLocaleLowerCase().includes(searchData.value.toLowerCase());
    })
})

const filteredHistoryData = computed(() => {
    const pickupArray = Object.values(store.getters['marketing/get']('kunjunganList') as VisitData || {})
    return pickupArray.filter(data =>
        data.VisitGuestName.toLocaleLowerCase().includes(searchData.value.toLowerCase())
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
    getKunjungan()
    setTimeout(() => {
        refreshIcon!.classList.remove('spin');
    }, 1000);
}
const getKunjungan = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getKunjungan');
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

const totalPages = computed(() => {
    const totalItems = Object.values(store.getters['marketing/get']('kunjunganList') as VisitData || []).length;
    return Math.ceil(totalItems / itemsPerPage);
});

const seeDetail = (idKunjungan: any) => {
    localStorage.setItem("idKunjungan", idKunjungan)
    router.push("/marketing/detail-kunjungan");
}

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