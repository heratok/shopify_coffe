import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  values: Value[] = [
    {
      title: 'Ethical Sourcing',
      description: 'Direct relationships with farming families ensure fair compensation and sustainable practices that protect both people and planet.',
      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    },
    {
      title: 'Quality First',
      description: 'We source only specialty-grade beans, scoring 80+ points, and roast in small batches to preserve the unique character of each origin.',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
    },
    {
      title: 'Education',
      description: 'We believe great coffee experiences come from knowledge. Our resources help you brew better and appreciate the craft.',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z'
    },
    {
      title: 'Community',
      description: 'From farmer partnerships to local coffee conversations, we foster connections that enrich the entire coffee ecosystem.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      title: 'Transparency',
      description: 'Every bag tells you exactly where your coffee comes from, who grew it, and how it was processed—no mysteries, no compromises.',
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
    },
    {
      title: 'Sustainability',
      description: 'From compostable packaging to carbon-neutral shipping, we minimize environmental impact at every step of our supply chain.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064'
    }
  ];

  processSteps: ProcessStep[] = [
    {
      title: 'Source',
      description: 'We travel to origin, visiting farms and cupping countless samples to find exceptional beans that meet our exacting standards.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064'
    },
    {
      title: 'Select',
      description: 'Each lot is rigorously evaluated for cup quality, defect counts, and consistency. Only the top 5% make it to our offerings.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Import',
      description: 'We handle all logistics directly, ensuring beans arrive in optimal condition while minimizing time from harvest to roaster.',
      icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
    },
    {
      title: 'Roast',
      description: 'Our master roaster profiles each origin individually, coaxing out unique flavor characteristics while honoring the bean\'s inherent qualities.',
      icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
    },
    {
      title: 'Package',
      description: 'Within 24 hours of roasting, coffee is packaged in nitrogen-flushed, compostable bags to preserve peak freshness.',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
    },
    {
      title: 'Deliver',
      description: 'Shipped directly to your door with carbon-neutral delivery, ensuring your coffee arrives ready to brew at its absolute best.',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  team: TeamMember[] = [
    {
      name: 'Elena Rodriguez',
      role: 'Founder & Head Roaster',
      bio: 'With 15 years in specialty coffee and a Q Grader certification, Elena personally oversees every roast.',
      initials: 'ER'
    },
    {
      name: 'Marcus Chen',
      role: 'Green Coffee Buyer',
      bio: 'Marcus spends half the year visiting farms across Latin America and Africa, building lasting partnerships.',
      initials: 'MC'
    },
    {
      name: 'Sofia Andersen',
      role: 'Head of Operations',
      bio: 'Sofia ensures every bag reaches you in perfect condition while minimizing our environmental footprint.',
      initials: 'SA'
    },
    {
      name: 'James O\'Brien',
      role: 'Education Director',
      bio: 'A former barista champion, James creates resources that help customers brew cafe-quality coffee at home.',
      initials: 'JO'
    }
  ];
}
