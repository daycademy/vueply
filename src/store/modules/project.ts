import { ActionContext } from 'vuex';
import { ProjectState } from './@types';
import { RootState } from '../@types';

const state: ProjectState = {
  currentProject: 'vue-web',
  projectFilesLink: [
    {
      displayName: 'Vue',
      projectName: 'vue',
      fileTypes: ['text/x-vue'],
    },
    {
      displayName: 'Web Vue',
      projectName: 'vue-web',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
    {
      displayName: 'JavaScript Single',
      projectName: 'javascript-single',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
    {
      displayName: 'JavaScript Multi',
      projectName: 'javascript-multi',
      fileTypes: ['text/html', 'css', 'javascript'],
    },
  ],
};

const getters = {};

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
