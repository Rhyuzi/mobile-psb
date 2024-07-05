<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="color-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/marketing/prospek"></ion-back-button>
                </ion-buttons>
                <ion-title>Detail Kunjungan</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list lines="none">
                <ion-item :button="true">
                    <ion-label><strong>Customer</strong></ion-label>
                    <ion-label class="font-size-14">{{ kunjungan?.VisitGuestName }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Area Kirim</strong></ion-label>
                    <ion-label class="font-size-14 wrap-text">{{ kunjungan?.VisitAreaKirim }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Tanggal</strong></ion-label>
                    <ion-label class="font-size-14">{{ kunjungan?.VisitCreateTime }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>PIC Nama</strong></ion-label>
                    <ion-label class="font-size-14">{{ kunjungan?.VisitPicName }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>PIC Jabatan</strong></ion-label>
                    <ion-label class="font-size-14">{{ kunjungan?.VisitPicJabat }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Memo</strong></ion-label>
                    <ion-label class="font-size-14 wrap-text">{{ kunjungan?.VisitMemo }} hari</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Kompetitor</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Express</strong></ion-label>
                        <ion-label class="font-size-14">{{ kunjungan?.VisitKompetitor1 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Cargo</strong></ion-label>
                        <ion-label class="font-size-14">{{ kunjungan?.VisitKompetitor2 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Trucking</strong></ion-label>
                        <ion-label class="font-size-14">{{ kunjungan?.VisitKompetitor3 }}</ion-label>
                    </ion-item>
                </div>
                <ion-item :button="true">
                    <ion-label><strong>Budget Logistik</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Express</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(kunjungan?.VisitPotency1) }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Cargo</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(kunjungan?.VisitPotency2) }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Trucking</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(kunjungan?.VisitPotency3) }}</ion-label>
                    </ion-item>
                </div>
        
            </ion-list>
        </ion-content>
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
    loadingController,
} from "@ionic/vue";
import { personCircle, chevronDown, chevronUp } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { ref } from 'vue'
import router from "@/router";
import { VisitData } from '../../../api/conf-api/interface/dashboard'
import { MAIN_URL_MARKETING_PROSPEK } from "@/api/conf-api/endpoints";
import CustomTS from "@/custom/custom";

const store = useStore()
const custom = new CustomTS()
onIonViewWillEnter(() => {
    // This function will be executed each time the view is about to enter
});

onMounted(async () => {
    console.error("datas", kunjungan.value)
})

const kunjungan = computed(() => {
    const data = Object.values(store.getters['marketing/get']('kunjunganList') as VisitData || {})
    const filter = data.filter(item => item.VisitID == localStorage.idKunjungan)
    return filter[0]
});



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