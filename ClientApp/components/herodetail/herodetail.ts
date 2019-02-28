import Vue from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { Hero } from '../hero';

@Component({})
export default class HeroDetail extends Vue {
    @Prop() hero: Hero;
    addingHero = !this.hero;
    editingHero: Hero | null;

  @Watch('hero') onHeroChanged(value: string, oldValue: string) {
    this.editingHero = this.cloneIt();
  }
  $refs: {
    id: HTMLElement;
    name: HTMLElement;
  };

  addHero() {
    const hero = <Hero>this.editingHero;
    this.emitRefresh('add', hero);
  }

  @Emit('unselect') 
  clear() {
    this.editingHero = null;
  }

  cloneIt() {
    return Object.assign({}, this.hero);
  }
  created() {
    this.editingHero = this.cloneIt();
  }

  @Emit('heroChanged') 
  emitRefresh(mode: string, hero: Hero) {
    this.clear();
  }

  mounted() {
    if (this.addingHero && this.editingHero) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
  }

  save() {
    if (this.addingHero) {
      this.addHero();
    } else {
      this.updateHero();
    }
  }

  updateHero() {
    const hero = <Hero>this.editingHero;
    this.emitRefresh('update', hero);
  }
}