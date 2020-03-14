<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CodeMirror from 'codemirror';

@Component({})
export default class CodePane extends Vue {
  @Prop()
  private value!: string;

  @Prop({ default: 'text/html' })
  private mode!: string;

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
      editor.getWrapperElement().style.height = '100vh';
      editor.refresh();
    });

    /* eslint-disable-next-line */
    editor.on('change', (changeObject: any) => this.$emit('input', changeObject.getValue()));
  }
}
</script>
