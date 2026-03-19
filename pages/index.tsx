import Layout from "../components/layout";
import Footer from "../components/footer";
import { Color } from "../components/icons";
import Glider from "../components/glider";


export default function Home() {
  return (
    <Layout title={"мотъ, кутила, повѣса"}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <Glider size={320} fadeEdge={0.4} />
      </div>
      <Footer color={Color.White}/>
    </Layout>
  )
}
