import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Map from '../components/Pokemap.vue'
import Pokedex from '../components/Pokedex.vue'
import App from '../App.vue'
import Tableau from '../components/Tableau.vue'
import Upload from '../components/Upload.vue'
import AddPokemon from '../components/AddPokemon.vue'
import UpdatePokemon from '../components/UpdatePokemon.vue'



Vue.use(Router);

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: Tableau
    },{
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
      {
          path: '/details/:id',
          name: 'Pokedex',
          component: Pokedex
      },
      {
          path: '/upload/:id',
          name: 'Upload',
          component: Upload
      },
      {
          path: '/admin/pokemons/add',
          name: 'AddPokemon',
          component: AddPokemon
      },
      {
          path: '/admin/pokemons/update/:id',
          name: 'UpdatePokemon',
          component: UpdatePokemon
      },
      {
          path: '/admin',
          name: 'IndexAdmin',
          component: App
      },
    {
      path: '/map',
      name: 'Pokemap',
      component: Map
    }
  ]
})
