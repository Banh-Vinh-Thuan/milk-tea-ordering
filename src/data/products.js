// ===== PRODUCT DATA =====
const PRODUCTS = [
  // ===== MILK TEA =====
  {
    id: 1, category: "milk-tea",
    name: "Classic Milk Tea",
    desc: "Rich black tea blended with creamy fresh milk — the timeless favorite that started it all.",
    emoji: "🧋",
    price: 3.5, badge: "best",
    image: "public/images/1.png"
  },
  {
    id: 2, category: "milk-tea",
    name: "Chocolate Milk Tea",
    desc: "Velvety chocolate meets bold tea in a dreamy, indulgent blend for chocolate lovers.",
    emoji: "🍫",
    price: 3.9, badge: null,
    image: "public/images/2.png"
  },
  {
    id: 3, category: "milk-tea",
    name: "Peach Milk Tea",
    desc: "Juicy peach infusion with silky milk tea — a light, fruity twist on a classic.",
    emoji: "🍑",
    price: 4.0, badge: "new",
    image: "public/images/3.png"
  },
  {
    id: 4, category: "milk-tea",
    name: "Hong Kong Milk Tea",
    desc: "Traditional HK-style strong brewed tea with full-fat evaporated milk, silky smooth.",
    emoji: "🏙️",
    price: 3.8, badge: null,
    image: "public/images/4.png"
  },
  {
    id: 5, category: "milk-tea",
    name: "Taro Milk Tea",
    desc: "Earthy, nutty taro root blended into a beautiful purple milk tea, naturally sweet.",
    emoji: "💜",
    price: 4.2, badge: "best",
    image: "public/images/5.png"
  },

  // ===== TEA =====
  {
    id: 6, category: "tea",
    name: "Honey Jasmine Tea",
    desc: "Delicate jasmine blossoms steeped with golden honey, refreshing and aromatic.",
    emoji: "🌸",
    price: 3.2, badge: null,
    image: "public/images/6.png"
  },
  {
    id: 7, category: "tea",
    name: "Four Seasons Oolong",
    desc: "Premium Four Seasons oolong with a floral bouquet and refreshing clean finish.",
    emoji: "🍃",
    price: 3.5, badge: "best",
    image: "public/images/7.png"
  },
  {
    id: 8, category: "tea",
    name: "Pink Guava Tea",
    desc: "Tropical pink guava blended with light tea — fruity, vibrant, and utterly refreshing.",
    emoji: "🌺",
    price: 3.8, badge: "new",
    image: "public/images/8.png"
  },
  {
    id: 9, category: "tea",
    name: "Plum Orange Tea",
    desc: "Tangy preserved plum meets citrusy orange in a uniquely bold sweet-sour tea.",
    emoji: "🍊",
    price: 3.6, badge: null,
    image: "public/images/9.png"
  },
  {
    id: 10, category: "tea",
    name: "Lychee Green Tea",
    desc: "Light and fragrant lychee paired with fresh green tea, sweet with a floral hint.",
    emoji: "🍈",
    price: 3.4, badge: null,
    image: "public/images/10.png"
  },

  // ===== CHEESE FOAM =====
  {
    id: 11, category: "cheese",
    name: "Fresh Cheese Milk Tea",
    desc: "Creamy salted cheese foam floated over smooth milk tea — savory meets sweet perfection.",
    emoji: "🧀",
    price: 4.5, badge: "best",
    image: "public/images/11.png"
  },
  {
    id: 12, category: "cheese",
    name: "Matcha Cheese Latte",
    desc: "Earthy premium matcha crowned with fluffy cream cheese foam, a modern classic.",
    emoji: "🍵",
    price: 4.8, badge: null,
    image: "public/images/12.png"
  },
  {
    id: 13, category: "cheese",
    name: "Tiramisu Milk Tea",
    desc: "Espresso-soaked ladyfinger vibes in a silky milk tea with mascarpone cheese foam.",
    emoji: "☕",
    price: 5.0, badge: "new",
    image: "public/images/13.png"
  },
  {
    id: 14, category: "cheese",
    name: "Brûlée Matcha Egg Cream",
    desc: "Matcha base with torched egg custard cream — a showstopper in every sip.",
    emoji: "🔥",
    price: 5.2, badge: "new",
    image: "public/images/14.png"
  },
];

const TOPPINGS = [
  { id: "tapioca", name: "Tapioca Pearls", icon: "⚫", price: 0.5 },
  { id: "jelly", name: "Jelly", icon: "🟩", price: 0.5 },
  { id: "cheese", name: "Cheese Foam", icon: "🤍", price: 0.8 },
  { id: "pudding", name: "Egg Pudding", icon: "🟡", price: 0.7 },
  { id: "aloe", name: "Aloe Vera", icon: "🌿", price: 0.5 },
];

const SUGAR_LEVELS = ["0%", "25%", "50%", "75%", "100%"];

const ICE_LEVELS = ["No Ice", "Less Ice", "Regular", "Extra Ice"];

const SIZES = [
  { label: "M", volume: "400ml", priceAdd: 0 },
  { label: "L", volume: "550ml", priceAdd: 0.7 },
];