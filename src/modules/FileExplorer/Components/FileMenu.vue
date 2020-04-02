<template>
  <div class="file-menu">
    <v-dropdown>
      <template v-slot:button>
        <v-btn
          @click="stopPropagation($event)"
          dropdown
          color="transparent"
          size="small"
        >
          <i class="fas fa-ellipsis-h"></i>
        </v-btn>
      </template>
      <v-dropdown-item>
        <i class="icon fas fa-pen"></i>
        <span>Rename</span>
      </v-dropdown-item>
      <v-dropdown-item @click="$emit('click-download')">
        <i class="icon fas fa-file-download"></i>
        <span>Download File</span>
      </v-dropdown-item>
      <v-dropdown-item @click="$emit('click-delete', $event)">
        <i class="icon fas fa-trash"></i>
        <span>Delete File</span>
      </v-dropdown-item>
    </v-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class FileMenu extends Vue {
  private stopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  }
}
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
