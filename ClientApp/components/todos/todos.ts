// Modern Web Development using ASP.NET Core template, Vue.js and Webpack
// https://www.dotnetcurry.com/aspnet/1383/modern-web-dev-aspnet-core-webpack-vuejs
// https://github.com/DaniJG/AspCoreVue
//
// Let’s implement the classical example of the TODO list, where we will add a 
// new client-side route and components, backed by a REST API on the server side.

import Vue from 'vue';
import { Component } from 'vue-property-decorator';

interface TodoItem {
    id: string;
    description: string;
    done: boolean;
}

@Component
export default class TodoComponent extends Vue {
    todos: TodoItem[];
    newItemDescription: string;

    constructor() {
        super();
        this.todos = [
            {description: 'Sebastian', done: false, id: '1111'},
            {description: 'Bill', done: false, id: '2222'},
            {description: 'Ted', done: false, id: '3333'}
        ],
        this.newItemDescription = "";
    }

    data() {
        return {
            todos: [],
            newItemDescription: null
        };
    } 

    mounted() {
        fetch('/api/todo')
            .then(response => response.json() as Promise<TodoItem[]>)
            .then(data => {
                this.todos = data;
            });
    }

    addItem(event: any){
        if (event) event.preventDefault();
        
        fetch('/api/todo', {
          method: 'post',
          body: JSON.stringify(<TodoItem>{description: this.newItemDescription}),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json() as Promise<TodoItem>)
        .then((newItem) => {
            this.todos.push(newItem);
            this.newItemDescription = "";
        });
    }

    completeItem(item: TodoItem){
        fetch(`/api/todo/${item.id}`, {
          method: 'delete',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        })
        .then(() => {
            this.todos = this.todos.filter((t) => t.id !== item.id);
        });
    }
}