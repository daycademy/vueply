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
        v-for="(value, key) in files"
        :key="key"
        @click="chooseFile($event, key, value.type)"
        :class="`file${currentSelected === key ? ' selected' : ''}`"
      >
        <i :class="`icon fab ${icons[value.type].icon}`"></i> {{ key }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      currentSelected: 'index.html',
      files: {
        'index.html': {
          type: 'text/html',
        },
        'index.css': {
          type: 'css',
        },
        'app.js': {
          type: 'javascript',
        },
        'App.vue': {
          type: 'text/x-vue',
        },
      },
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

  methods: {
    chooseFile(event: MouseEvent, filename: string, fileType: string) {
      event.preventDefault();

      this.currentSelected = filename;

      const srcElement = event.srcElement as Element;
      if (srcElement) {
        this.$emit('chooseFile', fileType);
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
