# Ad Request Auction System

### Base URL: [https://localhost:7001](https://localhost:7001)

## Endpoints

- /bid
  - description: Start auction
  - method: POST
  - body: (action_id)
  
- /registrations
  - description: Get registered endpoints
  - method: GET
 
- /registrations
  - description: Endpoint used by bidder to register itself
  - method: POST
  - body: (bidder_id, endpoint)