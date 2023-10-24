interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {}
}
