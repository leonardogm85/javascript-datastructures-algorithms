export type ITowerOfHanoiModel = {
  source: string,
  helper: string,
  dest: string
};

export type ITowerOfHanoiProperty = keyof ITowerOfHanoiModel;

export type ITowerOfHanoiPartial = Partial<ITowerOfHanoiModel>;
