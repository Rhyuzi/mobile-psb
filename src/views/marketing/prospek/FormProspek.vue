<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons> -->
                <ion-title class="font-white">Form Prospek</ion-title>
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
                        <ion-input v-model="state.nama" color="primary" label="Nama Perusahaan"
                            label-placement="floating" fill="outline"
                            :class="v$.nama.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.nama.$error
                                ? v$.nama.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.alamat" color="primary" label="Alamat" label-placement="floating"
                            fill="outline" :class="v$.alamat.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.alamat.$error
                                ? v$.alamat.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.telp" color="primary" label="Telp/Hp" label-placement="floating"
                            fill="outline" :class="v$.telp.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.telp.$error
                                ? v$.telp.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-select v-model="state.komoditi" class="font-black" ref="Komoditi" color="dark"
                            label="Komoditi" label-placement="floating" fill="outline" placeholder="Pilih Komoditi"
                            :class="v$.nama.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.nama.$error
                                ? v$.nama.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched">
                            <div v-for="k in komoditi" :key="k.id">
                                <ion-select-option class="font-black" :value="k.id">{{ k.CB_Nama
                                    }}</ion-select-option>
                            </div>
                        </ion-select><br>

                        <ion-input v-model="state.areakirim" color="primary" label="Area Kiriman"
                            label-placement="floating" fill="outline"
                            :class="v$.areakirim.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.areakirim.$error
                                ? v$.areakirim.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-label>Budget Logistik Rp.</ion-label>
                        <div class="display-flex">
                            <ion-input v-model="state.bgexp" color="primary" label="Express" label-placement="floating"
                                fill="outline"
                                :class="v$.bgexp.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                                :error-text="v$.bgexp.$error
                                    ? v$.bgexp.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
                            <ion-input v-model="state.bgcar" color="primary" label="Cargo" label-placement="floating"
                                fill="outline"
                                :class="v$.bgcar.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                                :error-text="v$.bgcar.$error
                                    ? v$.bgcar.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
                            <ion-input v-model="state.bgtruck" color="primary" label="Trucking"
                                label-placement="floating" fill="outline"
                                :class="v$.bgtruck.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                                :error-text="v$.bgtruck.$error
                                    ? v$.bgtruck.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
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
                            label="Area Pickup" label-placement="floating" fill="outline"
                            placeholder="Pilih Area Pickup"
                            :class="v$.areapickup.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.areapickup.$error
                                ? v$.areapickup.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched">
                            <div v-for="c in citys" :key="c.LocationID">
                                <ion-select-option class="font-black" :value="c.DefaultCityNo">{{ c.DefaultCityName
                                    }}</ion-select-option>
                            </div>
                        </ion-select><br />
                        <ion-label>PIC Order</ion-label>
                        <div class="display-flex">
                            <ion-input v-model="state.namapicord" color="primary" label="Nama PIC"
                                label-placement="floating" fill="outline"
                                :class="v$.namapicord.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                                :error-text="v$.namapicord.$error
                                    ? v$.namapicord.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
                            <ion-input v-model="state.telppicord" color="primary" label="Telp/Hp PIC"
                                label-placement="floating" fill="outline"
                                :class="v$.telppicord.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                                :error-text="v$.telppicord.$error
                                    ? v$.telppicord.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
                        </div><br>

                        <ion-label>PIC Keuangan</ion-label>
                        <div class="display-flex">
                            <ion-input v-model="state.namapickeu" color="primary" label="Nama PIC"
                                label-placement="floating" fill="outline"></ion-input><br />
                            <ion-input v-model="state.telppickeu" color="primary" label="Telp/Hp PIC"
                                label-placement="floating" fill="outline"></ion-input><br />
                        </div><br>

                        <ion-input v-model="state.usiatagihan" color="primary" label="Usia Tagihan/Hari"
                            label-placement="floating" fill="outline"
                            :class="v$.usiatagihan.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.usiatagihan.$error
                                ? v$.usiatagihan.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.files" @change="handleFileChange" type="file" color="primary"
                            accept="image/*"
                            :class="v$.files.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.files.$error
                                ? v$.files.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-button @click="getLocation">Get Location</ion-button>
                        <div v-if="latitude && longitude">
                            <p>Latitude: {{ latitude }}</p>
                            <p>Longitude: {{ longitude }}</p>
                        </div>
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
    IonBackButton,
    toastController
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem, IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers, numeric } from "@vuelidate/validators";
import router from "@/router";
import { Geolocation } from "@capacitor/geolocation";


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
    usiatagihan: "",
    files: null

});
const latitude = ref();
const longitude = ref();
const formAF = ref<HTMLFormElement | null>(null);

onMounted(async () => {
    await getCity()
    await getKomoditi()
    // state.tanggal = formatDate(new Date());
});

const setOpen = (state: boolean) => {
    isOpen.value = state;
    if (!state) {
        errMessage.value = "";
    }
};

const handleFileChange = (event: { target: { files: any; }; }) => {
    console.error('event', event)
    const files = event.target.files;
    if (files && files[0]) {
        state.files = files[0]; // Store the first selected file
    } else {
        state.files = null;
    }
};

const getLocation = async () => {
    try {
        const permissionStatus = await Geolocation.checkPermissions();

        if (permissionStatus.location === 'denied') {
            // Request permission if it's denied
            const requestPermission = await Geolocation.requestPermissions();
            if (requestPermission.location === 'denied') {
                console.error('Geolocation permission denied.');
                return;
            }
        }

        const position = await Geolocation.getCurrentPosition();
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

const citys = computed(() => {
    return store.getters['arrive/get']('city')
});

const komoditi = computed(() => {
    return store.getters['marketing/get']('komoditiLists')
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
        files: {
            required: helpers.withMessage("Gambar harus diisi", required),
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

const getKomoditi = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getKomoditi');
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
    v$.value.$validate();
    if (v$.value.$error) {
        const inputs = formAF.value?.querySelectorAll("input");
        inputs?.forEach((input) => input.focus());

        return;
    }
    if (latitude.value == undefined && longitude.value == undefined) {
        const toast = await toastController.create({
            message: 'Harap get lokasi terlebih dahulu',
            duration: 1500,
            position: "top",
            cssClass: 'toast-error'
        });

        return await toast.present();

    }
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('username', JSON.parse(localStorage.user).username);
    formData.append('loc', localStorage.UserLocation);
    formData.append('name', state.nama);
    formData.append('telp', state.telp);
    formData.append('addr', state.alamat);
    formData.append('guestloc', state.areapickup);
    formData.append('komoditi', state.komoditi);
    formData.append('map-loc', `${latitude.value}, ${longitude.value}`);
    formData.append('potency1', state.bgexp);
    formData.append('potency2', state.bgcar);
    formData.append('potency3', state.bgtruck);
    formData.append('contactname1', state.namapicord);
    formData.append('contactname2', state.namapickeu);
    formData.append('contacttlp1', state.telppicord);
    formData.append('contacttlp2', state.telppickeu);
    formData.append('payperiode', state.usiatagihan);
    formData.append('kompetitor1', state.ktexp);
    formData.append('kompetitor2', state.ktcar);
    formData.append('kompetitor3', state.kttruck);
    formData.append('areakirim', state.areakirim);

    // Append the file if it exists
    if (state.files) {
        formData.append('file-img', state.files);
    }

    formData.append('pegawai_id', localStorage.pegawai_id);


    const save = await store.dispatch('marketing/saveProspek', formData);
    if (save.error == false) {
        getProspek()
        clearFrom()
        loading.dismiss();
    } else {
        loading.dismiss();
    }
    const toast = await toastController.create({
        message: save.error ? save.message : 'Berhasil menambah data prospek',
        duration: 1500,
        position: "top",
        cssClass: save.error ? 'toast-error' : 'toast-success'
    });

    await toast.present();


    // console.debug('Kisi kabeh', data)
}

const clearFrom = () => {
        state.nama = ''
        state.alamat = ''
        state.telp = ''
        state.komoditi = ''
        state.areakirim = ''
        state.bgexp = ''
        state.bgcar = ''
        state.bgtruck = ''
        state.ktexp = ''
        state.ktcar = ''
        state.kttruck = ''
        state.areapickup = ''
        state.namapicord = ''
        state.telppicord = ''
        state.namapickeu = ''
        state.telppickeu = ''
        state.usiatagihan = ''
        state.files = null
        latitude.value = ""
        longitude.value = ""

}

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
</script>
<style>
.alert-radio-label.sc-ion-alert-md {
    color: black !important;
}

.toast-success {
    --background: #4CAF50;
    /* Green background color */
    --color: white;
    /* Text color */
}

.toast-error {
    --background: #F44336;
    /* Red background color */
    --color: white;
    /* Text color */
}
</style>
