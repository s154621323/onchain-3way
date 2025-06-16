export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'Sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'Value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'Data',
        type: 'bytes',
      },
    ],
    name: 'FallBack',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'Sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'Value',
        type: 'uint256',
      },
    ],
    name: 'Received',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

export const contractAddress = '0xc9C1ED9f51373B8DB67Ff2245e35228DB6026826'