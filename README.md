# Wire-shot
Hackathon project that enables restaurant owner to manage table and menu and customer payments through Polygon blockchain

# Features

Restaurant Owner
1. Add a new restaurant
2. Add new tables
3. Add menu items

Restaurant Guest
1. Select a restaurant
2. Check in to a table
3. Order items
4. Pay your bill and checkout

# Limitations
Currently we do not support any on chain event subscription. Meaning if you interact with the smart contract it might take a while and you need to refresh the page to see the changes made (example: adding a new restaurant or table)

# Requirement
1. We use lerna package manager so go a head and install lerna first: https://lerna.js.org/
2. Make sure you have a wallet and add the mumbai polygon testchain: https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f
3. Make sure you have some MATIC: https://mumbaifaucet.com/
Since the smartcontract is already deployed to mumbai testnet we only need to install dependencies and start the server

# Start
1. run on the root level ```lerna bootstrap```
2. cd to src/website
3. run ```yarn dev```
4. server is now exposed on http://localhost:3000/

# Deploying smart contract
In case you want to deploy smart contract to mumbai testnet:
1. Navigate to packages/hardhat
2. run ```npm run deploy```
3. Once deployed you should cope the "Spawner" contract id
4. Set this id within the website folder env to NEXT_PUBLIC_SPAWNER_CONTRACT_ADDRESS
