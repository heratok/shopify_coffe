import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- DIRECTION CONTRACT: THESIS: The flavor wheel is the store; every coffee is its slice of the wheel, and tasting notes are color-coded vocabulary the visitor already reads. It refuses the warm-cream-plus-serif artisan template and the near-black neon cliché. OWN-WORLD: latte-cream ground, espresso ink chrome, saturated wheel hues (floral violet, fruity orange, roasty brown, spicy red, nutty amber, cocoa, sweet rose) as product-identity colors, JetBrains Mono numerals for prices/weights/ratings, Bricolage Grotesque display. STORY: The visitor reads coffee by taste: each product's wheel slice shows its notes in color, the wheel navigates the collection, and buying feels like cupping. FIRST VIEWPORT: a large interactive flavor-wheel navigator with the featured product's slice lit, headline "Taste is the language", primary action "Explore the collection". FORM: Cupping Wheel (user-selected; seed key 336b223e). FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md. -->
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppComponent {
  title = 'Brew Haven Coffee Shop';
}