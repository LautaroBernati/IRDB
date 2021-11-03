<template>
  <div>
        <h3> {{resto.name}}</h3>
        <p> Direccion: {{resto.address}}</p>
        <p> Tipo de comida: {{resto.tipo}}</p>
        <p> Puntaje: {{resto.puntos}}</p>
        <div>
        <p> Platos </p>
            <ul v-for="plato in resto.platos" v-bind:key="plato.id">
                <li>Nombre: {{plato.nombre}}</li>      
            </ul>
            
            <button v-on:click="verInput">Agregar Plato</button>
            <br>
            <div v-if="inputPlato">
                <input v-model="agregar">
                <button v-on:click="agregarPlato">Confirmar</button>
            </div>
        </div>
        <div>
        <p> Comentarios </p>
            <ul v-for="coment in resto.comentarios" v-bind:key="coment.id">
                <li>Usuario: {{coment.usuario}}</li>
                <br>
                <li>Contenido: {{coment.content}}</li>        
            </ul>
        </div>
    </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js"
export default {
    name: "DetalleResto",
    created(){
        let idResto = this.$route.params.id
        RestaurantesService.getRestauranteId(idResto).then(
            data => {
                this.resto=data.data;
                console.log(data);
            }
        )
    },
    data(){
        return{
            resto: {},
            inputPlato: false,
            agregar: "",
        }
    },
    methods: {
        verInput() {
            this.inputPlato = !this.inputPlato
        },
        async agregarPlato() {
            this.resto.platos.push({nombre:this.agregar})
            await RestaurantesService.putRestaurante(this.resto)
        }
    }
}
</script>

<style>

</style>