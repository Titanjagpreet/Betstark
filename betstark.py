from starkware.starknet.compiler import StarknetContract
from starkware.starknet.services.api import Starknet

# Replace these values with your actual private key and contract code
private_key = 'YOUR_PRIVATE_KEY'
contract_code = 'YOUR_CONTRACT_CODE'

# Connect to the Starknet network
starknet = Starknet()

# Deploy the contract
def deploy_contract():
    contract = starknet.deploy(contract_code=StarknetContract(contract_code))
    print(f"Contract deployed at address: {contract.address.hex()}")
    return contract

# Initialize the contract with participant addresses
def initialize_contract(contract, team1_address, team2_address):
    contract.invoke_raw(
        private_key=private_key,
        selector="initialize",
        calldata=[team1_address, team2_address],
    )
    print("Contract initialized with participant addresses.")

# Place bets
def place_bets(contract, participant_address, amount):
    contract.invoke_raw(
        private_key=private_key,
        selector="placeBet",
        calldata=[participant_address, amount],
    )
    print("Bet placed successfully.")

# Close betting
def close_betting(contract, outcome):
    contract.invoke_raw(
        private_key=private_key,
        selector="closeBetting",
        calldata=[outcome],
    )
    print(f"Betting closed with outcome: {outcome}")

# Withdraw funds in case of a draw
def withdraw_funds(contract, participant_address):
    contract.invoke_raw(
        private_key=private_key,
        selector="withdraw",
        calldata=[participant_address],
    )
    print("Funds withdrawn successfully.")

# Example usage
contract_instance = deploy_contract()
team1_address = '0x...'  # Replace with the actual address
team2_address = '0x...'  # Replace with the actual address
initialize_contract(contract_instance, team1_address, team2_address)

participant_address = '0x...'  # Replace with the actual address
bet_amount = 10 * 10**18  # 10 ETH in wei
place_bets(contract_instance, participant_address, bet_amount)

# ... Perform other interactions as needed

outcome = 0  # 0 for draw, 1 for team1, 2 for team2
close_betting(contract_instance, outcome)

# If the match ended in a draw, participants can withdraw their funds
if outcome == 0:
    withdraw_funds(contract_instance, participant_address)
