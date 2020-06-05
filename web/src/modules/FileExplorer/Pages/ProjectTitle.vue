<template>
  <p class="project-title">
    {{ currentProject.displayName }} {{ $t('project_title') }}
    <ProjectSettings
      :current-project="currentProject"
      :projects="$store.state.project.projectFilesLink"
      @choose-project="chooseProject"
      @choose-view="chooseView"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProjectFileLink from '../../../store/models/ProjectFileLink';
import ProjectSettings from '../Components/ProjectSettings.vue';

@Component({
  components: {
    ProjectSettings,
  },
})
export default class ProjectTitle extends Vue {
  @Prop({ type: Object as () => ProjectFileLink, required: true })
  private currentProject!: ProjectFileLink;

  private chooseProject(project: string): void {
    this.$store.dispatch('setProject', project);
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](project);
    if (projectFiles && projectFiles.length > 0) {
      this.$store.dispatch('fileExplorer/updateSelectedFile', projectFiles[0].name);
    }
  }

  private chooseView(view: string): void {
    this.$store.dispatch('setView', view);
  }
}
</script>

<style lang="scss" scoped>
.project-title {
  display: flex;
  align-items: center;
  color: #9598AF;
}
</style>
