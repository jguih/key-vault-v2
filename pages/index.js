import { Button, Card, Container } from 'react-bootstrap';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Container fluid className="p-0 m-0">
      <Header activeKey="/" />
    </Container>
  )
}
