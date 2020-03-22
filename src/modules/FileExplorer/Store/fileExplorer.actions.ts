import { ActionContext } from 'vuex';
import { FileState } from '@/store/modules/types';
import { RootState } from '@/store/types';
import FileModel from '@/store/models/FileModel';

const addFile = (context: ActionContext<FileState, RootState>, fileModel: FileModel) => {
  context.commit('addFile', fileModel);
};

const updateSelectedFile = (context: ActionContext<FileState, RootState>, name: string) => {
  context.commit('updateSelectedFile', name);
};

export default {
  addFile,
  updateSelectedFile,
};
