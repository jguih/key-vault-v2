import { Row, Col, Card, Container } from 'react-bootstrap';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

export default function Home() {
  return (
    <>
      <Header activeKey="/" />
      <Container className="mt-4 gap-4">
        <Row>
          <Col>
            <SubHeader/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
