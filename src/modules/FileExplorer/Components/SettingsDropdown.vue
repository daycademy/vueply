<template>
  <div class="settings-dropdown">
    <v-btn size="small" color="transparent">
      <a href="#settings-modal">
        <i class="icon fas fa-cog"></i>
      </a>
    </v-btn>
    <v-modal
      m-id="settings-modal"
      :title="$t('settings_modal_title')"
      :close-target="`#${$route.path}`"
      zoomOut
    >
      <h5>Project</h5>
      <ul class="projects">
        <li
          v-for="project in projects"
          :key="project.displayName"
        >
          <i :class="`fab ${$store.getters.findIcon(project.icon).icon}`"></i>
          {{ project.displayName }}
        </li>
      </ul>
    </v-modal>
  </div>
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
.settings-dropdown {
  margin-left: auto;
  margin-right: 7px;

  .modal-content {
    width: 50%;
  }

  .projects {
    list-style: none;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 0 0 33.333333%;
    }
  }

  button {
    font-size: 14px;
    margin-bottom: 0;

    a {
      color: #6A6F8D;
    }
  }
}
</style>
