const { Keypair } = require('@solana/web3.js');
const fs = require('fs-extra');

class WalletManager {
  constructor() {
    this.config = require('./config.json');
  }

  async createWallets(count, filename) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
      wallets.push(Keypair.generate());
    }

    const secretKeys = wallets.map(w => Buffer.from(w.secretKey).toString('hex'));
    const publicKeys = wallets.map(w => w.publicKey.toBase58());

    await this.saveToFile(`${filename}.secret_keys.txt`, secretKeys.join('\n'));
    await this.saveToFile(`${filename}.public_keys.txt`, publicKeys.join('\n'));

    return wallets;
  }

  async saveToFile(filename, content) {
    try {
      await fs.writeFile(filename, content, { flag: 'wx' });
    } catch (error) {
      if (error.code === 'EEXIST') {
        await fs.appendFile(`${filename}.backup`, content + '\n');
      } else {
        throw error;
      }
    }
  }

  async setMainWallet(secretKey) {
    this.config.mainWalletSecretKey = secretKey;
    await fs.writeJson('./config.json', this.config, { spaces: 2 });
  }

  async getWalletsFromFile(filename) {
    const content = await fs.readFile(filename, 'utf-8');
    return content.split('\n').filter(line => line.trim() !== '');
  }

  // Implement fund transfer methods here
  // ...
}

module.exports = WalletManager;