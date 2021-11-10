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
        <tr v-for="(resto,index) in restos" v-bind:key="index">
          <td>{{ resto.name }}</td>
          <td>{{ resto.address }}</td>
          <td>{{ calcularPromedio(resto)}}</td>
          <td>{{ resto.tipo }}</td>
          <button @click="verDetalle(resto.id)">Ver</button>
          <button v-if="esAdmin()" @click="borrarResto(index)">Eliminar</button>
          <button v-if="esAdmin()" @click="modificarResto(index)">Modificar</button>
        </tr>
        <div v-if="verInput">
          <input v-model="modificarModel"/><button @click="confirmarModificacion">Confirmar</button>
        </div>
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
      modificarModel: "",
      indiceResto: -1,
      modificar: false,
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
    async borrarResto(indexResto){
        await RestaurantesService.deleteRestaurante(indexResto);
        this.restos.splice(indexResto,1); 
    },
    modificarResto(indexResto) {
      this.verInput()
      let r = this.restos[indexResto]
      this.indiceResto = indexResto;
      this.modificarModel = r.name;
    },
    verInput() {
      this.modificar = !this.modificar
    }

  },
};
</script>