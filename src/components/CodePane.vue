<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import CodeMirror from 'codemirror';

@Component({})
export default class CodePane extends Vue {
  @Prop()
  private value!: string;

  @Prop({ default: 'text/html' })
  private mode!: string;

  private editor!: any;

  @Watch('mode')
  onModeChanged(value: string) {
    this.editor.setOption('mode', value);
    this.editor.setOption('value', this.value);
    this.editor.refresh();
  }

  @Watch('value')
  onValueChanged(value: string) {
    this.editor.setOption('value', value);
    this.editor.refresh();
  }

  mounted() {
    const editor = CodeMirror(this.$el, {
      value: this.value,
      mode: this.mode,
      lineNumbers: true,
      theme: 'dracula',
      tabSize: 2,
      scrollbarStyle: 'overlay',
    });

    window.addEventListener('load', () => {
      editor.getWrapperElement().style.fontSize = '16px';
      editor.getWrapperElement().style.height = '100vh';
      editor.refresh();
    });

    /* eslint-disable-next-line */
    editor.on('change', (changeObject: any) => this.$emit('input', changeObject.getValue()));

    this.editor = editor;
  }
}
</script>
