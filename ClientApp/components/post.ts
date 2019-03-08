export class Post {
    public id: number;
    public title: string;
    public likes: number;
    public author: string;
    public isPublished: boolean;
    public commentIds: Array<number>;

    constructor() {
        // default values
        this.likes = 10;
        this.author = "Jeff Holmes";
        this.isPublished = false;
        this.commentIds = [25, 15, 5];
    }

    //constructor(likes: number, author: string, isPublished: boolean, commentIds: Array<number>) {
    //    this.likes = likes;
    //    this.author = author;
    //    this.isPublished = isPublished;
    //    this.commentIds = commentIds;
    //}
}