import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from './types';
import files from './modules/files';
import project from './modules/project';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    files,
    project,
  },
});
