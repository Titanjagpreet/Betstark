const starknet = require('starknet.js');

// Replace these values with your actual private key and contract code
const privateKey = 'YOUR_PRIVATE_KEY';
const contractCode = 'YOUR_CONTRACT_CODE';

// Create a Starknet instance
const starknetInstance = new starknet.Starknet();

// Deploy the contract
async function deployContract() {
    const contractAddress = await starknetInstance.deploy(contractCode, privateKey);
    console.log('Contract deployed at address:', contractAddress);

    // Return the contract address for further interactions
    return contractAddress;
}

// Initialize the contract with participant addresses
async function initializeContract(contractAddress, team1Address, team2Address) {
    await starknetInstance.invokeContract(privateKey, contractAddress, 'initialize', [team1Address, team2Address]);
    console.log('Contract initialized with participant addresses.');
}

// Place bets
async function placeBets(contractAddress, participantAddress, amount) {
    await starknetInstance.invokeContract(privateKey, contractAddress, 'placeBet', [participantAddress, amount]);
    console.log('Bet placed successfully.');
}

// Close betting
async function closeBetting(contractAddress, outcome) {
    await starknetInstance.invokeContract(privateKey, contractAddress, 'closeBetting', [outcome]);
    console.log('Betting closed with outcome:', outcome);
}

// Withdraw funds in case of a draw
async function withdrawFunds(contractAddress, participantAddress) {
    await starknetInstance.invokeContract(privateKey, contractAddress, 'withdraw', [participantAddress]);
    console.log('Funds withdrawn successfully.');
}

// Example usage
(async () => {
    const contractAddress = await deployContract();
    const team1Address = '0x...'; // Replace with the actual address
    const team2Address = '0x...'; // Replace with the actual address

    await initializeContract(contractAddress, team1Address, team2Address);

    const participantAddress = '0x...'; // Replace with the actual address
    const betAmount = '10000000000000000000'; // 10 ETH in wei

    await placeBets(contractAddress, participantAddress, betAmount);

    // ... Perform other interactions as needed

    const outcome = 0; // 0 for draw, 1 for team1, 2 for team2
    await closeBetting(contractAddress, outcome);

    // If the match ended in a draw, participants can withdraw their funds
    if (outcome === 0) {
        await withdrawFunds(contractAddress, participantAddress);
    }
})();
