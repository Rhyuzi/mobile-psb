<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="color-white">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/marketing/prospek"></ion-back-button>
                </ion-buttons>
                <ion-title>Detail Prospek</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list lines="none">
                <ion-item :button="true">
                    <ion-label><strong>Customer</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.GuestName }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Komoditi</strong></ion-label>
                    <ion-label class="font-size-14 wrap-text">{{ prospek?.CB_Nama }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Alamat</strong></ion-label>
                    <ion-label class="font-size-14 wrap-text">{{ prospek?.GuestAddr }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>No Telpon</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.GuestTelp }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Email</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.GuestEmail }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Tanggal</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.GuestCreate }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Asal Kota</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.orgLocation.DefaultCityName }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Destinasi</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.destLocation.DefaultCityName }}</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Periode Bayar</strong></ion-label>
                    <ion-label class="font-size-14">{{ prospek?.GuestPayPeriode }} hari</ion-label>
                </ion-item>
                <ion-item :button="true">
                    <ion-label><strong>Kompetitor</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Express</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestKompetitor1 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Cargo</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestKompetitor2 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Trucking</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestKompetitor3 }}</ion-label>
                    </ion-item>
                </div>
                <ion-item :button="true">
                    <ion-label><strong>Budget Logistik</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Express</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(prospek?.GuestPotency1) }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Cargo</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(prospek?.GuestPotency2) }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>Trucking</strong></ion-label>
                        <ion-label class="font-size-14">{{ custom.convertToRP(prospek?.GuestPotency3) }}</ion-label>
                    </ion-item>
                </div>
                <ion-item :button="true">
                    <ion-label><strong>PIC Order</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Nama</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestContactName1 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>No Hp</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestContactTelp1 }}</ion-label>
                    </ion-item>
                </div>
                <ion-item :button="true">
                    <ion-label><strong>PIC Keuangan</strong></ion-label>
                </ion-item>
                <div style="margin-left: 20px;">
                    <ion-item :button="true">
                        <ion-label><strong>Nama</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestContactName2 }}</ion-label>
                    </ion-item>
                    <ion-item :button="true">
                        <ion-label><strong>No Hp</strong></ion-label>
                        <ion-label class="font-size-14">{{ prospek?.GuestContactTelp2 }}</ion-label>
                    </ion-item>
                </div>
                <ion-item>
                    <strong>Gambar</strong>
                </ion-item>
                <ion-item>
                    <img :src="prospek?.GuestPicture1"
                        alt="prospek-gambar">
                </ion-item>
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
import { GuestbookData } from '../../../api/conf-api/interface/dashboard'
import { MAIN_URL_MARKETING_PROSPEK } from "@/api/conf-api/endpoints";
import CustomTS from "@/custom/custom";
const custom = new CustomTS()
const store = useStore()
onIonViewWillEnter(() => {
    // This function will be executed each time the view is about to enter
});

onMounted(async () => {
    console.error("datas", prospek.value)
})

const prospek = computed(() => {
    const data = Object.values(store.getters['marketing/get']('prospekList') as GuestbookData || {})
    const filter = data.filter(item => item.GuestID == localStorage.idProspek)
    return filter[0]
});
const urlGambar = (dataUrl:any) => {
    return MAIN_URL_MARKETING_PROSPEK+dataUrl
};



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