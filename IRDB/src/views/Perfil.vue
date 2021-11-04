<template>
  <div>
    <div>
      <p>Nombre de usuario:</p>
      <p>Contraseña:</p>
      <button @click="AbrirForm">Editar</button>
    </div>
    <div>
      <div class="row" v-if="mostrarForm">
        <div class="col-4"></div>
        <div id="login" class="col-4 rounded">
          <h2><b>Modificar</b></h2>
          <form @submit.prevent="modificarUsuario">
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
  </div>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
export default {
    created(){
        let idUsuario = this.$store.state.usuario.usuario.id
        UsuariosService.getRestauranteId(idUsuario).then(
            data => {
                this.usuario=data.data;
                console.log(data);
            }
        )
    },
    data() {
        return{
            mostrarForm:false,
            usuario: {
                name: "",
                email: "",
                password: "",
            }
        }
    },
    methods:{
        AbrirForm(){
            this.mostrarForm = !this.mostrarForm;
        },
        modificarUsuario(){
            
        }
    }
};
</script>

<style>
</style>