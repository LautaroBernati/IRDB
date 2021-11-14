<template>
  <div>
    <div id="nav" class="navbar navbar-expand-md bg-dark navbar-dark">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/login" class="nav-link" v-if="islogin">LogIn</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/register" class="nav-link" v-if="islogin">Register</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/agregarResto" class="nav-link" v-if="islogin">Agregar Restaurante</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuarios" class="nav-link" v-if="islogin">Usuarios</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/verRestos" class="nav-link" v-if="islogin">Ver Restaurantes</router-link>
          </li>
        </ul>
      </div>
      <span class="nav-item justify-content-md-end">
          <router-link to="/Perfil" class="nav-link text-light">Perfil</router-link>
      </span>
      <span class="nav-item justify-content-md-end">
        <button class="nav-link text-light" @submit.prevent="logout" id="logout" >Logout</button>
      </span>
    </div>
    <div id="linea"></div>

    <router-view />
  </div>
</template>

<script>

 //v-if="!islogin"
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["islogin"]),
  },
  data(){ 

    return{ 

      navLogueado: false

    }

  }, 
  methods: { 

     async logout() {
      
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Home" });
    },


  }
});
</script>
<style>
#linea{
  margin-top: 1px;
  height: 2px;
  background-color: black;
}
body{
  background-color: #a7a6a6;
}
#nav{
  z-index: 20;
}
#logout {
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
</style>