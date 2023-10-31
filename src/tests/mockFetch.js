
const animalData = [
  {
    'id': 1,
    'name': 'Rabbit',
    'type': 'Mammal',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:17:50.000000Z',
    'updated_at': '2023-10-29T04:49:48.000000Z'
  },
  {
    'id': 2,
    'name': 'Seahorse',
    'type': 'Fish',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-28T07:18:29.000000Z',
    'updated_at': '2023-10-28T07:18:29.000000Z'
  },
  {
    'id': 3,
    'name': 'Tiger',
    'type': 'Mammal',
    'conservationStatus': 'Endangered',
    'created_at': '2023-10-28T07:20:05.000000Z',
    'updated_at': '2023-10-28T07:20:05.000000Z'
  },
  {
    'id': 5,
    'name': 'Dog',
    'type': 'Mammal',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:36:56.000000Z',
    'updated_at': '2023-10-28T07:36:56.000000Z'
  },
  {
    'id': 6,
    'name': 'Cheetah',
    'type': 'Mammal',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-28T07:37:05.000000Z',
    'updated_at': '2023-10-28T07:37:05.000000Z'
  },
  {
    'id': 7,
    'name': 'Whale',
    'type': 'Mammal',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-28T07:37:11.000000Z',
    'updated_at': '2023-10-28T07:37:11.000000Z'
  },
  {
    'id': 8,
    'name': 'Shark',
    'type': 'Fish',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:37:23.000000Z',
    'updated_at': '2023-10-28T07:37:23.000000Z'
  },
  {
    'id': 9,
    'name': 'Parrot',
    'type': 'Bird',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:38:44.000000Z',
    'updated_at': '2023-10-28T07:38:44.000000Z'
  },
  {
    'id': 10,
    'name': 'Eagle',
    'type': 'Bird',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-28T07:38:49.000000Z',
    'updated_at': '2023-10-28T07:38:49.000000Z'
  },
  {
    'id': 11,
    'name': 'Salmon',
    'type': 'Fish',
    'conservationStatus': 'Endangered',
    'created_at': '2023-10-28T07:39:12.000000Z',
    'updated_at': '2023-10-28T07:39:12.000000Z'
  },
  {
    'id': 12,
    'name': 'Crocodile',
    'type': 'Reptile',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-28T07:45:52.000000Z',
    'updated_at': '2023-10-28T07:45:52.000000Z'
  },
  {
    'id': 13,
    'name': 'Alligator',
    'type': 'Reptile',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:45:59.000000Z',
    'updated_at': '2023-10-28T07:45:59.000000Z'
  },
  {
    'id': 14,
    'name': 'Snake',
    'type': 'Reptile',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-28T07:46:14.000000Z',
    'updated_at': '2023-10-28T07:46:14.000000Z'
  },
  {
    'id': 16,
    'name': 'Ocelot',
    'type': 'Mammal',
    'conservationStatus': 'Vulnerable',
    'created_at': '2023-10-29T05:47:59.000000Z',
    'updated_at': '2023-10-29T05:47:59.000000Z'
  },
  {
    'id': 17,
    'name': 'Goldfish',
    'type': 'Fish',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-29T05:48:24.000000Z',
    'updated_at': '2023-10-29T05:48:24.000000Z'
  },
  {
    'id': 18,
    'name': 'Goldfish',
    'type': 'Fish',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-29T05:49:06.000000Z',
    'updated_at': '2023-10-29T05:49:06.000000Z'
  },
  {
    'id': 19,
    'name': 'Goldfish',
    'type': 'Fish',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-29T05:49:22.000000Z',
    'updated_at': '2023-10-29T05:49:22.000000Z'
  },
  {
    'id': 20,
    'name': 'Goldfish',
    'type': 'Fish',
    'conservationStatus': 'Least Concern',
    'created_at': '2023-10-29T05:49:56.000000Z',
    'updated_at': '2023-10-29T05:49:56.000000Z'
  }
]

export default async function mockFetch(url) {
  switch (url) {
    case "http://localhost:8000/api/animal": {
      return {
        status: 200,
        json: async () => animalData
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}