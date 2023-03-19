<template>
  <div sm="12"
  md="6"
  lg="4">
    <v-app-bar
        color="teal-darken-4"
        image="https://www.comicbasics.com/wp-content/uploads/2020/08/The-Top-10-Greatest-Superheroes-Without-Superpowers-In-Comics-Today.jpg"
        sm="12"
        md="6"
        lg="4"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Superhero Villain API</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-text-field
        loading
        density="compact"
        variant="solo"
        label="Search for Superhero or Villain"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="searchHero"
        v-model="searchInput"
      ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="hero in heroes"
            :key="hero.id"
            sm="12"
            md="6"
            lg="4"
          >
            <v-card class="bg-grey-lighten-3">
              <v-img :src="hero.image.url" height="300px"></v-img>

              <v-card-title>{{ hero.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="4"
          @next="next"
          @prev="previous"
          sm="12"
          md="6"
          lg="4"
        ></v-pagination>
      </div>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import { useHeroStore } from '@/store/store';

const heroStore = useHeroStore();

export default {
  name: 'HomeView',
  data() {
    return {
      pageAmount: 15,
      heroes: [],
      page: 1,
      searchInput: '',
    }
  },
  created() {
    this.getHeroes(this.page);
  },
  methods: {
    getHeroes(page) {
  const startIndex = (page - 1) * 12 + 1; // Calculate the starting index for this page
  const endIndex = startIndex + 11; // Calculate the ending index for this page

  const requests = [];
  for (let i = startIndex; i <= endIndex; i++) {
    requests.push(axios.get(`http://localhost:8080/api/103398715680585/${i}`));
  }

  console.log(requests)

  Promise.all(requests)
    .then(responses => {
      const heroes = responses.map(response => response.data);
      // console.log(heroes) // Extract the data from each response
      this.heroes = heroes;
    })
    .catch(error => {
      console.error(error);
    });
    },

    next() {
      this.getHeroes(this.page);
    },

    previous() {
      console.log("previous clicked")
      this.getHeroes(this.page);
    },

    searchHero() {    
      const name = this.searchInput.toUpperCase();
      if (name === name.toLowerCase()) {
        alert("Please enter a valid superhero or villain name")
      }
      else {
        axios.get(`http://localhost:8080/api/103398715680585/search/${name}`).then(response => {
          const searchedHero = response.data.results;
          console.log(searchedHero)
          heroStore.setHero(searchedHero);
        })
      }
    }
  }
}
</script>