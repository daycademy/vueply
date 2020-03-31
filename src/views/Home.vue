<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <TheFileExplorer />
      </v-col>
      <v-col c="6" class="left u-no-padding">
        <TheCodePane
          :currentProject="currentProject"
          :currentFile="currentFile"
          :mode="currentFile.type"
          @input="updateCode"
          :value="currentFile.code"
        ></TheCodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <ThePreview />
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ThePreview from '@/components/ThePreview.vue';
import TheCodePane from '@/modules/CodePane/TheCodePane.vue';
import TheFileExplorer from '@/modules/FileExplorer/TheFileExplorer.vue';
import ProjectFileLink from '../store/models/ProjectFileLink';

@Component({
  components: {
    TheCodePane,
    ThePreview,
    TheFileExplorer,
  },
})
export default class Home extends Vue {
  mounted() {
    const paramProject = this.$route.params.project;
    if (paramProject) {
      const filteredProjects: ProjectFileLink[] = this.$store.state.project.projectFilesLink
        .filter((projectFileLink: ProjectFileLink) => projectFileLink.projectName
          === paramProject.toLowerCase());
      if (filteredProjects.length > 0) {
        this.$store.dispatch('setProject', paramProject);
      }
    }
  }

  private updateCode(changedCode: string) {
    const selectedFile = this.currentFile;
    selectedFile.code = changedCode;
  }

  private get currentProject() {
    return this.$store.state.project.currentProject;
  }

  private get currentFile() {
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](this.currentProject);
    for (let i = 0; i < projectFiles.length; i += 1) {
      if (projectFiles[i].name === this.$store.state.fileExplorer.state.selectedFile) {
        return projectFiles[i];
      }
    }
    return null;
  }
}
</script>

<style lang="scss">
#home {
  height: 100%;

  .left, .middle {
    border-right: 1px solid #333;
  }
}
</style>
