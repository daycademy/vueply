<template>
  <p @click="$emit('click', $event)">
    <i :class="`icon fab ${$store.getters.findIcon(fileType).icon}`"></i> {{ filename }}
    <slot></slot>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class File extends Vue {
  @Prop({ type: String, required: true })
  private filename!: string;

  @Prop({ type: String, required: true })
  private fileType!: string;
}
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 0.25rem;
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

    &.ts {
      color: #2980B9;
    }
  }
  &.fa-vuejs {
    color: #2ECC71;
  }
  &.fa-markdown {
    margin-right: 0.5em;
    color: #95A5A6;
  }
}

.file {
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 0.2em;
  padding-top: 0.2em;
  padding-left: 1em;
  cursor: pointer;
  color: #9497B0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #282c34;

    .file-menu {
      visibility: visible;
    }
  }

  &.selected {
    color: #fff;
    background-color: #282c34;

    .file-menu {
      visibility: visible;
    }
  }
}
</style>
