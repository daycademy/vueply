<template>
  <section id="file-explorer">
    <p class="title">
      {{ currentProject.displayName }} Project
      <v-dropdown>
        <template v-slot:button>
          <v-btn size="small" color="transparent" dropdown>
            <i class="icon fas fa-cog"></i>
          </v-btn>
        </template>
        <v-dropdown-item
          v-for="project in $store.state.project.projectFilesLink"
          :key="project.projectName"
          @click="chooseProject(project.projectName)"
        >
          {{ project.displayName }}
        </v-dropdown-item>
      </v-dropdown>
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

    <div class="how-to-use">
      <p v-if="isOSXDevice">
        <span>Cmd</span> + <span>S</span> in a File to Run
      </p>
      <p v-else>
        <span>Strg</span> + <span>S</span> in a File to Run
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import FileModel from '../store/models/FileModel';
import { ProjectFileLink } from '../store/modules/types';

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
    isOSXDevice() {
      return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    },
    files(): Array<FileModel> {
      return this.$store.getters.projectFiles(this.currentProject.projectName);
    },
    currentProject(): ProjectFileLink {
      return this.$store.state.project.projectFilesLink
        .filter(
          (projectFileLink: ProjectFileLink) => projectFileLink.projectName
            === this.$store.state.project.currentProject,
        )[0];
    },
    selectedFile(): string {
      return this.$store.state.files.selectedFile;
    },
  },

  methods: {
    chooseProject(project: string) {
      this.$emit('chooseProject', project);
    },
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

  .how-to-use {
    position: absolute;
    left: 0.5em;
    bottom: 0.5em;

    p {
      color: #9598AF;
      margin: 0;
      padding: 0;

      span {
        background-color: #282A36;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    color: #9598AF;

    .list-dropdown {
      margin-left: auto;
      margin-right: 7px;

      .menu {
        background-color: #333545;

        li a {
          color: #fff;
        }
      }

      button {
        color: #6A6F8D;
        font-size: 14px;
      }
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
