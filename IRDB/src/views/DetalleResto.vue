<template>
  <div>
    <div>
      <div class="marginL1">
        <h1 class="d-inline">{{ resto.name }}&nbsp;</h1>
        <img src="../../public/img/star.png" id="iconoEstrella" />
        <p class="d-inline">{{ calcularPromedio }} / 10</p>
        <p class="d-inline">({{ resto.listaVotantes.length }} votantes)</p>
        <br />
        <span class="bg-dark text-light rounded"
          >&nbsp; {{ resto.tipo }} &nbsp;</span
        >
        <p>{{ resto.address }}</p>
      </div>
      <div v-if="puedeVotar" class="marginL1">
        <p class="d-inline">1 &nbsp;</p>
        <input v-model="calificacion" type="range" min="1" max="10" />
        <p class="d-inline"> &nbsp;10</p>
        <br>
        <button v-on:click="calificar" class="btn btn-success"> <b>Votar</b></button>
      </div>
      <br>
      <div>
        <div class="detallesDiv"></div>
        <div class="fondoNegro">
          <p class="text-center text-light">Platos</p>
        </div>
        <div class="row g-0">
          <div class="col-4"></div>
          <div class="col-4">
            <ul
              v-for="(p, index) in resto.platos"
              v-bind:key="index"
              class="lista rounded bg-dark text-light"
            >
              <li class="text-center">{{ p.nombre }}</li>
              <button
                v-if="esAdmin()"
                v-on:click="modificarPlato(index)"
                class="btn btn-warning m-1"
              >
                Modificar
              </button>
              <button
                v-if="esAdmin()"
                v-on:click="eliminarPlato(index)"
                class="btn btn-danger"
              >
                Eliminar
              </button>
            </ul>
          </div>
          <div class="col-4"></div>
        </div>
        <div class="marginL1">
          <button v-on:click="verInput" class="btn btn-dark">
            Agregar Plato
          </button>
          <br />
          <div v-if="inputPlato">
            <input v-model="platoModel" placeholder="Nombre del plato" />
            <button v-on:click="agregarModifPlato" class="btn btn-success">
              Confirmar
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <div class="detallesDiv"></div>
        <div class="fondoNegro">
          <p class="text-center text-light">Comentarios</p>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8 ">
            <div
              v-for="(c, index) in resto.comentarios"
              v-bind:key="index"
              class="lista "
            >
              <div class="card rounded bg-dark text-light" >
                <div class="card-body">
                  <h4 class="card-title">{{ c.usuario }}</h4>
                  <p class="card-text">{{ c.comentario }}</p>
                  <button v-if="esAdmin()" v-on:click="modificarComment(index) " class="btn btn-warning">
                    Modificar
                  </button>
                  <button v-if="esAdmin()" v-on:click="eliminarComment(index)" class="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <br />
            <div>
              <textarea v-model="comentarioModel" cols="70" rows="5"></textarea>
              <br>
              <button v-on:click="agregarModifComentario" class="btn btn-dark">Comentar</button>
            </div>
          </div>
        </div>
        <div class="col-2"></div>
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
      if (this.resto.listaVotantes.length >= 1) {
        return (
          Math.round(
            (this.resto.puntos / this.resto.listaVotantes.length) * 100
          ) / 100
        );
      }
      return 0;
    },
  },
  methods: {
    verInput() {
      this.inputPlato = !this.inputPlato;
    },
    esAdmin() {
      return this.$store.state.usuario.esAdmin;
    },
    async agregarModifPlato() {
      if (this.indicePlato === -1) {
        this.resto.platos.push({ nombre: this.platoModel });
      } else {
        this.resto.platos[this.indicePlato].nombre = this.platoModel;
      }

      await RestaurantesService.putRestaurante(this.resto);
      this.platoModel = "";
      this.inputPlato = false;
    },
    async modificarPlato(indexPlato) {
      this.verInput();
      let p = this.resto.platos[indexPlato];
      this.indicePlato = indexPlato;
      this.platoModel = p.nombre;
    },
    async eliminarPlato(indexPlato) {
      this.resto.platos.splice(indexPlato, 1);
      await RestaurantesService.putRestaurante(this.resto);
    },
    async calificar() {
      let idUsuario = this.$store.state.usuario.id;
      this.resto.listaVotantes.push(idUsuario);
      this.resto.puntos += Number(this.calificacion);
      await RestaurantesService.putRestaurante(this.resto);
    },
    async agregarModifComentario() {
      if (this.indiceComentario === -1) {
        this.resto.comentarios.push({
          comentario: this.comentarioModel,
          usuario: this.$store.state.usuario.email,
        });
      } else {
        this.resto.comentarios[this.indiceComentario].comentario =
          this.comentarioModel;
      }

      await RestaurantesService.putRestaurante(this.resto);
      this.indiceComentario = -1;
      this.comentarioModel = "";
    },
    async eliminarComment(indexComment) {
      this.resto.comentarios.splice(indexComment, 1);
      await RestaurantesService.putRestaurante(this.resto);
    },
    async modificarComment(indexComment) {
      let c = this.resto.comentarios[indexComment];
      this.indiceComentario = indexComment;
      this.comentarioModel = c.comentario;
    },
  },
};
</script>

<style>
.marginL1 {
  margin-left: 1%;
}
#aatext {
  display: inline;
}
#iconoEstrella {
  width: 1.5%;
}
.lista {
  list-style: none;
  padding-left: 0% !important;
}
.fondoNegro {
  background: #000;
}
.detallesDiv {
  height: 2px;
  margin-bottom: 0.2%;
  background: #000;
}
</style>