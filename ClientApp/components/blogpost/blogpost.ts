import { Vue, Component, Prop } from "vue-property-decorator";

import { Post } from '../post';

@Component
export default class BlogPostComponent extends Vue {
    @Prop() likes!: number;
    @Prop() post!: Post;

    constructor() {
        super();
        this.post = new Post();
    }
}
