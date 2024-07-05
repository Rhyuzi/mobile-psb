<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="display-fl">
                <!-- <ion-icon id="auto-trigger" class="ic-toolbar ic-filter"
                        :icon="menuOutline"
                        slot="start"></ion-icon> -->

                <div class="display-fl">
                    <img src="../../assets/image/logo-pandu.png" class="logo-header-home" alt="">
                    <div class="title-header">
                        <p class="font-monospace font-white">Selamat Datang,</p>
                        <p class="font-white">{{ dataUser.name }}</p>
                    </div>

                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-content class="ion-padding">
                <div class="display-fl align-center">
                    <h5>{{ dataUser.name }}</h5>
                    <img src="../../assets/image/psb-logo-head.png" class="margin-left-auto img-user-icon" alt="">
                </div>

                <div v-if="!loaded">
                    <ion-list>
                        <ion-list-header>
                            <ion-skeleton-text :animated="true" style="width: 100%;height: 22px"></ion-skeleton-text>
                        </ion-list-header>
                        <ion-item>
                            <ion-thumbnail slot="start" style="width: 44%;height: 84px;">
                                <ion-skeleton-text :animated="true"></ion-skeleton-text>
                            </ion-thumbnail>
                            <ion-thumbnail slot="end" style="width: 88%;height: 84px;">
                                <ion-skeleton-text :animated="true"></ion-skeleton-text>
                            </ion-thumbnail>
                        </ion-item>
                    </ion-list>
                    <ion-list>
                        <ion-list-header>
                            <ion-skeleton-text :animated="true" style="width: 100%;height: 22px"></ion-skeleton-text>
                        </ion-list-header>
                        <ion-item>
                            <ion-thumbnail slot="start" style="width: 44%;height: 84px;">
                                <ion-skeleton-text :animated="true"></ion-skeleton-text>
                            </ion-thumbnail>
                            <ion-thumbnail slot="end" style="width: 88%;height: 84px;">
                                <ion-skeleton-text :animated="true"></ion-skeleton-text>
                            </ion-thumbnail>
                        </ion-item>
                    </ion-list>
                </div>

                <div v-if="loaded">
                    <div class="content-pickup">
                        <div class="display-fl align-center">
                            <p>Pelanggan Prospek</p>
                        </div>
                        <div class="display-fl align-center">
                            <button @click="toProspek" class="btn-pickup">{{ countProspekNow }}</button>
                            <button @click="toProspekHist" class="btn-pickup margin-left-auto"> {{ countProspekOld
                                }}</button>
                        </div>
                    </div>

                    <div class="content-pickup">
                        <div class="display-fl align-center">
                            <p>Kunjungan Sales</p>
                        </div>
                        <div class="display-fl align-center">
                            <!-- <button @click="toPodReq" class="btn-pickup"
                                :class="{ 'background-blue color-white': pickups.length !== 0 }">{{ pickups.length
                                }}</button> -->
                            <button @click="toKunjReq" class="btn-pickup">{{ countKunjunganNow }}</button>
                            <button @click="toKunjHist" class="btn-pickup margin-left-auto">{{ countKunjunganOld
                                }}</button>
                        </div>
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
    IonRefresher,
    IonRefresherContent,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail
} from '@ionic/vue'
import { personCircle, searchCircle, wifi, search, close, refreshOutline, menuOutline, listCircle, arrowBackOutline } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import { ref } from 'vue'
import { GuestbookData, VisitData } from '../../api/conf-api/interface/dashboard'
import router from "@/router";
const store = useStore()
const ionRouter = useIonRouter()
const loaded = ref(false);
const dataUser = JSON.parse(localStorage.user)
const modal = ref();

onMounted(async () => {
    if (prospek.value.length == 0) {
        await getProspek()
    }
    if (kunjungan.value.length == 0) {
        await getKunjungan()
    }
    loaded.value = true
    console.error("datas", kunjungan.value)
})
const prospek = computed(() => {
    return store.getters['marketing/get']('prospekList') as GuestbookData
});
const kunjungan = computed(() => {
    return store.getters['marketing/get']('kunjunganList') as VisitData
});

const getProspek = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getProspekData');
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

const handleRefresh = async (event: CustomEvent) => {
    loaded.value = false
    await getProspek()
    await getKunjungan()
    loaded.value = true
    event.target?.complete();
};

const countProspekNow = computed(() => {
    const deliveryArr = Object.values(store.getters['marketing/get']('prospekList')) as GuestbookData[];
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return deliveryArr.filter(data => {
        const guestCreateDate = data.GuestCreate.split(' ')[0];
        return guestCreateDate === formattedDate;
    }).length;
});

const countProspekOld = computed(() => {
    const deliveryArr = Object.values(store.getters['marketing/get']('prospekList')) as GuestbookData[];
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return deliveryArr.filter(data => {
        const guestCreateDate = data.GuestCreate.split(' ')[0];
        return guestCreateDate !== formattedDate;
    }).length;
});

const countKunjunganNow = computed(() => {
    const deliveryArr = Object.values(store.getters['marketing/get']('kunjunganList')) as VisitData[];
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return deliveryArr.filter(data => {
        const VisitCreateTime = data.VisitCreateTime.split(' ')[0];
        return VisitCreateTime === formattedDate;
    }).length;
});

const countKunjunganOld = computed(() => {
    const deliveryArr = Object.values(store.getters['marketing/get']('kunjunganList')) as VisitData[];
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return deliveryArr.filter(data => {
        const VisitCreateTime = data.VisitCreateTime.split(' ')[0];
        return VisitCreateTime !== formattedDate;
    }).length;
});
onIonViewWillEnter(() => {
    // console.warn('datassssss',onSearchData)
    // console.warn('datassssss 22',pickups)
});


const toProspek = () => {
    localStorage.setItem('segment-prospek', 'request')
    router.push("/marketing/prospek");
}

const toProspekHist = () => {
    localStorage.setItem('segment-prospek', 'history')
    router.push("/marketing/prospek");
}

const toKunjReq = () => {
    localStorage.setItem('segment-kunjungan', 'request')
    router.push("/marketing/kunjungan");
}

const toKunjHist = () => {
    localStorage.setItem('segment-kunjungan', 'history')
    router.push("/marketing/kunjungan");
}


</script>