import { Alert, Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function About() {
  return (
    <div className="d-flex flex-column justify-content-between h-100 ab">
      <Header activeKey={"/about"} />
      <div className="mb-auto pb-4 pt-4">
        <Container>
          <Alert variant='info' className='d-flex justify-content-center'>WIP :D</Alert>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}