import Vue from 'vue';
import Vuex from 'vuex';
import FileModel from './models/FileModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    files: Array<FileModel>(),
  },

  mutations: {
    addFile(state, fileModel: FileModel) {
      state.files.push(fileModel);
    },
  },

  actions: {
    addFile(context, fileModel: FileModel) {
      context.commit('addFile', fileModel);
    },
  },
});
