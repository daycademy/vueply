<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="4" class="u-no-padding">
        <CodePane id="html-code" v-model="templateText"></CodePane>
      </v-col>
      <v-col c="4" class="u-no-padding">
        <CodePane id="js-code" mode="javascript" v-model="jsText"></CodePane>
      </v-col>
      <v-col c="4" class="u-no-padding">
        <iframe
          id="preview"
          name="result"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
          frameborder="0"
        ></iframe>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CodePane from '@/components/CodePane.vue';

export default {
  name: 'Home',

  components: {
    CodePane,
  },

  data() {
    return {
      templateText: `<div>
  <h1>{{ count }}</h1>
  <button @click="increment">Click</button>
</div>
`,
      jsText: `export default {
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
    };
  },

  mounted() {
    this.showPreview();
  },

  watch: {
    templateText() {
      this.showPreview();
    },
    jsText() {
      this.showPreview();
    },
  },

  methods: {
    showPreview() {
      const lib = 'https://cdn.jsdelivr.net/npm/vue@2.6.11';
      const templateText = this.templateText.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
      const { jsText } = this;
      /* eslint-disable-next-line */
      const script = 'var template = `<template>' + templateText + '</template>`;' + 'var js =`' + jsText + '`;';

      const previewDoc = window.frames[0].document;
      previewDoc.write('<!DOCTYPE html>');
      previewDoc.write('<html>');
      previewDoc.write('<head>');
      previewDoc.write(`<script src=${lib} type="text/javascript"><\/script>`);
      previewDoc.write('</head>');
      previewDoc.write('<body>');
      previewDoc.write('<div id="app"></div>');
      previewDoc.write(`<script type="text/javascript">${script}<\/script>`);
      previewDoc.write(`<script type="text/javascript">
function handleJs(js) {
  js = js.replace('export default', 'return');
  return (new Function(js))();
}

function mergeJs(js, template) {
  const jsObj = handleJs(js);
  const vueObj = Object.assign({template}, jsObj, {el: '#app'}); 
  return new Vue(vueObj);
}

mergeJs(js, template);
<\/script>`);
      previewDoc.write('</body>');
      previewDoc.write('</html>');
      previewDoc.close();
    },
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;

  #preview {
    width: 100%;
    height: 100%;
  }

  .col-4 {
    border-right: 1px solid #333;
  }
}
</style>
