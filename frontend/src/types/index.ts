export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  savedResources?: string[];
  uid: string;
  displayName: string | null;
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

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Hours {
  [day: string]: TimeSlot[];
}

export interface Agency {
  id?: string;
  name: string;
  address: string;
  phone: string;
  hours: Hours;
  appointment_needed: string;
  requirements: string;
  distribution_model: string;
  notes: string;
  cultures_served: string[];
  distance?: number;
  food_format?: string;
}

export interface Service {
  id: string;
  name: string;
  agencies: Agency[];
}

export interface FoodProgram {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  link: string;
  icon: string;
}