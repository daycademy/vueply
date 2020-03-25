<template>
  <div class="file-list">
    <p
      v-for="file in files"
      :key="file.name"
      @click="chooseFile($event, file.name)"
      :class="`file${selectedFile === file.name ? ' selected' : ''}`"
    >
      <i :class="`icon fab ${icons[file.type].icon}`"></i> {{ file.name }}
      <i class="delete-icon fas fa-trash" @click="deleteFile($event, file.name)"></i>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileModel from '../../../store/models/FileModel';

@Component({
  data() {
    return {
      icons: {
        'text/html': {
          icon: 'fa-html5',
        },
        css: {
          icon: 'fa-css3-alt',
        },
        javascript: {
          icon: 'fa-js-square',
        },
        'text/x-vue': {
          icon: 'fa-vuejs',
        },
      },
    };
  },
})
export default class Files extends Vue {
  @Prop()
  private files!: Array<FileModel>;

  @Prop()
  private selectedFile!: string;

  private deleteFile(event: MouseEvent, filename: string) {
    event.stopPropagation();
    this.$emit('delete-file', filename);
  }

  private chooseFile(event: MouseEvent, filename: string) {
    event.preventDefault();
    const srcElement = event.srcElement as Element;
    if (srcElement) {
      this.$emit('choose-file', filename);
    }
  }
}
</script>

<style lang="scss">
.file-list {
  .fab {
    &.fa-html5 {
      color: #E67E22;
    }
    &.fa-css3-alt {
      color: #3498DB;
    }
    &.fa-js-square {
      color: #F1C40F;
    }
    &.fa-vuejs {
      color: #2ECC71;
    }
  }

  .file {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0.2em;
    padding-top: 0.2em;
    padding-left: 1em;
    cursor: pointer;
    color: #9497B0;

    .delete-icon {
      visibility: hidden;
      float: right;
      margin: 0.5em;
      margin-right: 1.25em;
      color: #9497B0;
    }

    &:hover {
      background-color: #3E4153;

      .delete-icon {
        visibility: visible;
      }
    }

    &.selected {
      color: #fff;
      background-color: #282A36;

      .delete-icon {
        visibility: visible;
      }
    }
  }
}
</style>
