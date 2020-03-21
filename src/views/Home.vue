<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="2" class="u-no-padding">
        <FileExplorer @chooseFile="chooseFile" @chooseProject="chooseProject" />
      </v-col>
      <v-col c="6" class="left u-no-padding">
        <CodePane :mode="currentFile.type" @input="updateCode" :value="currentFile.code"></CodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <!--
        <Preview :templateCode="code.template" :jsCode="code.js" :cssCode="code.css" />
        -->
        <Preview :currentProject="currentProject" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CodePane from '@/components/CodePane.vue';
import Preview from '@/components/Preview.vue';
import FileExplorer from '@/components/FileExplorer.vue';

export default {
  name: 'Home',

  components: {
    CodePane,
    Preview,
    FileExplorer,
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        this.$root.$refs.Preview.showPreview();
      }
    }, false);
  },

  methods: {
    chooseProject(project) {
      this.$store.dispatch('setProject', project);
      const projectFiles = this.$store.getters.projectFiles(project);
      this.$store.dispatch('updateSelectedFile', projectFiles[0].name);
    },
    chooseFile(filename) {
      this.$store.dispatch('updateSelectedFile', filename);
    },
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
      const projectFiles = this.$store.getters.projectFiles(this.currentProject);
      for (let i = 0; i < projectFiles.length; i += 1) {
        if (projectFiles[i].name === this.$store.state.files.selectedFile) {
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
