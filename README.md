🎟️ Challenge Tokenization — SpeedRunEthereum

Crée, déploie et héberge ta première application Web3 complète :
👉 un smart contract NFT (ERC-721) + une app Next.js pour minter et transférer tes propres NFTs sur Sepolia testnet.

📑 SOMMAIRE

🧰 Outils nécessaires avant de commencer

📦 Installation du projet

🏗️ Lancer la blockchain locale

🖥️ Lancer le site web local

💰 Faucets — obtenir du Sepolia ETH

🚀 Déployer le contrat sur Sepolia

🧠 Configuration du site pour Sepolia

🌐 Déployer ton site sur Vercel

🔒 Sécurité des fichiers sensibles

🧾 Vérification finale du challenge

🧰 OUTILS NÉCESSAIRES AVANT DE COMMENCER
🧩 À installer sur ton PC (une seule fois)
Outil	Description	Lien
Node.js ≥ 20	Exécuter JavaScript et installer les dépendances	nodejs.org

Yarn	Gestionnaire de paquets	yarnpkg.com

Git	Contrôle de version	git-scm.com

Visual Studio Code	IDE pour modifier ton code	code.visualstudio.com

MetaMask	Wallet Ethereum (extension navigateur)	metamask.io
📦 INSTALLATION DU PROJET
🧑‍💻 Étape 1 — depuis PowerShell
git clone <TON_REPO_GITHUB_URL> challenge-tokenization
cd challenge-tokenization

🧠 Étape 2 — ouvrir dans Visual Studio Code
code .


➡️ Cela ouvrira ton dossier dans VS Code.

🧑‍💻 Étape 3 — installer les dépendances

Dans le terminal intégré VS Code, exécute :

yarn install


Attends la fin de l’installation (cela peut prendre plusieurs minutes la première fois).

🏗️ LANCER LA BLOCKCHAIN LOCALE
🧑‍💻 Étape 1 — ouvrir un terminal PowerShell

Dans VS Code, menu Terminal → Nouveau terminal, puis :

yarn chain


➡️ Garde ce terminal ouvert en permanence (il simule ta blockchain locale).

🖥️ LANCER LE SITE WEB LOCAL
🧑‍💻 Étape 2 — ouvrir un deuxième terminal PowerShell
yarn deploy


➡️ Cela compile et déploie ton smart contract localement.

🧑‍💻 Étape 3 — ouvrir un troisième terminal PowerShell
yarn start


➡️ Ouvre ton navigateur sur http://localhost:3000

💰 FAUCETS — OBTENIR DU SEPOLIA ETH

Tu auras besoin d’ETH de test pour déployer sur Sepolia.
Connecte ton wallet MetaMask au réseau Sepolia testnet, puis va sur un de ces faucets :

Faucet	Lien
🧪 Alchemy Faucet	https://www.alchemy.com/faucets/ethereum-sepolia

☁️ Infura Faucet	https://www.infura.io/faucet/sepolia

🌐 Google Cloud Faucet	https://cloud.google.com/application/web3/faucet/ethereum/sepolia

💡 Garde l’adresse de ton wallet (ex. 0x123...) pour plus tard.

🚀 DÉPLOYER LE CONTRAT SUR SEPOLIA
🧑‍💻 Étape 1 — générer ton compte de déploiement
yarn generate


Puis vérifie ton adresse :

yarn account


➡️ Copie l’adresse affichée et envoie-lui du Sepolia ETH via un faucet ci-dessus.

🧠 Étape 2 — modifier le fichier packages/hardhat/hardhat.config.ts

⚠️ Supprime tout le contenu actuel du fichier et remplace-le entièrement par le code ci-dessous :

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const DEFAULT_NETWORK = process.env.DEFAULT_NETWORK || "sepolia";

const config: HardhatUserConfig = {
  defaultNetwork: DEFAULT_NETWORK,
  solidity: {
    version: "0.8.17",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  namedAccounts: {
    deployer: { default: 0 },
  },
  networks: {
    hardhat: { chainId: 31337 },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
      saveDeployments: true,
    },
  },
  etherscan: { apiKey: ETHERSCAN_API_KEY },
};

export default config;

🧑‍💻 Étape 3 — lancer le déploiement sur Sepolia
yarn deploy --network sepolia


➡️ Copie l’adresse du contrat déployé (ex : 0x538A905E2964c1ebEC44Ab12680Fe7F8dD903623e)

🧠 Étape 4 — créer le fichier .env

Dans le dossier packages/hardhat, crée un fichier nommé .env :

Colle ce contenu (remplace par tes vraies clés) :

ETHERSCAN_API_KEY=ta_cle_etherscan
ALCHEMY_API_KEY=ta_cle_alchemy
DEPLOYER_PRIVATE_KEY=ta_cle_privee

🧑‍💻 Étape 5 — vérifier ton contrat sur Etherscan
yarn verify --network sepolia


➡️ Tu pourras alors voir ton code source sur Etherscan Sepolia
.

🧠 CONFIGURATION DU SITE POUR SEPOLIA
🧠 Étape 1 — ouvrir packages/nextjs/scaffold.config.ts

⚠️ Supprime tout le contenu et remplace-le entièrement par ceci :

import * as chains from "viem/chains";

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  targetNetworks: [chains.sepolia],
  pollingInterval: 30000,
  alchemyApiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,
  rpcOverrides: {},
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
    "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: false,
} as const;

export default scaffoldConfig;

🌐 DÉPLOYER TON SITE SUR VERCEL
🧑‍💻 Étape 1 — connexion Vercel
yarn vercel:login

🧑‍💻 Étape 2 — déploiement
yarn vercel --prod


➡️ Quand Vercel te demande le dossier à déployer, tape :

packages/nextjs


Une fois terminé, tu verras ton URL publique :
https://challenge-tokenization-xxxxx.vercel.app

🔒 SÉCURITÉ DES FICHIERS SENSIBLES

Ne publie jamais :

packages/hardhat/.env
packages/nextjs/.env.local


Dans VS Code, tu peux vérifier qu’ils sont bien ignorés :

git check-ignore -v packages/hardhat/.env

🧾 VÉRIFICATION FINALE DU CHALLENGE

1️⃣ Ouvre ton site Vercel
2️⃣ Connecte ton wallet MetaMask (Sepolia)
3️⃣ Clique sur My NFTs → Mint NFT
4️⃣ Confirme la transaction dans MetaMask
5️⃣ Vérifie ton NFT sur Etherscan ou directement dans MetaMask

✅ Félicitations !
Tu as :

Créé ton projet Scaffold-ETH 2

Déployé ton contrat NFT sur Sepolia

Mis en ligne ton site complet sur Vercel

Et validé toutes les étapes du challenge Tokenization 💪
