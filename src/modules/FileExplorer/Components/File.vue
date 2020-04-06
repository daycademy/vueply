<template>
  <p @click="$emit('click', $event)">
    <i :class="`icon fab ${icons[fileType].icon}`"></i> {{ filename }}
    <slot></slot>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  data() {
    return {
      icons: {
        'text/html': {
          icon: 'fa-html5',
        },
        css: {
          icon: 'fa-css3-alt',
        },
        javascript: {
          icon: 'fa-js-square',
        },
        'text/x-vue': {
          icon: 'fa-vuejs',
        },
      },
    };
  },
})
export default class File extends Vue {
  @Prop({ type: String, required: true })
  private filename!: string;

  @Prop({ type: String, required: true })
  private fileType!: string;
}
</script>

<style lang="scss" scoped>
.fab {
  &.fa-html5 {
    color: #E67E22;
  }
  &.fa-css3-alt {
    color: #3498DB;
  }
  &.fa-js-square {
    color: #F1C40F;
  }
  &.fa-vuejs {
    color: #2ECC71;
  }
}

.icon {
  margin-right: 0.25rem;
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
    background-color: #3E4153;

    .file-menu {
      visibility: visible;
    }
  }

  &.selected {
    color: #fff;
    background-color: #282A36;

    .file-menu {
      visibility: visible;
    }
  }
}
</style>
