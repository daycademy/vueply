import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import SettingsDropdown from '@/modules/FileExplorer/Components/SettingsDropdown.vue';
import ProjectFileLink from '@/store/models/ProjectFileLink';

describe('FileExplorer => SettingsDropdown.vue', () => {
  let localVue;
  let wrapper: Wrapper<SettingsDropdown>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(SettingsDropdown, { localVue });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<v-dropdown-stub'));
  });

  it('renders valid length of projects', () => {
    wrapper.setProps({
      projects: [
        {
          displayName: 'JavaScript',
          fileTypes: ['text/html', 'css', 'javascript'],
          projectName: 'javascript',
        },
        {
          displayName: 'Vue',
          fileTypes: ['text/x-vue'],
          projectName: 'vue',
        },
      ] as Array<ProjectFileLink>,
    });
    // TODO: add test
  });
});
