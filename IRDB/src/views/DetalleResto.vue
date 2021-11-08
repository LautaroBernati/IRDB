<template>
  <div>
    <h3>{{ resto.name }}</h3>
    <p>Direccion: {{ resto.address }}</p>
    <p>Tipo de comida: {{ resto.tipo }}</p>
    <p>Puntaje: {{ resto.puntos }}</p>
    <div>
      <p>Platos</p>
      <ul v-for="plato in resto.platos" v-bind:key="plato.id">
        <li>Nombre: {{ plato.nombre }}</li>
      </ul>

      <button v-on:click="verInput">Agregar Plato</button>
      <br />
      <div v-if="inputPlato">
        <input v-model="agregar" />
        <button v-on:click="agregarPlato">Confirmar</button>
      </div>
    </div>
    <div v-if="puedeVotar">
      Calificacion:
      <input v-model="calificacion" type="range" min="1" max="10" />
      <button v-on:click="calificar">Confimar</button>
    </div>
    <div>
      <p>Comentarios</p>
      <ul v-for="coment in resto.comentarios" v-bind:key="coment.id">
        <li>Usuario: {{ coment.usuario }}</li>
        <br />
        <li>Contenido: {{ coment.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js";
export default {
  name: "DetalleResto",
  created() {
    let idResto = this.$route.params.id;

    RestaurantesService.getRestauranteId(idResto).then((data) => {
      this.resto = data.data;
    });
  },

  data() {
    return {
      resto: {},
      inputPlato: false,
      agregar: "",
      calificacion: 5,
    };
  },
  computed: {
    puedeVotar() {
      let idUsuario = this.$store.state.usuario.id
      let lista = this.resto.listaVotantes

      console.log(lista)

        try {
        if (lista.length > 0) {
          let voto = lista.find((id) => id === idUsuario);

          if (voto != undefined) {
            return false;
          }
        }
      } catch (err) {
        console.log("")
      }
  
        return true;
   
    },
  },
  methods: {
    verInput() {
      this.inputPlato = !this.inputPlato; 
    },
    async agregarPlato() {
      this.resto.platos.push({ nombre: this.agregar });
      await RestaurantesService.putRestaurante(this.resto); 
      this.agregar = ""
    },
    async calificar() {

      let idUsuario = this.$store.state.usuario.id;

      this.resto.listaVotantes.push(idUsuario);

      this.resto.puntos += Number(this.calificacion);

      await RestaurantesService.putRestaurante(this.resto);
      
    },
  },
};
</script>

<style>
</style>