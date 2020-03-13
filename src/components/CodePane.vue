<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import CodeMirror from 'codemirror';

export default Vue.extend({
  name: 'CodePane',

  props: {
    value: String,
    mode: {
      type: String,
      default: 'text/html',
    },
  },

  mounted() {
    const editor = CodeMirror(this.$el, {
      value: this.value,
      mode: this.mode,
      lineNumbers: true,
      theme: 'dracula',
      tabSize: 2,
    });

    window.addEventListener('load', () => {
      editor.getWrapperElement().style.fontSize = '16px';
      editor.refresh();
    });

    /* eslint-disable-next-line */
    editor.on('change', (changeObject: any) => this.$emit('input', changeObject.getValue()));
  },
});
</script>
