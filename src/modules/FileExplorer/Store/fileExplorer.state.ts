import { FileState } from '@/store/modules/types';
import FileModel from '@/store/models/FileModel';

const state: FileState = {
  selectedFile: 'index.html',
  files: Array<FileModel>(
    {
      name: 'index.html',
      type: 'text/html',
      project: 'vue-web',
      code: `<div>
  <h1>{{ count }}</h1>
  <button @click="increment">Click</button>
</div>`,
    },
    {
      name: 'index.css',
      type: 'css',
      project: 'vue-web',
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
      project: 'vue-web',
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
      project: 'vue',
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
    {
      name: 'index.html',
      type: 'text/html',
      project: 'javascript',
      code: '<div>test</div>',
    },
    {
      name: 'index.css',
      type: 'css',
      project: 'javascript',
      code: `h1 {
  color: red;
}`,
    },
    {
      name: 'index.js',
      type: 'javascript',
      project: 'javascript',
      code: `import 'my-import-file.js';

console.log(123);
test();`,
    },
    {
      name: 'my-import-file.js',
      type: 'javascript',
      project: 'javascript',
      code: `const test = () => {
  console.log('In the awesome test function');
};`,
    },
  ),
};

export default {
  state,
};
