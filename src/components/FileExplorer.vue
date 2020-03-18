<template>
  <section id="file-explorer">
    <p>Project</p>
    <v-divider></v-divider>
    <p class="description">FILES</p>
    <div id="files">
      <p @click="chooseFile($event, 'text/html')" class="file selected">
        index.html
      </p>
      <p @click="chooseFile($event, 'css')" class="file">
        index.css
      </p>
      <p @click="chooseFile($event, 'javascript')" class="file">
        app.js
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
      padding-bottom: 1rem;
      cursor: pointer;
      color: #9497B0;

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
