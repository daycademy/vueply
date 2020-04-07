import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import NewFileInput from '@/modules/FileExplorer/Pages/NewFileInput.vue';
import i18n from '@/i18n';
import ProjectFileLink from '@/store/models/ProjectFileLink';

describe('FileExplorer => NewFileInput.vue', () => {
  let localVue;
  let wrapper: Wrapper<NewFileInput>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(NewFileInput, {
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
});
