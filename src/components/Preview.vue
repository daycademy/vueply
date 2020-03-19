<template>
  <iframe
    id="preview"
    name="result"
    sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
    frameBorder="0"
  ></iframe>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Preview extends Vue {
  @Prop()
  private templateCode!: string;

  @Prop()
  private jsCode!: string;

  @Prop()
  private cssCode!: string;

  @Prop({ default: null })
  private vueCode!: string;

  created() {
    this.$root.$refs.Preview = this;
  }

  mounted() {
    this.showPreview();
  }

  showPreview() {
    const lib = 'https://cdn.jsdelivr.net/npm/vue@2.6.11';

    let templateCode = '';
    let jsCode = '';
    let cssCode = '';
    let script = '';

    if (!this.vueCode) {
      templateCode = this.templateCode.replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
      jsCode = this.jsCode;
      cssCode = this.cssCode;
      /* eslint-disable-next-line */
      script = 'var template = `<template>' + templateCode + '</template>`;' + 'var js =`' + jsCode + '`;';
    } else {
      const templateMatch = this.vueCode.match(/<template>\s.*?\s<\/template>/gms);
      const scriptMatch = this.vueCode.match(/<script>\s.*?\s<\/script>/gms);
      const styleMatch = this.vueCode.match(/<style>\s.*?\s<\/style>/gms);

      if (!templateMatch || !scriptMatch || !styleMatch) {
        console.log('No template/script/style match!');
        return;
      }

      templateCode = templateMatch[0].replace(/\s*\n+\s*/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
      jsCode = scriptMatch[0].replace('<script>', '').replace('<\/script>', '');
      cssCode = styleMatch[0].replace('<style>', '').replace('<\/style>', '');
      /* eslint-disable-next-line */
      script = 'var template = `' + templateCode + '`;' + 'var js =`' + jsCode + '`;';
    }

    const previewDoc = window.frames[0].document;
    previewDoc.write('<!DOCTYPE html>');
    previewDoc.write('<html>');
    previewDoc.write('<head>');
    previewDoc.write(`<style type="text/css">${cssCode}<\/style>`);
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
  }
}
</script>

<style lang="scss">
#preview {
  width: 100%;
  height: 100%;
}
</style>
