<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <TheFileExplorer
          :didPressNewFile="didPressNewFile"
        />
      </v-col>
      <v-col c="6" class="left u-no-padding">
        <CodePane
          :currentProject="currentProject"
          :currentFile="currentFile"
          :mode="currentFile.type"
          @input="updateCode"
          :value="currentFile.code"
        ></CodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <ThePreview />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CodePane from '@/components/CodePane.vue';
import ThePreview from '@/components/ThePreview.vue';
import TheFileExplorer from '@/modules/FileExplorer/TheFileExplorer.vue';

export default {
  name: 'Home',

  components: {
    CodePane,
    ThePreview,
    TheFileExplorer,
  },

  data() {
    return {
      didPressNewFile: false,
    };
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        this.$root.$refs.Preview.showPreview();
      } else if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 190) {
        e.preventDefault();
        this.didPressNewFile = !this.didPressNewFile;
      }
    }, false);
  },

  methods: {
    updateCode(changedCode) {
      const selectedFile = this.currentFile;
      selectedFile.code = changedCode;
    },
  },

  computed: {
    currentProject() {
      return this.$store.state.project.currentProject;
    },
    currentFile() {
      const projectFiles = this.$store.getters['fileExplorer/projectFiles'](this.currentProject);
      for (let i = 0; i < projectFiles.length; i += 1) {
        if (projectFiles[i].name === this.$store.state.fileExplorer.state.selectedFile) {
          return projectFiles[i];
        }
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;

  .left, .middle {
    border-right: 1px solid #333;
  }
}
</style>
