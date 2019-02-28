import Vue from 'vue';
//import Component from 'vue-class-component';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
        HeroList: require('../herolist/herolist.vue.html')
    }
})
export default class HeroesComponent extends Vue {
    title: string;

    constructor() {
        super();
        this.title = 'Vue Heroes App';
    }
}