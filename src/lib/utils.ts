import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return dateString;
  }
}

// Function to safely parse JSON from jsonb fields
export function parseJsonbField<T>(jsonbField: any): T | null {
  if (!jsonbField) return null;
  
  try {
    // If it's already an object/array, return it
    if (typeof jsonbField === 'object') return jsonbField as T;
    
    // Otherwise try to parse it
    const parsed = JSON.parse(jsonbField) as T;
    
    // Check if the result is an empty object
    if (parsed !== null && typeof parsed === 'object' && 
        Object.keys(parsed).length === 0 && !Array.isArray(parsed)) {
      return null;
    }
    
    return parsed;
  } catch (e) {
    console.error('Error parsing JSONB field:', e);
    return null;
  }
}
