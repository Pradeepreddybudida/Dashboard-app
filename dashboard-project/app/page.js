// app/page.js
import Link from 'next/link';
import styles from './HomePage.module.css'; // Adjust the path as needed

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Interactive Dashboard</h1>
      <p className={`${styles.lead} mt-4`}>
        Explore real-time data visualization and metrics.
      </p>
      <div className={styles.buttongroup}>
        <Link href="/login">
          <button className={`${styles.btn} ${styles.btnPrimary} mx-2`}>
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className={`${styles.btn} ${styles.btnSecondary} mx-2`}>
            Sign Up
          </button>
        </Link>
      </div>
      
    </div>
  );
}
