import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <div className="d-grid gap-4 mb-5">
      <Header activeKey="/" />
      <SubHeader />
      <Outdoor />
      <Section 
        title="Promoção"
        rows="1"
      />
    </div>
  );
}
