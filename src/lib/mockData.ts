import { faker } from '@faker-js/faker'

export interface MealResult {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  confidence: number
  imageUrl: string
  note: string
  createdAt: Date
}

export interface MemoryCard {
  caption: string
  imageUrl: string
  calories: number
  protein: number
  carbs: number
  fat: number
  aiThought: string
}

const foodImages = [
  'https://i.ibb.co/tTGYGF6C/Chat-GPT-Image-Jun-13-2026-12-38-31-AM.png',
]

export function generateMealResult(): MealResult {
  const meals = [
    { name: 'Avocado Toast', calories: 320, protein: 12, carbs: 28, fat: 18, ingredients: ['Sourdough bread', 'Avocado', 'Cherry tomatoes', 'Microgreens', 'Olive oil', 'Sea salt'] },
    { name: 'Caesar Salad', calories: 280, protein: 18, carbs: 14, fat: 16, ingredients: ['Romaine lettuce', 'Grilled chicken', 'Parmesan', 'Croutons', 'Caesar dressing'] },
    { name: 'Berry Smoothie Bowl', calories: 240, protein: 8, carbs: 42, fat: 6, ingredients: ['Mixed berries', 'Banana', 'Greek yogurt', 'Granola', 'Honey', 'Chia seeds'] },
    { name: 'Pasta Primavera', calories: 380, protein: 14, carbs: 52, fat: 12, ingredients: ['Penne', 'Zucchini', 'Bell peppers', 'Cherry tomatoes', 'Basil', 'Parmesan'] },
    { name: 'Matcha Latte', calories: 160, protein: 6, carbs: 20, fat: 7, ingredients: ['Matcha powder', 'Oat milk', 'Vanilla syrup', 'Ice'] },
    { name: 'Buddha Bowl', calories: 410, protein: 22, carbs: 44, fat: 16, ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Kale', 'Tahini dressing', 'Pumpkin seeds'] },
  ]

  const meal = faker.helpers.arrayElement(meals)
  return {
    id: faker.string.uuid(),
    ...meal,
    confidence: faker.number.int({ min: 78, max: 98 }),
    imageUrl: faker.helpers.arrayElement(foodImages),
    note: '',
    createdAt: new Date(),
  }
}

export const memoryCaptions: MemoryCard[] = [
  {
    caption: 'Teriyaki Salmon Rice Plate',
    imageUrl: 'https://i.ibb.co/ZRMD92P1/1.jpg',
    calories: 485,
    protein: 32,
    carbs: 44,
    fat: 18,
    aiThought: 'I can see a beautifully glazed salmon fillet resting on a bed of jasmine rice, with steamed broccoli and edamame on the side. The teriyaki glaze appears to be honey-based, adding about 60 calories. The portion looks moderate — roughly 6oz of salmon, 1 cup of rice. Estimated protein is high due to the salmon and edamame combination.',
  },
  {
    caption: 'Beef Avocado Potato Bowl',
    imageUrl: 'https://i.ibb.co/rR7D5xkm/2.jpg',
    calories: 625,
    protein: 38,
    carbs: 36,
    fat: 32,
    aiThought: 'This bowl has grilled beef strips, half an avocado, roasted potatoes, and arugula. The beef looks like flank steak, around 5oz. The avocado adds healthy fats but also significant calories. Potatoes appear roasted in olive oil. The arugula adds negligible calories but good micronutrients.',
  },
  {
    caption: 'Breakfast Egg & Ham Plate',
    imageUrl: 'https://i.ibb.co/wrPyBWnC/image.jpg',
    calories: 420,
    protein: 28,
    carbs: 22,
    fat: 24,
    aiThought: 'Two sunny-side-up eggs, a slice of ham, toasted sourdough, and a small side of mixed greens. The eggs are cooked in butter, adding about 100 calories from fat. The ham appears to be deli-style, around 3oz. The sourdough toast looks lightly buttered. A classic balanced breakfast.',
  },
  {
    caption: 'Keto Chicken Veggie Plate',
    imageUrl: 'https://i.ibb.co/prWrwM0b/Keto-Planning-Done-for-You.jpg',
    calories: 510,
    protein: 42,
    carbs: 14,
    fat: 34,
    aiThought: 'Grilled chicken thigh with roasted zucchini, bell peppers, and a creamy cauliflower mash. This is clearly a keto-friendly plate — high fat, moderate protein, very low carb. The chicken skin is nicely crisped. The cauliflower mash is likely made with butter and cream cheese, adding richness without the carbs.',
  },
  {
    caption: 'Tofu Rice Veggie Bowl',
    imageUrl: 'https://i.ibb.co/8nnvGznW/Lunchhhh.jpg',
    calories: 395,
    protein: 24,
    carbs: 48,
    fat: 14,
    aiThought: 'Crispy tofu cubes over brown rice with sautéed bok choy, shredded carrots, and a sesame ginger dressing. The tofu is pan-fried until golden, giving it a nice texture. Brown rice adds fiber. The dressing likely adds about 60 calories. A solid plant-based protein option.',
  },
  {
    caption: 'Bagel Sandwich Salad Plate',
    imageUrl: 'https://i.ibb.co/v6ZrPbK2/yummm.jpg',
    calories: 580,
    protein: 26,
    carbs: 52,
    fat: 28,
    aiThought: 'A toasted everything bagel sandwich with turkey, Swiss cheese, lettuce, tomato, and a side of mixed greens with vinaigrette. The bagel alone is around 280 calories. The turkey and cheese add protein. The side salad helps balance the meal. The vinaigrette looks like a balsamic, adding roughly 80 calories.',
  },
]

export function generateMockWeeklyData(): MealResult[] {
  const meals = [
    { name: 'Avocado Toast', calories: 320, protein: 12, carbs: 28, fat: 18, ingredients: ['Sourdough', 'Avocado', 'Tomatoes', 'Microgreens', 'Olive oil'] },
    { name: 'Caesar Salad', calories: 280, protein: 18, carbs: 14, fat: 16, ingredients: ['Romaine', 'Chicken', 'Parmesan', 'Croutons', 'Dressing'] },
    { name: 'Berry Smoothie Bowl', calories: 240, protein: 8, carbs: 42, fat: 6, ingredients: ['Berries', 'Banana', 'Yogurt', 'Granola', 'Chia'] },
    { name: 'Pasta Primavera', calories: 380, protein: 14, carbs: 52, fat: 12, ingredients: ['Penne', 'Zucchini', 'Peppers', 'Tomatoes', 'Basil'] },
    { name: 'Matcha Latte', calories: 160, protein: 6, carbs: 20, fat: 7, ingredients: ['Matcha', 'Oat milk', 'Vanilla'] },
    { name: 'Buddha Bowl', calories: 410, protein: 22, carbs: 44, fat: 16, ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Kale', 'Tahini'] },
    { name: 'Teriyaki Salmon', calories: 485, protein: 32, carbs: 44, fat: 18, ingredients: ['Salmon', 'Rice', 'Broccoli', 'Edamame', 'Teriyaki'] },
    { name: 'Egg & Ham Plate', calories: 420, protein: 28, carbs: 22, fat: 24, ingredients: ['Eggs', 'Ham', 'Sourdough', 'Greens'] },
  ]
  const now = new Date()
  const mockMeals: MealResult[] = []
  for (let d = 6; d >= 0; d--) {
    const date = new Date(now)
    date.setDate(date.getDate() - d)
    const mealsToday = faker.helpers.arrayElements(meals, faker.number.int({ min: 1, max: 3 }))
    mealsToday.forEach((m) => {
      date.setHours(faker.number.int({ min: 7, max: 20 }), faker.number.int({ min: 0, max: 59 }))
      mockMeals.push({
        id: faker.string.uuid(),
        ...m,
        confidence: faker.number.int({ min: 78, max: 98 }),
        imageUrl: faker.helpers.arrayElement(foodImages),
        note: '',
        createdAt: new Date(date),
      })
    })
  }
  return mockMeals
}

export function getSavedMeals(): MealResult[] {
  try {
    const raw = localStorage.getItem('calai_meals')
    if (raw) return JSON.parse(raw).map((m: MealResult) => ({ ...m, createdAt: new Date(m.createdAt) }))
  } catch {}
  return []
}

export function saveMeal(meal: MealResult) {
  const meals = getSavedMeals()
  meals.unshift(meal)
  localStorage.setItem('calai_meals', JSON.stringify(meals))
}

export function getWeeklyProgress() {
  const saved = getSavedMeals()
  const meals = saved.length > 0 ? saved : generateMockWeeklyData()
  const days: Record<string, { protein: number; carbs: number; fat: number; calories: number; meals: string[] }> = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en-US', { weekday: 'short' })
    days[key] = { protein: 0, carbs: 0, fat: 0, calories: 0, meals: [] }
  }
  meals.forEach((m) => {
    const d = new Date(m.createdAt)
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diff >= 0 && diff < 7) {
      const key = d.toLocaleDateString('en-US', { weekday: 'short' })
      if (days[key]) {
        days[key].protein += m.protein
        days[key].carbs += m.carbs
        days[key].fat += m.fat
        days[key].calories += m.calories
        days[key].meals.push(m.name)
      }
    }
  })
  return days
}
