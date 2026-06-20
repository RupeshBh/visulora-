export type PromptCard = {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  createdDaysAgo: number;
  aspect: "tall" | "square" | "landscape" | "wide";
  prompt: string;
  model?: string;
  tags: string[];
};

export const CATEGORIES = [
  "All",
  "Cinematic",
  "Fashion & Editorial",
  "Portrait",
  "Anime & Illustration",
  "Architecture",
  "Product Ads",
  "Nature & Landscape",
  "Viral / Trending",
  "Poster Design",
  "Dark & Moody",
  "Minimal Abstract",
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

const ASPECTS: PromptCard["aspect"][] = ["tall", "landscape", "tall", "square", "landscape", "tall"];

type Seed = {
  title: string;
  imageId: string;
  prompt: string;
  model: string;
  tags: string[];
  likes: number;
  views: number;
  createdDaysAgo: number;
};

const make = (cat: string, seeds: Seed[]): PromptCard[] =>
  seeds.map((s, i) => ({
    id: `${cat.replace(/\W+/g, "-").toLowerCase()}-${i}`,
    title: s.title,
    category: cat,
    image: img(s.imageId),
    likes: s.likes,
    views: s.views,
    createdDaysAgo: s.createdDaysAgo,
    aspect: ASPECTS[i % ASPECTS.length],
    prompt: s.prompt,
    model: s.model,
    tags: s.tags,
  }));

const CINEMATIC = make("Cinematic", [
  {
    title: "Neon Rain Tokyo Night",
    imageId: "photo-1601042879364-f3947d3f9c16",
    prompt:
      "A rain-soaked Tokyo street at midnight, neon kanji signs reflecting in wet asphalt, anamorphic lens flare, deep cyan and magenta palette, lone figure with translucent umbrella, cinematic 35mm, Blade Runner 2049 color grade, volumetric mist, hyper-detailed, shot on Arri Alexa --ar 2:3 --style raw",
    model: "Midjourney v6",
    tags: ["cinematic", "neon", "rain", "tokyo"],
    likes: 12400,
    views: 184000,
    createdDaysAgo: 21,
  },
  {
    title: "Open-Air Cinema Glow",
    imageId: "photo-1649511125503-3b23dc239c96",
    prompt:
      "Crowd silhouettes waiting outside a 1970s movie palace, marquee glowing peach and crimson, soft halation around the lights, Kodak Vision3 500T film stock emulation, 35mm anamorphic, light steam in the air --ar 2:3",
    model: "FLUX 1.1 Pro",
    tags: ["cinematic", "film", "marquee", "35mm"],
    likes: 3200,
    views: 41000,
    createdDaysAgo: 3,
  },
  {
    title: "Arcade Sugar Dreams",
    imageId: "photo-1761769828786-ceed0b0af562",
    prompt:
      "Wes Anderson symmetry, pastel arcade with donuts and ice cream, head-on composition, soft window light, candy palette of mint, cream and salmon, ektachrome film, perfect centering --ar 3:2",
    model: "Midjourney v6",
    tags: ["cinematic", "pastel", "wes anderson"],
    likes: 8900,
    views: 121000,
    createdDaysAgo: 9,
  },
  {
    title: "Crimson Neon Diner",
    imageId: "photo-1598737592699-10aa416c9ffd",
    prompt:
      "Late-night American diner exterior, red and blue neon signage cutting through fog, low angle wide shot, cinematic 2.39:1, deep shadow, hopper-esque mood, motion-blurred passing taillight --ar 21:9",
    model: "FLUX 1.1 Pro",
    tags: ["cinematic", "neon", "diner"],
    likes: 5600,
    views: 78000,
    createdDaysAgo: 14,
  },
  {
    title: "Hong Kong Sign Forest",
    imageId: "photo-1773026361432-1f44264b8478",
    prompt:
      "Vertical cascade of neon signs in Mong Kok, monsoon humidity, reflective puddles, candid street level perspective, Christopher Doyle color grade, slight motion blur --ar 4:5",
    model: "Midjourney v6",
    tags: ["cinematic", "hong kong", "neon", "street"],
    likes: 7800,
    views: 96000,
    createdDaysAgo: 1,
  },
  {
    title: "Lonely Wooden Storefront",
    imageId: "photo-1601826704307-d25d023918e4",
    prompt:
      "Single lit wooden storefront at 3am in a rural Japanese town, warm tungsten spilling onto wet stone, cinematic stillness, 50mm f/2, Kodak Portra 400 emulation --ar 2:3",
    model: "DALL·E 3",
    tags: ["cinematic", "japan", "night"],
    likes: 2100,
    views: 28000,
    createdDaysAgo: 5,
  },
]);

const FASHION = make("Fashion & Editorial", [
  {
    title: "Desert Editorial Couture",
    imageId: "photo-1770576907032-df6e0c689f53",
    prompt:
      "High fashion editorial in the dunes of Namibia, model in flowing copper silk gown trailing in the wind, golden hour rim light, Hasselblad medium format, Vogue Italia aesthetic --ar 4:3",
    model: "FLUX 1.1 Pro",
    tags: ["fashion", "editorial", "desert"],
    likes: 9200,
    views: 142000,
    createdDaysAgo: 11,
  },
  {
    title: "Tailored Shadow Suit",
    imageId: "photo-1603189343302-e603f7add05a",
    prompt:
      "Sharp menswear editorial, model in cropped black suit, hard split light from camera right, dust particles in beam, GQ cover styling, Hasselblad H6D --ar 4:5",
    model: "Midjourney v6",
    tags: ["fashion", "menswear", "editorial"],
    likes: 4400,
    views: 52000,
    createdDaysAgo: 2,
  },
  {
    title: "White Linen Twins",
    imageId: "photo-1570733117311-d990c3816c47",
    prompt:
      "Two models in oversized white linen shirts laid out on cracked salt flats, top-down composition, harsh midday light softened by gauze, minimal Jil Sander aesthetic --ar 3:2",
    model: "FLUX 1.1 Pro",
    tags: ["fashion", "minimal", "linen"],
    likes: 6700,
    views: 88000,
    createdDaysAgo: 17,
  },
  {
    title: "Scarlet Silk Movement",
    imageId: "photo-1662532577856-e8ee8b138a8b",
    prompt:
      "Model spinning in floor-length scarlet silk gown against pale concrete, motion blur on fabric only, 1/30 shutter, Annie Leibovitz lighting, Vogue Italia --ar 2:3",
    model: "Midjourney v6",
    tags: ["fashion", "movement", "red"],
    likes: 11200,
    views: 174000,
    createdDaysAgo: 25,
  },
  {
    title: "Crimson Stairwell Power Suit",
    imageId: "photo-1580478491436-fd6a937acc9e",
    prompt:
      "Editorial portrait, woman in red oversized blazer seated on brutalist stairwell, low warm key, candid posture, shot on Mamiya 7 II Portra 800 --ar 2:3",
    model: "FLUX 1.1 Pro",
    tags: ["fashion", "editorial", "red"],
    likes: 5300,
    views: 71000,
    createdDaysAgo: 6,
  },
  {
    title: "Smoke & Grey Scarf",
    imageId: "photo-1613915617430-8ab0fd7c6baf",
    prompt:
      "Mysterious editorial portrait, woman holding grey silk scarf across face, monochrome palette, hard side light, mood of Helmut Newton, square format --ar 1:1",
    model: "Midjourney v6",
    tags: ["fashion", "monochrome", "editorial"],
    likes: 3900,
    views: 47000,
    createdDaysAgo: 4,
  },
]);

const PORTRAIT = make("Portrait", [
  {
    title: "Freckled Natural Light Portrait",
    imageId: "photo-1552699611-e2c208d5d9cf",
    prompt:
      "Close-up portrait of a young woman with copper freckles, soft north window light, shallow depth of field, 85mm f/1.4, skin texture preserved, muted desaturated palette --ar 3:4 --style raw",
    model: "Midjourney v6",
    tags: ["portrait", "natural light", "85mm"],
    likes: 13100,
    views: 198000,
    createdDaysAgo: 30,
  },
  {
    title: "Grayscale Quiet",
    imageId: "photo-1506863530036-1efeddceb993",
    prompt:
      "Black and white portrait of woman with delicate necklace, soft fill from camera left, contemplative gaze offscreen, Leica M11 Monochrom 50mm Summilux --ar 4:3",
    model: "FLUX 1.1 Pro",
    tags: ["portrait", "monochrome"],
    likes: 4800,
    views: 64000,
    createdDaysAgo: 8,
  },
  {
    title: "Golden Hour Whisper",
    imageId: "photo-1568038479111-87bf80659645",
    prompt:
      "Profile portrait of blonde woman caught in low setting sun, hair backlit into halo, 105mm f/1.4, skin tones warm but natural --ar 2:3",
    model: "Midjourney v6",
    tags: ["portrait", "golden hour"],
    likes: 9700,
    views: 132000,
    createdDaysAgo: 1,
  },
  {
    title: "Studio Black Tank",
    imageId: "photo-1606143412458-acc5f86de897",
    prompt:
      "Editorial studio portrait, woman in black tank against deep slate backdrop, single softbox 45 degrees, Phase One IQ4 --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["portrait", "studio"],
    likes: 2900,
    views: 36000,
    createdDaysAgo: 12,
  },
  {
    title: "Window Seat Stillness",
    imageId: "photo-1532170579297-281918c8ae72",
    prompt:
      "Candid portrait, woman in soft v-neck near rain-flecked window, overcast diffuse light, Cinestill 800T look, slow shutter --ar 3:2",
    model: "Midjourney v6",
    tags: ["portrait", "moody", "rain"],
    likes: 5400,
    views: 69000,
    createdDaysAgo: 19,
  },
  {
    title: "Sage & Linen",
    imageId: "photo-1581841064838-a470c740e8ee",
    prompt:
      "Editorial portrait in wide-brimmed black hat and sage linen, painted backdrop, painterly Rembrandt lighting, medium format Pentax 645z --ar 2:3",
    model: "DALL·E 3",
    tags: ["portrait", "painterly"],
    likes: 3600,
    views: 44000,
    createdDaysAgo: 0,
  },
]);

const ANIME = make("Anime & Illustration", [
  {
    title: "Studio Ghibli Forest Spirit",
    imageId: "photo-1713107100898-793f1628c407",
    prompt:
      "Ghibli-inspired enchanted forest at twilight, glowing spirit horse on a moss path, watercolor textures, layered foliage, fireflies, Miyazaki palette --ar 4:3 --niji 6",
    model: "Niji Journey 6",
    tags: ["anime", "ghibli", "watercolor"],
    likes: 18200,
    views: 240000,
    createdDaysAgo: 27,
  },
  {
    title: "Cherry Petal Wanderer",
    imageId: "photo-1668000175007-955225a2d1c9",
    prompt:
      "Stylized anime girl with red blossom in hair, soft cell shading, pastel painterly background, gentle wind, Makoto Shinkai mood, 4k illustration --ar 2:3 --niji 6",
    model: "Niji Journey 6",
    tags: ["anime", "shinkai", "spring"],
    likes: 14600,
    views: 195000,
    createdDaysAgo: 2,
  },
  {
    title: "Abstract Pop Burst",
    imageId: "photo-1581833971358-2c8b550f87b3",
    prompt:
      "Vibrant pop illustration, bold primary palette, dynamic brush dynamics, modern editorial illustration in style of Malika Favre --ar 3:2",
    model: "DALL·E 3",
    tags: ["illustration", "pop", "bold"],
    likes: 3100,
    views: 39000,
    createdDaysAgo: 10,
  },
  {
    title: "Pixel Sage",
    imageId: "photo-1653723367970-ae966c1b803e",
    prompt:
      "Cyberpunk pixel art portrait of a bearded man, 64x96 grid, dithered shading, vaporwave palette, retro CRT scanlines --ar 2:3",
    model: "Stable Diffusion XL",
    tags: ["illustration", "pixel", "cyberpunk"],
    likes: 4900,
    views: 58000,
    createdDaysAgo: 5,
  },
  {
    title: "Anime Sticker Mood",
    imageId: "photo-1779624431957-6c7662f84e7a",
    prompt:
      "Glossy anime sticker character with chunky outlines, vinyl shine on edges, set on a desk flatlay, kawaii palette --ar 3:2 --niji 6",
    model: "Niji Journey 6",
    tags: ["anime", "sticker", "kawaii"],
    likes: 6800,
    views: 91000,
    createdDaysAgo: 0,
  },
  {
    title: "Glass Fracture Hero",
    imageId: "photo-1768327239938-e58c33dc4707",
    prompt:
      "Hero illustration, refracted shattered glass over abstract figure, monochrome, sharp specular highlights, key art for indie game cover --ar 16:9",
    model: "FLUX 1.1 Pro",
    tags: ["illustration", "key art", "monochrome"],
    likes: 5200,
    views: 64000,
    createdDaysAgo: 22,
  },
]);

const ARCH = make("Architecture", [
  {
    title: "Brutalist Concrete Interior",
    imageId: "photo-1625390711106-3728815ebcd9",
    prompt:
      "Brutalist concrete cathedral interior, board-formed walls, oversized slit windows casting hard sunlight stripes, Tadao Ando influence --ar 16:10",
    model: "Midjourney v6",
    tags: ["architecture", "brutalist"],
    likes: 7200,
    views: 94000,
    createdDaysAgo: 23,
  },
  {
    title: "Casa Blanca Geometry",
    imageId: "photo-1628012209120-d9db7abf7eab",
    prompt:
      "White stucco modernist house, deep cobalt sky, single shadow line across facade, architectural photography, 24mm tilt-shift --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["architecture", "minimal", "white"],
    likes: 4100,
    views: 56000,
    createdDaysAgo: 7,
  },
  {
    title: "Stacked Modernist Volumes",
    imageId: "photo-1614595737476-42487331b8a1",
    prompt:
      "Cantilevered concrete volumes against pure cyan sky, low angle, vanishing lines, Brazilian modernism, Oscar Niemeyer --ar 3:4",
    model: "Midjourney v6",
    tags: ["architecture", "modernist"],
    likes: 5500,
    views: 71000,
    createdDaysAgo: 1,
  },
  {
    title: "Folded Concrete Shell",
    imageId: "photo-1531591022136-eb8b0da1e6d0",
    prompt:
      "Abstract architectural close-up of folded concrete shell, chiaroscuro, monochrome, very large format, gallery print quality --ar 4:3",
    model: "FLUX 1.1 Pro",
    tags: ["architecture", "abstract"],
    likes: 2400,
    views: 31000,
    createdDaysAgo: 14,
  },
  {
    title: "Stair to Nothing",
    imageId: "photo-1549791084-5f78368b208b",
    prompt:
      "Hidden Mediterranean staircase climbing a blank white facade, single thin shadow, surreal stillness, midday clarity --ar 2:3",
    model: "Midjourney v6",
    tags: ["architecture", "white", "surreal"],
    likes: 6300,
    views: 82000,
    createdDaysAgo: 4,
  },
  {
    title: "Adobe Heritage",
    imageId: "photo-1554793000-245d3a3c2a51",
    prompt:
      "Sun-baked adobe village structure, terracotta and ochre, raking sunset light, ethnographic photography, Pentax 67 --ar 16:9",
    model: "DALL·E 3",
    tags: ["architecture", "adobe", "warm"],
    likes: 3300,
    views: 41000,
    createdDaysAgo: 16,
  },
]);

const PRODUCT = make("Product Ads", [
  {
    title: "Liquid Amber Pour",
    imageId: "photo-1654973433534-1238e06f6b38",
    prompt:
      "Hero product shot, crystal glass with amber liquid mid-pour, splash frozen at 1/8000s, dark seamless backdrop, hard backlit rim --ar 2:3",
    model: "FLUX 1.1 Pro",
    tags: ["product", "liquid", "macro"],
    likes: 4700,
    views: 61000,
    createdDaysAgo: 9,
  },
  {
    title: "Serum Drop Macro",
    imageId: "photo-1764694187667-f28a05a52c0e",
    prompt:
      "Cosmetic serum dropper releasing single droplet into open glass bottle, gradient lavender backdrop, glossy surface reflection, beauty editorial --ar 4:5",
    model: "Midjourney v6",
    tags: ["product", "beauty", "serum"],
    likes: 5100,
    views: 67000,
    createdDaysAgo: 2,
  },
  {
    title: "Lilac Ribbon Jar",
    imageId: "photo-1770034285743-c463411cd660",
    prompt:
      "Pastel lilac cosmetic jar on cylindrical pedestal, soft satin ribbon flowing, candy palette, beauty packaging hero --ar 1:1",
    model: "FLUX 1.1 Pro",
    tags: ["product", "beauty", "pastel"],
    likes: 3400,
    views: 42000,
    createdDaysAgo: 0,
  },
  {
    title: "Stacked Stone Skincare",
    imageId: "photo-1779228900994-5b055597a0ec",
    prompt:
      "Skincare bottle balanced on rough textured blocks, neutral sand backdrop, soft directional light, organic luxury feel --ar 4:5",
    model: "Midjourney v6",
    tags: ["product", "skincare", "neutral"],
    likes: 2600,
    views: 33000,
    createdDaysAgo: 13,
  },
  {
    title: "Silver Lid Cream",
    imageId: "photo-1764694071508-e4b1efcd39bc",
    prompt:
      "Premium white face cream jar with brushed silver lid, dewdrop highlights, midnight blue gradient, hero ad --ar 3:4",
    model: "FLUX 1.1 Pro",
    tags: ["product", "luxury", "skincare"],
    likes: 1900,
    views: 24000,
    createdDaysAgo: 6,
  },
  {
    title: "Midnight Fragrance",
    imageId: "photo-1774682060997-f8959850a7d4",
    prompt:
      "Crystal perfume bottle on draped black silk, single warm rim light, smoky reflections, fragrance campaign --ar 2:3",
    model: "Midjourney v6",
    tags: ["product", "fragrance", "dark"],
    likes: 7200,
    views: 93000,
    createdDaysAgo: 24,
  },
]);

const NATURE = make("Nature & Landscape", [
  {
    title: "Iceland Volcanic Coast",
    imageId: "photo-1504858700536-882c978a3464",
    prompt:
      "Black sand beach and basalt sea stacks, low fog rolling, long exposure smoothing the surf, ND1000 filter, Iceland --ar 3:2",
    model: "Midjourney v6",
    tags: ["nature", "iceland", "long exposure"],
    likes: 11800,
    views: 162000,
    createdDaysAgo: 18,
  },
  {
    title: "Aurora Over Glacier",
    imageId: "photo-1488415032361-b7e238421f1b",
    prompt:
      "Emerald aurora borealis arcing over snow-capped volcanic ridge, Milky Way faintly visible, 14mm f/1.8, 8s exposure --ar 3:2",
    model: "FLUX 1.1 Pro",
    tags: ["nature", "aurora", "night sky"],
    likes: 24100,
    views: 314000,
    createdDaysAgo: 1,
  },
  {
    title: "Violet Sky Summit",
    imageId: "photo-1637055972140-64608c1abe53",
    prompt:
      "Snow-covered peak under green-to-purple aurora gradient, untouched fresh snow, no human element, painterly composition --ar 3:2",
    model: "Midjourney v6",
    tags: ["nature", "aurora", "snow"],
    likes: 9300,
    views: 121000,
    createdDaysAgo: 11,
  },
  {
    title: "Mirror Lake Aurora",
    imageId: "photo-1485724417692-19b9fb72d5ce",
    prompt:
      "Perfect mirror lake reflecting aurora and mountain silhouette, perfect symmetry, long exposure --ar 3:2",
    model: "FLUX 1.1 Pro",
    tags: ["nature", "reflection", "aurora"],
    likes: 13700,
    views: 178000,
    createdDaysAgo: 26,
  },
  {
    title: "Cobalt Alpine Solitude",
    imageId: "photo-1604240400568-c50e9a0f518f",
    prompt:
      "Single snow-covered peak against deep cobalt clear sky, midday, Sony A7R V 70-200 GM --ar 4:5",
    model: "Midjourney v6",
    tags: ["nature", "alpine", "minimal"],
    likes: 4200,
    views: 53000,
    createdDaysAgo: 5,
  },
  {
    title: "Polar Light Lake",
    imageId: "photo-1647292545204-1c537d2ffb71",
    prompt:
      "Vivid blue and green aurora dancing over still arctic lake, foreground rocks, panoramic crop --ar 21:9",
    model: "DALL·E 3",
    tags: ["nature", "aurora", "panoramic"],
    likes: 8100,
    views: 102000,
    createdDaysAgo: 0,
  },
]);

const VIRAL = make("Viral / Trending", [
  {
    title: "Bioluminescent Ocean Wave",
    imageId: "photo-1594814532732-37c265b0dd3c",
    prompt:
      "Bioluminescent plankton glowing electric blue inside a curling wave at midnight, long exposure, deep navy sky with milky way --ar 21:9",
    model: "FLUX 1.1 Pro",
    tags: ["trending", "ocean", "bioluminescent"],
    likes: 32400,
    views: 482000,
    createdDaysAgo: 3,
  },
  {
    title: "Polaroid in the Rain",
    imageId: "photo-1552168324-d612d77725e3",
    prompt:
      "Hands holding Polaroid SX-70 in rain, raindrops on print, blurred neon street behind, vintage analog mood --ar 4:5",
    model: "Midjourney v6",
    tags: ["trending", "polaroid", "analog"],
    likes: 19800,
    views: 271000,
    createdDaysAgo: 0,
  },
  {
    title: "Yellow Mic Glow Pop",
    imageId: "photo-1623577284502-d65cdc6ba0b6",
    prompt:
      "TikTok-ready portrait, woman in canary shirt holding silver mic, magenta backdrop gradient, single softbox, glossy pop look --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["trending", "pop", "portrait"],
    likes: 14200,
    views: 198000,
    createdDaysAgo: 1,
  },
  {
    title: "Powder Burst Pose",
    imageId: "photo-1582975854265-f817d2bae69f",
    prompt:
      "Action portrait, man in green windbreaker throwing white powder into air, freeze frame 1/2000s, navy backdrop --ar 2:3",
    model: "Midjourney v6",
    tags: ["trending", "powder", "action"],
    likes: 9800,
    views: 134000,
    createdDaysAgo: 4,
  },
  {
    title: "Magazine on Fire",
    imageId: "photo-1568405759739-6c2a831dda1e",
    prompt:
      "Woman holding burning magazine, sparks captured in midair, dark grungy backdrop, defiant editorial energy --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["trending", "fire", "editorial"],
    likes: 21300,
    views: 298000,
    createdDaysAgo: 2,
  },
  {
    title: "Street Sit-Down Cool",
    imageId: "photo-1603755089999-8ce25221f34b",
    prompt:
      "Streetwear sit-down portrait on concrete steps, hard sun, candid pose, 50mm street fashion, Drake-era cool --ar 2:3",
    model: "Midjourney v6",
    tags: ["trending", "street", "streetwear"],
    likes: 7400,
    views: 96000,
    createdDaysAgo: 8,
  },
]);

const POSTER = make("Poster Design", [
  {
    title: "Retro Sci-Fi Movie Poster",
    imageId: "photo-1760693318333-d3ae15709511",
    prompt:
      "1970s retro-futurist sci-fi film poster, geometric brutalist architecture reflected in dusk water, twin suns, airbrush illustration, Drew Struzan influence --ar 2:3",
    model: "DALL·E 3",
    tags: ["poster", "retro", "sci-fi"],
    likes: 6500,
    views: 84000,
    createdDaysAgo: 12,
  },
  {
    title: "Stay Hungry Typography",
    imageId: "photo-1609605348579-3123e3d40eb8",
    prompt:
      "Bold editorial typography poster, condensed grotesk, single phrase, off-white risograph paper texture, ink registration --ar 2:3",
    model: "Midjourney v6",
    tags: ["poster", "typography", "riso"],
    likes: 3900,
    views: 50000,
    createdDaysAgo: 5,
  },
  {
    title: "Asian Print Collage",
    imageId: "photo-1764986313370-8d328885aa53",
    prompt:
      "Vintage Asian magazine collage poster, layered halftone prints, scotch tape edges, designer zine aesthetic --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["poster", "collage", "vintage"],
    likes: 4700,
    views: 58000,
    createdDaysAgo: 0,
  },
  {
    title: "Statement Overlay",
    imageId: "photo-1771605009575-416e89d6e52e",
    prompt:
      "Grayscale abstract figure with bold yellow type overlay, swiss design grid, dieter rams discipline --ar 3:4",
    model: "Midjourney v6",
    tags: ["poster", "swiss", "type"],
    likes: 2300,
    views: 28000,
    createdDaysAgo: 16,
  },
  {
    title: "The Game Is Rigged",
    imageId: "photo-1758923530325-00b4ff765e9e",
    prompt:
      "Protest aesthetic poster, halftone portrait of man, slogan typography, two color screen print, weathered edges --ar 4:5",
    model: "FLUX 1.1 Pro",
    tags: ["poster", "protest", "screen print"],
    likes: 5800,
    views: 73000,
    createdDaysAgo: 3,
  },
  {
    title: "City Wheatpaste Wall",
    imageId: "photo-1770274484406-09405c9c01df",
    prompt:
      "Dense urban wheatpaste wall covered in band posters, torn edges, layered timeline, Berlin Mitte vibe --ar 3:2",
    model: "Midjourney v6",
    tags: ["poster", "urban", "wheatpaste"],
    likes: 3100,
    views: 39000,
    createdDaysAgo: 19,
  },
]);

const DARK = make("Dark & Moody", [
  {
    title: "Crimson Velvet Fashion",
    imageId: "photo-1626123675132-f8a75dad8454",
    prompt:
      "Macro-detail crimson velvet drape lit by single low-key red gel, chiaroscuro contrast, baroque mood, dust particles in beam --ar 3:4 --style raw",
    model: "FLUX 1.1 Pro",
    tags: ["dark", "moody", "velvet"],
    likes: 8200,
    views: 108000,
    createdDaysAgo: 22,
  },
  {
    title: "Crumpled Black Silk",
    imageId: "photo-1618022325802-7e5e732d97a1",
    prompt:
      "Macro of crumpled jet-black silk fabric, raking key light, hyper-detailed thread structure, gallery print quality --ar 4:5",
    model: "Midjourney v6",
    tags: ["dark", "fabric", "macro"],
    likes: 4400,
    views: 56000,
    createdDaysAgo: 1,
  },
  {
    title: "Stormwater Horizon",
    imageId: "photo-1478760329108-5c3ed9d495a0",
    prompt:
      "Moody seascape, charcoal sky bleeding into onyx water, single distant break, fine art black and white --ar 3:2",
    model: "FLUX 1.1 Pro",
    tags: ["dark", "seascape", "fine art"],
    likes: 6900,
    views: 91000,
    createdDaysAgo: 7,
  },
  {
    title: "Pure Obsidian",
    imageId: "photo-1578662996442-48f60103fc96",
    prompt:
      "Almost-pure black abstract minimal composition with single luminance gradient corner, fine art --ar 1:1",
    model: "Midjourney v6",
    tags: ["dark", "minimal"],
    likes: 1800,
    views: 22000,
    createdDaysAgo: 14,
  },
  {
    title: "Tide Erasing Footprint",
    imageId: "photo-1545486332-9e0999c535b2",
    prompt:
      "Top-down black and white minimal abstract of water meeting black sand, single texture line, contemplative --ar 2:3",
    model: "FLUX 1.1 Pro",
    tags: ["dark", "minimal", "monochrome"],
    likes: 3200,
    views: 40000,
    createdDaysAgo: 0,
  },
  {
    title: "Onyx Linen Stillness",
    imageId: "photo-1618123069754-cd64c230a169",
    prompt:
      "Black linen still life on dark walnut, single side light, painterly dutch master mood --ar 2:3",
    model: "Midjourney v6",
    tags: ["dark", "still life", "moody"],
    likes: 2700,
    views: 33000,
    createdDaysAgo: 4,
  },
]);

const MINIMAL = make("Minimal Abstract", [
  {
    title: "Blue Hemisphere",
    imageId: "photo-1622547748225-3fc4abd2cca0",
    prompt:
      "Single blue hemisphere on off-white field, soft shadow, swiss minimalism, gradient halo, design system hero --ar 16:9",
    model: "FLUX 1.1 Pro",
    tags: ["minimal", "abstract", "blue"],
    likes: 4900,
    views: 63000,
    createdDaysAgo: 6,
  },
  {
    title: "Polka Linen",
    imageId: "photo-1605106702842-01a887a31122",
    prompt:
      "Repeating navy dot pattern on cream linen, soft directional sun, design system texture --ar 2:3",
    model: "Midjourney v6",
    tags: ["minimal", "pattern"],
    likes: 2100,
    views: 26000,
    createdDaysAgo: 13,
  },
  {
    title: "Folded Heart Paper",
    imageId: "photo-1604782206219-3b9576575203",
    prompt:
      "Two folded paper hearts in cocoa and noir, top-down studio, minimal composition --ar 3:4",
    model: "Midjourney v6",
    tags: ["minimal", "paper"],
    likes: 1700,
    views: 21000,
    createdDaysAgo: 2,
  },
  {
    title: "Sphere & Cone",
    imageId: "photo-1710244182004-1c708b3f146d",
    prompt:
      "Yellow sphere and pink cone on cobalt seamless, hard shadow at 45 degrees, brutalist minimal still life --ar 2:3",
    model: "FLUX 1.1 Pro",
    tags: ["minimal", "geometric"],
    likes: 6100,
    views: 79000,
    createdDaysAgo: 0,
  },
  {
    title: "Letter Block Sherbet",
    imageId: "photo-1605106901227-991bd663255c",
    prompt:
      "Stacked pink and lilac letter blocks on pastel field, isometric studio, soft window light --ar 3:4",
    model: "Midjourney v6",
    tags: ["minimal", "pastel"],
    likes: 2300,
    views: 28000,
    createdDaysAgo: 9,
  },
  {
    title: "Threadlines",
    imageId: "photo-1697033300784-6c9d143a30e2",
    prompt:
      "Abstract colorful linework on dim canvas, vector-like clean strokes, Kandinsky meets modern UI --ar 2:3",
    model: "DALL·E 3",
    tags: ["minimal", "abstract", "lines"],
    likes: 3400,
    views: 41000,
    createdDaysAgo: 17,
  },
]);

export const CARDS: PromptCard[] = [
  ...CINEMATIC,
  ...FASHION,
  ...PORTRAIT,
  ...ANIME,
  ...ARCH,
  ...PRODUCT,
  ...NATURE,
  ...VIRAL,
  ...POSTER,
  ...DARK,
  ...MINIMAL,
];

// Helper: trending score = recency * popularity (last 14 days weighted)
export function trendingScore(c: PromptCard): number {
  const recencyWeight = Math.max(0, 14 - c.createdDaysAgo) / 14;
  return c.likes * (0.5 + recencyWeight);
}
