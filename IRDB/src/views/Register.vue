<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Nombre: </label>
      <input v-model="usuario.name" type="text" name="name" value />

      <label for="email"> Email: </label>
      <input v-model="usuario.email" type="text" name="email" value />

      <label for="password"> Password: </label>
      <input v-model="usuario.password" type="password" name="password" value />

      <button type="submit" name="button">Registrarse</button>
    </form>
  </div>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
export default {
  name: "Register",
  data() {
    return {
      usuario: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        await UsuariosService.postUsuario(this.usuario);
        this.$router.push({ name: "Home" });
      } catch (er) {
        console.log(er);
      }
    },
  },
};
</script>