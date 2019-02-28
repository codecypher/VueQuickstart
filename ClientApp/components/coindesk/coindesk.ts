import Vue from 'vue';
import Component from 'vue-class-component'
//import { Component } from 'vue-property-decorator';
import axios from 'axios';

// Using Axios to Consume APIs
// https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
// vue-class-component
// https://github.com/vuejs/vue-class-component
@Component({
    components: {
    },
    filters: {
        currencydecimal (value: number) {
            return value.toFixed(2)
        }
    }
})
export default class CoinDeskComponent extends Vue {
    // Initial data can be declared as instance properties
    info: any = null;
    loading: boolean = false;
    errored: boolean = false;
    message: string = "Hello, Jeff";

    // Computed property
    // You may also want to check out the @prop and @watch decorators provided by vue-property-decorator.
    get label() {
        return this.message;
    }

    // Instance methods
    onClick (): void {
        alert(this.message)
    }

    // Instance Lifecycle Hooks
    mounted () {
        axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => (this.info = response.data.bpi))
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            //.finally(() => this.loading = false)
    }
}
