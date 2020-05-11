<template>
  <section id="home">
    <v-row v-if="$store.state.project.currentView === 'horizontal'" class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <TheFileExplorer />
      </v-col>
      <v-col c="6" class="left u-no-padding">
        <TheCodePane
          :current-project="currentProject"
          :current-file="currentFile"
          :current-view="$store.state.project.currentView"
          :mode="currentFile.type"
          @input="updateCode"
          :value="currentFile.code"
        ></TheCodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <ThePreview />
      </v-col>
    </v-row>
    <v-row v-else class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <TheFileExplorer />
      </v-col>
      <v-col c="10" class="u-no-padding">
        <TheCodePane
          :current-project="currentProject"
          :current-file="currentFile"
          :current-view="$store.state.project.currentView"
          :mode="currentFile.type"
          @input="updateCode"
          :value="currentFile.code"
        ></TheCodePane>
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
import FileModel from '../store/models/FileModel';

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
        const projectFiles = this.$store.getters['fileExplorer/projectFiles'](paramProject);
        this.$store.dispatch('fileExplorer/updateSelectedFile', projectFiles[0].name);
      }
    }

    let homeworkTask = this.$route.query.hw;
    if (homeworkTask) {
      homeworkTask = (homeworkTask as string).replace(/\\n/g, '\n');
      const file = {
        name: 'homework.md',
        type: 'text/x-markdown',
        project: this.currentProject,
        code: homeworkTask,
      } as FileModel;
      this.$store.dispatch('fileExplorer/addFile', file);
      this.$store.dispatch('fileExplorer/updateSelectedFile', file.name);
    }
  }

  private updateCode(changedCode: string): void {
    const selectedFile = this.currentFile;
    if (selectedFile) {
      selectedFile.code = changedCode;
    }
  }

  private get currentProject(): string {
    return this.$store.state.project.currentProject;
  }

  private get currentFile(): FileModel | null {
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
