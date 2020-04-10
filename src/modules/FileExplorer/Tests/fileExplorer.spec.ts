import VueCirrus from 'vue-cirrus';
import Vuex from 'vuex';
import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import i18n from '@/i18n';
import store from '@/store';
import TheFileExplorer from '../TheFileExplorer.vue';

describe('FileExplorer', () => {
  let localVue;
  let wrapper: Wrapper<TheFileExplorer>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(Vuex);
    wrapper = mount(TheFileExplorer, {
      localVue,
      i18n,
      store,
    });
  });

  it('computed prop "myCurrentProject" should return default project', () => {
    const defaultProject = {
      displayName: 'Web Vue',
      projectName: 'vue-web',
      fileTypes: ['text/html', 'css', 'javascript'],
    };

    /* eslint-disable-next-line */
    expect((wrapper.vm as any).myCurrentProject.displayName).equal(defaultProject.displayName);
  });

  it('computed prop "myFiles" has correct default project files length', () => {
    /* eslint-disable-next-line */
    expect((wrapper.vm as any).myFiles.length).equal(3);
  });
});
