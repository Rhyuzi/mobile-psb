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
        <!-- </ion-content> -->
        <ion-content id="content-wc" :fullscreen="true">
            <ion-card class="form-input">
                <ion-card-content>
                    <form action="" ref="formAF">
                        <ion-input type="date" v-model="state.tanggal" color="primary" label="Tanggal"
                            label-placement="floating" fill="outline" readonly></ion-input><br />
                        <ion-input v-model="state.namainp" color="primary" label-placement="floating" fill="outline"
                            readonly></ion-input><br />
                        <ion-select v-model="state.prospek" class="font-black" ref="Prospek" color="dark"
                            label="prospek" label-placement="floating" fill="outline">
                            <ion-select-option class="font-black" value="0">Prospek Baru</ion-select-option>
                            <ion-select-option class="font-black" value="1">Customer</ion-select-option>
                        </ion-select><br>
                        <ion-select v-model="state.tujuan" class="font-black" ref="Pilih Tujuan" color="dark"
                            label="tujuan" label-placement="floating" fill="outline" placeholder="Pilih Tujuan">
                            <ion-select-option class="font-black" value="0">Akuisisi (Prospek)</ion-select-option>
                            <ion-select-option class="font-black" value="1">Development (Fix)</ion-select-option>
                            <ion-select-option class="font-black" value="2">Maintenance (Fix)</ion-select-option>
                        </ion-select><br>

                        <div class="display-flex">
                            <ion-input v-model="state.nama" color="primary" label="Nama" label-placement="floating"
                                fill="outline"
                                :class="v$.nama.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.nama.$error
                                    ? v$.nama.$errors[0].$message.toString()
                                    : ''
                                    " @ion-blur="markTouched"></ion-input><br />
                            <ion-button id="open-modal" color="tertiary" size="default">Pelanggan</ion-button>
                        </div><br>

                        <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                            <ion-header>
                                <ion-toolbar>
                                    <ion-buttons slot="start">
                                        <ion-button @click="cancel()">Batal</ion-button>
                                    </ion-buttons>
                                    <ion-title>Daftar Pelanggan</ion-title>
                                    <ion-buttons slot="end">
                                        <ion-button :strong="true" @click="confirm()">Pilih</ion-button>
                                    </ion-buttons>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                                <ion-list v-if="state.prospek == '0'" class="margin-bottom-50">
                                    <ion-radio-group @ionChange="handleChange($event)" value="space-between">
                                        <ion-item v-for="c in custnew" :key="c.GuestID" class="margin-bottom-10">
                                            <ion-icon :icon="business" class="menu-more" color="secondary"
                                                slot="start"></ion-icon>
                                            <ion-radio :value="c" justify="space-between">{{ c.GuestName }}<br>
                                                <span class="wrap-text font-size-10">{{ c.GuestAddr }}</span>
                                            </ion-radio>
                                        </ion-item>
                                    </ion-radio-group>
                                </ion-list>

                                <ion-list v-if="state.prospek == '1'" class="margin-bottom-50">
                                    <ion-radio-group @ionChange="handleChange($event)" value="space-between">
                                        <ion-item v-for="c in custold" :key="c.ID" class="margin-bottom-10">
                                            <ion-icon :icon="business" class="menu-more" color="secondary"
                                                slot="start"></ion-icon>
                                            <ion-radio :value="c" justify="space-between">{{ c.CustName }}<br>
                                                <span class="wrap-text font-size-10">{{ c.CustAddr }}</span>
                                            </ion-radio>
                                        </ion-item>
                                    </ion-radio-group>
                                </ion-list>
                            </ion-content>
                        </ion-modal>

                        <ion-input v-model="state.alamat" color="primary" label="Alamat" label-placement="floating"
                            fill="outline" :class="v$.alamat.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.alamat.$error
                                ? v$.alamat.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.pic" color="primary" label="PIC" label-placement="floating"
                            fill="outline" :class="v$.pic.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
                            :error-text="v$.pic.$error
                                ? v$.pic.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.jabatan" color="primary" label="Jabatan" label-placement="floating"
                            fill="outline"
                            :class="v$.jabatan.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.jabatan.$error
                                ? v$.jabatan.$errors[0].$message.toString()
                                : ''
                                " @ion-blur="markTouched"></ion-input><br />
                        <ion-input v-model="state.wilkir" color="primary" label="Wilayah Kirim"
                            label-placement="floating" fill="outline"
                            :class="v$.wilkir.$error ? 'ion-invalid font-black' : 'ion-valid font-black'" :error-text="v$.wilkir.$error
                                ? v$.wilkir.$errors[0].$message.toString()
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
                        <ion-select v-model="state.tahap" class="font-black" ref="tahap" color="dark" label="Tahap"
                            label-placement="floating" fill="outline">
                            <div v-for="v in visitstatus" :key="v">
                                <ion-select-option class="font-black" :value="v.id">{{ v.VisitStatusName
                                    }}</ion-select-option>
                            </div>
                        </ion-select><br />

                        <ion-input v-model="state.catatan" color="primary" label="Catatan" label-placement="floating"
                            fill="outline"></ion-input><br />
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
    IonModal,
    IonList,
    IonRadioGroup,
    IonRadio,
    IonItem,
    IonIcon,
    toastController
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem, IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers, numeric } from "@vuelidate/validators";
import { business } from 'ionicons/icons';
import { Customer, GuestbookData } from "@/api/conf-api/interface/dashboard";

const isOpen = ref(false);
const errMessage = ref("");
const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    tanggal: "",
    nama: "",
    tujuan: '',
    namainp: '',
    alamat: "",
    prospek: "",
    bgexp: "",
    bgcar: "",
    bgtruck: "",
    ktexp: "",
    ktcar: "",
    kttruck: "",
    pic: "",
    jabatan: "",
    wilkir: "",
    tahap: "",
    catatan: ""

});
const selectedCustomer = ref<GuestbookData | Customer | null>(null);
const formAF = ref<HTMLFormElement | null>(null);

onMounted(async () => {
    await getCity()
    await getCustNew()
    await getCustOld()
    await getVisitStatus()
    console.debug('custnew', custnew.value)
    state.tanggal = formatDate(new Date());
    state.namainp = JSON.parse(localStorage.user).username.toUpperCase()
    state.prospek = '0'
    state.tujuan = '0'
});

const modal = ref();
const input = ref();
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');
const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
    if (selectedCustomer.value) {
        state.nama = (selectedCustomer.value as Customer).CustName || (selectedCustomer.value as GuestbookData).GuestName || '';
        state.alamat = (selectedCustomer.value as Customer).CustAddr || (selectedCustomer.value as GuestbookData).GuestAddr || '';
        state.pic = (selectedCustomer.value as Customer).CustPicNm1 || (selectedCustomer.value as GuestbookData).GuestContactName1 || '';
        state.jabatan = (selectedCustomer.value as Customer).CustPicJbt1 || (selectedCustomer.value as GuestbookData).GuestContactJabat1 || '';
        state.wilkir = (selectedCustomer.value as GuestbookData).GuestAreaKirim || '';
        state.bgexp = (selectedCustomer.value as GuestbookData).GuestPotency1 || '';
        state.bgcar = (selectedCustomer.value as GuestbookData).GuestPotency2 || '';
        state.bgtruck = (selectedCustomer.value as GuestbookData).GuestPotency3 || '';
        state.ktexp = (selectedCustomer.value as GuestbookData).GuestKompetitor1 || '';
        state.ktcar = (selectedCustomer.value as GuestbookData).GuestKompetitor2 || '';
        state.kttruck = (selectedCustomer.value as GuestbookData).GuestKompetitor3 || '';
        state.kttruck = (selectedCustomer.value as GuestbookData).GuestKompetitor3 || '';
    }
    console.log('Selected customer:', selectedCustomer.value);
    modal.value.$el.dismiss('confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        message.value = `Hello, ${ev.detail.data}!`;
    }
};

const setOpen = (state: boolean) => {
    isOpen.value = state;
    if (!state) {
        errMessage.value = "";
    }
};

const dataAwb = computed(() => {
    return store.getters['arrive/get']('awb') as IConnoteAWB
});
const custnew = computed(() => {
    return store.getters['marketing/get']('custnew')
});
const custold = computed(() => {
    return store.getters['marketing/get']('custold')
});
const visitstatus = computed(() => {
    return store.getters['marketing/get']('visitstatus')
});

const rules = computed(() => {
    return {
        nama: {
            required: helpers.withMessage("Nama harus diisi", required),
        },
        alamat: {
            required: helpers.withMessage("Alamat harus diisi", required),
        },
        prospek: {
            required: helpers.withMessage("Prospek harus diisi", required),
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
        pic: {
            required: helpers.withMessage("PIC harus diisi", required),
        },
        wilkir: {
            required: helpers.withMessage("Wilayah kirim harus diisi", required),
        },
        jabatan: {
            required: helpers.withMessage("Jabatan harus diisi", required),
        },
    };
});

const formatDate = (date: any) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-')
};
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

const getCustNew = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getCustNew');
    if (result.error == false) {
        loading.dismiss();
    } else {
        loading.dismiss();
    }
};

const getVisitStatus = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getVisitStatus');
    if (result.error == false) {
        loading.dismiss();
    } else {
        loading.dismiss();
    }
};

const getCustOld = async () => {
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();
    const result = await store.dispatch('marketing/getCustOld');
    if (result.error == false) {
        loading.dismiss();
    } else {
        loading.dismiss();
    }
};

const submitForm = async () => {
    v$.value.$validate();
    if (v$.value.$error) {
        const inputs = formAF.value?.querySelectorAll("input");
        inputs?.forEach((input) => input.focus());

        return;
    }
    if (!selectedCustomer.value || !state.tahap) {
        let msg = ''
        if (!state.tahap) msg = "Silahkan pilih tahap prospek"
        if (!selectedCustomer.value) msg = "Pilih pelanggan di daftar pelanggan"
        const toast = await toastController.create({
            message: msg,
            duration: 1500,
            position: "top",
            cssClass: 'toast-error'
        });
        await toast.present();
        return
    }
    const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
    loading.present();

    const user = JSON.parse(localStorage.user)
    const data = new FormData();
    data.append('username', user.username.toUpperCase());
    data.append('loc', user.UserLocation);
    data.append('GuestID', (selectedCustomer.value as Customer).ID || (selectedCustomer.value as GuestbookData).GuestID || '');
    data.append('tanggal', state.tanggal);
    data.append('nama', state.nama);
    data.append('pic', state.pic);
    data.append('jabatan', state.jabatan);
    data.append('sales', user.pegawai_id);
    data.append('tahap', state.tahap);
    data.append('catatan', state.catatan);
    data.append('pelanggan', state.prospek);
    data.append('tujuan', state.tujuan);
    data.append('potency1', state.bgexp);
    data.append('potency2', state.bgcar);
    data.append('potency3', state.bgtruck);
    data.append('kompetitor1', state.ktexp);
    data.append('kompetitor2', state.ktcar);
    data.append('kompetitor3', state.kttruck);
    data.append('wilkirim', state.wilkir);
    const save = await store.dispatch('marketing/saveKunjungan', data);
    if (save.error == false) {
        clearFrom()
        getKunjungan()
        loading.dismiss();
    } else {
        loading.dismiss();
    }
    const toast = await toastController.create({
        message: save.error ? save.message : 'Berhasil menambah data kunjungan',
        duration: 1500,
        position: "top",
        cssClass: save.error ? 'toast-error' : 'toast-success'
    });
    await toast.present();
    console.debug('Kisi kabeh', data)
}

const clearFrom = () => {
    state.nama = ""
    state.alamat = ""
    state.bgexp = ""
    state.bgcar = ""
    state.bgtruck = ""
    state.ktexp = ""
    state.ktcar = ""
    state.kttruck = ""
    state.pic = ""
    state.jabatan = ""
    state.wilkir = ""
    state.tahap = ""
    state.catatan = ""
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

const handleChange = (ev: CustomEvent) => {
    selectedCustomer.value = ev.detail.value
}

</script>
<style>
.alert-radio-label.sc-ion-alert-md {
    color: black !important;
}

ion-input {
    color: black !important;
}
</style>