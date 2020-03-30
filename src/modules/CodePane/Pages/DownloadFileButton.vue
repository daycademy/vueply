<template>
  <v-btn
    size="small"
    color="transparent"
    @click="downloadFile(currentFile.name, currentFile.code)"
  >
    <i class="fas fa-file-download"></i>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';
import download from '@/core/download';

@Component({})
export default class DownloadFileButton extends Vue {
  @Prop()
  private currentFile!: FileModel;

  private downloadFile = (filename: string, code: string) => {
    download(filename, code);
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
