<template>
  <section id="file-explorer">
    <ProjectTitle :current-project="myCurrentProject" />
    <v-divider />
    <div id="files">
      <div class="title">
        <p>{{ $t('files_name') }}</p>
        <AddFileButton @click="openNewFileInputField" />
      </div>
      <div class="file-list">
        <File
          v-for="file in myFiles"
          :key="file.name"
          :class="`file${
            $store.state.fileExplorer.state.selectedFile === file.name
            ? ' selected' : ''
          }`"
          :filename="file.name"
          :fileType="file.type"
          @click="chooseFile(file.name)"
        >
          <FileMenu
            @click-download="downloadFile(file.name, file.code, file.type)"
            @click-delete="deleteFile($event, file.name)"
          />
        </File>
      </div>
      <!--
      <Files
        :selected-file="$store.state.fileExplorer.state.selectedFile"
        :files="myFiles"
        @choose-file="chooseFile"
        @delete-file="deleteFile"
        @click-download-file="downloadFile"
      >
        <FileMenu
          @click-download="$emit('click-download-file', file.name, file.code, file.type)"
          @click-delete="deleteFile($event, file.name)"
        />
      </Files>
      -->
      <NewFileInput
        :show-new-file-input="showNewFileInput"
        :current-project="myCurrentProject"
        @disable-new-file-input="showNewFileInput = false"
      />
    </div>

    <HowToUse
      @open-input-field="openNewFileInputField()"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FileModel from '@/store/models/FileModel';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import ThePreview from '@/components/ThePreview.vue';
import { download, transform } from '@/core/download';
import { files, currentProject } from '@/core/storeUtils';
import { File, AddFileButton, FileMenu } from './Components';
import { ProjectTitle, HowToUse, NewFileInput } from './Pages';
import CodePane from '../CodePane/TheCodePane.vue';

@Component({
  components: {
    AddFileButton,
    File,
    FileMenu,
    ProjectTitle,
    HowToUse,
    NewFileInput,
  },
})
export default class TheFileExplorer extends Vue {
  private showNewFileInput = false;

  private snackbar = false;

  private downloadFile = (filename: string, code: string, type: string) => {
    const projectFiles = files(this.$store, currentProject(this.$store));
    const transformedCode = transform(type, code, projectFiles);
    download(filename, transformedCode);
  }

  private openNewFileInputField() {
    this.showNewFileInput = true;
    // FIXME: sloppy solution, just for functionality
    setTimeout(() => {
      (document.getElementById('new-file-input') as HTMLElement).focus();
    });
  }

  private deleteFile(event: MouseEvent, filename: string) {
    event.stopPropagation();
    this.$store.dispatch('fileExplorer/deleteFile', filename);
    (this.$root.$refs.Preview as ThePreview).showPreview();
  }

  private chooseFile(filename: string) {
    this.$store.dispatch('fileExplorer/updateSelectedFile', filename);
    const { editor } = this.$root.$refs.CodePane as CodePane;
    editor.focus();
    // FIXME: sloppy solution, just for functionality
    setTimeout(() => {
      editor.setCursor(editor.lineCount(), 0);
    });
  }

  private get myCurrentProject(): ProjectFileLink {
    return currentProject(this.$store);
  }

  private get myFiles(): Array<FileModel> {
    return files(this.$store, currentProject(this.$store));
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
