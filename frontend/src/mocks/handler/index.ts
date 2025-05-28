import { folderHandler } from './folderHandler';
import { loginHandler } from './loginHandler';
import { workspaceHandler } from './workspaceHandler';

export const handlers = [
  ...folderHandler,
  ...workspaceHandler,
  ...loginHandler,
];
