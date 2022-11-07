import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <>
      <Header activeKey="/" />
      <SubHeader/>
      <Outdoor/>
      <Carousel/>
    </>
  );
}
