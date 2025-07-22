# Codigo Escrow Frontend – Superteam Nigeria DevQuest

A professional React frontend for the Codigo Escrow template, built for the Superteam Nigeria DevQuest hackathon.

---

## Overview

This project delivers a seamless escrow experience on Solana, enabling users to securely create, accept, and manage escrow deals with SOL or SPL tokens. Built with a modern React stack, it integrates wallet connectivity and leverages Solana's PDA and Token Program for secure, trustless transactions.

---

## Features

- 🔗 **Wallet Connect:** Supports Phantom wallet via Solana Wallet Adapter.
- 📝 **Create Escrow Deals:** Initiate new escrow agreements with optional memos.
- 🤝 **Accept Deals:** Counterparties can accept and fund deals.
- 💸 **Withdraw or Cancel:** Parties can withdraw funds or cancel deals as per escrow state.
- 💡 **SPL & SOL Support:** Handles both native SOL and SPL tokens.
- 🖥️ **Responsive UI:** Built with TailwindCSS for a modern, mobile-friendly interface.

---

## Tech Stack

| Technology            | Purpose                                  |
|-----------------------|------------------------------------------|
| React + Vite          | Frontend framework & tooling             |
| TailwindCSS           | Styling & responsive design              |
| @solana/web3.js       | Solana blockchain interactions           |
| Solana Wallet Adapter | Wallet connection (Phantom, etc.)        |
| Solana Token Program  | SPL token escrow functionality           |

---

## How It Works

1. **Connect Wallet:**  
  Users connect their Phantom wallet to the app.

2. **Create Escrow:**  
  Fill in deal details (amount, recipient, optional memo) and submit. Funds are held in a PDA-controlled escrow account.

3. **Accept Deal:**  
  The counterparty reviews and accepts the deal, confirming participation.

4. **Withdraw or Cancel:**  
  Upon deal completion or cancellation, funds are released or returned according to the escrow logic.

---

## Screenshots

> _Add screenshots here_  
> ![Screenshot Placeholder](./screenshots/escrow-demo.png)

---

## Getting Started

1. **Clone the repository:**
  ```bash
  git clone https://github.com/your-org/codigo-escrow-frontend.git
  cd codigo-escrow-frontend
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Configure environment:**
  - Update Solana RPC endpoint and program addresses in `.env`.

4. **Run the app:**
  ```bash
  npm run dev
  ```

---

## Demo

> _Live demo link:_ [https://your-demo-link.com](https://your-demo-link.com)

---

## AI Tools Used

| Tool              | Purpose                        |
|-------------------|-------------------------------|
| GitHub Copilot    | Code generation & suggestions  |
| ChatGPT           | Prompt refinement & docs       |

---

## Submission Info

- **Hackathon:** Superteam Nigeria DevQuest
- **Team:** Codigo x Superteam Nigeria
- **Wallet Address:** `YOUR_WALLET_ADDRESS_HERE`
- **Prompt History:**  
  - Initial README structure and requirements provided.
  - Iterative improvements using AI tools for clarity and formatting.

---

## Future Ideas for Expansion

- Multi-signature escrow support
- Email/SMS notifications for deal updates
- In-app deal chat or messaging
- Support for additional wallets (e.g., Solflare)
- Analytics dashboard for escrow activity
- Mobile app version

---

> For questions or contributions, please open an issue or submit a pull request.
