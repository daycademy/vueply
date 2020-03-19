<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <FileExplorer @chooseFile="chooseFile" />
      </v-col>
      <v-col c="6" class="left u-no-padding">
        <CodePane :mode="fileType" @input="updateCode" :value="codePaneCode"></CodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <Preview :templateCode="code.template" :jsCode="code.js" :cssCode="code.css" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CodePane from '@/components/CodePane.vue';
import Preview from '@/components/Preview.vue';
import FileExplorer from '@/components/FileExplorer.vue';

export default {
  name: 'Home',

  components: {
    CodePane,
    Preview,
    FileExplorer,
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        this.$root.$refs.Preview.showPreview();
      }
    }, false);
  },

  methods: {
    chooseFile(fileType) {
      this.fileType = fileType;
    },
    updateCode(changedCode) {
      if (this.fileType === 'text/html') {
        this.code.template = changedCode;
      } else if (this.fileType === 'css') {
        this.code.css = changedCode;
      } else if (this.fileType === 'javascript') {
        this.code.js = changedCode;
      } else {
        this.code.vue = changedCode;
      }
    },
  },

  computed: {
    codePaneCode() {
      if (this.fileType === 'text/html') {
        return this.code.template;
      }
      if (this.fileType === 'css') {
        return this.code.css;
      }
      if (this.fileType === 'javascript') {
        return this.code.js;
      }
      return this.code.vue;
    },
  },

  data() {
    return {
      fileType: 'text/html',
      code: {
        vue: `<template>
  <h1>{{ message }}</h1>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World',
    };
  },
};
<\/script>

<style>
h1 {
  color: green;
}
</style>`,
        template: `<div>
  <h1>{{ count }}</h1>
  <button @click="increment">Click</button>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

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
        js: `export default {
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
    };
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;

  .left, .middle {
    border-right: 1px solid #333;
  }
}
</style>
