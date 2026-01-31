import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

interface ContactInfo {
  title: string;
  details: string[];
  icon: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface FAQ {
  question: string;
  answer: string;
  expanded: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
  newsletterEmail = '';

  contactInfo: ContactInfo[] = [
    {
      title: 'Visit Our Roastery',
      details: ['123 Coffee Street', 'Seattle, WA 98101', 'United States'],
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      title: 'Customer Support',
      details: ['Mon–Fri: 9:00 AM – 6:00 PM PST', 'Sat: 10:00 AM – 4:00 PM PST', 'Sun: Closed'],
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Contact Details',
      details: ['+1 (555) 123-4567', 'hello@brewhaven.com', 'support@brewhaven.com'],
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      url: '#'
    },
    {
      name: 'Twitter',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      url: '#'
    },
    {
      name: 'Facebook',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      url: '#'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'How long does shipping take?',
      answer: 'We roast and ship within 24 hours of your order. Standard shipping takes 3-5 business days, while express shipping delivers in 1-2 business days. All orders include tracking.',
      expanded: false
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your coffee, contact us and we\'ll make it right with a replacement or refund.',
      expanded: false
    },
    {
      question: 'Do you offer wholesale for cafes?',
      answer: 'Yes! We partner with select cafes and restaurants. Please select "Wholesale" as your subject when contacting us, and our team will send you our wholesale catalog and pricing.',
      expanded: false
    },
    {
      question: 'How should I store my coffee?',
      answer: 'Store your coffee in the original bag or an airtight container in a cool, dark place. Avoid the refrigerator or freezer, as moisture and temperature fluctuations can degrade quality.',
      expanded: false
    },
    {
      question: 'When is the best time to brew after roasting?',
      answer: 'We recommend waiting 3-7 days after the roast date for optimal flavor. This allows the beans to degas and develop their full character. Each bag includes the roast date for your reference.',
      expanded: false
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    // Simulate submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccess = true;
    }, 1500);
  }

  resetForm() {
    this.contactForm.reset();
    this.showSuccess = false;
  }

  toggleFaq(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      alert(`Thank you for subscribing with ${this.newsletterEmail}! You'll receive our next newsletter soon.`);
      this.newsletterEmail = '';
    }
  }
}
