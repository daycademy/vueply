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
  private amountOfPrints = 0;

  private isTerminated = false;

  created() {
    this.$root.$refs.Preview = this;
  }

  mounted() {
    this.showPreview();

    const frame = window.frames[0];
    const originalLog = frame.console.log;
    frame.console.log = (message, ...args: [string]) => {
      if (this.isTerminated) {
        return;
      }
      if (this.amountOfPrints >= 50) {
        frame.document.getElementsByTagName('body')[0].innerHTML += `<p>
  <div style="height: 1px; background-color: #eee; margin: 1em 0;"></div>
  <i class="fas fa-terminal" style="color: #aaa; font-size: 14px; margin-right: 1em;"></i>
  -- terminated
</p>`;
        this.isTerminated = true;
        return;
      }

      frame.document.getElementsByTagName('body')[0].innerHTML += `<p>
  <div style="height: 1px; background-color: #eee; margin: 1em 0;"></div>
  <i class="fas fa-terminal" style="color: #aaa; font-size: 14px; margin-right: 1em;"></i>
  ${message}
</p>`;
      originalLog.apply(message, args);
      this.amountOfPrints += 1;
    };

    const preview = document.getElementById('the-preview');
    if (preview && frame && this.$store.state.project.currentView === 'vertical') {
      preview.style.height = '50vh';
    }
  }

  private get currentProject(): string {
    return this.$store.state.project.currentProject;
  }

  showPreview(): void {
    this.amountOfPrints = 0;

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
          window.frames[0], htmlCode, javascriptFiles[0].code,
          cssCode, this.$route.query.headline as string,
        );
      }
    } else if (this.currentProject === 'typescript') {
      const typescriptFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'text/typescript');
      translater.translateIntoTypeScript(
        window.frames[0], htmlCode, typescriptFiles,
        cssCode, this.$route.query.headline as string,
      );
    } else if (this.currentProject === 'vue-web') {
      // Translate just the first found javascript file
      translater.translateIntoWebVue(
        window.frames[0], htmlCode, javascriptFiles[0].code, cssCode,
      );
    } else if (this.currentProject === 'markdown') {
      const markdownFile: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'text/x-markdown');
      translater.translateIntoMarkdown(window.frames[0], markdownFile[0].code);
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
  position: relative;

  #play-btn {
    opacity: 0;
    position: absolute;
    top: calc(50% - 102px);
    right: calc(50% - 102px + 5%);
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
