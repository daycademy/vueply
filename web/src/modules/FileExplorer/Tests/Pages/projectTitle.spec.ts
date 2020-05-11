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
          displayName: 'Vue',
          fileTypes: ['text/x-vue'],
          projectName: 'vue',
        } as ProjectFileLink,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<p data-v-'));
  });

  it('renders current selected project', () => {
    expect(wrapper.find('li').attributes()).to.be.eql({ style: 'background-color: rgb(46, 204, 113); color: rgb(255, 255, 255);' });
  });

  it('set current view when view is selected', () => {
    const selectedView = 'vertical';
    /* eslint-disable-next-line */
    (wrapper.vm as any).chooseView(selectedView);
    expect(store.state.project.currentView).eql(selectedView);
  });

  it('set project when project is selected', () => {
    const selectedProject = 'vue';
    /* eslint-disable-next-line */
    (wrapper.vm as any).chooseProject(selectedProject);
    expect(store.state.project.currentProject).eql(selectedProject);
  });
});
