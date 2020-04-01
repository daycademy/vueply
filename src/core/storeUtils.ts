import ProjectFileLink from '@/store/models/ProjectFileLink';
import { Store } from 'vuex';
import FileModel from '@/store/models/FileModel';
import { RootState } from '@/store/types';

export const files = (store: Store<RootState>,
  currentProject: ProjectFileLink): Array<FileModel> => store
  .getters['fileExplorer/projectFiles'](currentProject.projectName);

export const currentProject = (store: Store<RootState>): ProjectFileLink => store
  .state.project.projectFilesLink
  .filter((projectFileLink: ProjectFileLink) => projectFileLink.projectName
    === store.state.project.currentProject)[0];
