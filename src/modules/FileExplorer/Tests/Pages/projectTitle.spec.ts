import VueCirrus from 'vue-cirrus';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import ProjectTitle from '../../Pages/ProjectTitle.vue';
// import { SettingsDropdown } from '../../Components';

describe('FileExplorer => ProjectTitle', () => {
  let localVue;
  let wrapper: Wrapper<ProjectTitle>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(Vuex);
    localVue.use(VueRouter);
    wrapper = mount(ProjectTitle, {
      localVue,
      i18n,
      store,
      router,
      propsData: {
        currentProject: {
          displayName: 'Test',
          fileTypes: ['text/html'],
          projectName: 'test',
        } as ProjectFileLink,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<p data-v-'));
  });

  /*
  it('set currentProject in store to emitted project', () => {
    wrapper.find(SettingsDropdown).vm.$emit('choose-project', 'test');
    expect(store.state.project.currentProject).equal('test');
  });
  */
});
