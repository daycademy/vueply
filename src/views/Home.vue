<template>
  <section id="home">
    <v-row class="u-no-padding">
      <v-col c="4" class="left u-no-padding">
        <CodePane id="html-code" v-model="templateCode"></CodePane>
      </v-col>
      <v-col c="4" class="middle u-no-padding">
        <CodePane id="js-code" mode="javascript" v-model="jsCode"></CodePane>
      </v-col>
      <v-col c="4" class="right u-no-padding">
        <Preview :templateCode="templateCode" :jsCode="jsCode" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CodePane from '@/components/CodePane.vue';
import Preview from '@/components/Preview.vue';

export default {
  name: 'Home',

  components: {
    CodePane,
    Preview,
  },

  data() {
    return {
      templateCode: `<div>
  <h1>{{ count }}</h1>
  <button @click="increment">Click</button>
</div>
`,
      jsCode: `export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};`,
    };
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;

  #preview {
    width: 100%;
    height: 100%;
  }

  .left, .middle {
    border-right: 1px solid #333;
  }
}
</style>
