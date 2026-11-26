import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import type { Social } from '@/types';

export const CONTACT_EMAIL = 'work.cigognini.matteo@gmail.com';

export const SOCIALS: Social[] = [
  { name: 'GitHub', link: 'https://github.com/MatteoCigognini', icon: faGithub },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/cigognini-matteo', icon: faLinkedin },
  { name: 'Instagram', link: 'https://www.instagram.com/cigognini.matteo', icon: faInstagram },
  { name: 'Facebook', link: 'https://www.facebook.com/cigognini.matteo', icon: faFacebook },
];
