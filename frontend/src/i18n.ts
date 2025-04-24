import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      about: {
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
      nav: {
        home: "Home",
        findFood: "Find Food",
        services: "Services",
        about: "About",
        community: "Community",
        signIn: "Sign In"
      },
      heroSection: {
        title1: "Find Food Resources",
        title2: "In Your Community",
        privacyStmt: "No signup required to find resources. Your privacy matters to us.",
        subTitle: "Connecting people with food assistance programs, food banks, and community resources to help address food insecurity",
        zipCodePlaceHolder: "Enter your zip code"
      },
      programSection: {
        title: "Food Assistance Programs",
        subTitle: "Learn about programs available to help you and your family access nutritious food."
      },
      communityPage: {
        title: "Join our community",
        subTitle: "Connect with others, share experiences, and find support on your journey to food security"
      },
      findFoodPage: {
        findAgencies: "Find agencies near you",
        useCurrLocation: "Use my current location",
        gettingLocation: "Getting your location...",
        searchBtn: "Search"
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
    }
  },
  es: {
    translation: {
      about: {
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
      nav: {
        home: "Inicio",
        findFood: "Encontrar Comida",
        services: "Servicios",
        about: "Acerca de",
        community: "Comunidad",
        signIn: "Iniciar Sesión"
      },
      heroSection: {
        title1: "Encontrar Recursos Alimentarios",
        title2: "En Su Comunidad",
        privacyStmt: "No se requiere registrarse para encontrar recursos. Su privacidad es importante para nosotros.",
        subTitle: "Conectando a las personas con programas de asistencia alimentaria, bancos de alimentos y recursos comunitarios para ayudar a combatir la inseguridad alimentaria.",
        zipCodePlaceHolder: "Ingrese su código postal"
      },
      programSection: {
        title: "Programas de Asistencia Alimentaria",
        subTitle: "Conozca los programas disponibles para ayudarle a usted y a su familia a acceder a alimentos nutritivos."
      },
      communityPage: {
        title: "Únase a Nuestra Comunidad",
        subTitle: "Conéctese con otros, comparta experiencias y encuentre apoyo en su camino hacia la seguridad alimentaria."
      },
      findFoodPage: {
        findAgencies: "Encontrar agencias cerca de usted",
        useCurrLocation: "Usar mi ubicación actual",
        gettingLocation: "Obteniendo su ubicación",
        searchFilters: "Búsqueda y Filtros",
        searchBtn: "Buscar",
        showFilters: "Mostrar Filtros",
        searchResources: "Buscar recursos...",

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
        adjustSearchMsg: "Intente ajustar sus filtros o criterios de búsqueda.",
      }


    }
  // },
  // fr: {
  //   translation: {
  //     about: {
  //       title: "À Propos de FoodConnect",
  //       mission: "Notre Mission",
  //       missionText: "FoodConnect vise à aider les gens à trouver facilement des ressources alimentaires locales. Nous connectons les personnes confrontées à l'insécurité alimentaire avec des garde-manger, des cuisines communautaires et d'autres programmes d'aide alimentaire à proximité.",
  //       story: "Notre Histoire",
  //       storyText: "FoodConnect a été créé pour relever le défi de connecter les personnes dans le besoin avec les ressources alimentaires disponibles. Notre plateforme rend ces services vitaux plus accessibles à tous.",
  //       values: "Nos Valeurs",
  //       valuesText: "Nous croyons que tout le monde mérite d'avoir accès à une alimentation saine. Notre plateforme est fondée sur des principes d'inclusivité, de soutien communautaire et d'accessibilité."
  //     }
  //   }
  // },
  // zh: {
  //   translation: {
  //     about: {
  //       title: "关于 FoodConnect",
  //       mission: "我们的使命",
  //       missionText: "FoodConnect 旨在帮助人们轻松找到当地食物资源。我们将面临食物不安全的人们与附近的食物储藏室、社区厨房和其他食物援助计划联系起来。",
  //       story: "我们的故事",
  //       storyText: "FoodConnect 的创建是为了解决将有需要的人与可用的食物资源联系起来的挑战。我们的平台使这些重要服务对每个人都更加容易获得。",
  //       values: "我们的价值观",
  //       valuesText: "我们相信每个人都应该获得健康食品。我们的平台建立在包容性、社区支持和可访问性的原则上。"
  //     }
  //   }
  }
};

// Check for stored language preference
const savedLanguage = localStorage.getItem('language') || 'en';
console.log('Initializing i18n with language:', savedLanguage);

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: true // Add debug to help diagnose issues
  });

// Export the i18next instance
export default i18next;