<template>
  <div>
    <div class="row">
      <div class="col-4"></div>
      <div id="form" class="col-4 rounded">
        <h2><b>Registrarse</b></h2>
        <form @submit.prevent="register">
          <input
            v-model="usuario.name"
            type="text"
            name="name"
            placeholder="Usuario"
            class="form-control input-lg"
          />
          <br>
          <input
            v-model="usuario.email"
            type="text"
            name="email"
            placeholder="E-mail"
            class="form-control input-lg"
          />
          <br>
          <input
            v-model="usuario.password"
            type="password"
            name="password"
            placeholder="Contraseña"
            class="form-control input-lg"
          />
          <br>
          <div class="d-grid">
            <button
              type="submit"
              name="button"
              class="btn btn-dark btn-block mb-3"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
      <div class="col-4"></div>
    </div>
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
<style>
#form{
  background-color: #ffffff;
  border: double;
  font-family: 'Lato', sans-serif;
  margin-top: 7%;
}
</style>