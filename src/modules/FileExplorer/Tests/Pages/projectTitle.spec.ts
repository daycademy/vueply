import VueCirrus from 'vue-cirrus';
import Vuex from 'vuex';
import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import i18n from '@/i18n';
import store from '@/store';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import ProjectTitle from '../../Pages/ProjectTitle.vue';
import SettingsDropdown from '../../Components/SettingsDropdown.vue';

describe('FileExplorer => ProjectTitle', () => {
  let localVue;
  let wrapper: Wrapper<ProjectTitle>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(Vuex);
    wrapper = mount(ProjectTitle, {
      localVue,
      i18n,
      store,
      propsData: {
        currentProject: {
          displayName: 'Test',
          fileTypes: ['text/html'],
          projectName: 'test',
        } as ProjectFileLink,
      },
    });
  });

  it('set currentProject in store to emitted project', () => {
    wrapper.find(SettingsDropdown).vm.$emit('choose-project', 'javascript');
    expect(store.state.project.currentProject).equal('javascript');
  });
});
