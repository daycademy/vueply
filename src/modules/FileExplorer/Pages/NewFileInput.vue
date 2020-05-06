<template>
  <input
    v-if="showNewFileInput"
    id="new-file-input"
    type="text"
    class="form-group-input"
    v-model="newFilename"
    @keyup="addFile"
  >
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileType from '@/store/models/FileType';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import FileModel from '@/store/models/FileModel';
import CodePane from '@/modules/CodePane/TheCodePane.vue';

@Component({})
export default class NewFileInput extends Vue {
  private newFilename = '';

  @Prop({ type: Object as () => ProjectFileLink, required: true })
  private currentProject!: ProjectFileLink;

  @Prop({ type: Boolean, required: true })
  private showNewFileInput!: boolean;

  private addFile(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.$emit('disable-new-file-input');
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

          const { editor } = this.$root.$refs.CodePane as CodePane;
          editor.focus();
          // FIXME: sloppy solution, just for functionality
          setTimeout(() => {
            editor.setCursor(editor.lineCount(), 0);
          });
        }
      }
      this.newFilename = '';
    } else if (event.keyCode === 27) {
      this.newFilename = '';
      this.$emit('disable-new-file-input');
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  background-color: #282c34;
  color: #9497B0 !important;
  border: 1px solid #282c34 !important;
}
</style>
