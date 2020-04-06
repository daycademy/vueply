import VueCirrus from 'vue-cirrus';
import { expect } from 'chai';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Files from '@/modules/FileExplorer/Components/Files.vue';
import i18n from '@/i18n';
import FileModel from '@/store/models/FileModel';

describe('FileExplorer => Files.vue', () => {
  let localVue;
  let wrapper: Wrapper<Files>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    wrapper = shallowMount(Files, {
      localVue,
      i18n,
      propsData: {
        selectedFile: 'index.html',
        files: [
          {
            name: 'index.html',
            code: '<div>test</div>',
            project: 'javascript',
            type: 'text/html',
          },
        ] as Array<FileModel>,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string').and.satisfy((text: string) => text.startsWith('<div class="file-list">'));
  });

  it('renders length of files', () => true);

  it('emit click download file event', () => true);

  it('emit choose file event', () => true);

  it('emit delete file event', () => true);
});
