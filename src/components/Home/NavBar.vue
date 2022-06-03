<template>
   <v-app-bar app color="#1d2939" class="white--text">
      <div>
         <v-app-bar-nav-icon
            class="white--text"
            @click="$root.$emit('draw', (drawer = !drawer))"
         ></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title>Vue Admin Template</v-toolbar-title>
   </v-app-bar>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class NavBar extends Vue {
      drawer = true;
   }
</script>

<style lang="scss" scoped></style>
