<template>
  <div>
    <section id="verRestoFondo">
      <img src="../../public/img/fondoVerResto.jpg" id="verRestoBack" />
      <div class="row g-0">
        <div class="col-2"></div>
        <div class="col-8 tabla">
          <table class="table table-dark table-striped tablaRestos">
            <thead class="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Promedio de puntos</th>
                <th>Tipo</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(resto, index) in restos" v-bind:key="index">
                <td>{{ resto.name }}</td>
                <td>{{ resto.address }}</td>
                <td>{{ calcularPromedio(resto) }}</td>
                <td>{{ resto.Rtype }}</td>
                <td>
                  <button
                    @click="verDetalle(resto._id)"
                    class="btn btn-secondary"
                  >
                    Ver
                  </button>
                </td>
                <td>
                  <button
                    v-if="esAdmin()"
                    @click="borrarResto(resto.address, index)"
                    class="btn btn-secondary"
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    v-if="esAdmin()"
                    @click="modificarResto(index)"
                    class="btn btn-secondary"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="modificar">
            <input v-model="modificarModel" /><button
              @click="confirmarModificacion()"
              class="btn btn-success"
            >
              Confirmar
            </button>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </section>
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
      promedio: 0,
      restoAMod: {},
    };
  },
  methods: {
    verDetalle(idResto) {
      this.$router.push({ name: "DetalleResto", params: { id: idResto } });
    },
    calcularPromedio(resto) {
      if (resto.votersList.length > 0) {
        return Math.round((resto.points / resto.votersList.length) * 100) / 100;
      }
      return 0;
    },
    esAdmin() {
      return this.$store.state.usuario.esAdmin;
    },
    async borrarResto(address, indexResto) {
      await RestaurantesService.deleteRestaurante(address);
      this.restos.splice(indexResto, 1);
    },
    modificarResto(indexResto) {
      this.verInput();
      let r = this.restos[indexResto];
      this.indiceResto = indexResto;
      this.modificarModel = r.name;
      this.restoAMod = r;
    },
    verInput() {
      this.modificar = !this.modificar;
    },
    async confirmarModificacion() {
      this.restoAMod.name = this.modificarModel
      await RestaurantesService.putRestaurante(this.restoAMod);
      this.verInput()
    },
  },
};
</script>
<style>
#verRestoFondo {
  height: 650px;
  background-color: #000000 !important;
}
#verRestoBack {
  position: absolute;
  opacity: 0.7;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}
.tabla {
  z-index: 2;
}
.tablaRestos {
  margin-top: 3%;
}
</style>