<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons> -->
                <ion-title class="font-white">Form Kunjungan</ion-title>
            </ion-toolbar>
        </ion-header>
        <!-- <ion-content class="frame-scanner"> -->
        <div v-if="isScan" class="frame-scanner" id="frame-scanner">

        </div>
        <div v-if="isScan" class="center-button" id="center-button">
            <ion-button class="close-scanner" color="light" shape="round" @click="stopScan"
                size="default">BATALKAN</ion-button>
        </div>
        <!-- </ion-content> -->
        <ion-content id="content-wc" :fullscreen="true">
            <ion-card class="form-input">
                <ion-card-content>
                    <form action="" ref="formAF">
                        <ion-input type="date" v-model="state.nama" color="primary" label="Tanggal"
                            label-placement="floating" fill="outline"></ion-input><br />
                        <ion-input v-model="state.alamat" color="primary" label="DIANN" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-select v-model="state.komoditi" class="font-black" ref="Prospek" color="dark"
                            label="prospek" label-placement="floating" fill="outline">
                            <ion-select-option class="font-black" value="0">Prospek Baru</ion-select-option>
                            <ion-select-option class="font-black" value="1">Customer</ion-select-option>
                        </ion-select><br>
                        <ion-select v-model="state.komoditi" class="font-black" ref="Pilih Tujuan" color="dark"
                            label="tujuan" label-placement="floating" fill="outline" placeholder="Pilih Tujuan">
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                        </ion-select><br>

                        <ion-input v-model="state.nama" color="primary" label="Nama" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-input v-model="state.alamat" color="primary" label="Alamat" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-input v-model="state.nama" color="primary" label="PIC" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-input v-model="state.alamat" color="primary" label="Jabatan" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-input v-model="state.nama" color="primary" label="Wilayah Kirim" label-placement="floating"
                            fill="outline"></ion-input><br />
                        <ion-label>Budget Logistik Rp.</ion-label>
                        <div class="display-flex">
                            <ion-input v-model="state.bgexp" color="primary" label="Express" label-placement="floating"
                                fill="outline"></ion-input><br />
                            <ion-input v-model="state.bgcar" color="primary" label="Cargo" label-placement="floating"
                                fill="outline"></ion-input><br />
                            <ion-input v-model="state.bgtruck" color="primary" label="Trucking"
                                label-placement="floating" fill="outline"></ion-input><br />
                        </div><br>
                        <ion-label>Kompetitor</ion-label>
                        <div class="display-flex">
                            <ion-input v-model="state.ktexp" color="primary" label="Express" label-placement="floating"
                                fill="outline"></ion-input><br />
                            <ion-input v-model="state.ktcar" color="primary" label="Cargo" label-placement="floating"
                                fill="outline"></ion-input><br />
                            <ion-input v-model="state.kttruck" color="primary" label="Trucking"
                                label-placement="floating" fill="outline"></ion-input><br />
                        </div><br>
                        <ion-select v-model="state.areapickup" class="font-black" ref="areaPickup" color="dark"
                            label="Prospek" label-placement="floating" fill="outline" placeholder="Pilih Prospek">
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                            <ion-select-option class="font-black" value="c.DefaultCityNo">PERCETAKAN</ion-select-option>
                        </ion-select><br />

                        <ion-input v-model="state.usiatagihan" color="primary" label="Catatan"
                            label-placement="floating" fill="outline"></ion-input><br />
                        <ion-button color="success" expand="full" shape="round" @click="submitForm"
                            size="default">Submit
                            Data</ion-button>

                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-toast :is-open="isOpen" :message="errMessage" :duration="5000" @didDismiss="setOpen(false)"></ion-toast>

    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonActionSheet,
    loadingController,
    IonSelect,
    IonSelectOption,
    IonToast,
    IonButtons,
    IonBackButton
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem, IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers, numeric } from "@vuelidate/validators";



const headers = ref([
    { text: "No.AWB", value: "ConnoteNo" },
    { text: "Pengirim", value: "ConnoteCustName" },
    { text: "Nama Dituju", value: "ConnoteRecvName" },
    { text: "Kota Tujuan", value: "ConnoteRecvAddr" },
])
const isOpen = ref(false);
const isScan = ref(false);
const errMessage = ref("");
const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    nama: "",
    alamat: "",
    telp: "",
    komoditi: "",
    areakirim: "",
    bgexp: "",
    bgcar: "",
    bgtruck: "",
    ktexp: "",
    ktcar: "",
    kttruck: "",
    areapickup: "",
    namapicord: "",
    telppicord: "",
    namapickeu: "",
    telppickeu: "",
    usiatagihan: ""

});
const latitude = ref();
const longitude = ref();
const formAF = ref<HTMLFormElement | null>(null);

onMounted(async () => {
    getCity()
    // state.tanggal = formatDate(new Date());
});

const setOpen = (state: boolean) => {
    isOpen.value = state;
    if (!state) {
        errMessage.value = "";
    }
};

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude.value = position.coords.latitude;
                longitude.value = position.coords.longitude;
                console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            },
            (err) => {
                console.error(`Error: ${err.message}`);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
};

const dataAwb = computed(() => {
    return store.getters['arrive/get']('awb') as IConnoteAWB
});

const rules = computed(() => {
    return {
        nama: {
            required: helpers.withMessage("Nama harus diisi", required),
        },
        alamat: {
            required: helpers.withMessage("Alamat harus diisi", required),
        },
        telp: {
            required: helpers.withMessage("Telp harus diisi", required),
            numeric: helpers.withMessage("Telp harus angka", numeric),
        },
        komoditi: {
            required: helpers.withMessage("Komoditi harus diisi", required),
        },
        areakirim: {
            required: helpers.withMessage("Area Kirim harus diisi", required),
        },
        bgexp: {
            required: helpers.withMessage("Harus diisi", required),
            numeric: helpers.withMessage("Harus angka", numeric),
        },
        bgcar: {
            required: helpers.withMessage("Harus diisi", required),
            numeric: helpers.withMessage("Harus angka", numeric),
        },
        bgtruck: {
            required: helpers.withMessage("Harus diisi", required),
            numeric: helpers.withMessage("Harus angka", numeric),
        },
        areapickup: {
            required: helpers.withMessage("Area Pickup harus diisi", required),
        },
        namapicord: {
            required: helpers.withMessage("Nama harus diisi", required),
        },
        telppicord: {
            required: helpers.withMessage("Telp harus diisi", required),
            numeric: helpers.withMessage("Telp harus angka", numeric),
        },
        usiatagihan: {
            numeric: helpers.withMessage("Harus angka", numeric),
        },
    };
});

// nama: "",
//     alamat: "",
//     telp: "",
//     komoditi: "",
//     areakirim: "",
//     bgexp: "",
//     bgcar: "",
//     bgtruck: "",
//     ktexp: "",
//     ktcar: "",
//     kttruck: "",
//     areapickup: "",
//     namapicord: "",
//     telppicord: "",
//     namapickeu: "",
//     telppickeu: "",
//     usiatagihan: ""
const v$ = useVuelidate(rules, state);
const markTouched = (event: Event) => {
    const target = event.target as HTMLInputElement;

    v$.value.$validate();

    target.classList.add("ion-touched");
};
const getCity = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('arrive/getCity');
    if (result.error == false) {
        city.value = result.data
        loading.dismiss();
        console.debug("After dispatch", city.value);
    } else {
        city.value = result.data
        loading.dismiss();
        console.debug("After dispatch", city.value);
    }
};

const submitForm = async () => {
    // errMessage.value = "waoasaspjgapsgjoasp";
    // setOpen(true);
    v$.value.$validate();
    if (v$.value.$error) {
        const inputs = formAF.value?.querySelectorAll("input");
        inputs?.forEach((input) => input.focus());

        return;
    }

    console.debug('Kisi kabeh', dataAwb)
}

const submitData = async () => {
    const keys = Object.keys(dataAwb.value) as (keyof IConnoteAWB)[];


    for (const key of keys) {
        console.log(dataAwb.value[key]);
        const datas = dataAwb.value[key]
        const data = {
            username: JSON.parse(localStorage.user).username,
            cloc: JSON.parse(localStorage.user).UserLocation,
            wctgl: datas.DataFromInput.tanggalInpt,
            wcdesc: datas.DataFromInput.catatan,
            wckurir: JSON.parse(localStorage.user).pegawai_id,
            temp_key: datas.DataFromInput.temp_key,
            nowc: await generateCounter()
        }

        const res = await store.dispatch('arrive/saveWCourier', data);
        errMessage.value = res.message;
        // if (!res.error){
        // }
        setOpen(true);
        console.error('parsed asdta', data);
    }
    store.dispatch('arrive/resetArrive')

    // console.debug('submit data', dataAwb.value);
    // console.debug('submit data keys', keys);

}

const logout = () => {
    localStorage.clear();
    location.reload();
};
</script>
