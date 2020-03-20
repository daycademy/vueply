import Vue from 'vue';
import Vuex from 'vuex';
import FileModel from './models/FileModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProject: 'web',
    selectedFile: 'index.html',
    files: Array<FileModel>(
      {
        name: 'index.html',
        type: 'text/html',
        code: `<div>
  <h1>{{ count }}</h1>
  <button @click="increment">Click</button>
</div>`,
      },
      {
        name: 'index.css',
        type: 'css',
        code: `@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

h1 {
  font-family: "Montserrat";
}

button {
  padding: 10px 20px;
  border-color: transparent;
  border-radius: 5px;
  font-size: 15px;
  background-color: #27AE60;
  color: white;
}`,
      },
      {
        name: 'app.js',
        type: 'javascript',
        code: `export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};`,
      },
      {
        name: 'App.vue',
        type: 'text/x-vue',
        code: `<template>
<div class="begin">
  <h1>{{ title }}</h1>
  <h2>{{ counter }}</h2>
  <button @click="count">Click me</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello World',
      counter: 0,
    };
  },
  methods: {
    count() {
      this.counter++;
    },
  },
};
<\/script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

h1 {
  font-family: "Montserrat";
}

button {
  padding: 10px 20px;
  border-color: transparent;
  border-radius: 5px;
  font-size: 15px;
  background-color: #27AE60;
  color: white;
}
</style>`,
      },
    ),
  },

  mutations: {
    addFile(state, fileModel: FileModel) {
      state.files.push(fileModel);
    },
    updateSelectedFile(state, name: string) {
      state.selectedFile = name;
    },
    setProject(state, project: string) {
      state.currentProject = project;
    },
  },

  actions: {
    addFile(context, fileModel: FileModel) {
      context.commit('addFile', fileModel);
    },
    updateSelectedFile(context, name: string) {
      context.commit('updateSelectedFile', name);
    },
    setProject(context, project: string) {
      context.commit('setProject', project);
    },
  },
});
