import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, Wrapper, mount } from '@vue/test-utils';
import FileMenu from '@/modules/FileExplorer/Components/FileMenu.vue';
import i18n from '@/i18n';

describe('FileExplorer => FileMenu.vue', () => {
  let localVue;
  let wrapper: Wrapper<FileMenu>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = mount(FileMenu, { localVue, i18n });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<div class="file-menu">'));
  });

  it('emit click download event', () => {
    const dropdownItem = wrapper.findAll('li').at(0);
    dropdownItem.vm.$emit('click');
    return expect(wrapper.emitted()['click-download']).to.be.not.undefined;
  });

  it('emit click delete event', () => {
    const dropdownItem = wrapper.findAll('li').at(1);
    dropdownItem.vm.$emit('click');
    return expect(wrapper.emitted()['click-delete']).to.be.not.undefined;
  });
});
