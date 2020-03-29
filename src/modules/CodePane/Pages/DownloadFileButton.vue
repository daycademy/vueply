<template>
  <v-btn
    size="small"
    color="transparent"
    @click="download(currentFile.name, currentFile.code)"
  >
    <i class="fas fa-file-download"></i>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';

@Component({})
export default class DownloadFileButton extends Vue {
  @Prop()
  private currentFile!: FileModel;

  private download = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
