export type Direction = 'asc' | 'desc';

export interface TableHeadCellSort {
  id: string;
  active: boolean;
  direction: Direction;
}

export type TableUpdateEventDetail = TableHeadCellSort;
