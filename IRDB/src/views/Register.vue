<template>
  <div>
    <section id="sectionFondo">
      <img src="../../public/img/registrarseFondo.jpg" id="registrarseFondo" >
      <div class="row g-0">
        <div class="col-4"></div>
        <div id="form" class="col-4  rounded rows">
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
                id="boton1"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
        <div class="col-4" id="right-row"></div>
      </div>
    </section>
  </div>
  
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
export default {
  name: "Register",
  data() {
    return {
      usuario: {
        name: "juan",
        email: "juan@admin",
        password: "1234",
        esAdmin:false
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
#registrarseFondo{
  position:absolute;
  opacity: 0.5;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}
.rows{
  z-index: 2;
}
#sectionFondo{
  background-color:#000000 !important;
  height: 650px;
}
#form{
  background-color: #ffffff;
  border: double;
  font-family: 'Lato', sans-serif;
  margin-top: 7%;
}
#boton1:hover{
  background-color:rgb(233, 173, 61);
  color:#000;
}
</style>