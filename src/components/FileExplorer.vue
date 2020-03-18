<template>
  <section id="file-explorer">
    <p>Project</p>
    <v-divider></v-divider>
    <p class="description">FILES</p>
    <div id="files">
      <p class="file selected">
        <a @click="chooseFile($event, 'text/html')">index.html</a>
      </p>
      <p class="file">
        <a @click="chooseFile($event, 'css')">index.css</a>
      </p>
      <p class="file">
        <a @click="chooseFile($event, 'javascript')">app.js</a>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    chooseFile(event: any, fileType: string) {
      event.preventDefault();

      for (let i = 0; i < document.getElementsByClassName('file').length; i += 1) {
        document.getElementsByClassName('file')[i].classList.remove('selected');
      }

      event.srcElement.parentElement.classList.add('selected');
      this.$emit('chooseFile', fileType);
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

      a {
        cursor: pointer;
        color: #9497B0;
      }

      &.selected {
        a {
          color: #fff;
        }

        background-color: #282A36;
      }
    }
  }

  .divider {
    margin: 0;
  }
}
</style>
