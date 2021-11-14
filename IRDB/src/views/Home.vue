<template>
  <div class="home">
    <header id="headerFondo">
      <img src="../../public/img/fondoResto.jpg" id="fondo">
    </header>
    <img src="../../public/img/logo.png" id="logo">
    <p class="textoFondo text-light">
      Bienvenido a IRDB
      <br>
      <router-link to="/register" class="text-light">Registrate</router-link> para poder calificar y comentar sobre tus experiencias en distintos restaurantes que se encuentran en nuestros listados.
      <br>
      Si no encontras tu restaurante, no te preocupes! Podes agregarlo haciendo <router-link to="/agregarResto" class="text-light">click acá</router-link>
      <br>
    </p>
    <!--{{login}}-->
  </div>
  
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      //login: this.$store.state.usuario.usuario.email,
    }
  }
}
</script>
<style>
#logo{
  position:absolute;
  top:10%;
  left:2%;
  z-index: 1;
}
#headerFondo{
  background-color:#000000 !important;
}
#fondo{
  opacity: 0.5;
  object-fit: cover;
  height: 650px;
  width: 100%;
}
@media(max-width: 700px){
  #fondo{
    height:400px
  }
}
.textoFondo{
  position: absolute;
  top: 50%;
  text-align: left;
  left:2%; 
  font-size: 1.5em
}
</style>
