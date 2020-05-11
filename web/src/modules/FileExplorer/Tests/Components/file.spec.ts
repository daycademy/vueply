import VueCirrus from 'vue-cirrus';
import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import File from '@/modules/FileExplorer/Components/File.vue';
import i18n from '@/i18n';
import store from '@/store';

describe('FileExplorer => File.vue', () => {
  let localVue;
  let wrapper: Wrapper<File>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(Vuex);
    wrapper = mount(File, {
      localVue,
      i18n,
      store,
      propsData: {
        filename: 'index.html',
        fileType: 'text/html',
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<p data-'));
  });

  it('emit click event', () => {
    const button = wrapper.find('p');
    button.vm.$emit('click');
    return expect(wrapper.emitted().click).to.be.not.undefined;
  });
});
