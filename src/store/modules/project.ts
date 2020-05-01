import { ActionContext } from 'vuex';
import { ProjectState } from './@types';
import { RootState } from '../@types';

const state: ProjectState = {
  currentProject: 'vue-web',
  icons: [
    {
      icon: 'fa-html5',
      fileType: 'text/html',
    },
    {
      icon: 'fa-css3-alt',
      fileType: 'css',
    },
    {
      icon: 'fa-js-square',
      fileType: 'javascript',
    },
    {
      icon: 'fa-vuejs',
      fileType: 'text/x-vue',
    },
    {
      icon: 'fa-js-square ts',
      fileType: 'text/typescript',
    },
    {
      icon: 'fa-markdown',
      fileType: 'text/x-markdown',
    },
  ],
  projectFilesLink: [
    {
      displayName: 'Vue',
      projectName: 'vue',
      icon: 'text/x-vue',
      projectColor: '#2ECC71',
      fileTypes: ['text/x-vue'],
    },
    {
      displayName: 'Web Vue',
      projectName: 'vue-web',
      icon: 'text/x-vue',
      projectColor: '#2ECC71',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
    {
      displayName: 'JavaScript Single',
      projectName: 'javascript-single',
      icon: 'javascript',
      projectColor: '#F1C40F',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
    {
      displayName: 'JavaScript Multi',
      projectName: 'javascript-multi',
      icon: 'javascript',
      projectColor: '#F1C40F',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
    {
      displayName: 'TypeScript',
      projectName: 'typescript',
      icon: 'text/typescript',
      projectColor: '#2980B9',
      fileTypes: ['text/html', 'css', 'text/typescript'],
    },
    {
      displayName: 'Markdown',
      projectName: 'markdown',
      icon: 'text/x-markdown',
      projectColor: '#95A5A6',
      fileTypes: ['text/x-markdown'],
    },
  ],
};

const getters = {
  findIcon(projectState: ProjectState): Function {
    return (fileType: string) => projectState
      .icons.find((icon) => icon.fileType === fileType);
  },
};

const actions = {
  setProject(context: ActionContext<ProjectState, RootState>, project: string) {
    context.commit('setProject', project);
  },
};

const mutations = {
  setProject(projectState: ProjectState, project: string) {
    projectState.currentProject = project;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
