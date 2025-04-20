export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  savedResources?: string[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  hours?: string;
  type: 'food-bank' | 'soup-kitchen' | 'meal-program' | 'grocery-assistance' | 'other';
  requirements?: string;
  image?: string;
}

export interface FoodProgram {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  link: string;
  icon: string;
}