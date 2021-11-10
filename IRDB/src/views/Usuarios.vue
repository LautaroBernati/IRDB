<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="user in users" v-bind:key="user._id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js"
export default {
    created(){
        UsuariosService.getUsuario().then(
            data => {
                this.users=data.data;
                
            }
        )
    },
    data(){
        return{
            users:[]
        }
    }
}
</script>

<style>

</style>