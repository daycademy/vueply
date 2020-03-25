<template>
  <section id="file-explorer">
    <p class="project-title">
      {{ currentProject.displayName }} Project
      <SettingsDropdown
        :projects="$store.state.project.projectFilesLink"
        @choose-project="chooseProject"
      />
    </p>
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

    <div id="how-to-use" v-if="isOSXDevice">
      <p v-for="hotkey in hotkeysWithCmd" :key="hotkey.combination">
        <span v-if="isOSXDevice">Cmd</span>
        <span v-else>Strg</span>
        + <span>{{ hotkey.combination }}</span> {{ hotkey.description }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import FileModel from '@/store/models/FileModel';
import SettingsDropdown from './Components/SettingsDropdown.vue';
import AddFileButton from './Components/AddFileButton.vue';
import Files from './Components/Files.vue';

@Component({
  components: {
    SettingsDropdown,
    AddFileButton,
    Files,
  },
})
export default class TheFileExplorer extends Vue {
  private showNewFileInput = false;

  private newFilename = '';

  private hotkeysWithCmd = [
    {
      combination: 'S',
      description: 'in a File to run',
    },
    {
      combination: '.',
      description: 'to create a new File',
    },
  ];

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
      this.$store.dispatch('fileExplorer/addFile', {
        name: this.newFilename,
        type: 'javascript',
        project: this.currentProject.projectName,
        code: '/* Insert your code here ... */',
      } as FileModel);
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

  private chooseProject(project: string) {
    this.$store.dispatch('setProject', project);
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](project);
    this.$store.dispatch('fileExplorer/updateSelectedFile', projectFiles[0].name);
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

  // eslint-disable-next-line
  private get isOSXDevice(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
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

  #how-to-use {
    position: absolute;
    left: 0.5em;
    bottom: 0.5em;

    p {
      color: #9598AF;
      margin: 0;
      padding: 0;

      &:first-child {
        margin-bottom: 1em;
      }

      span {
        background-color: #282A36;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
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

  .project-title {
    display: flex;
    align-items: center;
    color: #9598AF;
  }

  .divider {
    margin: 0;
  }
}
</style>
