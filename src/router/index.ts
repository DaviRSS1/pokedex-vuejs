import MostrarPokemons from "@/views/MostrarPokemons.vue";
import PaginaPokemon from "@/views/PaginaPokemon.vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MostrarPokemons',
    component: MostrarPokemons,
  },
  {
    path: '/:name',
    name: 'PaginaPokemon',
    component: PaginaPokemon,
    props: true
  }
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador;
