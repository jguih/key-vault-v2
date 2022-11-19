import Footer from '../components/Footer';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-between h-100 ab">
      <Header activeKey={"/"} />
      <div className="mb-auto pb-4 pt-4">
        <SubHeader />
        <Outdoor />
        <Section
          title="Adicionados Recentemente"
          rows="1"
        />
        <Section
          title="Promoção"
          rows="2"
        />
        <Section
          title="Mais Vendidos"
          rows="1"
        />
      </div>
      <Footer/>
    </div>
  );
}