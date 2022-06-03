<template>
   <v-card-title>
      <div>
         <h3>Employee List</h3>
         <h6>Click on table row to view employee details</h6>
      </div>

      <v-spacer></v-spacer>

      <!-- Search bar -->
      <v-autocomplete
         :items="departmentList"
         append-icon="mdi-magnify"
         label="Search by department"
         item-text="name"
         item-value="ID"
         single-line
         hide-details
         :search-input.sync="search"
      ></v-autocomplete>
   </v-card-title>
</template>

<script lang="ts">
   import { Component, Vue, Inject, Watch, Emit } from 'vue-property-decorator';
   import { Department } from '@/Models/Department';

   @Component
   export default class AutoComplete extends Vue {
      search = '';

      @Inject() readonly departmentList!: Department[];

      @Watch('search')
      @Emit('department-found')
      searchByDeptName() {
         // If search box has values
         if (this.search.trim() !== '') {
            // get last number of search box
            // Ex: Department 3 => departmentNumber = 3
            return parseInt(this.search.split(' ')[1].trim());
         }
      }
   }
</script>

<style scoped></style>
