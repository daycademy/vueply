<template>
  <v-btn size="small" color="transparent">
    <i class="icon fas fa-plus"></i>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class AddFileButton extends Vue {
}
</script>

<style lang="scss" scoped>
button {
  margin-bottom: 0;
  margin-left: auto;
  margin-right: 7px;
  color: #6A6F8D;
  font-size: 14px;
}
</style>
