<template>
  <div id="how-to-use" v-if="isOSXDevice">
    <p v-for="hotkey in cmdCombinationHotkeys" :key="hotkey.combination">
      <span v-if="isOSXDevice()" class="hotkey">Cmd</span>
      <span v-else class="hotkey">Strg</span>
      + <span class="hotkey">{{ hotkey.combination }}</span>
      <span class="description"> {{ hotkey.description }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class HowToUse extends Vue {
  private cmdCombinationHotkeys = [
    {
      combination: 'S',
      description: 'run the project',
    },
    {
      combination: '.',
      description: 'create a new file',
    },
  ];

  private isOSXDevice = (): boolean => navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
</script>

<style lang="scss">
#how-to-use {
  position: absolute;
  left: 1em;
  bottom: 1em;
  width: 15%;

  p {
    color: #9598AF;
    margin: 0;
    padding: 0;

    &:first-child {
      margin-bottom: 1em;
    }

    span {
      &.description {
        font-weight: 300;
      }

      &.hotkey {
        background-color: #282A36;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
  }
}
</style>
