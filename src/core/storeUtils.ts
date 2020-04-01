import ProjectFileLink from '@/store/models/ProjectFileLink';
import { Store } from 'vuex';
import FileModel from '@/store/models/FileModel';

export const files = (store: Store<any>, currentProject: ProjectFileLink): Array<FileModel> => store
  .getters['fileExplorer/projectFiles'](currentProject.projectName);

export const currentProject = (store: Store<any>): ProjectFileLink => store
  .state.project.projectFilesLink
  .filter((projectFileLink: ProjectFileLink) => projectFileLink.projectName
    === store.state.project.currentProject)[0];
