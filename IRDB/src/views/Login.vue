<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent='login'>
        <p>Usuario: <input type="text" v-model="usuario.email"></p>
        <p>Contraseña: <input type="password" v-model="usuario.password"></p>
        
        <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
      return{
          usuario: {
              email: '',
              password:''
          }
      }
  },
  methods: {
      async login(){
          await this.$store.dispatch('login',{usuario: this.usuario})
          this.$router.push({name:'Home'})
      }
  }
};
</script>

<style>
</style>