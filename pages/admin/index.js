import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import adminStyles from "../../scss/modules/pages/admin/Admin.module.scss";
import * as yup from "yup";
import { Formik, Form } from 'formik';
import * as Custom from '../../components/ui/FormikCustomForms';
import { decimalFormatter } from '../../global';

// Field validation schema
let schema = yup.object().shape({
  name: yup
    .string()
    .required("Campo Obrigatório!"),
  description: yup.string(),
  price: yup
    .number()
    .positive("Deve ser positivo!")
    .required("Campo Obrigatório!"),
  discount: yup
    .number("Deve ser um número!")
    .min(0, "Mínimo de 0%")
    .max(100, "Máximo de 100%")
    .integer("Deve ser um número inteiro!"),
  developer: yup
    .string()
    .required("Campo Obrigatório!"),
  publisher: yup
    .string()
    .required("Campo Obrigatório!"),
  releaseDate: yup
    .date()
    .required("Campo Obrigatório!"),
  isDiscountActive: yup
    .boolean()
    .required()
});

// Initial form values
const initialValues = {
  name: '',
  description: '',
  price: '',
  discount: 0,
  developer: '',
  publisher: '',
  releaseDate: '',
  isDiscountActive: true,
}

export default function Admin() {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey={"/store"} />
      <div className="mb-auto pb-4 pt-4">
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, actions) => {
              const discount = values.discount;
              const price = values.price;
              const submitValues = {
                ...values,
                discount: discount === "" ? 0 : discount / 100,
                price: decimalFormatter.format(price)
              }
              console.log(JSON.stringify(submitValues, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {formik => (
              <Form noValidate>
                <Row>
                  <Col>
                    <Custom.FloatingLabel
                      label="Nome"
                      name="name"
                      type="text"
                      placeholder="Nome"
                    />
                    <Custom.FloatingLabelTextArea
                      label="Descrição"
                      name="description"
                      type="text"
                      placeholder="Descrição"
                    />
                    <Custom.FloatingLabel
                      label="Desenvolvedor"
                      name="developer"
                      type="text"
                      placeholder="Desenvolvedor"
                    />
                    <Custom.FloatingLabel
                      label="Distribuidora"
                      name="publisher"
                      type="text"
                      placeholder="Distribuidora"
                    />
                    <Custom.FloatingLabel
                      label="Data de Lançamento"
                      name="releaseDate"
                      type="date"
                      placeholder="Data de Lançamento"
                    />
                    <Row>
                      <Col>
                        <Custom.Field
                          label="Preço"
                          name="price"
                          type="number"
                          startText="R$"
                        />
                      </Col>
                      <Col>
                        <Custom.Field
                          label="Desconto"
                          name="discount"
                          type="number"
                          endText="%"
                        />
                      </Col>
                      <Col className="mb-3" sm="auto">
                        <Custom.CheckboxBtn 
                          label="Desconto Ativo?"
                          name="isDiscountActive"
                          id="isDiscountActive"
                          invisibleLabel={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <button type="submit">Salvar</button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
      <Footer />
    </div>
  );
}