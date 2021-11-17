<template>
  <div>
    <section id="fondoPerfil">
      <img src="../../public/img/fondoPerfil.jpg" id="fotoFondoPerfil" />
      <div>
        <div class="row g-0">
          <div class="col-4"></div>
          <div class="col-4 rounded datos">
            <div class="text-light text-center">
              <p>{{ getUsuario.name }}</p>
              <p>{{ getUsuario.email }}</p>
              <div class="d-grid">
                <button @click="AbrirForm" class="btn btn-success btn-block">Editar</button>
              </div>
              <br>
            </div>
            <form @submit.prevent="modificarUsuario" v-if="mostrarForm">
              <input
                type="text"
                v-model="usuario.name"
                placeholder="Usuario"
                class="form-control input-lg"
              />
              <br />
              <div class="d-grid">
                <button type="submit" class="btn btn-dark btn-block mb-3">
                  Modificar
                </button>
              </div>
            </form>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UsuariosService from "@/services/UsuariosService.js";
export default {
  data() {
    return {
      mostrarForm: false,
      usuario: {
        name: '',
        email: '',
      },

    };
  },
  methods: {
    AbrirForm() {
      this.mostrarForm = !this.mostrarForm;
    },
    async modificarUsuario() {
      this.usuario.email = this.getUsuario.email; 
      await UsuariosService.putUsuario(this.usuario); 
      this.$store.state.decodedUser.name = this.usuario.name;
      this.usuario.name = "";
      this.AbrirForm();
    },
  },
  computed: {
    ...mapGetters(['getUsuario'])
  }
};
</script>

<style>
#fotoFondoPerfil {
  opacity: 0.5;
  position: absolute;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1 !important;
}
#fondoPerfil {
  background-color: #000;
  height: 650px;
}
.datos {
  z-index: 10 !important;
}
</style>