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
            <ion-label>CHECK POINT</ion-label>
          </ion-item>
          <ion-item :button="true" @click="navigateToPOD()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>POD</ion-label>
          </ion-item>
          <ion-item :button="true" @click="navigateToArrivedFacility()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Arrived Facility</ion-label>
          </ion-item>
          <ion-item :button="true" class="hover-menu-item" @click="navigateToWithCourier()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>With Courier</ion-label>
          </ion-item>
          <ion-item :button="true" class="hover-menu-item" @click="navigateToShipmentDelivered()">
            <ion-icon :icon="cubeOutline" class="menu-more" color="secondary" slot="start"></ion-icon>
            <ion-label>Shipment Delivered</ion-label>
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
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="homeOutline" />
          <ion-label>Arrived Facility</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="homeOutline" />
          <ion-label>With Courier</ion-label>
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
import { homeOutline, personCircleOutline, ellipsisVertical, menuOutline, personCircle, exitOutline, cubeOutline } from 'ionicons/icons';
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

const navigateToArrivedFacility = () => {
  router.push("/tabs/tab3");
  closeMenu();
};

const navigateToWithCourier = () => {
  router.push("/tabs/tab4");
  closeMenu();
};

const navigateToShipmentDelivered = () => {
  router.push("/shipment-delivered");
  closeMenu();
};

const navigateToPOD = () => {
  router.push("/pod");
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
