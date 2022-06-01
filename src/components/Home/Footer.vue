<template>
   <v-footer inset app color=" lighten-1" class="purple darken-3 lighten-2" padless>
      <v-row justify="center" no-gutters>
         <v-btn v-for="link in icons" :key="link" color="white" text rounded class="my-2">
            {{ link }}
         </v-btn>
         <v-col class="py-1 text-center white--text" cols="12">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
         </v-col>
      </v-row>
   </v-footer>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class Footer extends Vue {
      icons: Array<string> = ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'];
   }
</script>
