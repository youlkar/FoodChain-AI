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
        "title": "About FoodChain AI",
        "mission": "Our Mission",
        "missionText": "FoodChain AI aims to help people find local food resources easily. We connect people facing food insecurity with nearby food pantries, community kitchens, and other food assistance programs.",
        "story": "Our Story",
        "storyText": "FoodChain AI was created to address the challenge of connecting those in need with available food resources. Our platform makes these vital services more accessible to everyone.",
        "values": "Our Values",
        "valuesText": "We believe everyone deserves access to healthy food. Our platform is built on principles of inclusivity, community support, and accessibility.",
        "contactUs": "Contact Us"
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
        "title": "Acerca de FoodChain AI",
        "mission": "Nuestra Misión",
        "missionText": "FoodChain AI tiene como objetivo ayudar a las personas a encontrar recursos alimentarios locales fácilmente. Conectamos a personas con inseguridad alimentaria con despensas de alimentos cercanas, cocinas comunitarias y otros programas de asistencia alimentaria.",
        "story": "Nuestra Historia",
        "storyText": "FoodChain AI fue creado para abordar el desafío de conectar a quienes lo necesitan con los recursos alimentarios disponibles. Nuestra plataforma hace que estos servicios vitales sean más accesibles para todos.",
        "values": "Nuestros Valores",
        "valuesText": "Creemos que todos merecen acceso a alimentos saludables. Nuestra plataforma se basa en principios de inclusión, apoyo comunitario y accesibilidad.",
        "contactUs": "Contáctenos"
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