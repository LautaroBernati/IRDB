<template>
<div id="nav">
    <div id="navNoLogeado" v-if="!isLogin">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">LogIn</router-link> |
      <router-link to="/register">Register</router-link> 
    <router-view/>
    </div>
    <div id="navLogeado" v-if="isLogin">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">LogIn</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/agregarResto">Agregar Restaurante</router-link> |
      <router-link to="/usuarios">Usuarios</router-link> |
      <router-link to="/verRestos">Ver Restaurantes</router-link>
    <router-view/>
    </div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
