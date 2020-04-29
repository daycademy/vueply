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
      <v-row>
        <v-col c="4">
          <p>Project:</p>
        </v-col>
        <v-col c="6" o="2">
          <v-btn>Test</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col c="4">
          <p>Theme:</p>
        </v-col>
        <v-col c="6" o="2">
          <v-btn>Test</v-btn>
        </v-col>
      </v-row>
    </v-modal>
    <!--
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
    -->
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

  .row {
    align-items: center;
    justify-content: center;
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
