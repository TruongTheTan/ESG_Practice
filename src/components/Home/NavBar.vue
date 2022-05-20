<template>
   <v-app-bar class="purple darken-3 lighten-2" dark app>
      <v-app-bar-nav-icon @click="sideBarDrawer()"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
   </v-app-bar>
</template>

<script lang="ts">
   import { Vue, Component, Emit } from 'vue-property-decorator';

   @Component
   export default class NavBar extends Vue {
      drawer = true;

      @Emit('sideBarDrawer')
      sideBarDrawer() {
         return (this.drawer = !this.drawer);
      }
   }
</script>

<style lang="scss" scoped></style>
