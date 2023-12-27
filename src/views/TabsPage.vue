<template>
  <ion-page id="tabs">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" id="tab-bar">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="homeOutline" />
          <ion-label>PickUp</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon class="btn-tabs" aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Check Point</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, personCircleOutline } from 'ionicons/icons';
</script>
