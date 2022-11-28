import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from "../../scss/modules/pages/admin/Admin.module.scss";
import useGenre from '../../hooks/useGenre';
import * as Kv from '../../components/ui/Kv';
import { gameActions, imgTypes, useGameForm } from '../../hooks/useGameForm';
import { useMemo, useState } from 'react';
import Image from 'next/image';

export default function Admin() {

  const { game, dispatchGame, register, handleSubmit, error } = useGameForm();
  const { genres, isLoading, isError } = useGenre();

  if (!genres) return;

  const GetImg = (image, index, imgType) => {
    if (image.type === imgType) {
      return (
        <div className={`${styles["img-wrapper"]}`} key={index}>
          <Image
            src={image.url}
            alt=""
            fill
            sizes="25vw"
            priority
            key={index}
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
  }

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <Header activeKey={""} />
      <div className="mb-auto pb-4 pt-4">
        <Container>
          <form onSubmit={() => { return false }} noValidate>
            <div className="d-flex justify-content-between">
              <div><h3 className='m-0'>{game.name}</h3></div>
              <div className="d-flex gap-2">
                <Button type="button" variant="igdb">IGDB</Button>
                <Button type="button" variant="kv-secondary-800" onClick={handleSubmit}>Salvar</Button>
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
            />
            <Kv.FloatingInput
              {...register.field("developer", { required: true })}
              type="text"
              label="Desenvolvedor"
              placeholder="Desenvolvedor"
            />
            <Kv.FloatingInput
              {...register.field("publisher", { required: true })}
              type="text"
              label="Distribuidor"
              placeholder="Distribuidor"
            />
            <Row>
              <Col>
                <Kv.InputGroup
                  {...register.field("price")}
                  type="number"
                  step={0.01}
                  label="Preço"
                  startLabel="R$"
                  required
                  min={0}
                />
              </Col>
              <Col>
                <Kv.InputGroup
                  {...register.field("discount")}
                  type="number"
                  label="Desconto"
                  endLabel="%"
                  required
                  min={0}
                  max={100}
                />
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
                <Kv.Accordion title="Categorias" expand={game.genre.length > 0}>
                  {genres.map((genre, index) => {
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
                {game.image.map((image, index) => {
                  return GetImg(image, index, imgTypes.Cover);
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("cover", imgTypes.Cover)}
              type="text"
              label="URL"
              placeholder="URL"
            />
            {error.urlField?.cover ?
              <p className={`${styles.error}`}>{error.urlField.cover.message}</p> : null}
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3">Screenshots</h3>
              <div className={`${styles["img-container"]}`}>
                {game.image.map((image, index) => {
                  return GetImg(image, index, imgTypes.Screenshot);
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("screenshot", imgTypes.Screenshot)}
              type="text"
              label="URL"
              placeholder="URL"
            />
            {error.urlField?.screenshot ?
              <p className={`${styles.error}`}>{error.urlField.screenshot.message}</p> : null}
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3">Artwork</h3>
              <div className={`${styles["img-container"]}`}>
                {game.image.map((image, index) => {
                  return GetImg(image, index, imgTypes.Artwork);
                })}
              </div>
            </div>
            <Kv.FloatingInput
              {...register.urlField("artwork", imgTypes.Artwork)}
              type="text"
              label="URL"
              placeholder="URL"
            />
            {error.urlField?.artwork ?
              <p className={`${styles.error}`}>{error.urlField.artwork.message}</p> : null}
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}