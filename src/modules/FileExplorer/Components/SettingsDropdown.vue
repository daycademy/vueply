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
          :style="currentProject.displayName === project.displayName
            ? { backgroundColor: project.color, color: '#fff' }
            : null"
        >
          <i
            :class="`fab ${$store.getters.findIcon(project.icon).icon}`"
            :style="currentProject.displayName === project.displayName
              ? { color: 'rgba(255, 255, 255, 0.3)' }
              : null"
          ></i>
          <span>{{ project.displayName | shortName }}</span>
        </li>
      </ul>

      <h5>View</h5>
      <ul>
        <li
          v-for="(view, index) in views"
          :key="index"
          :class="currentSelectedView === index ? 'selected' : null"
          @click="chooseView(index)"
        >
          <i :class="`fas fa-grip-${view}`"></i>
          <span>{{ view | capitalize }}</span>
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
    capitalize(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
})
export default class SettingsDropdown extends Vue {
  @Prop({})
  private projects!: Array<ProjectFileLink>;

  @Prop({ required: true })
  private currentProject!: ProjectFileLink;

  private views = ['horizontal', 'vertical'];

  private currentSelectedView = 0;

  private chooseProject(project: string): void {
    this.$emit('choose-project', project);
  }

  private chooseView(value: number): void {
    this.currentSelectedView = value;
    this.$emit('choose-view', this.views[value]);
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

  ul {
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

      i {
        position: absolute;
        top: 5%;
        left: 5%;
        font-size: 64px;
        color: rgba(0, 0, 0, 0.05);
      }

      &.selected {
        background-color: #718093;
        color: #fff;

        i {
          color: rgba(255, 255, 255, 0.1);
        }
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
