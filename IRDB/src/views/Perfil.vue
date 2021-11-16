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
/* import UsuariosService from "@/services/UsuariosService.js"; */
import { mapGetters } from 'vuex'
export default {
/*   created() {
    let idUsuario = this.$store.state.usuario.id;
    UsuariosService.getUsuarioId(idUsuario).then((data) => {
      this.usuario = data.data;
      console.log(data);
    });
  }, */
  data() {
    return {
      mostrarForm: false,
      usuario: {
        id: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    AbrirForm() {
      this.mostrarForm = !this.mostrarForm;
    },
    modificarUsuario() {},
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