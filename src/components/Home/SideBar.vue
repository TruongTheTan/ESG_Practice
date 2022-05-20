<template>
   <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
         <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item>
               <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
               </v-list-item-icon>
               <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
               <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
               </v-list-item-icon>
               <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
         </v-list-item-group>
      </v-list>
   </v-navigation-drawer>
</template>

<script lang="ts">
   import { Vue, Component, Prop } from 'vue-property-decorator';

   @Component
   export default class MainContent extends Vue {
      @Prop() drawer = false;
      group = null;
   }
</script>

<style lang="scss" scoped></style>
