import { FileState, ProjectState } from './modules/types';

export interface RootState {
  files: FileState;
  project: ProjectState;
}
