import { v4 as uuidv4 } from 'uuid';

export const navLinks = [
  { id: uuidv4(), name: 'Home', href: '/' },
  {id: uuidv4(), name: 'About', href: '/our-farm' },
  { id: uuidv4(),name: 'Products', href: '/products' },
  { id: uuidv4(),name: 'Blog', href: '/blog' },
  {id: uuidv4(), name: 'Contact', href: '/contact' },
];