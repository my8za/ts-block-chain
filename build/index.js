"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, height, data);
        // 블럭 인스턴스를 생성할때마다 Hash를 계산
    }
    static calculateHash(prevHash, height, data) {
        const toHash = `${prevHash} ${height} ${data}`;
        return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    }
}
class BlockChain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        // 이 전 해쉬값으로 블럭끼리 연결(체이닝)
        if (this.blocks.length === 0)
            return ""; // 첫번째 해쉬가 없다면 '' 리턴
        return this.blocks[this.blocks.length - 1].hash; // 마지막 블럭의 해쉬값 리턴
    }
    // 새로운 블럭생성
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    // 블럭 접근함수
    getBlocks() {
        return [...this.blocks];
    }
}
const blockChain = new BlockChain();
blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");
console.log(blockChain.getBlocks());
