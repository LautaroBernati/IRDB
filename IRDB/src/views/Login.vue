<template>
  <div>
    <section id="fondoLogin">
      <img src="../../public/img/fondoLogin.jpg" id="fotoFondoLogin" />
      <div class="row g-0">
        <div class="col-4"></div>
        <div id="login" class="col-4 rounded">
          <h2><b>Ingresar</b></h2>
          <form @submit.prevent="login">
            <input
              type="email"
              v-model="usuario.email"
              placeholder="Usuario"
              class="form-control input-lg"
            />
            <br />
            <input
              type="password"
              v-model="usuario.password"
              placeholder="Contraseña"
              class="form-control input-lg"
            />
            <br />
            <div class="d-grid">
              <button type="submit" class="btn btn-dark btn-block mb-3">
                Ingresar
              </button>
            </div>
          </form>
        </div>
        <div class="col-4"></div>
      </div>
    </section>
  </div>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
export default {
  name: "Login",
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let info = await UsuariosService.login(this.usuario);
        //console.log(info);
        this.$store.dispatch("login", { usuario: info.data.token, decodedUser:info.data.usuario });
        this.$router.push({ name: "Home" });
      } catch (err) {
        alert("Usuario incorrecto");
        this.usuario.email = "";
        this.usuario.password = "";
      }
    },
  },
};
</script>

<style>
#login {
  background-color: #ffffff;
  border: double;
  font-family: "Lato", sans-serif;
  margin-top: 7%;
  z-index: 10;
}
#fondoLogin {
  background-color: #000;
  height: 650px;
}
#fotoFondoLogin {
  position: absolute;
  opacity: 0.5;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}
</style>