<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Akun</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content>
          <form action="" ref="formAF">
            <div class="display-flex container-arrive">
              <ion-input
              ref="nomor"
              color="dark"
              label="Nomor"
              label-placement="floating"
              fill="outline"
              placeholder="Nomor"
              :class="v$.nomor.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.nomor.$error
                  ? v$.nomor.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.nomor"
              @ion-blur="markTouched"
            ></ion-input>
            
            <ion-input
              type="date"
              ref="tanggal"
              color="dark"
              label="Tanggal"
              label-placement="floating"
              fill="outline"
              placeholder="Tanggal"
              :class="v$.tanggal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.tanggal.$error
                  ? v$.tanggal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.tanggal"
              @ion-blur="markTouched"
            ></ion-input
            >
            </div>
            <br>
            <ion-select 
              ref="Asal"
              color="dark"
              label="Asal"
              label-placement="floating"
              fill="outline"
              placeholder="Masukan Kota Asal"
              :class="v$.asal.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.asal.$error
                  ? v$.asal.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.asal"
              @ion-blur="markTouched"
              >
              <div v-for="c in city" :key="c.LocationID">
                <ion-select-option class="font-black" :value="c.DefaultCityNo">{{ c.DefaultCityName }}</ion-select-option>
              </div>
            </ion-select>
            <br>
            
            <ion-input
              color="primary"
              label="Catatan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              ref="Scan AWB"
              color="dark"
              label="Scan AWB"
              label-placement="floating"
              fill="outline"
              placeholder="Scan AWB"
              :class="v$.awb.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.awb.$error
                  ? v$.awb.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.awb"
              @ion-blur="markTouched"
            ></ion-input
            >
            
            <br />
            <br />
            <ion-button
              color="success"
              expand="full"
              shape="round"
              @click="submitForm"
              size="default"
              >Sumbit</ion-button
            >
          </form>
        </ion-card-content>
      </ion-card>
      

      <ion-card>
        <ion-card-content>
          <!-- <table>
            <tr>
              <td >No.AWB</td>
              <td >Pengirim</td>
              <td >Nama Dituju</td>
              <td >Kota Tujuan</td>
            </tr>
            <tr v-for="awb in dataAwb" :key="awb">
              <td >{{ awb.ConnoteNo }}</td>
              <td >{{ awb.ConnoteCustName }}</td>
              <td >{{ awb.ConnoteRecvName }}</td>
              <td >{{ awb.ConnoteRecvAddr }}</td>
            </tr>
          </table> -->
          <ion-grid>
            <ion-row class="header-row">
              <ion-col size-md="3" size-sm="6" class="column">No.AWB</ion-col>
              <ion-col size-md="3" size-sm="6" class="column">Pengirim</ion-col>
              <ion-col size-md="3" size-sm="6" class="column">Nama Dituju</ion-col>
              <ion-col size-md="3" size-sm="6" class="column">Kota Tujuan</ion-col>
            </ion-row>
            <div  v-for="awb in dataAwb" :key="awb">
              <ion-row>
                <ion-col size-md="3" size-sm="6" class="column">{{ awb.ConnoteNo }}</ion-col>
                <ion-col size-md="3" size-sm="6" class="column">{{ awb.ConnoteCustName }}</ion-col>
                <ion-col size-md="3" size-sm="6" class="column">{{ awb.ConnoteRecvName }}</ion-col>
                <ion-col size-md="3" size-sm="6" class="column">{{ awb.ConnoteRecvAddr }}</ion-col>
              </ion-row>
            </div>
          </ion-grid>

          <!-- <ion-grid class="display-flex">
    <ion-row>
      <ion-col class="flex-item" size="12" size-sm="3">1</ion-col>
      <ion-col class="flex-item" size="12" size-sm="3">2</ion-col>
      <ion-col class="flex-item" size="12" size-sm="3">3</ion-col>
      <ion-col class="flex-item" size="12" size-sm="3">4</ion-col>
    </ion-row>
  </ion-grid> -->

        </ion-card-content>
      </ion-card>
    </ion-content>
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
  IonSelectOption
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem,IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers } from "@vuelidate/validators";

const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    nomor: "",
    tanggal: "",
    asal: "",
    catatan: "",
    awb: ""
});
const formAF = ref<HTMLFormElement | null>(null);

onMounted(() => {
  getCity()
});

const dataAwb = computed(() => {
  return store.getters['arrive/get']('awb') as IConnoteAWB
});

const rules = computed(() => {
  return {
    nomor: {
      required: helpers.withMessage("Nomor harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
    tanggal: {
      required: helpers.withMessage("Tanggal harus diisi", required),
      maxlength: helpers.withMessage(
        "Password tidak boleh lebih dari 16 karakter",
        maxLength(16)
      ),
    },
    asal: {
      required: helpers.withMessage("Asal harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
    awb: {
      required: helpers.withMessage("AWB harus diisi", required),
      maxlength: helpers.withMessage(
        "Username tidak boleh lebih dari 64 karakter",
        maxLength(64)
      ),
    },
  };
});

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
        console.debug("After dispatch",city.value);
    }else{
        city.value = result.data
        loading.dismiss();
        console.debug("After dispatch",city.value);
    }
};

const submitForm = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    const inputs = formAF.value?.querySelectorAll("input");
    inputs?.forEach((input) => input.focus());

    return;
  }
  await getAWB()
  console.debug('Kisi kabeh',dataAwb)
}

const getAWB = async () => {
  const param = {
    noAWB: state.awb
  }
  await store.dispatch('arrive/getAWB',param);

}


const logout = () => {
  localStorage.clear();
  location.reload();
};
</script>
<style>
.alert-radio-label.sc-ion-alert-md { 
  color: black !important;
}
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
.header-row,
.data-row {
  border: 1px solid #ddd; /* Border color */
}

.column {
  padding: 10px;
  text-align: center;
}

.header-row {
  background-color: #f2f2f2; /* Header background color */
  font-weight: bold;
}
</style>
