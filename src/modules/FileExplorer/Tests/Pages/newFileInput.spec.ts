import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import NewFileInput from '@/modules/FileExplorer/Pages/NewFileInput.vue';
import i18n from '@/i18n';
import ProjectFileLink from '@/store/models/ProjectFileLink';

describe('FileExplorer => NewFileInput.vue', () => {
  let localVue;
  let wrapper: Wrapper<NewFileInput>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = mount(NewFileInput, {
      localVue,
      i18n,
      propsData: {
        currentProject: {
          displayName: 'JavaScript',
          projectName: 'javascript',
          fileTypes: ['text/html'],
        } as ProjectFileLink,
        showNewFileInput: true,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<input data-'));
  });

  it('escape key emits "disabled-new-file-input"', () => {
    wrapper.trigger('keyup.esc');
    return expect(wrapper.emitted()['disable-new-file-input']).to.be.not.undefined;
  });

  it('enter key emits "disabled-new-file-input"', () => {
    wrapper.trigger('keyup.enter');
    return expect(wrapper.emitted()['disable-new-file-input']).to.be.not.undefined;
  });
});
