<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'HeroView',
    data() {
        return {
            hero: {},
            heroId: this.$route.params.id,
        }
    },
    created() {
        this.getHero();
    },
    methods: {
        getHero() {
            axios.get(`http://localhost:8080/api/103398715680585/${this.heroId}`)
                .then(response => {
                    this.hero = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style>

</style>