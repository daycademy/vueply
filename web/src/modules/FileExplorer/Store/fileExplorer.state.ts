import { FileState } from '@/store/modules/@types';
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
  font-family: 'Montserrat';
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
  name: 'HelloWorld',
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
  font-family: 'Montserrat';
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
      project: 'javascript-multi',
      code: `<div id="home">
  <h1>JavaScript Imports</h1>
  <hr />
</div>
`,
    },
    {
      name: 'index.css',
      type: 'css',
      project: 'javascript-multi',
      code: `@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

h1 {
  font-family: 'Montserrat';
}

hr {
  border-top: 1px solid #ddd;
  margin-left: 0;
  margin-bottom: 2em;
  width: 10em;
}
`,
    },
    {
      name: 'index.js',
      type: 'javascript',
      project: 'javascript-multi',
      code: `import { test } from 'my-import-file.js';

test();
`,
    },
    {
      name: 'my-import-file.js',
      type: 'javascript',
      project: 'javascript-multi',
      code: `export const test = () => {
  console.log('In the awesome test function');
};
`,
    },
    {
      name: 'index.html',
      type: 'text/html',
      project: 'javascript-single',
      code: `<div id="home">
  <h1 id="headline">JavaScript Variables</h1>
  <hr />
  <button id="test-btn">Click for event</button>
</div>
`,
    },
    {
      name: 'index.css',
      type: 'css',
      project: 'javascript-single',
      code: `@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

h1 {
  font-family: 'Montserrat';
}

hr {
  border-top: 1px solid #ddd;
  margin-left: 0;
  margin-bottom: 2em;
  width: 10em;
}

button {
  font-family: 'Montserrat';
  padding: 10px 20px;
  border-color: transparent;
  border-radius: 5px;
  font-size: 15px;
  background-color: #27AE60;
  color: white;
}
`,
    },
    {
      name: 'index.js',
      type: 'javascript',
      project: 'javascript-single',
      code: `console.log('Awesome javascript single');

document.getElementById('test-btn').addEventListener('click', () => {
  console.log('Button clicked!');
});
`,
    },
    {
      name: 'index.html',
      type: 'text/html',
      project: 'typescript',
      code: `<div id="home">
  <h1 id="headline">TypeScript</h1>
  <hr />
</div>
`,
    },
    {
      name: 'index.css',
      type: 'css',
      project: 'typescript',
      code: `@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

h1 {
  font-family: 'Montserrat';
}

hr {
  border-top: 1px solid #ddd;
  margin-left: 0;
  margin-bottom: 2em;
  width: 10em;
}
`,
    },
    {
      name: 'index.ts',
      type: 'text/typescript',
      project: 'typescript',
      code: `import { weirdNumber, Entity } from 'weirdNumber.ts';

const str: string = 'Hello World';
const entity: Entity = {
  name: 'Florian',
  age: 1729,
};

console.log(entity.name);
console.log(str);
console.log(weirdNumber);
`,
    },
    {
      name: 'weirdNumber.ts',
      type: 'text/typescript',
      project: 'typescript',
      code: `export const weirdNumber: number = 1729;

export interface Entity {
  name: string;
  age: number;
}
`,
    },
    {
      name: 'file.md',
      type: 'text/x-markdown',
      project: 'markdown',
      code: `## Awesome Markdown

#### Markdown Test

- [ ] Wash Dishes
- [X] Do homework
`,
    },
    {
      name: 'file.py',
      type: 'python',
      project: 'python',
      code: `print(1+1)

abc = 1729
if abc >= 1729:
      print(1729)
`,
    },
  ),
  fileTypes: [
    {
      codeMirrorName: 'javascript',
      shortcut: 'js',
      defaultCode: '/* Insert your code here ... */',
    },
    {
      codeMirrorName: 'python',
      shortcut: 'py',
      defaultCode: '# Insert your code here ...',
    },
    {
      codeMirrorName: 'text/typescript',
      shortcut: 'ts',
      defaultCode: '/* Insert your code here ... */',
    },
    {
      codeMirrorName: 'text/html',
      shortcut: 'html',
      defaultCode: '<div>Insert code here ...</div>',
    },
    {
      codeMirrorName: 'css',
      shortcut: 'css',
      defaultCode: '/* Insert your code here ... */',
    },
    {
      codeMirrorName: 'text/x-vue',
      shortcut: 'vue',
      defaultCode: `<template>
  <h4>Vue File</h4>
</template>

<script>
export default {
  mounted() {
    console.log('Componented mounted');
  },
};
</script>

<style>
h4 {
  font-family: 'Montserrat';
}
</style>
`,
    },
    {
      codeMirrorName: 'text/x-markdown',
      shortcut: 'md',
      defaultCode: `Markdown Basics
================
`,
    },
  ],
};

export default {
  state,
};
