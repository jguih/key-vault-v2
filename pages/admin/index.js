import { Tab, Tabs, Container, Form, FloatingLabel, InputGroup } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import adminStyles from "../../scss/modules/pages/admin/Admin.module.scss";

export default function Admin() {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey={"/store"} />
      <div className="mb-auto pb-4 pt-4">
        <Container>
          <Tabs defaultActiveKey="desc" className={`mb-3 ${adminStyles.tabs}`}>
            <Tab eventKey="desc" title="Dados Gerais">
              <DescTab />
            </Tab>
            <Tab eventKey="char" title="Características">

            </Tab>
            <Tab eventKey="img" title="Imagens">

            </Tab>
          </Tabs>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

function DescTab() {
  return (
    <Form className={`${adminStyles["desc-container"]}`}>
      <div className={`${adminStyles.desc}`}>
        <FloatingLabel className={`mb-3`} label="Nome">
          <Form.Control
            type="text"
            placeholder="Nome"
            aria-label="Nome"
            className={`${adminStyles["form-control"]} mb-3`}
          />
        </FloatingLabel>
        <FloatingLabel className={`mb-3`} label="Descrição">
          <Form.Control
            as="textarea"
            placeholder="Descrição"
            aria-label="Descrição"
            className={`${adminStyles["form-control"]} mb-3`}
            style={{ height: 250 + "px" }}
          />
        </FloatingLabel>
        <Form.Label htmlFor="price">Preço</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text className={`${adminStyles["input-group-text"]} mb-3`}>
            R$
          </InputGroup.Text>
          <Form.Control
            aria-label="Price"
            id="price"
            className={`${adminStyles["form-control"]} mb-3`}
          />
        </InputGroup>
        <Form.Label htmlFor="price">Desconto</Form.Label>
        <InputGroup className="">
          <Form.Control
            aria-label="Price"
            id="discount"
            className={`${adminStyles["form-control"]}`}
          />
          <InputGroup.Text className={`${adminStyles["input-group-text"]}`}>%</InputGroup.Text>
          <InputGroup.Text className={`${adminStyles["input-group-text"]}`}>
            Ativo ?
          </InputGroup.Text>
          <InputGroup.Text className={`${adminStyles["input-group-text"]}`}>
            <Form.Check className={`${adminStyles.checkbox}`} />
          </InputGroup.Text>
        </InputGroup>
      </div>
    </Form>
  );
}