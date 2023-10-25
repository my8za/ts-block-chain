import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
    // 블럭 인스턴스를 생성할때마다 Hash를 계산
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash} ${height} ${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    // 이 전 해쉬값으로 블럭끼리 연결(체이닝)

    if (this.blocks.length === 0) return ""; // 첫번째 해쉬가 없다면 '' 리턴
    return this.blocks[this.blocks.length - 1].hash; // 마지막 블럭의 해쉬값 리턴
  }

  // 새로운 블럭생성
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  // 블럭 접근함수
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockChain = new BlockChain();
blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");

console.log(blockChain.getBlocks());
