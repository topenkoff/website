import Footer from "../components/footer";
import Layout from "../components/layout";

import styles from '@/styles/404.module.css'

export default function NotFound() {
  return (
    <Layout title={"Wooops"}>
      <div className={`${styles.placeholder}`}>
        <Footer />
      </div>
    </Layout>
  )
}
