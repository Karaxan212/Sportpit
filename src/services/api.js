import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

const ORDERS_STORAGE_KEY = 'fitfuel_orders'

const loadStoredOrders = () => {
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveStoredOrders = (orders) => {
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // ignore localStorage errors
  }
}

const sportsProducts = [
  {
    id: 1,
    title: 'Nitro Protein Blend',
    price: 45.99,
    description: 'Премиальный протеин для мышечного роста, силы и быстрого восстановления после тренировок.',
    category: 'protein',
    image: '/images/protein-1.svg',
    images: ['/images/protein-1.svg', '/images/protein-2.svg'],
    rating: { rate: 4.8, count: 542 },
  },
  {
    id: 2,
    title: 'Ultra Creatine Monohydrate',
    price: 29.99,
    description: 'Чистый креатин для повышения силы, выносливости и взрывной энергии на тренировке.',
    category: 'creatine',
    image: '/images/creatine-1.svg',
    images: ['/images/creatine-1.svg', '/images/creatine-2.svg'],
    rating: { rate: 4.7, count: 320 },
  },
  {
    id: 3,
    title: 'BCAA Recovery Formula',
    price: 24.5,
    description: 'BCAA с электролитами для быстрого восстановления, снижения усталости и защиты мышц.',
    category: 'bcaa',
    image: '/images/bcaa-1.svg',
    images: ['/images/bcaa-1.svg', '/images/bcaa-2.svg'],
    rating: { rate: 4.6, count: 285 },
  },
  {
    id: 4,
    title: 'Pre-Workout Ignite',
    price: 33.75,
    description: 'Сильный предтренировочный комплекс с кофеином, цитруллином и бета-аланином.',
    category: 'pre-workout',
    image: '/images/preworkout-1.svg',
    images: ['/images/preworkout-1.svg', '/images/preworkout-2.svg'],
    rating: { rate: 4.5, count: 410 },
  },
  {
    id: 5,
    title: 'Daily Vitamin Pack',
    price: 19.9,
    description: 'Мультивитамины для поддержки иммунитета, энергии и восстановления после нагрузки.',
    category: 'vitamins',
    image: '/images/vitamins-1.svg',
    images: ['/images/vitamins-1.svg', '/images/vitamins-2.svg'],
    rating: { rate: 4.9, count: 678 },
  },
  {
    id: 6,
    title: 'Mass Gainer Stack',
    price: 52.0,
    description: 'Калорийный гейнер для быстрого набора массы и увеличения мышечной массы.',
    category: 'weight gainers',
    image: '/images/massgainer-1.svg',
    images: ['/images/massgainer-1.svg', '/images/massgainer-2.svg'],
    rating: { rate: 4.4, count: 214 },
  },
]

export async function fetchProductsFromApi() {
  return sportsProducts
}

export async function fetchOrdersApi() {
  return loadStoredOrders()
}

export async function createOrderApi(order) {
  const orders = loadStoredOrders()
  const nextId = orders.length ? Math.max(...orders.map((item) => item.id)) + 1 : 1
  const newOrder = {
    id: nextId,
    status: 'pending',
    ...order,
  }
  const updatedOrders = [newOrder, ...orders]
  saveStoredOrders(updatedOrders)
  return newOrder
}

export async function updateOrderApi({ id, order }) {
  const orders = loadStoredOrders()
  const index = orders.findIndex((item) => item.id === id)
  if (index === -1) {
    throw new Error('Заказ не найден')
  }
  const updatedOrder = {
    ...orders[index],
    ...order,
  }
  orders[index] = updatedOrder
  saveStoredOrders(orders)
  return updatedOrder
}

export async function deleteOrderApi(id) {
  const orders = loadStoredOrders()
  const updatedOrders = orders.filter((item) => item.id !== id)
  saveStoredOrders(updatedOrders)
}

