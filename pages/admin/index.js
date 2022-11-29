import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from "../../scss/modules/pages/admin/Admin.module.scss";
import useData from '../../hooks/useData';
import * as Kv from '../../components/ui/Kv';
import { gameActions, imgTypes, useGameForm } from '../../hooks/useGameForm';
import React from 'react';
import Image from 'next/image';
import LanguageSupport from '../../components/ui/LanguageSupport';

export default function Admin() {

  const { game, dispatchGame, register, handleSubmit, error } = useGameForm();
  const { data } = useData();
  const formRef = React.createRef();

  function Img(image, index) {
    return (
      <div className={`${styles["img-wrapper"]}`} key={index}>
        <Image
          src={image.url}
          alt=""
          fill
          sizes="50vw"
          priority
        />
        <button
          type="button"
          onClick={() => {
            dispatchGame({
              type: gameActions.RemoveImg,
              payload: image
            })
          }}
        ><i className="bi bi-x-lg"></i></button>
      </div>
    );
  }

  if (!data.defined) return;

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey={""} />
      <div className="mb-auto pb-4 pt-4">
        <Container className={`${styles.container}`}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <div><h3 className='m-0'>{game.name}</h3></div>
              <div className="d-flex gap-2">
                <Button type="button" variant="igdb">IGDB</Button>
                <Button
                  type="submit"
                  variant="kv-secondary-800"
                >Salvar</Button>
              </div>
            </div>
            <hr></hr>
            <Kv.FloatingInput
              {...register.field("name", { required: true })}
              type="text"
              label="Nome"
              placeholder="Nome"
            >
              {error.field?.name ?
                <p className={`${styles.error}`}>{error.field.name.message}</p> : null}
            </Kv.FloatingInput>
            <Kv.FloatingTextArea
              {...register.field("description")}
              type="textarea"
              label="Descrição"
              placeholder="Descrição"
              style={{ height: 200 + "px" }}
            >
              {error.field?.description ?
                <p className={`${styles.error}`}>{error.field.description.message}</p> : null}
            </Kv.FloatingTextArea>
            <Kv.FloatingInput
              {...register.field("releaseDate", { required: true, max: "9999-12-31" })}
              type="date"
              label="Data de Lançamento"
              placeholder="Data de Lançamento"
            >
              {error.field?.releaseDate ?
                <p className={`${styles.error}`}>{error.field.releaseDate.message}</p> : null}
            </Kv.FloatingInput>
            <Kv.FloatingInput
              {...register.field("developer", { required: true })}
              type="text"
              label="Desenvolvedor"
              placeholder="Desenvolvedor"
            >
              {error.field?.developer ?
                <p className={`${styles.error}`}>{error.field.developer.message}</p> : null}
            </Kv.FloatingInput>
            <Kv.FloatingInput
              {...register.field("publisher", { required: true })}
              type="text"
              label="Distribuidor"
              placeholder="Distribuidor"
            >
              {error.field?.publisher ?
                <p className={`${styles.error}`}>{error.field.publisher.message}</p> : null}
            </Kv.FloatingInput>
            <Row>
              <Col>
                <Kv.InputGroup
                  {...register.field("price", { required: true, min: "0", step: "0.01" })}
                  type="number"
                  label="Preço"
                  startLabel="R$"
                >
                  {error.field?.price ?
                    <p className={`${styles.error}`}>{error.field.price.message}</p> : null}
                </Kv.InputGroup>
              </Col>
              <Col>
                <Kv.InputGroup
                  {...register.field("discount", { required: true, max: "100", min: "0", step: "1" })}
                  type="number"
                  label="Desconto"
                  endLabel="%"
                >
                  {error.field?.discount ?
                    <p className={`${styles.error}`}>{error.field.discount.message}</p> : null}
                </Kv.InputGroup>
              </Col>
              <Col sm="auto">
                <Kv.BtnCheck
                  {...register.isDiscountActive("Desconto Ativo ?")}
                  invisibleLabel
                />
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <Kv.Accordion title="Categorias" expand={game["game_genre"].length > 0}>
                  {data.genres.map((genre, index) => {
                    return (
                      <Kv.Checkbox
                        {...register.genre(genre)}
                        key={index}
                      />
                    );
                  })}
                </Kv.Accordion>
              </Col>
              <Col>
                <Kv.Accordion title="Gamemodes"></Kv.Accordion>
              </Col>
              <Col>
                <Kv.Accordion title="Plataformas"></Kv.Accordion>
              </Col>
            </Row>
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3">Cover</h3>
              <div className={`${styles["img-container"]}`}>
                {game["game_image"].map((image, index) => {
                  if (image.type === imgTypes.Cover) {
                    return Img(image, index);
                  }
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("cover", imgTypes.Cover)}
              type="text"
              label="URL"
              placeholder="URL"
            >
              {error.urlField?.cover ?
                <p className={`${styles.error}`}>{error.urlField.cover.message}</p> : null}
            </Kv.FloatingInput>
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3">Screenshots</h3>
              <div className={`${styles["img-container"]}`}>
                {game["game_image"].map((image, index) => {
                  if (image.type === imgTypes.Screenshot) {
                    return Img(image, index);
                  }
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("screenshot", imgTypes.Screenshot)}
              type="text"
              label="URL"
              placeholder="URL"
            >
              {error.urlField?.screenshot ?
                <p className={`${styles.error}`}>{error.urlField.screenshot.message}</p> : null}
            </Kv.FloatingInput>
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3">Artwork</h3>
              <div className={`${styles["img-container"]}`}>
                {game["game_image"].map((image, index) => {
                  if (image.type === imgTypes.Artwork) {
                    return Img(image, index);
                  }
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("artwork", imgTypes.Artwork)}
              type="text"
              label="URL"
              placeholder="URL"
            >
              {error.urlField?.artwork ?
                <p className={`${styles.error}`}>{error.urlField.artwork.message}</p> : null}
            </Kv.FloatingInput>
            <hr></hr>
            <div>
              <h3>Idiomas</h3>
              <LanguageSupport languageSupport={game["game_language_support"]}/>
            </div>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}