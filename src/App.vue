<template lang="html">
  <div id="app">
    <sui-menu>
      <sui-menu-menu position="right">
      <sui-dropdown
              :options="categoriesBieres"
              placeholder="Style de bière"
              search
              selection
              v-model="searchBox"/>
      <sui-button @click="validationRecherche"> rechercher </sui-button>
      </sui-menu-menu>
    </sui-menu>
    <sui-card-group v-if="afficheBieresRandom">
      <BiereCard  v-for="beer in randBeers" :key="beer.id" :biere_id="beer.id" :styles="tab_styles"/>
    </sui-card-group>
    <sui-card-group v-else>
      <BiereCard v-for="beer in resultSearch" :key="beer.id" :biere_id="beer.id" :styles="tab_styles" />
    </sui-card-group>
  </div>
</template>

<script>
import BiereCard from './components/BiereCard.vue';
import axios from 'axios'
import global from '@/globals.json'

export default {
  name: 'App',
  data () {
    return {
      randBeers: [],
      resultSearch : [],
      afficheBieresRandom: false,
      categoriesBieres : [],
      catSearch : "",
      tab_styles: [],
      searchBox: null,
      paramsRecherche: ""
    }
  },
  components: {
    BiereCard
  },
  mounted() {
      axios.get(global.API + 'beers/' + global.API_KEY+'&order=random&randomCount='+5).then((response) =>
      {this.randBeers = response.data.data
        this.afficheBieresRandom = true
      }).catch(e => alert(e));

    axios.get(global.API+'menu/styles'+global.API_KEY).then((response) => {
      for(let i=0; i<response.data.data.length; i++){
        this.categoriesBieres.push({text: response.data.data[i].name, key: response.data.data[i].id, value: response.data.data[i].id})
      }
    }).catch(e => alert("erreur catégories" + e))
  },
  methods :{
    validationRecherche : function(){

      console.log("recherche")

      axios.get(global.API + 'beers/' + global.API_KEY+'&styleId='+this.searchBox)
      .then((response)=>{
        console.log('beers/' + global.API_KEY+'&=styleId'+this.searchBox)
          this.resultSearch = response.data.data
        this.afficheBieresRandom = true
        this.afficheBieresRandom = false
      }).catch(e=> alert("bonjou"+e))

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
