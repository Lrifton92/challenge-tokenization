import * as chains from "viem/chains";

export type BaseConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export type ScaffoldConfig = BaseConfig;

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // 🪐 Réseaux sur lesquels l'app tourne (ici: Sepolia)
  targetNetworks: [chains.sepolia],

  // ⏱️ Intervalle de polling (30s OK en prod/testnet)
  pollingInterval: 30000,

  // 🔷 Clé Alchemy (met la tienne en env pour éviter le rate limit)
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // 🔌 RPC custom (facultatif)
  rpcOverrides: {
    // [chains.sepolia.id]: "https://eth-sepolia.g.alchemy.com/v2/<TA_CLE>",
  },

  // 🔗 WalletConnect (laisser par défaut ou mets ta propre clé en env)
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // 🔥 Autoriser les burner wallets sur testnet (pratique pour tester sans MetaMask)
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
