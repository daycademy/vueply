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
import { Component } from 'vue-property-decorator';
import translater from '../core/translater';
import FileModel from '../store/models/FileModel';

@Component({})
export default class ThePreview extends Vue {
  created() {
    this.$root.$refs.Preview = this;
  }

  mounted() {
    this.showPreview();
  }

  private get currentProject(): string {
    return this.$store.state.project.currentProject;
  }

  showPreview() {
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](this.currentProject);

    if (this.currentProject !== 'vue') {
      const htmlCode = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'text/html')[0].code;
      const cssCode = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'css')[0].code;
      const javascriptCode = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'javascript')[0].code;
      translater.translateIntoJavaScript(window.frames[0], htmlCode, javascriptCode, cssCode);
    } else {
      translater.translateIntoVue(window.frames[0], projectFiles[0].code);
    }
  }
}
</script>

<style lang="scss">
#preview {
  width: 100%;
  height: 100%;
}
</style>
