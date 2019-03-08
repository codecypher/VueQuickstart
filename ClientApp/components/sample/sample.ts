import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import HelloGreeting from '../HelloGreeting.vue';

import { Post } from '../post';

@Component({
    components: {
        HelloComponent: require('../hello/hello.vue.html'),
        BlogPostComponent: require('../blogpost/blogpost.vue.html'),
        HelloGreeting: HelloGreeting
    }
})
export default class SampleComponent extends Vue {
    currentcount: number = 0;
    dismissSecs: number = 10;
    dismissCountDown: number = 0;
    showDismissibleAlert: boolean = false;

    post: Post;
    posts: Post[];

    data() {
        return {
            post: new Post(),
            posts: [
                { id: 1, title: 'My journey with Vue' },
                { id: 2, title: 'Blogging with Vue' },
                { id: 3, title: 'Why Vue is so fun' }
            ]
        };
    }

    constructor() {
        super();
    }

    mounted() {
        this.post.likes = 30;
        this.post.author = "Tom Selek";
        this.post.isPublished = true;
        this.post.commentIds = [52, 3, 12];
    }

    incrementCounter() {
        this.currentcount++;
    }
}
