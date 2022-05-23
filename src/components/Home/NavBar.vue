<template>
   <v-app-bar class="purple darken-3 lighten-2" dark app>
      <v-app-bar-nav-icon @click="drawSideBar"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
   </v-app-bar>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class NavBar extends Vue {
      drawSideBar() {
         this.$root.$emit('drawSideBar', true);
      }
   }
</script>

<style lang="scss" scoped></style>
