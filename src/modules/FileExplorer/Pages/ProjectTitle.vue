<template>
  <p class="project-title">
    {{ currentProject.displayName }} {{ $t('project_title') }}
    <SettingsDropdown
      :projects="$store.state.project.projectFilesLink"
      @choose-project="chooseProject"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import SettingsDropdown from '../Components/SettingsDropdown.vue';

@Component({
  components: {
    SettingsDropdown,
  },
})
export default class ProjectTitle extends Vue {
  @Prop()
  private currentProject!: ProjectFileLink;

  private chooseProject(project: string) {
    this.$store.dispatch('setProject', project);
    const projectFiles = this.$store.getters['fileExplorer/projectFiles'](project);
    this.$store.dispatch('fileExplorer/updateSelectedFile', projectFiles[0].name);
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
