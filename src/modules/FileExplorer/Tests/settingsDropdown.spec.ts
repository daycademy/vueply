import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import sinon from 'sinon';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import SettingsDropdown from '@/modules/FileExplorer/Components/SettingsDropdown.vue';
import ProjectFileLink from '@/store/models/ProjectFileLink';

describe('FileExplorer => SettingsDropdown.vue', () => {
  let localVue;
  let wrapper: Wrapper<SettingsDropdown>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(SettingsDropdown, {
      localVue,
      propsData: {
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
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<v-dropdown-stub'));
  });

  it('renders valid length of projects', () => {
    expect(wrapper.findAll('v-dropdown-item-stub').length).equal(2);
  });

  it('emits an event with one argument', () => {
    /* eslint-disable-next-line */
    (wrapper.vm as any).chooseProject('javascript');
    expect(wrapper.emitted()['choose-project'][0]).eql(['javascript']);
  });

  it('chooseProject gets called on dropdown item click', async () => {
    /* eslint-disable-next-line */
    sinon.spy((wrapper.vm as any), 'chooseProject');
    wrapper.find('v-dropdown-item-stub').vm.$emit('click');
    /* eslint-disable-next-line */
    expect((wrapper.vm as any).chooseProject.callCount).to.equal(1);
  });
});
