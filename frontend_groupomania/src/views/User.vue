<template>
  <div class="user container">
    <h1>Mon compte</h1>

    <section class="bloc bloc__info">
      <h2>Informations du compte</h2>
        <p v-if="user.isadmin">Compte modérateur</p>
        <p>Nom d'utilisateur : {{ user.username }}</p>
        <p>Email : {{ user.email }}</p>
        <p>Compte créé le {{ date }}</p>
        <button class="button button-danger" @click="deleteAccount">Supprimer mon compte</button>
    </section>

    <div v-if="error" class="error user-error" role="alert">
      <p>{{ error }}</p>
    </div>

    <section class="bloc">
      <h2>Modifier mon profil</h2>
        <p v-if="validationMessage" class="message-info">{{ validationMessage }}</p>

        <h3>Changer mon email</h3>
          <form @submit.prevent="updateEmail">
            <div>
              <label for="new-email">Nouvel email</label><br>
              <input type="email" id="new-email" v-model="newEmail" required><br>

              <label for="password">Mot de passe actuel</label><br>
              <input type="password" id="password" v-model="currentPassword1" required>
            </div>
            <button class="button form-btn" type="submit">Valider</button>
          </form>

        <h3>Changer mon nom d'utilisateur</h3>
          <form @submit.prevent="updateUsername">
            <div>
              <label for="new-username">Nouveau nom d'utilisateur</label><br>
              <input type="text" id="new-username" v-model="newUsername" required><br>

              <label for="password">Mot de passe actuel</label><br>
              <input type="password" id="password" v-model="currentPassword2" required>
            </div>

            <button class="button form-btn" type="submit">Valider</button>
          </form>

        <h3>Changer mon mot de passe</h3>
          <form @submit.prevent="updatePassword">
            <div>
              <label for="new-password">Nouveau mot de passe</label><br>
              <i class="fas fa-info-circle" title="Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre, un chiffre et un caractère spécial"></i>
              <input type="password" id="new-password" v-model="newPassword" required><br>

              <label for="password">Mot de passe actuel</label><br>
              <input type="password" id="password" v-model="currentPassword3" required>
            </div>

            <button class="button form-btn" type="submit">Valider</button>
          </form>
    </section>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import UserService from '@/services/UserService'

  export default {
    data() {
      return {
        error: null,
        newUsername: null,
        newEmail: null, 
        newPassword: null,
        currentPassword1: null, 
        currentPassword2: null,
        currentPassword3: null,
        validationMessage: null
      }
    },
    computed: {
      ...mapState(['user', 'loggedIn']),
      date() {
        const date = new Date(this.user.createdAt).toLocaleDateString();
        return date;
      },
    },
    methods: {
      async deleteAccount() {
        try {
          const response = await UserService.deleteAccount({userid: this.user.id});
          this.$store.dispatch("logout", response.message);
        } catch(error) {
          this.error = error.toString();
        }
      },
      redirectToLogin() {
        if(this.loggedIn == false) {
          this.$router.push('/login');
        }
      },
      clearData() {
          this.currentPassword1 = null;
          this.currentPassword2 = null;
          this.currentPassword3 = null;
          this.newEmail = null;
          this.newPassword = null;
          this.newUsername = null;
      },
      async updateUsername() {
        try {
          const response = await UserService.updateUsername({userid: this.user.id, username: this.newUsername, password: this.currentPassword2});
          this.clearData();
          this.error = null;
          this.$store.dispatch("updateUsername", response.username);
          this.validationMessage = "Nom d'utilisateur bien modifié";
        } catch(e) {
          this.clearData();
          this.message = null;
          this.error = e.toString();
        }
      },
      async updateEmail() {
        try {
          const response = await UserService.updateEmail({userid: this.user.id, email: this.newEmail, password: this.currentPassword1});
          this.clearData();
          this.error = null;
          this.$store.dispatch("updateEmail", response.email);
          this.validationMessage = "Email bien modifié"
        } catch(e) {
          this.clearData();
          this.message = null;
          this.error = e.toString();
        }
      },
      async updatePassword() {
        try {
          const response = await UserService.updatePassword({userid: this.user.id, password: this.newPassword, currentPassword: this.currentPassword3});
          this.clearData();
          this.error = null;
          this.validationMessage = response.message;
        } catch(e) {
          this.clearData();
          this.message = null;
          this.error = e.toString();
        }
      }
    },
    beforeMount() {
      this.redirectToLogin()
    }

  }
</script>

<style lang="scss" scoped>
  .user {
    width: 530px;
    @media all and (max-width: 800px) {
      width: 90vw;
      text-align: center;
    }
  }

  .bloc {
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 40px;
    box-shadow: 0px 2px 7px #8383bd;
    text-align: center;
    &__info {
      text-align: center;
    }
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  input {
    width: 300px;
    @media all and (max-width: 800px) {
      width: 200px;
    }
  }

  .user-error {
    width: 520px;
    margin-bottom: 20px;
  }

  .button-danger {
    padding: 5px 10px;
  }
</style>

