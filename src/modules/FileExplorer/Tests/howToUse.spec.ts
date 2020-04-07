import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import HowToUse from '@/modules/FileExplorer/Pages/HowToUse.vue';
import i18n from '@/i18n';

describe('FileExplorer => HowToUse.vue', () => {
  let localVue;
  let wrapper: Wrapper<HowToUse>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(HowToUse, {
      localVue,
      i18n,
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<div id="how-to-use">'));
  });
});
