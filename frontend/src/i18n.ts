import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive translations for all UI text
const resources = {
  en: {
    translation: {
      // Navbar
      "navbar": {
        "home": "Home",
        "findFood": "Find Food",
        "services": "Services",
        "about": "About",
        "community": "Community",
        "signIn": "Sign in",
        "logout": "Logout",
        "profile": "Profile",
        "language": "Language"
      },

      heroSection: {
        title1: "Find Food Resources",
        title2: "In Your Community",
        privacyStmt: "No signup required to find resources. Your privacy matters to us.",
        subTitle: "Connecting people with food assistance programs, food banks, and community resources to help address food insecurity",
        zipCodePlaceHolder: "Enter your zip code"
      },
      
      // Home Page
      "home": {
        "welcomeTitle": "Welcome to FoodChain AI",
        "welcomeSubtitle": "Connecting people with food resources in their community",
        "findNearby": "Find Nearby Food",
        "enterZipCode": "Enter your ZIP code",
        "search": "Search",
        "featuresHeading": "FoodChain AI",
        "featuresTitle": "Find food resources in your community",
        "featuresSubtitle": "We connect people with food pantries, soup kitchens, and other food assistance programs near them.",
        "ctaTitle": "Ready to find food resources?",
        "ctaSubtitle": "Start your search today.",
        "learnMore": "Learn More"
      },
      
      // Find Food Page
      "findFood": {
        "title": "Find Food Resources",
        "enterZipCode": "Enter your ZIP code",
        "search": "Search",
        "loading": "Loading...",
        "filterResults": "Filter Results",
        "clearFilters": "Clear Filters",
        "filterBy": "Filter by:",
        "distance": "Distance",
        "milesAway": "miles away",
        "mile": "mile away",
        "openNow": "Open Now",
        "dayOfWeek": "Day of Week",
        "timeOfDay": "Time of Day",
        "foodType": "Food Type",
        "distributionModel": "Distribution Model",
        "culturesServed": "Cultures Served",
        "noResults": "No results found",
        "showingResults": "Showing {{count}} results",
        "morning": "Morning",
        "afternoon": "Afternoon",
        "evening": "Evening"
      },
      
      // Agency Card
      "agency": {
        "appointment": "By Appointment Only",
        "requirements": "Requirements",
        "distributionModel": "Distribution Model",
        "foodFormats": "Food Formats",
        "additionalNotes": "Additional Notes",
        "culturesServed": "Cultural Populations Served",
        "contactInfo": "Contact Information",
        "hours": "Hours"
      },
      
      // About Page
      "about": {
        title: "About FoodConnect",
        mission: "Our Mission",
        missionText: "Connecting people experiencing food insecurity with the resources they need to thrive.",
        whoWeAre: "Who We Are",
        whoWeAreContent1: "FoodConnect was founded in 2023 by a group of community organizers, social workers, and technologists who recognized a critical gap in how people access food assistance.",
        whoWeAreContent2: "Our team observed that while many food resources existed in communities, people often struggled to find these resources or faced barriers when trying to access them. Information was scattered across multiple websites, pamphlets, and word of mouth.",
        whoWeAreContent3: "We built FoodConnect as a centralized platform that makes it easy for anyone facing food insecurity to quickly find nearby resources, understand eligibility requirements, and access the help they need without stigma or unnecessary hurdles.",
        story: "Our Story",
        storyText: "FoodConnect was created to address the challenge of connecting those in need with available food resources. Our platform makes these vital services more accessible to everyone.",
        values: "Our Values",
        valuesText: "We believe everyone deserves access to healthy food. Our platform is built on principles of inclusivity, community support, and accessibility."
      },
      
      programSection: {
        title: "Food Assistance Programs",
        subTitle: "Learn about programs available to help you and your family access nutritious food."
      },

      findAgencyPage: {
        title: "Find Nearby Food Resources",
        subTitle: "Locate food pantries, meal programs, and other resources near you",
        searchFilters: "Search & Filters",
        showFilters: "Show Filters",
        hideFilters: "Hide Filters",
        searchResources: "Search resources...",
        howToFindResources: "How to find resources",
        howToFindBullet1: "Enter your ZIP code or use your current location",
        howToFindBullet2: "Browse nearby food resources",
        howToFindBullet3: "Filter results based on your needs",
        howToFindBullet4: "Click \"Get Directions\" to visit an agency",
        noResources: "No resources found",
        adjustSearchMsg: "Try adjusting your filters or search criteria."
      },


      findFoodPage: {
        findAgencies: "Find agencies near you",
        useCurrLocation: "Use my current location",
        gettingLocation: "Getting your location...",
        searchBtn: "Search"
      },
      
      // Services Page
      "services": {
        "title": "Services",
        "subtitle": "Resources available in your community",
        "foodAssistance": "Food Assistance",
        "foodAssistanceDesc": "Access to food pantries, meal programs, and grocery assistance",
        "mealPrograms": "Meal Programs",
        "mealProgramsDesc": "Hot meals and community dining programs",
        "nutritionEducation": "Nutrition Education",
        "nutritionEducationDesc": "Classes and resources for healthy eating",
        "additionalSupport": "Additional Support",
        "additionalSupportDesc": "Other services available through our partners"
      },
      
      // Community Page
      "community": {
        "title": "Community",
        "subtitle": "Join our efforts to fight food insecurity",
        "volunteer": "Volunteer",
        "volunteerDesc": "Help at food pantries or assist with food distribution",
        "donate": "Donate",
        "donateDesc": "Support our mission with monetary or food donations",
        "partners": "Partners",
        "partnersDesc": "Organizations working together in our community",
        "events": "Events",
        "eventsDesc": "Upcoming food drives and community gatherings"
      },
      
      // Profile Page
      "profile": {
        "title": "Profile",
        "personalInfo": "Personal Information",
        "name": "Name",
        "email": "Email",
        "savedLocations": "Saved Locations",
        "preferences": "Preferences",
        "account": "Account Settings",
        "changePassword": "Change Password",
        "deleteAccount": "Delete Account",
        "save": "Save Changes"
      },
      
      // Login/Auth
      "auth": {
        "signIn": "Sign In",
        "signUp": "Sign Up",
        "email": "Email",
        "password": "Password",
        "forgotPassword": "Forgot Password?",
        "noAccount": "Don't have an account?",
        "hasAccount": "Already have an account?",
        "googleSignIn": "Sign in with Google",
        "orSignInWith": "Or sign in with email",
        "createAccount": "Create account"
      },
      
      // Common UI elements
      "common": {
        "loading": "Loading...",
        "error": "An error occurred",
        "retry": "Retry",
        "submit": "Submit",
        "cancel": "Cancel",
        "save": "Save",
        "edit": "Edit",
        "delete": "Delete",
        "view": "View",
        "close": "Close",
        "back": "Back",
        "next": "Next",
        "more": "More"
      },
      
      // Time/Days
      "time": {
        "monday": "Monday",
        "tuesday": "Tuesday",
        "wednesday": "Wednesday",
        "thursday": "Thursday",
        "friday": "Friday",
        "saturday": "Saturday",
        "sunday": "Sunday",
        "weekdays": "Weekdays",
        "weekends": "Weekends"
      }
    }
  },
  
  es: {
    translation: {
      // Navbar
      "navbar": {
        "home": "Inicio",
        "findFood": "Encontrar Comida",
        "services": "Servicios",
        "about": "Acerca de",
        "community": "Comunidad",
        "signIn": "Iniciar Sesión",
        "logout": "Cerrar Sesión",
        "profile": "Perfil",
        "language": "Idioma"
      },

      heroSection: {
        title1: "Encontrar Recursos Alimentarios",
        title2: "En Su Comunidad",
        privacyStmt: "No se requiere registrarse para encontrar recursos. Su privacidad es importante para nosotros.",
        subTitle: "Conectando a las personas con programas de asistencia alimentaria, bancos de alimentos y recursos comunitarios para ayudar a combatir la inseguridad alimentaria.",
        zipCodePlaceHolder: "Ingrese su código postal"
      },
      
      // Home Page
      "home": {
        "welcomeTitle": "Bienvenido a FoodChain AI",
        "welcomeSubtitle": "Conectando personas con recursos alimentarios en su comunidad",
        "findNearby": "Encontrar Comida Cercana",
        "enterZipCode": "Ingrese su código postal",
        "search": "Buscar",
        "featuresHeading": "FoodChain AI",
        "featuresTitle": "Encuentra recursos alimentarios en tu comunidad",
        "featuresSubtitle": "Conectamos a las personas con despensas de alimentos, comedores populares y otros programas de asistencia alimentaria cercanos.",
        "ctaTitle": "¿Listo para encontrar recursos alimentarios?",
        "ctaSubtitle": "Comienza tu búsqueda hoy.",
        "learnMore": "Más Información"
      },
      findAgencyPage: {
        title: "Find Nearby Food Resources",
        subTitle: "Localice despensas de alimentos, programas de comidas y otros recursos cerca de usted",
        searchFilters: "Búsqueda y Filtros",
        showFilters: "Mostrar Filtros",
        hideFilters: "Ocultar Filtros",
        searchResources: "Buscar recursos...",
        howToFindResources: "Cómo encontrar recursos",
        howToFindBullet1: "Ingrese su código postal o use su ubicación actual",
        howToFindBullet2: "Explore recursos alimentarios cercanos",
        howToFindBullet3: "Filtre resultados según sus necesidades",
        howToFindBullet4: "Haga clic en \"Obtener Direcciones\" para visitar una agencia",
        noResources: "No se encontraron recursos",
        adjustSearchMsg: "Intente ajustar sus filtros o criterios de búsqueda."
      },


      programSection: {
        title: "Programas de Asistencia Alimentaria",
        subTitle: "Conozca los programas disponibles para ayudarle a usted y a su familia a acceder a alimentos nutritivos."
      },
      
      // Find Food Page
      "findFood": {
        "title": "Encontrar Recursos Alimentarios",
        "enterZipCode": "Ingrese su código postal",
        "search": "Buscar",
        "loading": "Cargando...",
        "filterResults": "Filtrar Resultados",
        "clearFilters": "Borrar Filtros",
        "filterBy": "Filtrar por:",
        "distance": "Distancia",
        "milesAway": "millas de distancia",
        "mile": "milla de distancia",
        "openNow": "Abierto Ahora",
        "dayOfWeek": "Día de la Semana",
        "timeOfDay": "Hora del Día",
        "foodType": "Tipo de Comida",
        "distributionModel": "Modelo de Distribución",
        "culturesServed": "Culturas Atendidas",
        "noResults": "No se encontraron resultados",
        "showingResults": "Mostrando {{count}} resultados",
        "morning": "Mañana",
        "afternoon": "Tarde",
        "evening": "Noche"
      },


      findFoodPage: {
        findAgencies: "Encontrar agencias cerca de usted",
        useCurrLocation: "Usar mi ubicación actual",
        gettingLocation: "Obteniendo su ubicación",
        searchFilters: "Búsqueda y Filtros",
        searchBtn: "Buscar",
        showFilters: "Mostrar Filtros",
        searchResources: "Buscar recursos..."
      },
      
      // Agency Card
      "agency": {
        "appointment": "Solo con Cita Previa",
        "requirements": "Requisitos",
        "distributionModel": "Modelo de Distribución",
        "foodFormats": "Formatos de Alimentos",
        "additionalNotes": "Notas Adicionales",
        "culturesServed": "Poblaciones Culturales Atendidas",
        "contactInfo": "Información de Contacto",
        "hours": "Horarios"
      },
      
      // About Page
      "about": {
        title: "Acerca de FoodConnect",
        mission: "Nuestra Misión",
        missionText: "Conectando a las personas que experimentan inseguridad alimentaria con los recursos que necesitan para prosperar.",
        whoWeAre: "Quiénes Somos",
        whoWeAreContent1: "FoodConnect fue fundado en 2023 por un grupo de organizadores comunitarios, trabajadores sociales y tecnólogos que reconocieron una brecha crítica en la forma en que las personas acceden a la asistencia alimentaria.",
        whoWeAreContent2: "Nuestro equipo observó que, aunque existían muchos recursos alimentarios en las comunidades, las personas a menudo tenían dificultades para encontrar estos recursos o enfrentaban barreras al intentar acceder a ellos. La información estaba dispersa en múltiples sitios web, folletos y comunicación verbal.",
        whoWeAreContent3: "Construimos FoodConnect como una plataforma centralizada que facilita a cualquier persona que enfrenta inseguridad alimentaria encontrar rápidamente recursos cercanos, comprender los requisitos de elegibilidad y acceder a la ayuda que necesitan sin estigmas ni obstáculos innecesarios.",
        story: "Nuestra Historia",
        storyText: "FoodConnect fue creado para abordar el desafío de conectar a quienes lo necesitan con los recursos alimentarios disponibles. Nuestra plataforma hace que estos servicios vitales sean más accesibles para todos.",
        values: "Nuestros Valores",
        valuesText: "Creemos que todos merecen acceso a alimentos saludables. Nuestra plataforma se basa en principios de inclusión, apoyo comunitario y accesibilidad.",
      },
      
      // Services Page
      "services": {
        "title": "Servicios",
        "subtitle": "Recursos disponibles en tu comunidad",
        "foodAssistance": "Asistencia Alimentaria",
        "foodAssistanceDesc": "Acceso a despensas de alimentos, programas de comidas y asistencia para compras",
        "mealPrograms": "Programas de Comidas",
        "mealProgramsDesc": "Comidas calientes y programas de comedor comunitario",
        "nutritionEducation": "Educación Nutricional",
        "nutritionEducationDesc": "Clases y recursos para una alimentación saludable",
        "additionalSupport": "Apoyo Adicional",
        "additionalSupportDesc": "Otros servicios disponibles a través de nuestros socios"
      },
      
      // Community Page
      "community": {
        "title": "Comunidad",
        "subtitle": "Únete a nuestros esfuerzos para combatir la inseguridad alimentaria",
        "volunteer": "Voluntariado",
        "volunteerDesc": "Ayuda en despensas de alimentos o asiste en la distribución de alimentos",
        "donate": "Donar",
        "donateDesc": "Apoya nuestra misión con donaciones monetarias o de alimentos",
        "partners": "Socios",
        "partnersDesc": "Organizaciones trabajando juntas en nuestra comunidad",
        "events": "Eventos",
        "eventsDesc": "Próximas colectas de alimentos y reuniones comunitarias"
      },
      
      // Profile Page
      "profile": {
        "title": "Perfil",
        "personalInfo": "Información Personal",
        "name": "Nombre",
        "email": "Correo Electrónico",
        "savedLocations": "Ubicaciones Guardadas",
        "preferences": "Preferencias",
        "account": "Configuración de Cuenta",
        "changePassword": "Cambiar Contraseña",
        "deleteAccount": "Eliminar Cuenta",
        "save": "Guardar Cambios"
      },
      
      // Login/Auth
      "auth": {
        "signIn": "Iniciar Sesión",
        "signUp": "Registrarse",
        "email": "Correo Electrónico",
        "password": "Contraseña",
        "forgotPassword": "¿Olvidó su Contraseña?",
        "noAccount": "¿No tiene una cuenta?",
        "hasAccount": "¿Ya tiene una cuenta?",
        "googleSignIn": "Iniciar sesión con Google",
        "orSignInWith": "O iniciar sesión con correo electrónico",
        "createAccount": "Crear cuenta"
      },
      
      // Common UI elements
      "common": {
        "loading": "Cargando...",
        "error": "Ocurrió un error",
        "retry": "Reintentar",
        "submit": "Enviar",
        "cancel": "Cancelar",
        "save": "Guardar",
        "edit": "Editar",
        "delete": "Eliminar",
        "view": "Ver",
        "close": "Cerrar",
        "back": "Atrás",
        "next": "Siguiente",
        "more": "Más"
      },
      
      // Time/Days
      "time": {
        "monday": "Lunes",
        "tuesday": "Martes",
        "wednesday": "Miércoles",
        "thursday": "Jueves",
        "friday": "Viernes",
        "saturday": "Sábado",
        "sunday": "Domingo",
        "weekdays": "Días Laborables",
        "weekends": "Fines de Semana"
      }
    }
  },
  
  fr: {
    translation: {
      // Navbar
      "navbar": {
        "home": "Accueil",
        "findFood": "Trouver de la Nourriture",
        "services": "Services",
        "about": "À Propos",
        "community": "Communauté",
        "signIn": "Se Connecter",
        "logout": "Déconnexion",
        "profile": "Profil",
        "language": "Langue"
      },
      
      // Home Page
      "home": {
        "welcomeTitle": "Bienvenue sur FoodChain AI",
        "welcomeSubtitle": "Connecter les personnes aux ressources alimentaires dans leur communauté",
        "findNearby": "Trouver de la Nourriture à Proximité",
        "enterZipCode": "Entrez votre code postal",
        "search": "Rechercher",
        "featuresHeading": "FoodChain AI",
        "featuresTitle": "Trouvez des ressources alimentaires dans votre communauté",
        "featuresSubtitle": "Nous connectons les personnes avec des banques alimentaires, des soupes populaires et d'autres programmes d'aide alimentaire à proximité.",
        "ctaTitle": "Prêt à trouver des ressources alimentaires?",
        "ctaSubtitle": "Commencez votre recherche aujourd'hui.",
        "learnMore": "En Savoir Plus"
      },
      
      // About Page & other sections with French translations...
      "about": {
        "title": "À Propos de FoodChain AI",
        "mission": "Notre Mission",
        "missionText": "FoodChain AI vise à aider les gens à trouver facilement des ressources alimentaires locales. Nous connectons les personnes confrontées à l'insécurité alimentaire avec des garde-manger, des cuisines communautaires et d'autres programmes d'aide alimentaire à proximité.",
        "story": "Notre Histoire",
        "storyText": "FoodChain AI a été créé pour relever le défi de connecter les personnes dans le besoin avec les ressources alimentaires disponibles. Notre plateforme rend ces services vitaux plus accessibles à tous.",
        "values": "Nos Valeurs",
        "valuesText": "Nous croyons que tout le monde mérite d'avoir accès à une alimentation saine. Notre plateforme est fondée sur des principes d'inclusivité, de soutien communautaire et d'accessibilité.",
        "contactUs": "Contactez-Nous"
      }
      
      // Additional French translations would continue...
    }
  },
  
  zh: {
    translation: {
      // Navbar
      "navbar": {
        "home": "首页",
        "findFood": "寻找食物",
        "services": "服务",
        "about": "关于",
        "community": "社区",
        "signIn": "登录",
        "logout": "登出",
        "profile": "个人资料",
        "language": "语言"
      },
      
      // Home Page
      "home": {
        "welcomeTitle": "欢迎来到 FoodChain AI",
        "welcomeSubtitle": "连接人们与社区中的食物资源",
        "findNearby": "寻找附近食物",
        "enterZipCode": "输入您的邮政编码",
        "search": "搜索",
        "featuresHeading": "FoodChain AI",
        "featuresTitle": "在您的社区中寻找食物资源",
        "featuresSubtitle": "我们将人们与附近的食物储藏室、社区厨房和其他食物援助计划联系起来。",
        "ctaTitle": "准备好寻找食物资源了吗？",
        "ctaSubtitle": "今天开始您的搜索。",
        "learnMore": "了解更多"
      },
      
      // About Page
      "about": {
        "title": "关于 FoodChain AI",
        "mission": "我们的使命",
        "missionText": "FoodChain AI 旨在帮助人们轻松找到当地食物资源。我们将面临食物不安全的人们与附近的食物储藏室、社区厨房和其他食物援助计划联系起来。",
        "story": "我们的故事",
        "storyText": "FoodChain AI 的创建是为了解决将有需要的人与可用的食物资源联系起来的挑战。我们的平台使这些重要服务对每个人都更加容易获得。",
        "values": "我们的价值观",
        "valuesText": "我们相信每个人都应该获得健康食品。我们的平台建立在包容性、社区支持和可访问性的原则上。",
        "contactUs": "联系我们"
      }
      
      // Additional Chinese translations would continue...
    }
  }
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Helper function to change language
export const changeLanguage = (lang: string) => {
  localStorage.setItem('language', lang);
  return i18next.changeLanguage(lang);
};

export default i18next;