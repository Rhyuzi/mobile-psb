<template>
  <ion-page id="tabs">
    <ion-content id="main-content">
      <!-- Main content of your app -->
    </ion-content>
    <ion-menu side="end" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title class="color-white">More Option</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list lines="none">
          <ion-item :button="true" @click="navigateToProfile()">
            <ion-icon :icon="personCircle" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Profile</ion-label>
          </ion-item>
        </ion-list>

        <ion-list lines="none" style="margin-top: 4px;">
          <ion-item>
            <ion-label>Menu Utama</ion-label>
          </ion-item>
          <ion-item :button="true" @click="navigateToProspek()">
            <ion-icon :icon="person" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Prospek</ion-label>
          </ion-item>
          <ion-item :button="true" class="hover-menu-item" @click="navigateToKunjungan()">
            <ion-icon :icon="personOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Kunjungan Sales</ion-label>
          </ion-item>
          <ion-item :button="true" class="hover-menu-item" @click="navigateToDataProspek()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Data Prospek</ion-label>
          </ion-item>
          <ion-item :button="true" class="hover-menu-item" @click="navigateToDataKunjungan()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Data Kunjungan</ion-label>
          </ion-item>
        </ion-list>

        <ion-list lines="none" style="margin-top: 4px;">
          <ion-item :button="true" class="hover-menu-item" @click="logout()">
            <ion-icon :icon="exitOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-list>

      </ion-content>
    </ion-menu>

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" id="tab-bar">
        <ion-tab-button tab="tab1" href="/marketing/tabs/tab1">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/marketing/tabs/tab2">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="person" />
          <ion-label>Prospek</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/marketing/tabs/tab3">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="personOutline" />
          <ion-label>Kunjungan Sales</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" @click="openEndMenu()">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="menuOutline" />
          <ion-label>More</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="ellipsisVertical" />
          <ion-label>Check Point</ion-label>
        </ion-tab-button> -->

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonPage, 
  IonRouterOutlet, 
  menuController, 
  IonMenu,
  IonHeader,
  IonToolbar,
  IonItem,
  IonList,
  IonTitle,
  IonContent
} from '@ionic/vue';
import { homeOutline, personCircleOutline, ellipsisVertical, menuOutline, personCircle, exitOutline, cubeOutline, person, personOutline } from 'ionicons/icons';
import router from "@/router";

const closeMenu = async () => {
  const menu = 'end';
  const isOpen = await menuController.isOpen(menu);
  if (isOpen) {
    await menuController.close(menu);
  }
};

const openEndMenu = async () => {
  await menuController.open('end');
};

const navigateToProfile = () => {
  // Implement navigation to Profile page
};

const navigateToProspek = () => {
  router.push("/marketing/tabs/tab2");
  closeMenu();
};

const navigateToKunjungan = () => {
  router.push("/marketing/tabs/tab3");
  closeMenu();
};

const navigateToDataProspek = () => {
  router.push("/marketing/prospek");
  closeMenu();
};

const navigateToDataKunjungan = () => {
  router.push("/marketing/kunjungan");
  closeMenu();
};


const logout = () => {
  localStorage.clear()
  location.href = '/'
  // Implement logout functionality
};
</script>

<style scoped>
/* Define hover effect */
.hover-menu-item:hover {
  background-color: #073C7A;
  background: #073C7A;
  cursor: pointer;
}

ion-item.hover-menu-item:hover {
  background-color: #073C7A;
  cursor: pointer;
}
</style>
