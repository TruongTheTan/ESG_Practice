<template>
   <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login Form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <!-- Form -->
                        <v-form lazy-validation>
                           <!-- User name -->
                           <v-text-field
                              prepend-icon="mdi-account-circle"
                              name="login"
                              label="Login"
                              type="text"
                              v-model="name"
                              required
                              :rules="rules"
                           ></v-text-field>

                           <!-- Password -->
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              v-model="pass"
                              required
                              :type="showPass ? 'text' : 'password'"
                              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showPass = !showPass"
                              :rules="rules"
                           ></v-text-field>

                           <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn @click="login()" color="primary">Login</v-btn>
                           </v-card-actions>
                        </v-form>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script lang="ts">
   import { Vue, Component } from 'vue-property-decorator';

   @Component
   export default class LoginView extends Vue {
      name = '';
      pass = '';
      showPass = false;

      rules = [(v: any) => !!v || 'Required'];

      login(): void {
         if (this.name === 'admin' && this.pass === 'admin') {
            sessionStorage.setItem('username', this.name);
            this.$router.push('/');
         } else alert('Wrong account');
      }
   }
</script>

<style lang="scss" scoped></style>
