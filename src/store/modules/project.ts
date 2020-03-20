import { ActionContext } from 'vuex';
import { ProjectState } from './types';
import { RootState } from '../types';

const state: ProjectState = {
  currentProject: 'web',
};

const getters = {};

const actions = {
  setProject(context: ActionContext<ProjectState, RootState>, project: string) {
    context.commit('setProject', project);
    const selectedFile = project === 'web' ? 'index.html' : 'App.vue';
    context.commit('updateSelectedFile', selectedFile);
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
