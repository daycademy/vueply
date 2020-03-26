<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import CodeMirror from 'codemirror';
import ThePreview from './ThePreview.vue';
import FileModel from '../store/models/FileModel';

@Component({})
export default class CodePane extends Vue {
  @Prop()
  private value!: string;

  @Prop({ default: 'text/html' })
  private mode!: string;

  @Prop()
  private currentProject!: string;

  @Prop()
  private currentFile!: FileModel;

  editor!: CodeMirror.Editor;

  @Watch('mode')
  onModeChanged(value: string) {
    this.editor.setOption('mode', value);
    this.editor.setOption('value', this.value);
    this.editor.refresh();
  }

  @Watch('currentFile')
  onCurrentFileChange(newFile: FileModel, oldFile: FileModel) {
    if (newFile.name !== oldFile.name) {
      this.editor.setOption('value', newFile.code);
      this.editor.refresh();
    }
  }

  @Watch('currentProject')
  onCurrentProjectChanged() {
    this.editor.setOption('value', this.currentFile.code);
    this.editor.refresh();

    (this.$root.$refs.Preview as ThePreview).showPreview();
  }

  mounted() {
    const editor = CodeMirror(this.$el as HTMLElement, {
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
    this.$root.$refs.CodePane = this;
  }
}
</script>
