import { IModal } from '@/types/modal';

export enum LeaderboardTabEnum {
  INCUBATORS = 'incubators',
  VALIDATORS = 'validators',
  EGGS = 'eggs',
}

export interface LeaderboardSpec extends IModal {
  currentTab: LeaderboardTabEnum;
  data: Array<any>;
}
