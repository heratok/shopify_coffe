import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

interface LegalSection {
  heading: string;
  intro: string;
  sections: { title: string; body: string }[];
}

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {
  page: LegalSection | null = null;

  private pages: Record<string, LegalSection> = {
    '/privacy-policy': {
      heading: 'Privacy Policy',
      intro: 'This Privacy Policy explains how Brew Haven collects, uses, and protects your information when you use our website.',
      sections: [
        {
          title: 'Information We Collect',
          body: 'We collect information you provide directly, such as your name, email address, and order details when you create an account, place an order, or contact us. We also collect limited technical data, such as your browser type and the pages you visit, to help us improve the site.'
        },
        {
          title: 'How We Use Your Information',
          body: 'We use your information to process orders, provide customer support, send order updates, and — with your consent — share news and offers. We do not sell your personal information to third parties.'
        },
        {
          title: 'Cookies',
          body: 'We use cookies to keep you signed in, remember your preferences, and understand how the site is used. You can control cookies through your browser settings.'
        },
        {
          title: 'Contact',
          body: 'If you have questions about this Privacy Policy or how your data is handled, please contact us at info@brewhaven.com.'
        }
      ]
    },
    '/terms-of-service': {
      heading: 'Terms of Service',
      intro: 'These Terms of Service govern your use of the Brew Haven website and the purchase of our products.',
      sections: [
        {
          title: 'Use of the Site',
          body: 'You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict anyone else\'s use of the site.'
        },
        {
          title: 'Orders',
          body: 'All orders are subject to availability and confirmation of the price. We reserve the right to refuse or cancel an order for reasons such as product availability, pricing errors, or suspected fraud.'
        },
        {
          title: 'Liability',
          body: 'While we take care to ensure product information is accurate, Brew Haven is not liable for any indirect or consequential loss arising from the use of the site or the products purchased through it.'
        },
        {
          title: 'Contact',
          body: 'For questions about these Terms, please contact us at info@brewhaven.com.'
        }
      ]
    },
    '/shipping-info': {
      heading: 'Shipping Information',
      intro: 'Here is everything you need to know about how Brew Haven prepares and delivers your coffee.',
      sections: [
        {
          title: 'Processing Time',
          body: 'Orders are roasted and packed to order. Please allow 1–2 business days for your order to be processed before it ships.'
        },
        {
          title: 'Shipping Rates',
          body: 'Standard shipping is $5.00 per order, and shipping is free on orders over $50. Delivery times vary by destination.'
        },
        {
          title: 'International Shipping',
          body: 'We currently ship to a limited number of international destinations. Shipping rates and delivery times are calculated at checkout.'
        },
        {
          title: 'Tracking',
          body: 'Once your order ships, you will receive a confirmation email with a tracking number so you can follow your delivery.'
        },
        {
          title: 'Contact',
          body: 'If you have any questions about shipping, please contact us at info@brewhaven.com.'
        }
      ]
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.page = this.pages[this.router.url] ?? null;
  }
}
