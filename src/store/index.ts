import Vue from 'vue';
import Vuex from 'vuex';
import fileExplorer from '@/modules/FileExplorer/Store';
import { RootState } from './types';
import project from './modules/project';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    fileExplorer,
    project,
  },
});
