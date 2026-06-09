import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'he', label: 'עב', name: 'עברית' },
  { code: 'es', label: 'ES', name: 'Español' },
]

// ---------------------------------------------------------------------------
// Dictionaries
// ---------------------------------------------------------------------------
const dict = {
  en: {
    nav: { home: 'Home', rentals: 'Rentals', sales: 'Sales', services: 'How I Help', about: 'About', contact: 'Contact', cta: 'WhatsApp' },
    hero: {
      eyebrow: 'Jerusalem · Long-term Rentals & Sales',
      title1: 'Your home in Jerusalem,',
      title2: 'handled start to finish.',
      sub: "I'm Moshe. I help you find the right apartment, negotiate the deal, check every line of the contract with the owner, and hand you the keys — so renting in Jerusalem feels effortless.",
      ctaPrimary: 'Chat with Moshe',
      ctaSecondary: 'Browse apartments',
      priceLabel: '/ month',
      metaNote: 'Long-term apartment rentals across Jerusalem — plus home sales when you’re ready to buy.',
      scroll: 'Scroll',
    },
    stats: { range: 'Monthly rent range', neighborhoods: 'Jerusalem neighborhoods', service: 'Search to signature', languages: 'English · Hebrew · Spanish' },
    rentals: {
      eyebrow: 'Available Now',
      title: 'Apartments for rent in Jerusalem',
      sub: 'A selection of long-term rentals I’m handling right now. Tap any apartment to ask me for the full details and a video tour on WhatsApp.',
      perMonth: '/ mo',
      ask: 'Ask about this one',
      viewAll: 'See all on WhatsApp',
      entry: 'Entry',
      immediate: 'Immediate',
      bedrooms: 'bd',
      bathrooms: 'ba',
      hotDeal: 'Hot deal',
      inclArnona: 'incl. Arnona & Vaad',
    },
    sales: {
      eyebrow: 'Buying in Jerusalem',
      title: 'Looking to buy a home?',
      sub: 'Beyond rentals, I also handle home sales across Jerusalem. Whether you’re an investor or buying your family’s home, I’ll find the right property, run the numbers with you, negotiate hard and guide you through every step to the notary.',
      p1: 'Off-market & listed properties',
      p1d: 'Access to apartments and houses before they hit the open market.',
      p2: 'Honest price guidance',
      p2d: 'A clear read on what a property is really worth — and what to offer.',
      p3: 'Full transaction support',
      p3d: 'From the first viewing to the lawyer and the keys, I’m with you.',
      cta: 'Talk to me about buying',
    },
    services: {
      eyebrow: 'How I Help',
      title: 'One agent, the whole way through',
      sub: 'You don’t chase landlords, decode contracts or worry about being overcharged. I take care of all of it.',
      items: [
        { t: 'Find your home', d: 'Tell me what you need and your budget. I shortlist apartments that genuinely fit and arrange the viewings.' },
        { t: 'Answer every question', d: 'Neighborhoods, schools, parking, Arnona, Vaad Bayit — I’m on WhatsApp to answer anything, anytime.' },
        { t: 'Negotiate your deal', d: 'I deal directly with the owner and push for the best price and terms on your behalf.' },
        { t: 'Check the contract', d: 'I go through every clause of the lease with you and with the owner so there are no surprises.' },
        { t: 'Sign with confidence', d: 'I’m there for the signing and make sure the deal is fair, clear and protects you.' },
        { t: 'Get your keys', d: 'Handover, inventory and the first questions after move-in — I stay with you past the signature.' },
      ],
    },
    about: {
      eyebrow: 'About Moshe',
      title: 'A young agent who actually answers',
      p1: 'I’m Moshe, a Jerusalem real-estate agent focused on long-term apartment rentals — and home sales. I grew up around this city and I know its neighborhoods, its buildings and its rhythms.',
      p2: 'My clients stay with me because I’m fast, straight and genuinely on their side. I treat your search like it’s my own home on the line: I check the contract, deal with the owner and make sure you get a good deal — not just a quick one.',
      p3: 'Renting or buying, in English, Hebrew or Spanish — message me and let’s find your place.',
      portraitAlt: 'Moshe, Jerusalem real-estate agent',
      replaceNote: '',
      cta: 'Message Moshe',
      f1: 'Long-term rentals', f1d: 'My main focus',
      f2: 'House sales', f2d: 'Across Jerusalem',
      f3: '3 languages', f3d: 'EN · HE · ES',
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Let’s find your place in Jerusalem',
      sub: 'The fastest way to reach me is WhatsApp. Send me what you’re looking for and your budget — I’ll reply with real options and a video.',
      ctaPrimary: 'Chat on WhatsApp',
      call: 'Call',
      hours: 'Usually replies within the hour',
      formName: 'Your name',
      formNeed: 'What are you looking for? (area, rooms, budget…)',
      formSend: 'Send on WhatsApp',
      location: 'Jerusalem, Israel',
      prefill: 'Hi Moshe! I’m looking for an apartment in Jerusalem.',
    },
    footer: {
      tagline: 'Long-term apartment rentals & home sales in Jerusalem.',
      rentals: 'Rentals', sales: 'Sales', services: 'How I Help', about: 'About', contact: 'Contact',
      rights: 'All rights reserved.',
      built: 'Renting or buying in Jerusalem — handled with care.',
      disclaimer: 'Listings shown are representative of current availability. Contact for live details.',
    },
    feat: {
      furnished: 'Furnished', mamad: 'Safe room (Mamad)', parking: 'Parking spot', storage: 'Storage room',
      elevator: 'Elevator', balcony: 'Balcony', balcony2: '2 balconies', sukkah: 'Sukkah balcony',
      gym: 'Gym in building', security: '24/7 security', wifi: 'Wi-Fi included', renovated: 'Newly renovated',
      ground: 'Ground floor', views: 'Amazing views', garden: 'Garden', quiet: 'Quiet street',
    },
    waFloat: 'Chat with Moshe',
    pages: {
      rentals: { title: 'Apartments for rent in Jerusalem', sub: 'Browse the long-term rentals I’m handling right now — then message me on WhatsApp for full details and a video tour.' },
      sales: { title: 'Buy your home in Jerusalem', sub: 'Investing or buying your family’s home, I find the right property, run the numbers and negotiate hard — all the way to the notary.' },
      services: { title: 'How I help you, step by step', sub: 'From the first search to the keys in your hand — one agent who takes care of everything.' },
      about: { title: 'Meet Moshe', sub: 'A young Jerusalem agent who’s fast, straight and genuinely on your side.' },
      contact: { title: 'Get in touch', sub: 'The fastest way to reach me is WhatsApp. Tell me what you’re looking for and I’ll reply with real options.' },
    },
    home: {
      featuredEyebrow: 'Available now',
      featuredTitle: 'Featured apartments',
      featuredSub: 'A few of the long-term rentals I’m handling this week.',
      viewAllApts: 'View all apartments',
      noListings: 'New apartments come in all the time — message me on WhatsApp for what’s available right now.',
      servicesAll: 'See the full process',
      salesText: 'Beyond rentals, I also handle home sales across Jerusalem — from finding the right property to the lawyer and the keys.',
      aboutTitle: 'A young agent who actually answers',
      aboutText: 'I treat your search like my own home is on the line — checking the contract, dealing with the owner and making sure you get a good deal.',
    },
    common: { learnMore: 'Learn more' },
  },

  he: {
    nav: { home: 'בית', rentals: 'להשכרה', sales: 'למכירה', services: 'איך אני עוזר', about: 'אודות', contact: 'צור קשר', cta: 'וואטסאפ' },
    hero: {
      eyebrow: 'ירושלים · השכרות לטווח ארוך ומכירות',
      title1: 'הבית שלך בירושלים,',
      title2: 'מטופל מהתחלה ועד הסוף.',
      sub: 'אני משה. אעזור לך למצוא את הדירה הנכונה, אנהל עבורך את המשא ומתן, אבדוק כל שורה בחוזה מול בעל הבית ואמסור לך את המפתחות — כך שהשכרת דירה בירושלים תרגיש פשוטה.',
      ctaPrimary: 'לדבר עם משה',
      ctaSecondary: 'לצפות בדירות',
      priceLabel: '/ לחודש',
      metaNote: 'השכרות דירות לטווח ארוך בכל ירושלים — וגם מכירת בתים כשתהיו מוכנים לקנות.',
      scroll: 'גלילה',
    },
    stats: { range: 'טווח שכר דירה חודשי', neighborhoods: 'שכונות בירושלים', service: 'מחיפוש ועד חתימה', languages: 'אנגלית · עברית · ספרדית' },
    rentals: {
      eyebrow: 'זמין עכשיו',
      title: 'דירות להשכרה בירושלים',
      sub: 'מבחר השכרות לטווח ארוך שאני מטפל בהן כרגע. הקליקו על דירה כדי לבקש ממני את כל הפרטים וסרטון בוואטסאפ.',
      perMonth: '/ לחודש',
      ask: 'לשאול על הדירה',
      viewAll: 'לכל הדירות בוואטסאפ',
      entry: 'כניסה',
      immediate: 'מיידית',
      bedrooms: 'חד׳',
      bathrooms: 'אמב׳',
      hotDeal: 'דיל חם',
      inclArnona: 'כולל ארנונה וועד',
    },
    sales: {
      eyebrow: 'קונים בירושלים',
      title: 'רוצים לקנות בית?',
      sub: 'מעבר להשכרות, אני מטפל גם במכירת בתים בכל ירושלים. בין אם אתם משקיעים או קונים את בית המשפחה, אמצא את הנכס הנכון, אעבור איתכם על המספרים, אנהל משא ומתן חזק ואלווה אתכם בכל שלב עד הנוטריון.',
      p1: 'נכסים מהשוק וממאגרים סגורים',
      p1d: 'גישה לדירות ובתים עוד לפני שהם מגיעים לשוק החופשי.',
      p2: 'הערכת מחיר כנה',
      p2d: 'תמונה ברורה של מה הנכס באמת שווה — וכמה להציע.',
      p3: 'ליווי מלא בעסקה',
      p3d: 'מהצפייה הראשונה ועד עורך הדין והמפתחות, אני איתכם.',
      cta: 'דברו איתי על קנייה',
    },
    services: {
      eyebrow: 'איך אני עוזר',
      title: 'סוכן אחד, לכל אורך הדרך',
      sub: 'אתם לא רודפים אחרי בעלי דירות, לא מפענחים חוזים ולא דואגים לשלם יותר מדי. אני דואג להכל.',
      items: [
        { t: 'למצוא את הבית', d: 'ספרו לי מה אתם צריכים ומה התקציב. אסנן דירות שבאמת מתאימות ואתאם צפיות.' },
        { t: 'לענות על כל שאלה', d: 'שכונות, בתי ספר, חנייה, ארנונה, ועד בית — אני בוואטסאפ כדי לענות על הכל, בכל זמן.' },
        { t: 'לנהל את המשא ומתן', d: 'אני מתנהל ישירות מול בעל הבית ולוחץ עבורכם למחיר ולתנאים הטובים ביותר.' },
        { t: 'לבדוק את החוזה', d: 'אני עובר על כל סעיף בחוזה איתכם ומול בעל הבית כדי שלא יהיו הפתעות.' },
        { t: 'לחתום בביטחון', d: 'אני נוכח בחתימה ומוודא שהעסקה הוגנת, ברורה ומגנה עליכם.' },
        { t: 'לקבל את המפתחות', d: 'מסירה, רשימת ציוד והשאלות הראשונות אחרי הכניסה — אני נשאר איתכם גם אחרי החתימה.' },
      ],
    },
    about: {
      eyebrow: 'אודות משה',
      title: 'סוכן צעיר שבאמת עונה',
      p1: 'אני משה, סוכן נדל״ן בירושלים המתמקד בהשכרת דירות לטווח ארוך — וגם במכירת בתים. גדלתי סביב העיר הזו ואני מכיר את השכונות, הבניינים והקצב שלה.',
      p2: 'הלקוחות שלי נשארים איתי כי אני מהיר, ישר ובאמת לצידם. אני מתייחס לחיפוש שלכם כאילו הבית שלי על הכף: בודק את החוזה, מתנהל מול בעל הבית ומוודא שאתם מקבלים עסקה טובה — לא רק מהירה.',
      p3: 'להשכרה או לקנייה, באנגלית, עברית או ספרדית — שלחו לי הודעה ונמצא את המקום שלכם.',
      portraitAlt: 'משה, סוכן נדל״ן בירושלים',
      replaceNote: '',
      cta: 'לשלוח הודעה למשה',
      f1: 'השכרות לטווח ארוך', f1d: 'ההתמחות שלי',
      f2: 'מכירת בתים', f2d: 'בכל ירושלים',
      f3: '3 שפות', f3d: 'אנגלית · עברית · ספרדית',
    },
    contact: {
      eyebrow: 'יצירת קשר',
      title: 'בואו נמצא את המקום שלכם בירושלים',
      sub: 'הדרך המהירה ביותר להשיג אותי היא וואטסאפ. שלחו לי מה אתם מחפשים ומה התקציב — אחזור עם אפשרויות אמיתיות וסרטון.',
      ctaPrimary: 'לדבר בוואטסאפ',
      call: 'להתקשר',
      hours: 'בדרך כלל עונה תוך שעה',
      formName: 'השם שלך',
      formNeed: 'מה אתם מחפשים? (אזור, חדרים, תקציב…)',
      formSend: 'לשלוח בוואטסאפ',
      location: 'ירושלים, ישראל',
      prefill: 'היי משה! אני מחפש דירה בירושלים.',
    },
    footer: {
      tagline: 'השכרת דירות לטווח ארוך ומכירת בתים בירושלים.',
      rentals: 'להשכרה', sales: 'למכירה', services: 'איך אני עוזר', about: 'אודות', contact: 'צור קשר',
      rights: 'כל הזכויות שמורות.',
      built: 'להשכרה או לקנייה בירושלים — בטיפול אישי.',
      disclaimer: 'הדירות המוצגות מייצגות זמינות נוכחית. צרו קשר לפרטים מעודכנים.',
    },
    feat: {
      furnished: 'מרוהטת', mamad: 'ממ״ד', parking: 'חנייה', storage: 'מחסן',
      elevator: 'מעלית', balcony: 'מרפסת', balcony2: '2 מרפסות', sukkah: 'מרפסת סוכה',
      gym: 'חדר כושר בבניין', security: 'אבטחה 24/7', wifi: 'כולל אינטרנט', renovated: 'משופצת',
      ground: 'קומת קרקע', views: 'נוף מדהים', garden: 'גינה', quiet: 'רחוב שקט',
    },
    waFloat: 'לדבר עם משה',
    pages: {
      rentals: { title: 'דירות להשכרה בירושלים', sub: 'עיינו בהשכרות לטווח ארוך שאני מטפל בהן כעת — ושלחו לי הודעה בוואטסאפ לפרטים מלאים וסרטון.' },
      sales: { title: 'לקנות בית בירושלים', sub: 'להשקעה או לבית המשפחה — אמצא את הנכס הנכון, אעבור על המספרים ואנהל משא ומתן חזק, עד הנוטריון.' },
      services: { title: 'איך אני עוזר, צעד אחר צעד', sub: 'מהחיפוש הראשון ועד המפתחות ביד — סוכן אחד שדואג להכול.' },
      about: { title: 'הכירו את משה', sub: 'סוכן צעיר בירושלים — מהיר, ישר ובאמת לצידכם.' },
      contact: { title: 'יצירת קשר', sub: 'הדרך המהירה ביותר אליי היא וואטסאפ. ספרו לי מה אתם מחפשים ואחזור עם אפשרויות אמיתיות.' },
    },
    home: {
      featuredEyebrow: 'זמין עכשיו',
      featuredTitle: 'דירות נבחרות',
      featuredSub: 'כמה מההשכרות לטווח ארוך שאני מטפל בהן השבוע.',
      viewAllApts: 'לכל הדירות',
      noListings: 'דירות חדשות נכנסות כל הזמן — שלחו לי הודעה בוואטסאפ למה שזמין עכשיו.',
      servicesAll: 'לתהליך המלא',
      salesText: 'מעבר להשכרות, אני מטפל גם במכירת בתים בכל ירושלים — ממציאת הנכס ועד עורך הדין והמפתחות.',
      aboutTitle: 'סוכן צעיר שבאמת עונה',
      aboutText: 'אני מתייחס לחיפוש שלכם כאילו הבית שלי על הכף — בודק את החוזה, מתנהל מול בעל הבית ומוודא שתקבלו עסקה טובה.',
    },
    common: { learnMore: 'לפרטים' },
  },

  es: {
    nav: { home: 'Inicio', rentals: 'Alquileres', sales: 'Ventas', services: 'Cómo te ayudo', about: 'Sobre Moshe', contact: 'Contacto', cta: 'WhatsApp' },
    hero: {
      eyebrow: 'Jerusalén · Alquileres y Ventas',
      title1: 'Tu hogar en Jerusalén,',
      title2: 'gestionado de principio a fin.',
      sub: 'Soy Moshe. Te ayudo a encontrar el apartamento adecuado, negocio el trato, reviso cada línea del contrato con el propietario y te entrego las llaves — para que alquilar en Jerusalén sea sencillo.',
      ctaPrimary: 'Hablar con Moshe',
      ctaSecondary: 'Ver apartamentos',
      priceLabel: '/ mes',
      metaNote: 'Alquileres de larga duración por toda Jerusalén — y venta de viviendas cuando quieras comprar.',
      scroll: 'Desliza',
    },
    stats: { range: 'Rango de alquiler mensual', neighborhoods: 'Barrios de Jerusalén', service: 'De la búsqueda a la firma', languages: 'Inglés · Hebreo · Español' },
    rentals: {
      eyebrow: 'Disponible ahora',
      title: 'Apartamentos en alquiler en Jerusalén',
      sub: 'Una selección de alquileres de larga duración que gestiono ahora mismo. Toca cualquier apartamento para pedirme todos los detalles y un vídeo por WhatsApp.',
      perMonth: '/ mes',
      ask: 'Preguntar por este',
      viewAll: 'Ver todos por WhatsApp',
      entry: 'Entrada',
      immediate: 'Inmediata',
      bedrooms: 'hab',
      bathrooms: 'baños',
      hotDeal: 'Oferta',
      inclArnona: 'incl. Arnona y Vaad',
    },
    sales: {
      eyebrow: 'Comprar en Jerusalén',
      title: '¿Buscas comprar una vivienda?',
      sub: 'Además de alquileres, también gestiono la venta de viviendas en toda Jerusalén. Seas inversor o compres la casa de tu familia, encontraré la propiedad adecuada, repasaré los números contigo, negociaré con firmeza y te guiaré en cada paso hasta el notario.',
      p1: 'Propiedades en y fuera del mercado',
      p1d: 'Acceso a apartamentos y casas antes de que salgan al mercado abierto.',
      p2: 'Asesoramiento honesto de precio',
      p2d: 'Una lectura clara de lo que vale una propiedad — y cuánto ofrecer.',
      p3: 'Apoyo completo en la operación',
      p3d: 'Desde la primera visita hasta el abogado y las llaves, estoy contigo.',
      cta: 'Háblame de comprar',
    },
    services: {
      eyebrow: 'Cómo te ayudo',
      title: 'Un solo agente, en todo el camino',
      sub: 'No persigues a propietarios, ni descifras contratos, ni te preocupas por pagar de más. Yo me encargo de todo.',
      items: [
        { t: 'Encontrar tu hogar', d: 'Dime qué necesitas y tu presupuesto. Preselecciono apartamentos que de verdad encajan y organizo las visitas.' },
        { t: 'Responder cada duda', d: 'Barrios, colegios, parking, Arnona, Vaad Bayit — estoy en WhatsApp para responder lo que sea, cuando sea.' },
        { t: 'Negociar tu trato', d: 'Trato directamente con el propietario y presiono por el mejor precio y condiciones para ti.' },
        { t: 'Revisar el contrato', d: 'Repaso cada cláusula del contrato contigo y con el propietario para que no haya sorpresas.' },
        { t: 'Firmar con confianza', d: 'Estoy en la firma y me aseguro de que el trato sea justo, claro y te proteja.' },
        { t: 'Recibir tus llaves', d: 'Entrega, inventario y las primeras dudas tras mudarte — sigo contigo después de la firma.' },
      ],
    },
    about: {
      eyebrow: 'Sobre Moshe',
      title: 'Un agente joven que de verdad responde',
      p1: 'Soy Moshe, agente inmobiliario en Jerusalén centrado en alquileres de larga duración — y venta de viviendas. Crecí en torno a esta ciudad y conozco sus barrios, sus edificios y su ritmo.',
      p2: 'Mis clientes se quedan conmigo porque soy rápido, directo y de verdad estoy de su lado. Trato tu búsqueda como si fuera mi propia casa en juego: reviso el contrato, trato con el propietario y me aseguro de que consigas un buen trato — no solo uno rápido.',
      p3: 'Alquilar o comprar, en inglés, hebreo o español — escríbeme y encontremos tu lugar.',
      portraitAlt: 'Moshe, agente inmobiliario en Jerusalén',
      replaceNote: '',
      cta: 'Escribir a Moshe',
      f1: 'Alquileres largos', f1d: 'Mi enfoque principal',
      f2: 'Venta de casas', f2d: 'En toda Jerusalén',
      f3: '3 idiomas', f3d: 'EN · HE · ES',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Encontremos tu lugar en Jerusalén',
      sub: 'La forma más rápida de contactarme es WhatsApp. Envíame qué buscas y tu presupuesto — te responderé con opciones reales y un vídeo.',
      ctaPrimary: 'Hablar por WhatsApp',
      call: 'Llamar',
      hours: 'Suele responder en menos de una hora',
      formName: 'Tu nombre',
      formNeed: '¿Qué buscas? (zona, habitaciones, presupuesto…)',
      formSend: 'Enviar por WhatsApp',
      location: 'Jerusalén, Israel',
      prefill: '¡Hola Moshe! Busco un apartamento en Jerusalén.',
    },
    footer: {
      tagline: 'Alquileres de larga duración y venta de viviendas en Jerusalén.',
      rentals: 'Alquileres', sales: 'Ventas', services: 'Cómo te ayudo', about: 'Sobre Moshe', contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      built: 'Alquilar o comprar en Jerusalén — con atención personal.',
      disclaimer: 'Los anuncios mostrados son representativos de la disponibilidad actual. Contacta para detalles en vivo.',
    },
    feat: {
      furnished: 'Amueblado', mamad: 'Habitación segura (Mamad)', parking: 'Plaza de parking', storage: 'Trastero',
      elevator: 'Ascensor', balcony: 'Balcón', balcony2: '2 balcones', sukkah: 'Balcón Sucá',
      gym: 'Gimnasio en el edificio', security: 'Seguridad 24/7', wifi: 'Wi-Fi incluido', renovated: 'Recién renovado',
      ground: 'Planta baja', views: 'Vistas increíbles', garden: 'Jardín', quiet: 'Calle tranquila',
    },
    waFloat: 'Hablar con Moshe',
    pages: {
      rentals: { title: 'Apartamentos en alquiler en Jerusalén', sub: 'Mira los alquileres de larga duración que gestiono ahora — y escríbeme por WhatsApp para todos los detalles y un vídeo.' },
      sales: { title: 'Compra tu casa en Jerusalén', sub: 'Para invertir o comprar la casa de tu familia, encuentro la propiedad adecuada, repaso los números y negocio con firmeza, hasta el notario.' },
      services: { title: 'Cómo te ayudo, paso a paso', sub: 'De la primera búsqueda a las llaves en tu mano — un solo agente que se encarga de todo.' },
      about: { title: 'Conoce a Moshe', sub: 'Un agente joven en Jerusalén, rápido, directo y de verdad de tu lado.' },
      contact: { title: 'Contacto', sub: 'La forma más rápida de contactarme es WhatsApp. Dime qué buscas y te responderé con opciones reales.' },
    },
    home: {
      featuredEyebrow: 'Disponible ahora',
      featuredTitle: 'Apartamentos destacados',
      featuredSub: 'Algunos de los alquileres de larga duración que gestiono esta semana.',
      viewAllApts: 'Ver todos los pisos',
      noListings: 'Entran pisos nuevos continuamente — escríbeme por WhatsApp para ver lo disponible ahora.',
      servicesAll: 'Ver todo el proceso',
      salesText: 'Además de alquileres, gestiono la venta de viviendas en toda Jerusalén — desde encontrar la propiedad hasta el abogado y las llaves.',
      aboutTitle: 'Un agente joven que de verdad responde',
      aboutText: 'Trato tu búsqueda como si fuera mi propia casa — reviso el contrato, trato con el propietario y me aseguro de que consigas un buen trato.',
    },
    common: { learnMore: 'Saber más' },
  },
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const I18nContext = createContext(null)

function getByPath(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj)
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('cjr_lang') || 'en'
  })

  useEffect(() => {
    const dir = lang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try { localStorage.setItem('cjr_lang', lang) } catch (e) { /* ignore */ }
  }, [lang])

  const t = useCallback((path) => {
    const val = getByPath(dict[lang], path)
    if (val !== undefined) return val
    const fallback = getByPath(dict.en, path)
    return fallback !== undefined ? fallback : path
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    t,
    dir: lang === 'he' ? 'rtl' : 'ltr',
    langs: LANGS,
  }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
