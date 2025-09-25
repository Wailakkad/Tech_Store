// data/iphoneProducts.js
// Import all your images first
import iphone16normal from '../images/Iphone/16normal.jpg'
import iphone16Pro from '../images/Iphone/16pro.jpg'
import iphone16Promax from '../images/Iphone/16Promax.jpg'
import iphone15Pro from '../images/Iphone/15pro.jpg'
import iphone15Normal from '../images/Iphone/15Normal.jpg'
import iphone15ProMax from '../images/Iphone/15ProMax.jpg'
import iphone14 from '../images/Iphone/14.jpg'
import iphone14Pro from '../images/Iphone/14pro.jpg'
import iphone14ProMax from '../images/Iphone/14ProMax.jpg'
import iphone13Normal from '../images/Iphone/13normal.jpg'
import iphone13Pro from '../images/Iphone/13pro.jpg'
import iphone13ProMax from '../images/Iphone/13ProMax.jpg'
import iphone12 from '../images/Iphone/12.jpg'
import iphone12Pro from '../images/Iphone/12pro.jpg'
import iphone12ProMax from '../images/Iphone/12proMax.jpg'
import iphone11 from '../images/Iphone/11.jpg'
import iphone11Pro from '../images/Iphone/11pro.jpg'
import iphone11ProMax from '../images/Iphone/11proMax.jpg'

const iphoneProducts = [
  // iPhone 16 Series
  {
    "id": 1,
    "name": "iPhone 16",
    "model" : "iphone 16",
    "price": 799,
    "image": iphone16normal,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Black", "White", "Pink", "Teal", "Ultramarine"],
    "chip": "A18 Bionic",
    "display": "6.1-inch",
    "isNew": true,
    "inStock": true,
    "releaseDate": "2024-09-20"
  },
  {
    "id": 2,
    "name": "iPhone 16 Pro",
     "model" : "iphone 16",
    "price": 999,
    "image": iphone16Pro,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Black", "White"],
    "chip": "A18 Pro",
    "display": "6.3-inch",
    "isNew": true,
    "inStock": true,
    "releaseDate": "2024-09-20"
  },
  {
    "id": 3,
    "name": "iPhone 16 Pro Max",
    "model" : "iphone 16",
    "price": 1199,
    "image": iphone16Promax,
    "storage": ["256GB", "512GB"],
    "colors": ["Black", "White"],
    "chip": "A18 Pro",
    "display": "6.9-inch",
    "isNew": true,
    "inStock": true,
    "releaseDate": "2024-09-20"
  },

  // iPhone 15 Series
  {
    "id": 4,
    "name": "iPhone 15",
    "model" : "iphone 15",
    "price": 699,
    "image": iphone15Normal,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Pink", "Yellow", "Green", "Blue", "Black"],
    "chip": "A16 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2023-09-22"
  },
  {
    "id": 5,
    "name": "iPhone 15 Pro",
    "model" : "iphone 15",
    "price": 899,
    "image": iphone15Pro,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Natural", "Blue"],
    "chip": "A17 Pro",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2023-09-22"
  },
  {
    "id": 6,
    "name": "iPhone 15 Pro Max",
    "model" : "iphone 15",
    "price": 1099,
    "image": iphone15ProMax,
    "storage": ["256GB", "512GB"],
    "colors": ["Natural Titanium", "Blue Titanium"],
    "chip": "A17 Pro",
    "display": "6.7-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2023-09-22"
  },

  // iPhone 14 Series
  {
    "id": 7,
    "name": "iPhone 14",
    "model" : "iphone 14",
    "price": 599,
    "image": iphone14,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Purple", "Yellow", "Blue", "Midnight", "Starlight", "(PRODUCT)RED"],
    "chip": "A15 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2022-09-16"
  },
  {
    "id": 8,
    "name": "iPhone 14 Pro",
    "model" : "iphone 14",
    "price": 799,
    "image": iphone14Pro,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Deep Purple", "Gold", "Silver", "Space Black"],
    "chip": "A16 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2022-09-16"
  },
  {
    "id": 9,
    "name": "iPhone 14 Pro Max",
    "model" : "iphone 14",
    "price": 899,
    "image": iphone14ProMax,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Deep Purple", "Gold", "Silver", "Space Black"],
    "chip": "A16 Bionic",
    "display": "6.7-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2022-09-16"
  },

  // iPhone 13 Series
  {
    "id": 10,
    "name": "iPhone 13",
    "model" : "iphone 13",
    "price": 499,
    "image": iphone13Normal,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Pink", "Blue", "Midnight", "Starlight", "(PRODUCT)RED"],
    "chip": "A15 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2021-09-24"
  },
  {
    "id": 11,
    "name": "iPhone 13 Pro",
    "model" : "iphone 13",
    "price": 699,
    "image": iphone13Pro,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    "chip": "A15 Bionic Pro",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2021-09-24"
  },
  {
    "id": 12,
    "name": "iPhone 13 Pro Max",
    "model" : "iphone 13",
    "price": 799,
    "image": iphone13ProMax,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    "chip": "A15 Bionic Pro",
    "display": "6.7-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2021-09-24"
  },

  // iPhone 12 Series
  {
    "id": 13,
    "name": "iPhone 12",
    "model" : "iphone 12",
    "price": 399,
    "image": iphone12,
    "storage": ["64GB", "128GB", "256GB"],
    "colors": ["Purple", "Blue", "Green", "Black", "White", "(PRODUCT)RED"],
    "chip": "A14 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2020-10-23"
  },
  {
    "id": 14,
    "name": "iPhone 12 Pro",
    "model" : "iphone 12",
    "price": 599,
    "image": iphone12Pro,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Graphite", "Silver", "Gold", "Pacific Blue"],
    "chip": "A14 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2020-10-23"
  },
  {
    "id": 15,
    "name": "iPhone 12 Pro Max",
    "model" : "iphone 12",
    "price": 699,
    "image": iphone12ProMax,
    "storage": ["128GB", "256GB", "512GB"],
    "colors": ["Graphite", "Silver", "Gold", "Pacific Blue"],
    "chip": "A14 Bionic",
    "display": "6.7-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2020-11-13"
  },

  // iPhone 11 Series
  {
    "id": 16,
    "name": "iPhone 11",
    "model" : "iphone 11",
    "price": 299,
    "image": iphone11,
    "storage": ["64GB", "128GB", "256GB"],
    "colors": ["Purple", "Yellow", "Green", "Black", "White", "(PRODUCT)RED"],
    "chip": "A13 Bionic",
    "display": "6.1-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2019-09-20"
  },
  {
    "id": 17,
    "name": "iPhone 11 Pro",
    "model" : "iphone 11",
    "price": 499,
    "image": iphone11Pro,
    "storage": ["64GB", "256GB", "512GB"],
    "colors": ["Space Gray", "Silver", "Gold", "Midnight Green"],
    "chip": "A13 Bionic",
    "display": "5.8-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2019-09-20"
  },
  {
    "id": 18,
    "name": "iPhone 11 Pro Max",
    "model" : "iphone 11",
    "price": 599,
    "image": iphone11ProMax,
    "storage": ["64GB", "256GB", "512GB"],
    "colors": ["Space Gray", "Silver", "Gold", "Midnight Green"],
    "chip": "A13 Bionic",
    "display": "6.5-inch",
    "isNew": false,
    "inStock": true,
    "releaseDate": "2019-09-20"
  }
];

export default iphoneProducts;