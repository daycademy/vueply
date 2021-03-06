import Vue from 'vue';
import VueCirrus from 'vue-cirrus';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, Wrapper } from '@vue/test-utils';
import { expect } from 'chai';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import TheFileExplorer from '../TheFileExplorer.vue';

Vue.use(VueCirrus);
Vue.use(Vuex);
Vue.use(VueRouter);

describe('FileExplorer', () => {
  let wrapper: Wrapper<TheFileExplorer>;
  beforeEach(() => {
    wrapper = mount(TheFileExplorer, {
      i18n,
      store,
      router,
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
