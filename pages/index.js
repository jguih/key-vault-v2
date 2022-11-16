import Footer from '../components/Footer';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <>
      <Header activeKey={0} />
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
      <Footer/>
    </>
  );
}
