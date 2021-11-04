<template>
  <div>
    <div id="nav" class="navbar navbar-expand-md bg-dark navbar-dark">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <!-- <div id="navNoLogeado" v-if="isLogin">
          <router-link to="/">Home</router-link>
          <router-link to="/login">LogIn</router-link>
          <router-link to="/register">Register</router-link>
          <router-view />
        </div> -->
          <!-- <div id="navLogeado" v-if="!isLogin"> -->
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">LogIn</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/agregarResto" class="nav-link"
              >Agregar Restaurante</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/verRestos" class="nav-link">Ver Restaurantes</router-link>
          </li>
          

          <!-- </div> -->
        </ul>
      </div>
      <span class="nav-item justify-content-md-end">
          <router-link to="/Perfil" class="nav-link text-light">Perfil</router-link>
      </span>
      <span class="nav-item justify-content-md-end">
        <a class="nav-link text-light">Logout</a>
      </span>
    </div>
    <div id="linea"></div>
    <br>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["islogin"]),
  },
});
</script>
<style>
#linea{
  margin-top: 1px;
  height: 2px;
  background-color: black;
}
body{
  background-color: #b8b8b8;
}
</style>