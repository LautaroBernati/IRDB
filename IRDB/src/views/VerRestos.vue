<template>
  <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Puntos</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="resto in restos" v-bind:key="resto.id">
                        <td>{{resto.id}}</td>
                        <td>{{resto.name}}</td>
                        <td>{{resto.address}}</td>
                        <td>{{resto.puntos}}</td>
                        <td>{{resto.tipo}}</td>
                    <button @click="verDetalle(resto.id)">Ver</button>
                    </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import RestaurantesService from "@/services/RestaurantesService.js"
export default {
    name: "verRestos",
    created(){
        RestaurantesService.getRestaurante().then(
            data => {
                this.restos=data.data;
                console.log(data);
            }
        )
    },
    data(){
        return{
            restos:[]
        }
    },
    methods: {
        verDetalle(idResto) {
            this.$router.push({ name: 'DetalleResto', params: { id: idResto } })

        }
    }
}
</script>