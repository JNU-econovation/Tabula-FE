import { folderHandler } from './folderHandler';
import { loginHandler } from './loginHandler';
import { mypageHandler } from './mypageHandler';
import { workspaceHandler } from './workspaceHandler';

export const handlers = [
  ...folderHandler,
  ...workspaceHandler,
  ...loginHandler,
  ...mypageHandler,
];
