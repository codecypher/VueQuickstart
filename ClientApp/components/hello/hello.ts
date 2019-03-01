import { Vue, Component, Prop } from "vue-property-decorator";

//import HelloGreeting from '../HelloGreeting'

@Component
export default class HelloComponent extends Vue {
    @Prop() name!: string;
    @Prop() initialEnthusiasm!: number;
    @Prop() count!: number;

    //name: string = "World";
    //initialEnthusiasm: number = 3;

    enthusiasm = this.initialEnthusiasm;

    constructor() {
        super();
        //this.title = 'This is a title';
    }

    increment() {
        this.enthusiasm++;
    }

    decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }

    // Computed property
    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}