import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

const ORDERS_STORAGE_KEY = 'fitfuel_orders'
const ORDERS_KEY_PREFIX = 'fitfuel_orders_'

const loadStoredOrders = (userEmail) => {
  try {
    let key = ORDERS_STORAGE_KEY
    if (userEmail) {
      key = `${ORDERS_KEY_PREFIX}${userEmail}`
    }
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveStoredOrders = (orders, userEmail) => {
  try {
    let key = ORDERS_STORAGE_KEY
    if (userEmail) {
      key = `${ORDERS_KEY_PREFIX}${userEmail}`
    }
    window.localStorage.setItem(key, JSON.stringify(orders))
  } catch {
    // ignore localStorage errors
  }
}

const sportsProducts = [
  {
    id: 1,
    title: 'Nitro Protein Blend',
    price: 45.99,
    description:
      'Премиальный протеин для мышечного роста, силы и быстрого восстановления после тренировок.',
    category: 'protein',

    // public/images/protein.png
    image: '/images/protein-1.jpg',

    images: [
      // public/images/protein-1.png
      '/images/protein-1.jpg',

      // public/images/protein-2.png
      '/images/protein-2.jpg',
    ],

    rating: { rate: 4.8, count: 542 },
  },

  {
    id: 2,
    title: 'Ultra Creatine Monohydrate',
    price: 29.99,
    description:
      'Чистый креатин для повышения силы, выносливости и взрывной энергии на тренировке.',
    category: 'creatine',

    // public/images/creatine.jpg
    image: '/images/creatine-1.jpg',

    images: [
      // public/images/creatine.jpg
      '/images/creatine-1.jpg',

      // public/images/creatine-2.jpg
      '/images/creatine-2.jpg',
    ],

    rating: { rate: 4.7, count: 320 },
  },

  {
    id: 3,
    title: 'BCAA Recovery Formula',
    price: 24.5,
    description:
      'BCAA с электролитами для быстрого восстановления, снижения усталости и защиты мышц.',
    category: 'bcaa',

    // public/images/bcaa.jpg
    image: '/images/bcaa_1.jpg',

    images: [
      // public/images/bcaa.jpg
      '/images/bcaa_1.jpg',

      // public/images/bcaa-2.jpg
      '/images/bcaa_2.jpg',
    ],

    rating: { rate: 4.6, count: 285 },
  },

  {
    id: 4,
    title: 'Pre-Workout Ignite',
    price: 33.75,
    description:
      'Сильный предтренировочный комплекс с кофеином, цитруллином и бета-аланином.',
    category: 'pre-workout',

    // public/images/preworkout.jpg
    image: '/images/ignite-1.jpg',

    images: [
      // public/images/preworkout.jpg
      '/images/ignite-1.jpg',

      // public/images/preworkout-2.jpg
      '/images/ignite-2.jpg',
    ],

    rating: { rate: 4.5, count: 410 },
  },

  {
    id: 5,
    title: 'Daily Vitamin Pack',
    price: 19.9,
    description:
      'Мультивитамины для поддержки иммунитета, энергии и восстановления после нагрузки.',
    category: 'vitamins',

    // public/images/daily-vitamin-pack-1.jpg
    image: '/images/daily-pack-2.jpg',

    images: [
      // public/images/daily-vitamin-pack-1.jpg
      '/images/daily-pack-2.jpg',

      // public/images/daily-vitamin-pack-2.jpg
      '/images/daily-pack-1.jpg',
    ],

    rating: { rate: 4.9, count: 678 },
  },

  {
    id: 6,
    title: 'Mass Gainer Stack',
    price: 52.0,
    description:
      'Калорийный гейнер для быстрого набора массы и увеличения мышечной массы.',
    category: 'weight gainers',

    // public/images/mass-gainer.jpg
    image: '/images/gainer-1.jpg',

    images: [
      // public/images/mass-gainer.jpg
      '/images/gainer-1.jpg',

      // public/images/mass-gainer-2.jpg
      '/images/gainer-2.jpg',
    ],

    rating: { rate: 4.4, count: 214 },
  },
]

export async function fetchProductsFromApi() {
  return sportsProducts
}

export async function fetchOrdersApi(userEmail) {
  return loadStoredOrders(userEmail)
}

export async function createOrderApi(order, userEmail) {
  const orders = loadStoredOrders(userEmail)

  const nextId = orders.length
    ? Math.max(...orders.map((item) => item.id)) + 1
    : 1

  const newOrder = {
    id: nextId,
    status: 'pending',
    ...order,
    userEmail: userEmail || null,
  }

  const updatedOrders = [newOrder, ...orders]

  saveStoredOrders(updatedOrders, userEmail)

  return newOrder
}

export async function updateOrderApi({ id, order }, userEmail) {
  const orders = loadStoredOrders(userEmail)

  const index = orders.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('Заказ не найден')
  }

  const updatedOrder = {
    ...orders[index],
    ...order,
  }

  orders[index] = updatedOrder

  saveStoredOrders(orders, userEmail)

  return updatedOrder
}

export async function deleteOrderApi(id, userEmail) {
  const orders = loadStoredOrders(userEmail)

  const updatedOrders = orders.filter((item) => item.id !== id)

  saveStoredOrders(updatedOrders, userEmail)
}