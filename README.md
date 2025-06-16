# OnChain-3Way

基于区块链的三方数据上链应用，实现数据安全可信的存储与验证。

## 项目结构

项目分为两个主要部分：

- `web/`: 前端应用，基于React和Wagmi构建
- `solidity/`: 智能合约，使用Solidity语言编写

## 技术栈

### 前端
- React
- TypeScript
- Wagmi (以太坊React Hooks库)
- ConnectKit (钱包连接UI)
- Vite (构建工具)

### 智能合约
- Solidity
- Truffle (开发框架)

## 快速开始

### 智能合约部署

```bash
cd solidity
npm install
truffle compile
truffle migrate
```

### 前端开发

```bash
cd web
npm install
npm run dev
```

## 功能特性

- 数据上链存储
- 多方数据验证
- 区块链交互