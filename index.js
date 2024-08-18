const { program } = require('commander');
const WalletManager = require('./walletManager');

const walletManager = new WalletManager();

program
  .command('create-wallets <count> <filename>')
  .description('Create a specified number of Solana wallets')
  .action(async (count, filename) => {
    try {
      await walletManager.createWallets(parseInt(count), filename);
      console.log(`Created ${count} wallets and saved to ${filename}.secret_keys.txt and ${filename}.public_keys.txt`);
    } catch (error) {
      console.error('Error creating wallets:', error);
    }
  });

program
  .command('set-main-wallet <secretKey>')
  .description('Set the main wallet secret key')
  .action(async (secretKey) => {
    try {
      await walletManager.setMainWallet(secretKey);
      console.log('Main wallet secret key updated');
    } catch (error) {
      console.error('Error setting main wallet:', error);
    }
  });

// Add more commands for fund transfer functionality
// ...

program.parse(process.argv);