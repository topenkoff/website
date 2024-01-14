import Head from 'next/head'
import { Inter } from 'next/font/google'
import IndexBackground from "../components/background";
import Layout from "../components/layout";
import Footer from "../components/footer";
import { Color } from "../components/icons";


export default function Home() {
  return (
    <Layout title={"мотъ, кутила, повѣса"}>
      <IndexBackground />
      <Footer color={Color.White}/>
    </Layout>
  )
}
