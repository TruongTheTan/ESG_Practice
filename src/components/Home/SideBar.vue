<template>
   <v-navigation-drawer v-model="drawer" app>
      <v-card class="mx-auto" width="300">
         <v-list>
            <router-link to="/" class="non-underline">
               <v-list-item link @click="addActiveClass($refs.link1)">
                  <v-list-item-icon>
                     <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title ref="link1" class="side-bar-link active-link">Home</v-list-item-title>
               </v-list-item>
            </router-link>

            <router-link to="/employee" class="non-underline"
               ><v-list-item link @click="addActiveClass($refs.link2)">
                  <v-list-item-icon>
                     <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title ref="link2" class="side-bar-link">Employee List</v-list-item-title>
               </v-list-item></router-link
            >
         </v-list>
      </v-card>
   </v-navigation-drawer>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class MainContent extends Vue {
      drawer = true;

      created() {
         this.$root.$on('draw', (isDraw: boolean) => {
            this.drawer = isDraw;
         });
      }

      addActiveClass(linkElement: Vue | Element | (Vue | Element)[] | undefined) {
         // Get all element with class name 'side-bar-link'
         const sideBarLinkList = document.getElementsByClassName('side-bar-link');

         // Remove active class
         for (let i = 0; i < sideBarLinkList.length; i++) {
            sideBarLinkList[i].classList.remove('active-link');
         }

         // Add active class to current element that clicked on
         (linkElement as HTMLElement).classList.add('active-link');
      }
   }
</script>

<style lang="scss" scoped>
   .non-underline {
      text-decoration: none;
      color: inherit;
   }

   .active-link {
      font-weight: 700;
      font-size: 17px;
   }
</style>
