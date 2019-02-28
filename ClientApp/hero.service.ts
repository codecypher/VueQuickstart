import axios from 'axios';

import { Hero } from './components/hero';

const api = 'api';

class HeroService {
    constructor() {
        console.log('creating new instance of hero.service');
    }

    deleteHero(hero: Hero) {
        return axios.delete(`${api}/hero/${hero.id}`);
    }
    getHeroes() {
        //console.log("axios call to getHeroes");
        //axios
        //  .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        //  .then(response => (this.info = response))
        //  .catch(error => {
        //      console.log(error)
        //      this.errored = true
        //  })
        //  .finally(() => this.loading = false)
        return axios.get<Hero[]>(`${api}/hero`);
    }
    addHero(hero: Hero) {
        return axios.post(`${api}/hero/`, hero);
    }
    updateHero(hero: Hero) {
        return axios.put(`${api}/hero/${hero.id}`, hero);
    }
}

// Export a singleton instance in the global namespace
export const heroService = new HeroService();
