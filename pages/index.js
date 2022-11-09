import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <>
      <Header activeKey="/" />
      <SubHeader />
      <Outdoor />
      <Section
        title="Promoção"
        rows="1"
      />
    </>
  );
}
