import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="skeleton-loading" 
      [style.width]="width" 
      [style.height]="height"
      [class.rounded]="rounded">
      <div class="skeleton-shine"></div>
    </div>
  `,
  styles: [`
    .skeleton-loading {
      background: var(--color-gray-200);
      position: relative;
      overflow: hidden;
    }

    .rounded {
      border-radius: 8px;
    }

    .skeleton-shine {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: loading 1.5s infinite;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    @keyframes loading {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `]
})
export class SkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() rounded: boolean = false;
}
