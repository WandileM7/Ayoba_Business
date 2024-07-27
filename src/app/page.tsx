import Image from "next/image";
import styles from "../page.module.css";

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Welcome to the Ayoba Business App. Start by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/your-logo.svg" // Replace with your app logo
          alt="Ayoba Business Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="/docs"
          className={styles.card}
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find detailed information about the Ayoba Business App features and API.</p>
        </a>

        <a
          href="/learn"
          className={styles.card}
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Interactive tutorials to get started with the Ayoba Business App.</p>
        </a>

        <a
          href="/templates"
          className={styles.card}
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for building with the Ayoba Business App.</p>
        </a>

        <a
          href="/deploy"
          className={styles.card}
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Learn how to deploy your Ayoba Business App.
          </p>
        </a>
      </div>
    </main>
    </>
  );
}
