<template>
  <div>
    <h3>{{ resto.name }}</h3>
    <p>Direccion: {{ resto.address }}</p>
    <p>Tipo de comida: {{ resto.tipo }}</p>
    <p>Puntaje: {{ calcularPromedio }} puntos de {{resto.listaVotantes.length}} votantes</p>
    
    <div>
      <p>Platos</p>
      <ul v-for="(p,index) in resto.platos" v-bind:key="index">
        <li>Nombre: {{ p.nombre }}</li>
        <button v-if="esAdmin()" v-on:click="modificarPlato(index)">Modificar</button>
        <button v-if="esAdmin()" v-on:click="eliminarPlato(index)">Eliminar</button>
      </ul>
      <button v-on:click="verInput">Agregar Plato</button>
      <br />
      <div v-if="inputPlato">
        <input v-model="platoModel" />
        <button v-on:click="agregarModifPlato">Confirmar</button>
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
      <ul v-for="(c, index) in resto.comentarios" v-bind:key="index">
        <li>Usuario: {{ c.usuario }}</li>
        <li>Contenido: {{ c.comentario }}</li>
        <button v-if="esAdmin()" v-on:click="modificarComment(index)">Modificar</button>
        <button v-if="esAdmin()" v-on:click="eliminarComment(index)">Eliminar</button>
      </ul>
      
      <br />
      <div>
        <textarea v-model="comentarioModel" cols="20" rows="5"></textarea>
        <button v-on:click="agregarModifComentario">Comentar</button>
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
      indicePlato: -1,
      indiceComentario: -1,
      inputPlato: false,
      puntos: 0,
      platoModel: "",
      comentarioModel: "",
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
    esAdmin(){
        return this.$store.state.usuario.esAdmin;
    },
    async agregarModifPlato() {
      if (this.indicePlato === -1) {
          this.resto.platos.push({nombre: this.platoModel});
      } else {
          this.resto.platos[this.indicePlato].nombre = this.platoModel;
      }

      await RestaurantesService.putRestaurante(this.resto);
      this.platoModel = "";
      this.inputPlato = false;
    },
    async modificarPlato(indexPlato){
      this.verInput()
      let p = this.resto.platos[indexPlato]
      this.indicePlato = indexPlato;
      this.platoModel = p.nombre;
    },
    async eliminarPlato(indexPlato){
      this.resto.platos.splice(indexPlato,1); 
      await RestaurantesService.putRestaurante(this.resto);
    },
    async calificar() {
      let idUsuario = this.$store.state.usuario.id;
      this.resto.listaVotantes.push(idUsuario);
      this.resto.puntos += Number(this.calificacion);
      await RestaurantesService.putRestaurante(this.resto);
      
    },
    async agregarModifComentario(){
      if (this.indiceComentario === -1) {
         this.resto.comentarios.push({comentario:this.comentarioModel,usuario:this.$store.state.usuario.email});
      } else {
        this.resto.comentarios[this.indiceComentario].comentario = this.comentarioModel;
      }
     
      await RestaurantesService.putRestaurante(this.resto);
      this.indiceComentario = -1;
      this.comentarioModel="";
    },
    async eliminarComment(indexComment){
      this.resto.comentarios.splice(indexComment,1); 
      await RestaurantesService.putRestaurante(this.resto);
    },
    async modificarComment(indexComment){
      let c = this.resto.comentarios[indexComment]
      this.indiceComentario = indexComment;
      this.comentarioModel = c.comentario;
    }
  },
};
</script>

<style>
</style>