import { ActionContext } from 'vuex';
import { FileState } from '@/store/modules/types';
import { RootState, State } from '@/store/types';
import FileModel from '@/store/models/FileModel';

const addFile = (context: ActionContext<FileState, RootState>, fileModel: FileModel) => {
  context.commit('addFile', fileModel);
  context.commit('updateSelectedFile', fileModel.name);
};

const updateSelectedFile = (context: ActionContext<FileState, RootState>, name: string) => {
  context.commit('updateSelectedFile', name);
};

const deleteFile = (context: ActionContext<State<FileState>, RootState>, name: string) => {
  context.commit('deleteFile', name);
  if (context.state.state.selectedFile === name) {
    context.commit('updateSelectedFile', context.state.state.files[0].name);
  }
};

export default {
  addFile,
  updateSelectedFile,
  deleteFile,
};
