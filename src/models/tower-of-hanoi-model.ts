export interface TowerOfHanoiModel {
  source: string,
  helper: string,
  dest: string
};

export type TowerOfHanoiProperty = keyof TowerOfHanoiModel;

export type TowerOfHanoiPartial = Partial<TowerOfHanoiModel>;
