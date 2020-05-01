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
          @click="chooseProject(project.projectName)"
          :class="currentProject.displayName === project.displayName ? 'selected' : ''"
        >
          <i :class="`fab ${$store.getters.findIcon(project.icon).icon}`"></i>
          <span>{{ project.displayName | shortName }}</span>
        </li>
      </ul>
    </v-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ProjectFileLink from '@/store/models/ProjectFileLink';

@Component({
  filters: {
    shortName(value: string): string {
      return value.replace('JavaScript', 'JS');
    },
  },
})
export default class SettingsDropdown extends Vue {
  @Prop({})
  private projects!: Array<ProjectFileLink>;

  @Prop({ type: String, required: true })
  private currentProject!: string;

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
      cursor: pointer;
      position: relative;
      flex: 0 0 calc(33.333333% - 0.5em);
      margin-right: 0.5em;
      background-color: #ecf0f1;
      border-radius: 0.5em;
      display: flex;
      padding: 1em;
      font-size: 18px;
      align-items: center;
      justify-content: center;
      text-align: center;

      &.selected {
        background-color: #34495e;
        color: #fff;

        i {
          color: rgba(255, 255, 255, 0.25);
        }
      }

      i {
        position: absolute;
        top: 5%;
        left: 5%;
        font-size: 64px;
        color: rgba(0, 0, 0, 0.05);
      }
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
