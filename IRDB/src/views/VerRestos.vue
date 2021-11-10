<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Direccion</th>
          <th>Promedio de puntos</th>
          <th>Tipo</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="resto in restos" v-bind:key="resto.id">
          <td>{{ resto.name }}</td>
          <td>{{ resto.address }}</td>
          <td>{{ calcularPromedio(resto)}}</td>
          <td>{{ resto.tipo }}</td>
          <button @click="verDetalle(resto.id)">Ver</button>
          <button v-if="esAdmin()" @click="borrarResto(resto.id)">Eliminar</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js";
export default {
  name: "verRestos",
  created() {
    RestaurantesService.getRestaurante().then((data) => {
      this.restos = data.data;
    });
  },
  data() {
    return {
      restos: [],
    };
  },
  methods: {
    verDetalle(idResto) {
      this.$router.push({ name: "DetalleResto", params: { id: idResto } });
    },
    calcularPromedio(resto) {
      if(resto.listaVotantes.length > 0){
          return Math.round(resto.puntos / resto.listaVotantes.length*100)/100;
      }
      return 0;
    },
    esAdmin(){
        return this.$store.state.usuario.esAdmin;
    },
    async borrarResto(idResto){
        await RestaurantesService.deleteRestaurante(idResto);
        this.restos.splice(idResto,1); //hay que buscarlo segun id, y no segun index .find()
    }
  },
};
</script>