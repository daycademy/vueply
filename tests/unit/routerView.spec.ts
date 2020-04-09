import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import RouterView from '@/views/RouterView.vue';
import router from '@/router';
import store from '@/store';

describe('RouterView.vue', () => {
  let localVue;
  let wrapper: Wrapper<RouterView>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(VueRouter);
    localVue.use(Vuex);
    wrapper = shallowMount(RouterView, { localVue, router, store });
  });

  it('renders default route view', () => {
    const $route = {
      name: 'home',
    };

    expect(wrapper.vm.$route.name).eq($route.name);
  });
});
