import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HomeSkeletonComponent } from '../../shared/components/home-skeleton/home-skeleton.component';

export interface WheelSegment {
  family: string;
  label: string;
  lit: boolean;
  path: string;
  labelX: number;
  labelY: number;
  markerX: number;
  markerY: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
    HeaderComponent,
    FooterComponent,
    HomeSkeletonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = true;
  newsletterSuccess = false;

  wheelSegments: WheelSegment[] = [];
  featuredName = '';
  featuredFamily = '';

  private readonly WHEEL_CENTER = 230;
  private readonly WHEEL_OUTER = 206;
  private readonly WHEEL_INNER = 96;
  private readonly SEGMENTS = ['floral', 'fruity', 'sour', 'green', 'roasty', 'spicy', 'nutty', 'cocoa', 'sweet'];

  categories = [
    {
      id: 'single-origin',
      name: 'Single Origin',
      description: 'Experience the unique flavors of specific regions',
      imageUrl: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
      hues: ['var(--wheel-floral)', 'var(--wheel-roasty)']
    },
    {
      id: 'blends',
      name: 'Signature Blends',
      description: 'Carefully crafted combinations for perfect balance',
      imageUrl: 'https://images.pexels.com/photos/2608495/pexels-photo-2608495.jpeg',
      hues: ['var(--wheel-nutty)']
    },
    {
      id: 'espresso',
      name: 'Espresso',
      description: 'Bold and robust beans for the perfect shot',
      imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      hues: ['var(--wheel-roasty)']
    },
    {
      id: 'decaf',
      name: 'Decaf',
      description: 'Full flavor without the caffeine',
      imageUrl: 'https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg',
      hues: ['var(--wheel-green)']
    }
  ];

  testimonials = [
    {
      rating: 5,
      text: 'The Kenyan single origin coffee from Brew Haven is extraordinary. The fruity notes are perfectly balanced with a delightful acidity.',
      author: 'Tasting note',
      title: 'Kenya AA — blackcurrant, wine, citrus'
    },
    {
      rating: 5,
      text: 'I\'ve tried many subscription services, but Brew Haven consistently delivers the freshest and most flavorful coffee I\'ve ever had.',
      author: 'Cupping note',
      title: 'Morning Blend — chocolate, nuts, caramel'
    },
    {
      rating: 4,
      text: 'Their Colombian blend has become my morning ritual. Rich, smooth, and always delivered right when I need it.',
      author: 'Roaster note',
      title: 'Colombian Supremo — caramel, almond, red apple'
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildWheel([]);
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
      this.loading = false;
      if (products.length) {
        const featured = products[0];
        this.featuredName = featured.name;
        this.featuredFamily = this.getFamilyFromNote(featured.flavourNotes[0]);
        const families = [...new Set(featured.flavourNotes.map(note => this.getFamilyFromNote(note)))];
        this.buildWheel(families);
      }
    });
  }

  private buildWheel(litFamilies: string[]): void {
    const cx = this.WHEEL_CENTER;
    const cy = this.WHEEL_CENTER;
    const segAngle = 360 / this.SEGMENTS.length;
    const gap = 1.6;
    const midRadius = (this.WHEEL_INNER + this.WHEEL_OUTER) / 2;
    const markerRadius = this.WHEEL_INNER + (this.WHEEL_OUTER - this.WHEEL_INNER) * 0.7;

    this.wheelSegments = this.SEGMENTS.map((family, index) => {
      const start = -90 + index * segAngle + gap;
      const end = start + segAngle - gap * 2;
      const midAngle = (-90 + index * segAngle + segAngle / 2) * (Math.PI / 180);
      return {
        family,
        label: family.toUpperCase(),
        lit: litFamilies.includes(family),
        path: this.wedgePath(cx, cy, this.WHEEL_OUTER, this.WHEEL_INNER, start, end),
        labelX: cx + midRadius * Math.cos(midAngle),
        labelY: cy + midRadius * Math.sin(midAngle),
        markerX: cx + markerRadius * Math.cos(midAngle),
        markerY: cy + markerRadius * Math.sin(midAngle)
      };
    });
  }

  private polarPoint(cx: number, cy: number, radius: number, angleDeg: number): { x: number; y: number } {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  private wedgePath(cx: number, cy: number, outerR: number, innerR: number, startDeg: number, endDeg: number): string {
    const oStart = this.polarPoint(cx, cy, outerR, startDeg);
    const oEnd = this.polarPoint(cx, cy, outerR, endDeg);
    const iEnd = this.polarPoint(cx, cy, innerR, endDeg);
    const iStart = this.polarPoint(cx, cy, innerR, startDeg);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M${oStart.x.toFixed(2)} ${oStart.y.toFixed(2)} A${outerR} ${outerR} 0 ${largeArc} 1 ${oEnd.x.toFixed(2)} ${oEnd.y.toFixed(2)} L${iEnd.x.toFixed(2)} ${iEnd.y.toFixed(2)} A${innerR} ${innerR} 0 ${largeArc} 0 ${iStart.x.toFixed(2)} ${iStart.y.toFixed(2)} Z`;
  }

  getFamilyFromNote(note: string): string {
    const n = note.toLowerCase();
    const rules: Array<[RegExp, string]> = [
      [/floral|bergamot|jasmine|rose|lavender|citrus/, 'floral'],
      [/blackcurrant|wine|berry|apple|cherry|fruit|stone/, 'fruity'],
      [/sour|vinegary|tart/, 'sour'],
      [/earthy|herbal|hay|grassy|green/, 'green'],
      [/roast|smoky|ashy|pipe|tobacco/, 'roasty'],
      [/spice|pepper|pimento|pungent/, 'spicy'],
      [/nut|almond|hazelnut|walnut|peanut|caramel/, 'nutty'],
      [/chocolate|cocoa|mocha/, 'cocoa'],
      [/sweet|sugar|honey|syrup|vanilla/, 'sweet']
    ];
    for (const [re, family] of rules) {
      if (re.test(n)) return family;
    }
    return 'nutty';
  }

  selectFamily(family: string): void {
    this.router.navigate(['/products'], { queryParams: { wheel: family } });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  viewProduct(product: Product): void {
    console.log('Quick view:', product);
  }

  subscribeNewsletter(): void {
    this.newsletterSuccess = true;
  }
}
