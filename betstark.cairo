contract BettingContract:
    field betAmount : felt = 10000000000000000000  # 10 ETH in gwei
    field team1Address : felt = 0  # Address of the first participant
    field team2Address : felt = 0  # Address of the second participant
    field team1Bet : felt = 0  # Amount bet by the first participant
    field team2Bet : felt = 0  # Amount bet by the second participant
    field matchOutcome : felt = 0  # 0 for undecided, 1 for team1, 2 for team2

    # Function to initialize the contract with participant addresses
    public fn initialize(team1: felt, team2: felt):
        self.team1Address = team1
        self.team2Address = team2

    # Function for participants to place bets
    public fn placeBet(amount: felt):
        assert msg.sender == team1Address || msg.sender == team2Address, "Invalid participant"
        assert matchOutcome == 0, "Betting closed"
        assert amount > 0 && amount <= betAmount, "Invalid bet amount"

        if msg.sender == team1Address:
            team1Bet += amount
        else:
            team2Bet += amount

    # Function to close the betting and determine the winner or draw
    public fn closeBetting(outcome: felt):
        assert msg.sender == team1Address || msg.sender == team2Address, "Invalid participant"
        assert matchOutcome == 0, "Betting closed"
        assert outcome >= 0 && outcome <= 2, "Invalid outcome"

        matchOutcome = outcome

    # Function to distribute the funds to the winner
    public fn distributeFunds():
        assert matchOutcome != 0, "Betting not closed yet"
        assert msg.sender == team1Address || msg.sender == team2Address, "Invalid participant"

        if matchOutcome == 1:
            send(team1Address, team1Bet + team2Bet)
        elif matchOutcome == 2:
            send(team2Address, team1Bet + team2Bet)
        # Handle the draw scenario (if matchOutcome == 0, participants can withdraw)

    # Function for participants to withdraw their assets in case of a draw
    public fn withdraw():
        assert matchOutcome == 0, "Betting outcome decided"
        assert msg.sender == team1Address || msg.sender == team2Address, "Invalid participant"

        if msg.sender == team1Address:
            send(team1Address, team1Bet)
        else:
            send(team2Address, team2Bet)
