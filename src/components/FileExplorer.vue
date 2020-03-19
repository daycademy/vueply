<template>
  <section id="file-explorer">
    <p class="title">
      Project
      <i class="icon fas fa-cog"></i>
    </p>
    <v-divider></v-divider>
    <p class="description">FILES</p>
    <div id="files">
      <p @click="chooseFile($event, 'text/html')" class="file selected">
        <i class="icon fab fa-html5"></i> index.html
      </p>
      <p @click="chooseFile($event, 'css')" class="file">
        <i class="icon fab fa-css3-alt"></i> index.css
      </p>
      <p @click="chooseFile($event, 'javascript')" class="file">
        <i class="icon fab fa-js-square"></i> app.js
      </p>
      <p @click="chooseFile($event, 'text/x-vue')" class="file">
        <i class="icon fab fa-vuejs"></i> App.vue
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    chooseFile(event: MouseEvent, fileType: string) {
      event.preventDefault();

      for (let i = 0; i < document.getElementsByClassName('file').length; i += 1) {
        document.getElementsByClassName('file')[i].classList.remove('selected');
      }

      const srcElement = event.srcElement as Element;
      if (srcElement) {
        srcElement.classList.add('selected');
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
