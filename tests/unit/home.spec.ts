import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import router from '@/router';
import store from '@/store';

describe('Home.vue', () => {
  let localVue;
  let wrapper: Wrapper<Home>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(VueRouter);
    localVue.use(Vuex);
    wrapper = shallowMount(Home, { localVue, router, store });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<section id="home">'));
  });
});
