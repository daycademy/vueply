<template>
  <section id="file-explorer">
    <ProjectTitle :current-project="currentProject" />
    <v-divider />
    <div id="files">
      <div class="title">
        <p>FILES</p>
        <AddFileButton @click="openNewFileInputField" />
      </div>
      <Files
        :selected-file="$store.state.fileExplorer.state.selectedFile"
        :files="files"
        @choose-file="chooseFile"
        @delete-file="deleteFile"
      />
      <input
        v-if="showNewFileInput"
        ref="newFileInput"
        type="text"
        class="form-group-input"
        v-model="newFilename"
        @keyup="addFile"
      >
    </div>

    <HowToUse />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';
import { Files, AddFileButton } from './Components';
import { ProjectTitle, HowToUse } from './Pages';
import FileType from '../../store/models/FileType';
import CodePane from '../../components/CodePane.vue';
import ProjectFileLink from '../../store/models/ProjectFileLink';

@Component({
  components: {
    AddFileButton,
    Files,
    ProjectTitle,
    HowToUse,
  },
})
export default class TheFileExplorer extends Vue {
  private showNewFileInput = false;

  private newFilename = '';

  @Prop()
  private didPressNewFile!: boolean;

  @Watch('didPressNewFile')
  handleDidPressNewFile() {
    this.openNewFileInputField();
  }

  private openNewFileInputField() {
    this.showNewFileInput = true;
    // FIXME: sloppy solution, just for fun
    setTimeout(() => {
      (this.$refs.newFileInput as HTMLElement).focus();
    });
  }

  private addFile(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.showNewFileInput = false;
      const fileType = this.newFilename.split('.')[1];
      if (fileType) {
        const fileTypeShortcut = (this.$store.state.fileExplorer.state.fileTypes as Array<FileType>)
          .filter((storeFileType) => storeFileType.shortcut === fileType)[0];
        if (fileTypeShortcut) {
          this.$store.dispatch('fileExplorer/addFile', {
            name: this.newFilename,
            type: fileTypeShortcut.codeMirrorName,
            project: this.currentProject.projectName,
            code: fileTypeShortcut.defaultCode,
          } as FileModel);
          (this.$root.$refs.CodePane as CodePane).editor.focus();
        }
      }
      this.newFilename = '';
    } else if (event.keyCode === 27) {
      this.showNewFileInput = false;
      this.newFilename = '';
    }
  }

  private deleteFile(filename: string) {
    this.$store.dispatch('fileExplorer/deleteFile', filename);
  }

  private chooseFile(filename: string) {
    this.$store.dispatch('fileExplorer/updateSelectedFile', filename);
  }

  private get currentProject(): ProjectFileLink {
    return this.$store.state.project.projectFilesLink
      .filter(
        (projectFileLink: ProjectFileLink) => projectFileLink.projectName
          === this.$store.state.project.currentProject,
      )[0];
  }

  private get files(): Array<FileModel> {
    return this.$store.getters['fileExplorer/projectFiles'](this.currentProject.projectName);
  }
}
</script>

<style lang="scss">
#file-explorer {
  height: 100%;
  width: 100%;
  background-color: #333545;

  p.project-title, #files .title p {
    color: white;
    margin-top: 0;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  #files {
    input {
      background-color: #282A36;
      color: #9497B0;
      border: 1px solid #282A36;
    }

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 0;

      p {
        color: #9497B0;
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }

  .divider {
    margin: 0;
  }
}
</style>
