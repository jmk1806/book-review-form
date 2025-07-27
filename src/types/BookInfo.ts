import { Dayjs } from 'dayjs';

export enum ReadingStatus {
  WISH_TO_READ = 'WISH_TO_READ',
  READING = 'READING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export interface BookInfo {
  title: string;
  author: string;
  status: ReadingStatus;
  startDate: Dayjs;
  endDate: Dayjs;
}
