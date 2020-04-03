import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import DownloadFileButton from '@/modules/FileExplorer/Components/AddFileButton.vue';

describe('FileExplorer => AddFileButton.vue', () => {
  let localVue;
  let wrapper: Wrapper<DownloadFileButton>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(DownloadFileButton, { localVue });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<v-btn-stub'));
  });

  it('emit click event', () => {
    const button = wrapper.find('v-btn-stub');
    button.trigger('click');
    expect(wrapper.emitted().click);
  });
});
