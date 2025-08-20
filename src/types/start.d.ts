type PageContextType = {
  changePage: () => void
};

type HexagramType = {
  id: number,
  name: string,
  judgment: string,
  binary: string,
  upper: string,
  lower: string
}

type GetHexagramType = {
  initial: HexagramType | undefined,
  changing: HexagramType | undefined,
  hasChanging: boolean
}
