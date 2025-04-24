import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        title: "About FoodConnect",
        mission: "Our Mission",
        missionText: "FoodConnect aims to help people find local food resources easily. We connect people facing food insecurity with nearby food pantries, community kitchens, and other food assistance programs.",
        story: "Our Story",
        storyText: "FoodConnect was created to address the challenge of connecting those in need with available food resources. Our platform makes these vital services more accessible to everyone.",
        values: "Our Values",
        valuesText: "We believe everyone deserves access to healthy food. Our platform is built on principles of inclusivity, community support, and accessibility.",
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
        subTitle: "Connecting people with food assistance programs, food banks, and community resources to help address food insecurity"
      }
    }
  },
  es: {
    translation: {
      nav: {
        title: "Acerca de FoodConnect",
        mission: "Nuestra Misión",
        missionText: "FoodConnect tiene como objetivo ayudar a las personas a encontrar recursos alimentarios locales fácilmente. Conectamos a personas con inseguridad alimentaria con despensas de alimentos cercanas, cocinas comunitarias y otros programas de asistencia alimentaria.",
        story: "Nuestra Historia",
        storyText: "FoodConnect fue creado para abordar el desafío de conectar a quienes lo necesitan con los recursos alimentarios disponibles. Nuestra plataforma hace que estos servicios vitales sean más accesibles para todos.",
        values: "Nuestros Valores",
        valuesText: "Creemos que todos merecen acceso a alimentos saludables. Nuestra plataforma se basa en principios de inclusión, apoyo comunitario y accesibilidad.",
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
        subTitle: "Conectando a las personas con programas de asistencia alimentaria, bancos de alimentos y recursos comunitarios para ayudar a combatir la inseguridad alimentaria."
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