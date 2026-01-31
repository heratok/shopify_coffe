import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CoffeeImage {
  id: string;
  url: string;
  photographer: string;
  photographerUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // Cache para imágenes
  private imageCache: Map<string, CoffeeImage> = new Map();
  
  // URLs de imágenes de Pexels (alta calidad, gratuitas)
  private fallbackImages: CoffeeImage[] = [
    {
      id: 'coffee-1',
      url: 'https://images.pexels.com/photos/2252513/pexels-photo-2252513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Chevanon Photography',
      photographerUrl: 'https://www.pexels.com/@chevanon'
    },
    {
      id: 'coffee-2',
      url: 'https://images.pexels.com/photos/2478327/pexels-photo-2478327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Taryn Elliott',
      photographerUrl: 'https://www.pexels.com/@taryn-elliott'
    },
    {
      id: 'coffee-3',
      url: 'https://images.pexels.com/photos/4820687/pexels-photo-4820687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Ketut Subiyanto',
      photographerUrl: 'https://www.pexels.com/@ketut-subiyanto'
    },
    {
      id: 'coffee-4',
      url: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Tyler Nix',
      photographerUrl: 'https://www.pexels.com/@jtylernix'
    },
    {
      id: 'coffee-5',
      url: 'https://images.pexels.com/photos/374147/pexels-photo-374147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Burst',
      photographerUrl: 'https://www.pexels.com/@burst'
    },
    {
      id: 'coffee-6',
      url: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Tookapic',
      photographerUrl: 'https://www.pexels.com/@tookapic'
    },
    {
      id: 'coffee-7',
      url: 'https://images.pexels.com/photos/4196907/pexels-photo-4196907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Karolina Grabowska',
      photographerUrl: 'https://www.pexels.com/@karolina-grabowska'
    },
    {
      id: 'coffee-8',
      url: 'https://images.pexels.com/photos/1170659/pexels-photo-1170659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Chevanon Photography',
      photographerUrl: 'https://www.pexels.com/@chevanon'
    },
    {
      id: 'hero-1',
      url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
      photographer: 'Chevanon Photography',
      photographerUrl: 'https://www.pexels.com/@chevanon'
    },
    {
      id: 'hero-2',
      url: 'https://images.pexels.com/photos/34085/pexels-photo-34085.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
      photographer: 'Kaboompics',
      photographerUrl: 'https://www.pexels.com/@kaboompics'
    },
    {
      id: 'hero-3',
      url: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
      photographer: 'Rodrigo Souza',
      photographerUrl: 'https://www.pexels.com/@rodrigo-souza'
    },
    {
      id: 'about-1',
      url: 'https://images.pexels.com/photos/302892/pexels-photo-302892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'kaboompics',
      photographerUrl: 'https://www.pexels.com/@kaboompics'
    },
    {
      id: 'about-2',
      url: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      photographer: 'Chevanon Photography',
      photographerUrl: 'https://www.pexels.com/@chevanon'
    },
    {
      id: 'category-beans',
      url: 'https://images.pexels.com/photos/1235717/pexels-photo-1235717.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      photographer: 'Taryn Elliott',
      photographerUrl: 'https://www.pexels.com/@taryn-elliott'
    },
    {
      id: 'category-espresso',
      url: 'https://images.pexels.com/photos/1627933/pexels-photo-1627933.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      photographer: 'Ekran Resmi',
      photographerUrl: 'https://www.pexels.com/@ekran-resmi'
    },
    {
      id: 'category-equipment',
      url: 'https://images.pexels.com/photos/1496339/pexels-photo-1496339.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      photographer: 'Chevanon Photography',
      photographerUrl: 'https://www.pexels.com/@chevanon'
    }
  ];

  constructor() {}

  /**
   * Obtiene una imagen específica por ID (determinístico)
   */
  getImageById(id: string): CoffeeImage {
    if (this.imageCache.has(id)) {
      return this.imageCache.get(id)!;
    }

    const image = this.fallbackImages.find(img => img.id === id);
    
    if (image) {
      this.imageCache.set(id, image);
      return image;
    }

    return this.fallbackImages[0];
  }

  /**
   * Obtiene una imagen basada en un hash del texto (determinístico)
   */
  getImageByHash(text: string): CoffeeImage {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const index = Math.abs(hash) % this.fallbackImages.length;
    return this.fallbackImages[index];
  }

  /**
   * Obtiene imagen para un producto específico
   */
  getProductImage(productId: string, productName: string): string {
    const productImageMap: { [key: string]: string } = {
      '1': 'coffee-1',
      '2': 'coffee-2',
      '3': 'coffee-3',
      '4': 'coffee-4',
      '5': 'coffee-5',
      '6': 'coffee-6',
      '7': 'coffee-7',
      '8': 'coffee-8'
    };

    const imageId = productImageMap[productId];
    if (imageId) {
      return this.getImageById(imageId).url;
    }

    return this.getImageByHash(productName).url;
  }

  /**
   * Obtiene imagen para Hero section
   */
  getHeroImage(index: number = 0): string {
    const heroImages = ['hero-1', 'hero-2', 'hero-3'];
    const id = heroImages[index % heroImages.length];
    return this.getImageById(id).url;
  }

  /**
   * Obtiene imagen para About page
   */
  getAboutImage(index: number = 0): string {
    const aboutImages = ['about-1', 'about-2'];
    const id = aboutImages[index % aboutImages.length];
    return this.getImageById(id).url;
  }

  /**
   * Obtiene imagen para categoría
   */
  getCategoryImage(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'single-origin': 'category-beans',
      'blends': 'coffee-4',
      'espresso': 'category-espresso',
      'decaf': 'coffee-6',
      'equipment': 'category-equipment'
    };

    const imageId = categoryMap[category.toLowerCase()] || 'coffee-1';
    return this.getImageById(imageId).url;
  }

  /**
   * Precarga una imagen para mejorar performance
   */
  preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Obtiene todas las imágenes disponibles
   */
  getAllImages(): CoffeeImage[] {
    return [...this.fallbackImages];
  }
}