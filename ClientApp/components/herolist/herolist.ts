import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

//import HeroDetail from './HeroDetail.vue';
import { heroService } from '../../hero.service';
import { Hero } from '../hero';

@Component({
    components: {
        HeroDetail: require('../herodetail/herodetail.vue.html')
    }
})
export default class HeroList extends Vue {
    addingHero: boolean = false;
    selectedHero: Hero | null = null;
    heroes: Hero[] = [];

  constructor() {
      super();
      this.addingHero = false;
      this.heroes = [];
      this.selectedHero = null;
  }

  created() {
    this.getHeroes();
    //console.log("length is " + this.heroes.length);
  }

  deleteHero(hero: Hero) {
    return heroService.deleteHero(hero).then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroes = [];
    this.selectedHero = null;
    return heroService.getHeroes().then(response => (this.heroes = response.data));
  }

    heroChanged(mode: string, hero: Hero) {
        console.log('hero changed', mode, hero);
        if (mode === 'add') {
            //heroService.addHero(hero).then(() => this.heroes.push(hero));
            // New hero is assigned an id by controller
            heroService.addHero(hero).then(response => 
            {
                let newHero: Hero = response.data;
                //this.heroes.push(this.newHero);
                // Have to use this for change detection (reactivity)
                this.heroes.splice(newHero.id, 1, newHero);
            });
        } else {
            heroService.updateHero(hero).then(() => {
                let index = this.heroes.findIndex(h => hero.id === h.id);
                this.heroes.splice(index, 1, hero);
            });
        }
    }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}