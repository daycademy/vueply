<template>
  <section id="file-explorer">
    <p class="title">
      Project
      <i class="icon fas fa-cog"></i>
    </p>
    <v-divider></v-divider>
    <p class="description">FILES</p>
    <div id="files">
      <p
        v-for="file in files"
        :key="file.name"
        @click="chooseFile($event, file.name)"
        :class="`file${selectedFile === file.name ? ' selected' : ''}`"
      >
        <i :class="`icon fab ${icons[file.type].icon}`"></i> {{ file.name }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import FileModel from '../store/models/FileModel';

export default Vue.extend({
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

  computed: {
    files(): FileModel[] {
      const { files } = this.$store.state;
      return files;
    },
    selectedFile(): string {
      return this.$store.state.selectedFile;
    },
  },

  methods: {
    chooseFile(event: MouseEvent, filename: string) {
      event.preventDefault();

      const srcElement = event.srcElement as Element;
      if (srcElement) {
        this.$emit('chooseFile', filename);
      }
    },
  },
});
</script>

<style lang="scss">
#file-explorer {
  height: 100%;
  width: 100%;
  background-color: #333545;

  .title {
    display: flex;
    align-items: center;

    .icon {
      margin-left: auto;
      margin-right: 16px;
      color: #6A6F8D;
    }
  }

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

  p {
    color: white;
    margin-top: 0;
    padding-top: 1rem;
    padding-left: 1rem;

    &.description {
      color: #9497B0;
      font-size: 14px;
    }
  }

  #files {
    .file {
      padding-bottom: 0.2em;
      padding-top: 0.2em;
      margin-bottom: 0;
      cursor: pointer;
      color: #9497B0;

      &:hover {
        background-color: #3E4153;
      }

      &.selected {
        color: #fff;
        background-color: #282A36;
      }
    }
  }

  .divider {
    margin: 0;
  }
}
</style>
