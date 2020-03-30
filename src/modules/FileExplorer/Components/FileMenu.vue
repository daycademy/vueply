<template>
  <div class="file-menu">
    <v-dropdown>
      <template v-slot:button>
        <v-btn dropdown color="transparent" size="small">
          <i class="fas fa-ellipsis-h"></i>
        </v-btn>
      </template>
      <v-dropdown-item>
        <i class="delete-icon fas fa-trash"></i>
      </v-dropdown-item>
    </v-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class FileMenu extends Vue {}
</script>

<style lang="scss">
.file-menu {
  align-self: flex-end;
  margin-left: auto;
  visibility: hidden;
  margin-right: 0.3rem;
  color: rgb(94, 96, 113);
}
</style>
