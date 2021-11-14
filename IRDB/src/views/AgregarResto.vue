<template>
  <div>
    <section id="fondoAgregarResto">
      <img src="../../public/img/agregarResto.jpg" id="agregarRestoFondo" >
      <div class="row g-0">
        <div class="col-4"></div>
        <div class="col-4 agregarResto" id="formAgregarResto">
          <form @submit.prevent="crearRestaurante">
            <input v-model="restaurante.name" type="text" name="name" placeholder="Nombre" class="form-control input-lg"/>
            <br>
            <input v-model="restaurante.address" type="text" name="address" placeholder="Dirección" class="form-control input-lg"/>
            <br>
            <input v-model="restaurante.tipo" type="text" name="tipo" placeholder="Tipo de comida" class="form-control input-lg"/>
            <br>
            <div class="d-grid">
              <button type="submit" name="button" class="btn btn-dark btn-block mb-3">Agregar</button>
            </div>
          </form>
        </div>
        <div class="col-4"></div>
      </div>
    </section>
    
  </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js";
export default {
  name: "crearRestaurante",
  data() {
    return {
      restaurante: {
        name: "",
        address: "",
        puntos: 0,
        tipo: "",
        foto: "",
        platos: [],
        listaVotantes: [],
        comentarios: [],
      },
    };
  },
  methods: {
    async crearRestaurante() {
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

<style>
.agregarResto{
  margin-top: 7%;
}
#agregarRestoFondo{
  position:absolute;
  opacity: 0.9;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}
#fondoAgregarResto{
  height: 650px;
  background-color: #000000 !important;
}
#formAgregarResto{
  z-index: 10;
}
</style>