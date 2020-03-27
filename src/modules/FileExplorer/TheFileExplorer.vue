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
      <NewFileInput
        :showNewFileInput="showNewFileInput"
        :currentProject="currentProject"
        @disable-new-file-input="showNewFileInput = false"
      />
    </div>

    <HowToUse />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import ThePreview from '@/components/ThePreview.vue';
import { Files, AddFileButton } from './Components';
import { ProjectTitle, HowToUse, NewFileInput } from './Pages';

@Component({
  components: {
    AddFileButton,
    Files,
    ProjectTitle,
    HowToUse,
    NewFileInput,
  },
})
export default class TheFileExplorer extends Vue {
  private showNewFileInput = false;

  mounted() {
    document.addEventListener('keydown', (e) => {
      if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        (this.$root.$refs.Preview as ThePreview).showPreview();
      } else if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 190) {
        e.preventDefault();
        this.openNewFileInputField();
      }
    }, false);
  }

  private openNewFileInputField() {
    this.showNewFileInput = true;
    // FIXME: sloppy solution, just for functionality
    setTimeout(() => {
      (document.getElementById('new-file-input') as HTMLElement).focus();
    });
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
