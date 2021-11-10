<template>
  <div>
    <h3>{{ resto.name }}</h3>
    <p>Direccion: {{ resto.address }}</p>
    <p>Tipo de comida: {{ resto.tipo }}</p>
    <p>Puntaje: {{ calcularPromedio }} puntos de {{resto.listaVotantes.length}} votantes</p>
    
    <div>
      <p>Platos</p>
      <ul v-for="(plato,index) in resto.platos" v-bind:key="index">
        <li>Nombre: {{ plato.nombre }}</li>
        <button v-if="esAdmin()" v-on:click="verModificarPlato(plato)">Modificar</button>
        <button v-if="esAdmin()" v-on:click="eliminarPlato(index)">Eliminar</button>
        <div v-if="inputModPlato && verConfirmarPlato">
        <input v-model="modificacionPlato">
        <button v-on:click="modificarPlato(plato)">Confirmar</button>
        </div>
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
    <br>
    <div>
      <p>Comentarios</p>
      <ul v-for="comment in resto.comentarios" v-bind:key="comment.id">
        <li>Usuario: {{ comment.usuario }}</li>
        <li>Contenido: {{ comment.comentario }}</li>
        <button v-if="esAdmin()" v-on:click="modificarComment(comment)">Modificar</button>
        <button v-if="esAdmin()" v-on:click="eliminarComment(comment)">Eliminar</button>
      </ul>
      
      <br />
      <div>
        <textarea v-model="comentar" cols="20" rows="5"></textarea>
        <button v-on:click="agregarComentario">Comentar</button>
      </div>
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
      console.log(this.resto);
    });
  },

  data() {
    return {
      resto: {},
      inputModPlato:"",
      puntos: 0,
      inputPlato: false,
      agregar: "",
      comentar: "",
      calificacion: 5,
      
    };
  },
  computed: {
    puedeVotar() {
      let idUsuario = this.$store.state.usuario.id;
      let lista = this.resto.listaVotantes;

      console.log(lista);

      try {
        if (lista.length > 0) {
          let voto = lista.find((id) => id === idUsuario);

          if (voto != undefined) {
            return false;
          }
        }
      } catch (err) {
        console.log("");
      }

      return true;
    },
    calcularPromedio() {
      if(this.resto.listaVotantes.length >= 1){
        return Math.round(this.resto.puntos / this.resto.listaVotantes.length * 100)/100;
      }
      return 0;
    },
  },
  methods: {
    verInput() {
      this.inputPlato = !this.inputPlato;
    },
    async agregarPlato() {
      this.resto.platos.push({nombre: this.agregar});
      await RestaurantesService.putRestaurante(this.resto);
      this.agregar = "";
      this.inputPlato = false;
    },

    async calificar() {
      let idUsuario = this.$store.state.usuario.id;
      this.resto.listaVotantes.push(idUsuario);
      this.resto.puntos += Number(this.calificacion);
      await RestaurantesService.putRestaurante(this.resto);
      
    },
    async agregarComentario(){
      this.resto.comentarios.push({comentario:this.comentar,usuario:this.$store.state.usuario.email});
      await RestaurantesService.putRestaurante(this.resto);
      this.comentar="";
    },
    esAdmin(){
        return this.$store.state.usuario.esAdmin;
    },
    verModificarPlato(plato){
      this.inputModPlato=true;
      this.modificacionPlato=plato.nombre;
    },
    async modificarPlato(){
      //this.resto.platos.push({comentario:this.comentar,usuario:this.$store.state.usuario.email});
      //await RestaurantesService.putRestaurante(this.resto);
    },
    async eliminarPlato(indexPlato){
      this.resto.platos.splice(indexPlato,1); //hay que buscarlo segun id, y no segun index .find()
      await RestaurantesService.putRestaurante(this.resto);
    }
  },
};
</script>

<style>
</style>