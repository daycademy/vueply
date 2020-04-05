import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import FileMenu from '@/modules/FileExplorer/Components/FileMenu.vue';
import i18n from '@/i18n';

describe('FileExplorer => FileMenu.vue', () => {
  let localVue;
  let wrapper: Wrapper<FileMenu>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(FileMenu, { localVue, i18n });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<div class="file-menu">'));
  });
});
