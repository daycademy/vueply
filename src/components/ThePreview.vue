<template>
  <section id="the-preview">
    <iframe
      id="preview"
      name="result"
      sandbox="allow-forms allow-modals allow-pointer-lock
        allow-popups allow-scripts allow-same-origin"
      frameBorder="0"
    ></iframe>
    <div id="play-btn">
      <i class="fas fa-play-circle" aria-hidden="true"></i>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import translater from '../core/translater/translater';
import FileModel from '../store/models/FileModel';

@Component({})
export default class ThePreview extends Vue {
  created() {
    this.$root.$refs.Preview = this;
  }

  mounted() {
    this.showPreview();

    const frame = window.frames[0];
    const originalLog = frame.console.log;
    frame.console.log = (message, ...args: [string]) => {
      frame.document.getElementsByTagName('body')[0].innerHTML += `<p>
  <div style="height: 1px; background-color: #eee; margin: 1em 0;"></div>
  <i class="fas fa-terminal" style="color: #aaa; font-size: 14px; margin-right: 1em;"></i>
  ${message}
</p>`;
      originalLog.apply(message, args);
    };
  }

  private get currentProject(): string {
    return this.$store.state.project.currentProject;
  }

  showPreview() {
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.classList.toggle('play-animation');
      setTimeout(() => {
        playBtn.classList.toggle('play-animation');
      }, 750);
    }

    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](this.currentProject);

    const allHtmlFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'text/html');
    const allCssFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'css');
    const htmlCode: string = allHtmlFiles.length !== 0 ? allHtmlFiles[0].code : '';
    const cssCode = allCssFiles.map((cssFile) => cssFile.code).join(' ');
    // Get all javascript files
    const javascriptFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'javascript');
    if (this.currentProject.startsWith('javascript')) {
      // If multiple javascript files are in one project
      if (javascriptFiles.length !== 1) {
        translater.translateFilesIntoJavaScript(
          window.frames[0], htmlCode, javascriptFiles, cssCode,
        );
      } else {
        // Translate just the first found javascript file
        translater.translateIntoJavaScript(
          window.frames[0], htmlCode, javascriptFiles[0].code, cssCode,
        );
      }
    } else if (this.currentProject === 'vue-web') {
      // Translate just the first found javascript file
      translater.translateIntoWebVue(
        window.frames[0], htmlCode, javascriptFiles[0].code, cssCode,
      );
    } else {
      translater.translateIntoVue(window.frames[0], projectFiles[0].code);
    }
  }
}
</script>

<style lang="scss">
#the-preview {
  width: 100%;
  height: 100%;

  #play-btn {
    opacity: 0;
    position: absolute;
    top: 40%;
    right: calc(33.33333333% / 2 - 4%);
    font-size: 102px;
    transition: visibility 0s linear 300ms, opacity 750ms;
    color: #ccc;

    &.play-animation {
      opacity: 1;
      transition: visibility 0s linear 0s, opacity 750ms;
    }
  }
}
#preview {
  width: 100%;
  height: 100%;
}
</style>
