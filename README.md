# Trustlink

**Trustlink** is a secure, user-friendly escrow dApp built on Solana, designed to facilitate safe and transparent transactions between parties. Leveraging the power of the Codigo platform, Trustlink enables users to create, manage, and settle escrow agreements with confidence, ensuring funds are only released when all conditions are met.

---

## AI Tool(s) Used

- **Warp**: Terminal interfacing, comment generation
- **Cursor**: Documentation, code assistance

---

## AI-Assisted Workflows

This project leveraged AI tools to streamline development and improve code quality:

- **Warp**: Used for generating code comments, handling code errors, and fixing bugs (e.g., resolving issues with wallet connect integration). Warp's terminal AI features accelerated debugging and provided actionable suggestions for code improvements.
- **Cursor**: Utilized for documentation, inline code analysis, and context-aware code suggestions. Cursor helped ensure code clarity, maintainability, and adherence to best practices throughout the project.

---

## Codigo Escrow Template

A reusable React frontend template for Solana escrow programs, designed for rapid integration with the Codigo platform and Solana blockchain.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 3. Build for Production

```bash
npm run build
```

---

## Configuring the Solana Program ID

The Solana program ID and network are configured in [`src/config/program.ts`](src/config/program.ts):

- **Change the network** by editing the `NETWORK` field (`'devnet'`, `'testnet'`, or `'mainnet-beta'`).
- **Set your deployed program ID** by updating the `PROGRAM_IDS` object for the relevant network.

Example:

```ts
export const PROGRAM_CONFIG = {
  NETWORK: 'devnet', // or 'testnet', 'mainnet-beta'
  PROGRAM_IDS: {
    devnet: new PublicKey('YourDeployedProgramIdHere'),
    // ...
  },
  // ...
};
```

The app will automatically use the correct program ID and RPC endpoint based on this configuration.

---

For more details, see inline comments in [`src/config/program.ts`](src/config/program.ts).
