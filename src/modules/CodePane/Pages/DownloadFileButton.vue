<template>
  <v-btn
    size="small"
    color="transparent"
    @click="downloadFile"
  >
    <i class="fas fa-file-download"></i>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';
import { download, transform } from '@/core/download';
import ProjectFileLink from '@/store/models/ProjectFileLink';

@Component({})
export default class DownloadFileButton extends Vue {
  @Prop()
  private currentFile!: FileModel;

  private downloadFile() {
    const { name, code, type } = this.currentFile;

    const transformedCode = transform(type, code, this.files);
    download(name, transformedCode);
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

<style lang="scss" scoped>
button {
  z-index: 10;
  position: absolute;
  right: 1em;
  top: 0.5em;
  color: #6A6F8D;
  font-size: 18px;
}
</style>
