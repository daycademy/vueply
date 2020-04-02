<template>
  <div class="file-list">
    <p
      v-for="file in files"
      :key="file.name"
      @click="chooseFile($event, file.name)"
      :class="`file${selectedFile === file.name ? ' selected' : ''}`"
    >
      <i :class="`icon fab ${icons[file.type].icon}`"></i> {{ file.name }}
      <FileMenu
        @click-download="$emit('click-download-file', file.name, file.code, file.type)"
        @click-delete="deleteFile($event, file.name)"
      />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FileMenu from './FileMenu.vue';
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
  components: {
    FileMenu,
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

  .icon {
    margin-right: 0.25rem;
  }

  .file {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0.2em;
    padding-top: 0.2em;
    padding-left: 1em;
    cursor: pointer;
    color: #9497B0;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #3E4153;

      .file-menu {
        visibility: visible;
      }
    }

    &.selected {
      color: #fff;
      background-color: #282A36;

      .file-menu {
        visibility: visible;
      }
    }
  }
}
</style>
