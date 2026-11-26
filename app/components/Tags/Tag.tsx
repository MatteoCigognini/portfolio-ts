import Image from 'next/image';
import styles from './Tag.module.css';

type TagProps = {
  text: string;
  image?: { url: string; alt: string };
  variant?: 'default' | 'small';
};

export default function Tag({ image, text, variant = 'default' }: TagProps) {
  return (
    <div className={`${styles.tag} ${styles[variant]}`}>
      {image && (
        <span className={styles.logo}>
          <Image src={image.url} alt={image.alt} width={22} height={22} className={styles.img} />
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </div>
  );
}
