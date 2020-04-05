import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import AddFileButton from '@/modules/FileExplorer/Components/AddFileButton.vue';

describe('FileExplorer => AddFileButton.vue', () => {
  let localVue;
  let wrapper: Wrapper<AddFileButton>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(AddFileButton, { localVue });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<v-btn-stub'));
  });

  it('emit click event', () => {
    const button = wrapper.find('v-btn-stub');
    button.vm.$emit('click');
    return expect(wrapper.emitted().click).to.be.not.undefined;
  });
});
