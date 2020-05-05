import VueCirrus from 'vue-cirrus';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { expect } from 'chai';
import sinon from 'sinon';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import SettingsDropdown from '@/modules/FileExplorer/Components/SettingsDropdown.vue';
import ProjectFileLink from '@/store/models/ProjectFileLink';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';

describe('FileExplorer => SettingsDropdown.vue', () => {
  let localVue;
  let wrapper: Wrapper<SettingsDropdown>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(VueRouter);
    localVue.use(Vuex);
    wrapper = mount(SettingsDropdown, {
      localVue,
      i18n,
      router,
      store,
      propsData: {
        currentProject: {
          displayName: 'JavaScript',
          icon: 'javascript',
          fileTypes: ['text/html', 'css', 'javascript'],
          projectName: 'javascript',
          color: 'yellow',
        },
        projects: [
          {
            displayName: 'JavaScript',
            icon: 'javascript',
            fileTypes: ['text/html', 'css', 'javascript'],
            projectName: 'javascript',
            color: 'yellow',
          },
          {
            displayName: 'Vue',
            icon: 'text/x-vue',
            fileTypes: ['text/x-vue'],
            projectName: 'vue',
            color: 'green',
          },
        ] as Array<ProjectFileLink>,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<div class="settings-dropdown">'));
  });

  it('renders valid length of projects', () => {
    expect(wrapper.find('ul.projects').findAll('li').length).equal(2);
  });

  it('emits an event with one argument', () => {
    /* eslint-disable-next-line */
    (wrapper.vm as any).chooseProject('javascript');
    expect(wrapper.emitted()['choose-project'][0]).eql(['javascript']);
  });

  it('chooseProject gets called on project item click', async () => {
    /* eslint-disable-next-line */
    sinon.spy((wrapper.vm as any), 'chooseProject');
    wrapper.find('ul.projects').find('li').trigger('click');
    /* eslint-disable-next-line */
    expect((wrapper.vm as any).chooseProject.callCount).to.equal(1);
  });
});
