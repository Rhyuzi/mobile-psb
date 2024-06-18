<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="color-whites" slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title class="font-white">Shipment Delivered</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content class="frame-scanner"> -->
      
    <!-- </ion-content> -->
    <ion-content id="content-af" :fullscreen="true">
      <ion-card class="form-input">
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
            
            <ion-button color="dark" @click="checkAWB">Submit AWB</ion-button>
            </div>
            <br>
            <ion-input
              readonly
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
            ></ion-input>
            <br>
            <ion-input
              readonly
              class="font-black"
              type="text"
              ref="namapengirim"
              color="dark"
              label="Nama Pengirim"
              label-placement="floating"
              fill="outline"
              placeholder="Nama Pengirim"
              v-model="state.namapengirim"
            ></ion-input>
            <br>
            
            <ion-input
              readonly
              class="font-black"
              v-model="state.alamatpengirim"
              color="primary"
              label="Alamat Pengirim"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              readonly
              class="font-black"
              v-model="state.namadituju"
              color="primary"
              label="Nama Dituju"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <ion-input
              readonly
              class="font-black"
              v-model="state.alamatdituju"
              color="primary"
              label="Alamat Dituju"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br />

            <!-- <ion-select readonly label="Tujuan" placeholder="Pilih Tujuan" default-href="/shipment-delivered/section-city">
            </ion-select> -->
            <ion-input
              class="font-black"
              v-model="state.tujuan"
              color="primary"
              label="Tujuan"
              label-placement="floating"
              fill="outline"
              readonly
            ></ion-input
            >
            
            <br />

            <div class="display-flex container-arrive">
              <ion-input
                readonly  
                class="font-black"
                v-model="state.berat"
                color="primary"
                label="Berat (Kg.)"
                label-placement="floating"
                fill="outline"
              ></ion-input
              >
              <ion-input
                readonly
                class="font-black"
                v-model="state.koli"
                color="primary"
                label="Koli/Qty"
                label-placement="floating"
                fill="outline"
            ></ion-input
            >
            <ion-input
              readonly
              class="font-black"
              v-model="state.ketisi"
              color="primary"
              label="Ket.isi"
              label-placement="floating"
              fill="outline"
            ></ion-input
            >
            
            </div>
            <br>

            <div class="display-flex container-arrive">
              <ion-input
                readonly
                class="font-black"
                v-model="state.namakurir"
                color="dark"
                label="Nama Kurir"
                label-placement="floating"
                fill="outline"
              ></ion-input
              >
              <ion-input
              readonly
              class="font-black"
              v-model="state.tgldelivery"
              type="date"
              ref="tgldelivery"
              color="dark"
              label="Tanggal Delivery"
              label-placement="floating"
              fill="outline"
              placeholder="Tanggal Delivery"
            ></ion-input>
            </div>
            <br>
          
            
            <ion-select 
              class="font-black"
              ref="Lokasi Diterima"
              color="dark"
              label="Lokasi Diterima"
              label-placement="floating"
              fill="outline"
              placeholder="Lokasi Diterima"
              v-model="state.lokasiditerima"
              @ion-blur="markTouched"
              >
              <div v-for="c in city" :key="c.LocationID">
                <ion-select-option class="font-black" :value="c.DefaultCityNo">{{ c.DefaultCityName }}</ion-select-option>
              </div>
            </ion-select>
            <br>

            <!-- <ion-input
              class="font-black"
              v-model="state.status"
              color="primary"
              label="Status Penerimaan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            > -->
            <ion-select 
              ref="Status"
              color="dark"
              label="Status"
              label-placement="floating"
              fill="outline"
              placeholder="Masukan Status"
              :class="v$.status.$error ? 'ion-invalid font-black' : 'ion-valid font-black'"
              :error-text="
                v$.status.$error
                  ? v$.status.$errors[0].$message.toString()
                  : ''
              "
              v-model="state.status"
              @ion-blur="markTouched"
              >
                <ion-select-option class="font-black" value="7">NOT HOME</ion-select-option>
                <ion-select-option class="font-black" value="8">CLOSE ARRIVAL</ion-select-option>
                <ion-select-option class="font-black" value="9">NOT ENOUGH TIME</ion-select-option>
                <ion-select-option class="font-black" value="10">BAD ADDRESS</ion-select-option>

                <ion-select-option class="font-black" value="11">MOVE</ion-select-option>
                <ion-select-option class="font-black" value="13">OTHER</ion-select-option>
                <ion-select-option class="font-black" value="14" selected>OK/DITERIMA</ion-select-option>
            </ion-select>
            <br>
            <ion-input
              class="font-black"
              v-model="state.ketpenerima"
              color="primary"
              label="Keterangan Penerimaan"
              label-placement="floating"
              fill="outline"
            ></ion-input
            ><br>

            <!-- <input type="file">
            <br>
            <br> -->
            <ion-tab-bar slot="bottom" id="tab-bar">
              <ion-tab-button tab="tab1" @click="isImage = true">
                <ion-icon class="btn-tabs" aria-hidden="true" :icon="cameraOutline" />
                <ion-label>Image</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab2" @click="onSignature">
                <ion-icon class="btn-tabs" aria-hidden="true" :icon="personCircleOutline" />
                <ion-label>Tanda Tangan</ion-label>
              </ion-tab-button>
      </ion-tab-bar>

            <div v-if="isImage" class="content-image">
              <div style="display: flex;
                justify-content: center;
                align-items: center;">
                <ion-button @click="takePhoto">
                <ion-icon class="btn-tabs" color="dark" aria-hidden="true" :icon="cameraOutline" />
                Camera</ion-button>
                <ion-button @click="takeImagesFile">
                <ion-icon class="btn-tabs" aria-hidden="true" :icon="documentOutline" />
                File image</ion-button>
              </div>
              
              <input id="fileInput" type="file" style="display: none" @change="handleFileChange" />
              <img v-if="photo" :src="photo.webPath" alt="Captured Image" />
              <img v-if="fileImg" :src="fileImg" alt="Selected Image" />
            </div>

            <div v-if="!isImage" class="content-ttd">
              <h1>
                  <center>Tanda tangan disini</center>
                </h1>
                <div class="wrapper">
                  <canvas v-if="!isSignature" id="signature-pad" class="signature-pad" width=400 height=200></canvas>
                  <img v-if="isSignature" :src="signatureImg" alt="Signature Image" />
                </div>
                <div>
                  <center>
                    <button class="save-signature" @click.prevent="saveSignature" id="save">Save</button>
                    <button class="save-signature" @click.prevent="clearSignature" id="clear">Clear</button>
                  </center>
                </div>
            </div>
            
            
          </form>
        </ion-card-content>
        <ion-button
              color="success"
              expand="full"
              shape="round"
              @click="submitForm"
              size="default"
              >Masukan Data</ion-button
            >
      </ion-card>
    </ion-content>

    <ion-toast
      :is-open="isOpen"
      :message="errMessage"
      :duration="5000"
      @didDismiss="setOpen(false)"
    ></ion-toast>

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
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon

  
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { onMounted } from "vue"
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { IArrivedItem,IConnoteAWB } from "@/api/conf-api/interface/arrived";
import { required, maxLength, helpers } from "@vuelidate/validators";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import router from "@/router";
import { homeOutline, personCircleOutline,cameraOutline, documentOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'


const isOpen = ref(false);
const isImage = ref(true);
const isSignature = ref(false);
const errMessage = ref("");
const store = useStore()
const city = ref<IArrivedItem[]>([])
const state = reactive({
    nomor: "",
    tanggal: "",
    namapengirim: "",
    alamatpengirim: "",
    namadituju: "",
    alamatdituju: "",
    tujuan: "",
    berat: "",
    koli: "",
    namakurir: "",
    ketisi: "",
    lokasiditerima: "",
    tgldelivery: "",
    status: "",
    ketpenerima: "",
    fileImg: ""
});

const formAF = ref<HTMLFormElement | null>(null);
// const photo = ref<UserPhoto[]>([]);
const photo = ref<Photo | null>(null);
const fileImg = ref<string | null>(null);
const fileImgOri = ref<File | null>(null);
const signatureOri = ref<File | null>(null);
const signatureImg = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const canvasRef = ref(null);

onMounted( async () => {
  getCity()
});

const onSignature = ()=> {
  isImage.value = false
  if (isSignature.value) return 
  setTimeout(() => {
    loadCanvas()
  }, 300);
}
const loadCanvas = () => {
  const signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  penColor: 'rgb(0, 0, 0)'
});
}
const saveSignature = async () => {
  const canvas = document.getElementById('signature-pad');
  const data = canvas.toDataURL('image/png');

  const blob = await fetch(data).then(response => response.blob());
  const fileName = 'signature.png';  // You can set the desired filename
  const file = new File([blob], fileName, {
    lastModified: new Date().getTime(),
    lastModifiedDate: new Date(),
    size: blob.size,
    type: blob.type,
    webkitRelativePath: "",
  });

  signatureImg.value = data
  isSignature.value = true
  signatureOri.value = file
  console.debug('signature',data)
};

const clearSignature = () => {
  const canvas = document.getElementById('signature-pad');
  const signaturePad = new SignaturePad(canvas);
  signaturePad.clear();
};

const checkAWB = async () => {
  const data = {
    pickup_id: state.nomor
  };
  const result = await store.dispatch('pickup/getDetailPickup',data);
  if (result.error == false) {
    state.tanggal = result.data.ConnoteDate
    state.namapengirim = result.data.ConnoteCustName
    state.alamatpengirim = result.data.ConnoteCustAddr
    state.namadituju = result.data.ConnoteRecvName
    state.alamatdituju = result.data.ConnoteRecvAddr
    state.tujuan = result.data.ConnoteDest
    state.berat = result.data.ConnoteWeight
    state.koli = result.data.ConnoteQty
    state.ketisi = result.data.ConnoteContents
    state.namakurir = JSON.parse(localStorage.user).name
    if (result.data.ConnoteDateDeli) {
      state.tgldelivery = result.data.ConnoteDateDeli.split(' ')[0]
    }
    errMessage.value = result.message;
    setOpen(true);
  }else{
    errMessage.value = result.message;
    setOpen(true);
  }
  console.debug('data awb', result.data.ConnoteDateDeli)
}
const setOpen = (state: boolean) => {
  isOpen.value = state;
  if (!state) {
    errMessage.value = "";
  }
};

const takePhoto = async () => {
  
  const capturedPhoto  = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    photo.value = capturedPhoto
    console.debug("captuerd", capturedPhoto.webPath)
    const convertToFile = convertToBlobAndFile(capturedPhoto);
    // fileImgOri.value = capturedPhoto.webPath
    console.debug("captuerd", convertToFile)
    fileImgOri.value = await convertToFile
}

const convertToBlobAndFile = async(result : any) => {
  // Create a Blob from the image URL
  const blob = await fetch(result.webPath).then(response => response.blob());

  // Create a File-like object
  const fileName = result.path.split('/').pop();
  const file = new File([blob], fileName, {
    lastModified: new Date().getTime(),
    lastModifiedDate: new Date(),
    size: blob.size,
    type: blob.type,
    webkitRelativePath: "",
  });

  return file;
}

const takeImagesFile = () => {
  const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.click();
      }
}

const convertToBase64 = (file: string | Blob | File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Check if the provided file is a string (file URL)
    if (typeof file === 'string') {
      fetch(file)
        .then((response) => response.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch(reject);
    } else {
      // If it's a Blob or File, read as Data URL directly
      reader.readAsDataURL(file);
    }
  });
};

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];

      if (file) {
        // Update selected file name
        fileImg.value = file.name;

        // Optionally, you can display an image preview (if it's an image)
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            fileImg.value = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
        fileImgOri.value = file
        photo.value = null
      }
}

const toSelectCity = () => {
  router.push('/shipment-delivered/section-city')
}

const dataAwb = computed(() => {
  return store.getters['arrive/get']('awb') as IConnoteAWB
});

const generateCounter = async () => {
  const param = {
    code: 'WC',
    location: JSON.parse(localStorage.user).UserLocation
  }
  const res = await store.dispatch('arrive/genCounter',param);
  if (res.error == false) {
    return res.data
  }else{
    errMessage.value = res.message;
    setOpen(true);
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const randomNo = async () => {
  const username = JSON.parse(localStorage.user).username
  const timestamp = new Date().getTime()
  state.nomor = username+timestamp
}

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
    status: {
      required: helpers.withMessage("Status harus diisi", required),
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
  const loading = await loadingController.create({
        message: "Loading...",
        animated: true,
        backdropDismiss: false,
    });
  loading.present();
  const formData = new FormData();
  formData.append('no_connote', state.nomor);
  formData.append('username', JSON.parse(localStorage.user).username);
  formData.append('cloc', state.lokasiditerima);
  formData.append('tglstatus', state.tgldelivery);
  formData.append('status', state.status);
  formData.append('cbkurir', JSON.parse(localStorage.user).pegawai_id);
  formData.append('ketstatus', state.ketpenerima);
  formData.append('cbloc', state.lokasiditerima);
  formData.append('signatureImg', signatureOri.value);
  formData.append('fileImg', fileImgOri.value);
  const res = await store.dispatch('arrive/addShipment',formData)
  if (res.error == false) {
    state.nomor = ""
    state.tanggal = ""
    state.namapengirim = ""
    state.alamatpengirim =""
    state.namadituju= ""
    state.alamatdituju= ""
    state.tujuan= ""
    state.berat= ""
    state.koli= ""
    state.namakurir= ""
    state.ketisi= ""
    state.lokasiditerima= ""
    state.tgldelivery= ""
    state.status= ""
    state.ketpenerima= ""
    state.fileImg= ""
    errMessage.value = res.message;
    setOpen(true);
    loading.dismiss();
  } else {
    errMessage.value = res.message;
    setOpen(true);
    loading.dismiss();
  }
  console.debug('Kisi kabeh',res)
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
.save-signature {
  margin: 20px;
  height: 47px;
  width: 91px;
}
</style>
