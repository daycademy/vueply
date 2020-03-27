<template>
  <div id="how-to-use" v-if="isOSXDevice">
    <p v-for="hotkey in cmdCombinationHotkeys" :key="hotkey.combination">
      <span v-if="isOSXDevice()">Cmd</span>
      <span v-else>Strg</span>
      + <span>{{ hotkey.combination }}</span> {{ hotkey.description }}
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
      description: 'in a File to run',
    },
    {
      combination: '.',
      description: 'to create a new File',
    },
  ];

  private isOSXDevice = (): boolean => navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
</script>

<style lang="scss">
#how-to-use {
  position: absolute;
  left: 0.5em;
  bottom: 0.5em;

  p {
    color: #9598AF;
    margin: 0;
    padding: 0;

    &:first-child {
      margin-bottom: 1em;
    }

    span {
      background-color: #282A36;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}
</style>
