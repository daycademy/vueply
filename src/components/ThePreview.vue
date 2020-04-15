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
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](this.currentProject);

    if (this.currentProject !== 'vue') {
      const allHtmlFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'text/html');
      const allCssFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'css');
      const htmlCode: string = allHtmlFiles.length !== 0 ? allHtmlFiles[0].code : '';
      const cssCode = allCssFiles.map((cssFile) => cssFile.code).join(' ');

      // Get all javascript files
      const javascriptFiles: Array<FileModel> = projectFiles.filter((projectFile: FileModel) => projectFile.type === 'javascript');

      // If multiple javascript files are in one project
      if (javascriptFiles.length !== 1) {
        // Get the `index.js` file from the web project
        let mainJavascriptFile: string = javascriptFiles.filter((file: FileModel) => file.name === 'index.js')[0].code;
        // Get all other file names by regexing
        const otherFileNamesRegex = mainJavascriptFile.match(/import\s*['"].*['"]/gm);

        const importStatement = mainJavascriptFile.match(/import \{(.*?)\} from ["'](.*?)["']/g)![0];
        const matchedFilename = importStatement.match(/["'](.*?)["']/g)![0].replace(/'/g, '');
        const matchedExport = importStatement.match(/\{(.*?)\}/g)![0].replace(/\{/g, '').replace(/\}/g, '').trim();
        const matchedFile: FileModel = projectFiles
          .filter((projectFile: FileModel) => projectFile.name === matchedFilename)[0];
        const fileCode = matchedFile.code;
        const newCode = fileCode.match(new RegExp(`export const ${matchedExport}(.*)`, 'gs'))![0].replace(/export/g, '');
        console.log(newCode);

        if (otherFileNamesRegex) {
          // Loop through found import statements
          otherFileNamesRegex.forEach((otherFileNameRegex) => {
            // Replace single and double quotes with nothing and select the filename
            const otherFileName = otherFileNameRegex.replace(/["']/g, '').split(' ')[1];
            // Filter the project files and get the file by the import statement filename
            const file: FileModel = projectFiles
              .filter((projectFile: FileModel) => projectFile.name === otherFileName)[0];
            // Replace import statement in main javascript file with file code
            const importRegex = new RegExp(`import ['"]${file.name}['"]`, 'gm');
            mainJavascriptFile = mainJavascriptFile.replace(importRegex, file.code);
          });
          translater.translateIntoJavaScript(
            window.frames[0], htmlCode, mainJavascriptFile, cssCode,
          );
        }
      } else {
        // Translate just the first found javascript file
        translater.translateIntoJavaScript(
          window.frames[0], htmlCode, javascriptFiles[0].code, cssCode,
        );
      }
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
