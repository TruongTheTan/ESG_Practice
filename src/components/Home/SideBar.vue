<template>
   <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
         <v-list-item-group active-class="deep-purple--text text--accent-4">
            <router-link to="/" style="text-decoration: none">
               <v-list-item>
                  <v-list-item-icon>
                     <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>Home</v-list-item-title>
               </v-list-item>
            </router-link>
            <router-link to="/employee" style="text-decoration: none">
               <v-list-item>
                  <v-list-item-icon>
                     <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Employee List</v-list-item-title>
               </v-list-item>
            </router-link>
         </v-list-item-group>
      </v-list>
   </v-navigation-drawer>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class MainContent extends Vue {
      drawer = false;

      created() {
         this.$root.$on('drawSideBar', (isDraw: boolean) => {
            this.drawer = isDraw;
         });
      }
   }
</script>

<style lang="scss" scoped></style>
