<template>
  <div class="signup">
    <h1>Inscription</h1>
    <form @submit.prevent="signup">
      <label for="username">nom d'utilisateur</label><br>
      <input type="text" name="username" id="username" minlength="3" maxlength="30" required v-model="username"><br>

      <label for="email">email</label><br>
      <input type="email" name="email" id="email" required v-model="email"><br>

      <label for="password">mot de passe</label><br>
      <i class="fas fa-info-circle" title="Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre, un chiffre et un caractère spécial"></i>
      <input type="password" name="password" id="password" minlength="8" required v-model="password">
      <br>
      <button type="submit" class="button">Je m'inscris</button>
    </form>
    <p>déjà inscrit(e) ? <router-link to="/login">Je me connecte</router-link></p>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </div>
</template>

<script>
  import UserService from '@/services/UserService'
  import { mapState } from 'vuex'

  export default {
    name: 'Signup',
    data() {
      return {
        email:"",
        password: "",
        username: "",
        error: null
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    methods: {
      async signup() {
        try {
          const response = await UserService.signup({email: this.email, username: this.username, password: this.password});
          this.$store.dispatch("login", {user: response.user, token: response.token});
        } catch(error) {
          this.email = null;
          this.password = null;
          this.username = null;
          this.error = error.toString();
        }
      },
      redirectToHome() {
        if(this.loggedIn == true) {
          this.$router.push('/');
        }
      }
    },
    beforeMount() {
      this.redirectToHome()
    }
  }
</script>

<style lang="scss" scoped>
  .signup {
    text-align: center;
  }
</style>