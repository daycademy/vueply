<template>
  <v-dropdown>
    <template v-slot:button>
      <v-btn size="small" color="transparent" dropdown>
        <i class="icon fas fa-cog"></i>
      </v-btn>
    </template>
    <v-dropdown-item
      v-for="project in projects"
      :key="project.projectName"
      @click="chooseProject(project.projectName)"
    >
      {{ project.displayName }}
    </v-dropdown-item>
  </v-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProjectFileLink from '@/store/models/ProjectFileLink';

@Component({})
export default class SettingsDropdown extends Vue {
  @Prop({})
  private projects!: Array<ProjectFileLink>;

  private chooseProject(project: string): void {
    this.$emit('choose-project', project);
  }
}
</script>

<style lang="scss">
.list-dropdown {
  margin-left: auto;
  margin-right: 7px;

  .menu {
    background-color: #282c34;

    li a {
      color: #fff;
    }
  }

  button {
    color: #6A6F8D;
    font-size: 14px;
  }
}
</style>
