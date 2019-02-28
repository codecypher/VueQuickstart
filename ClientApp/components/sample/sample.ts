import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import HelloGreeting from '../HelloGreeting.vue';

@Component({
    components: {
        HelloComponent: require('../hello/hello.vue.html'),
        HelloGreeting: HelloGreeting
    }
})
export default class SampleComponent extends Vue {
    currentcount: number = 0;
    dismissSecs: number = 10;
    dismissCountDown: number = 0;
    showDismissibleAlert: boolean = false;
    
    incrementCounter() {
        this.currentcount++;
    }
}
