<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Nombre: </label>
      <input v-model="restaurante.name" type="text" name="name" value />

      <label for="address"> Dirección: </label>
      <input v-model="restaurante.address" type="text" name="address" value />

      <label for="tipo"> Tipo: </label>
      <input v-model="restaurante.tipo" type="text" name="tipo" value />

      <button type="submit" name="button">Registrarse</button>
    </form>
  </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js";
export default {
  name: "Register",
  data() {
    return {
      restaurante: {
        name: "",
        address: "",
        puntos: 0,
        tipo: "",
        foto: "",
        platos: [],
        comentarios: []
      },
    };
  },
  methods: {
    async register() {
      try {
        await RestaurantesService.postRestaurante(this.restaurante);
        this.$router.push({ name: "Home" });
      } catch (er) {
        console.log(er);
      }
    },
  },
};
</script>