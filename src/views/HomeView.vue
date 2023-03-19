<template>
  <div>
    <v-app-bar
        color="teal-darken-4"
        image="https://www.comicbasics.com/wp-content/uploads/2020/08/The-Top-10-Greatest-Superheroes-Without-Superpowers-In-Comics-Today.jpg"
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

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

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
            cols="4"
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
        ></v-pagination>
      </div>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pageAmount: 15,
      heroes: [],
      page: 1
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

  Promise.all(requests)
    .then(responses => {
      const heroes = responses.map(response => response.data);
      console.log(heroes) // Extract the data from each response
      this.heroes = heroes;
    })
    .catch(error => {
      console.error(error);
    });
},


    next() {
      this.page++;
      this.getHeroes(this.page);
    }
  }
}
</script>
