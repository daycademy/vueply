describe('Home.vue', () => {
  /*
  let localVue;
  let wrapper: Wrapper<Home>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueCirrus);
    localVue.use(VueRouter);
    localVue.use(Vuex);
    wrapper = shallowMount(Home, { localVue, router, store });
  });

  it('renders correctly', () => {
    expect(wrapper.html()).to.be.a('string')
    .and.satisfy((text: string) => text.startsWith('<section id="home">'));
  });

  it('should return valid default current file', () => {
    /* eslint-disable-next-line
    const currentFile = (wrapper.vm as any).currentFile.name;
    expect(currentFile).eq('index.html');
  });
  */

  /*
  it('should return valid default current project', () => {
    const { currentProject } = wrapper.vm as any;
    expect(currentProject).eq('vue-web');
  });
  */
});
