import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from "../../scss/modules/pages/admin/Admin.module.scss";
import useData from '../../hooks/useData';
import * as Kv from '../../components/ui/Kv';
import { gameActions, imgTypes, useGameForm } from '../../hooks/useGameForm';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import LanguageSupport from '../../components/ui/LanguageSupport';
import { toFirstUpperCase } from '../../global';

export default function Admin() {

  const { game, dispatchGame, register, handleSubmit, error } = useGameForm();
  const { data } = useData();
  const validLanguages = useMemo(() => {
    // Current language support languages id array
    const currentLanguageSupportIds = game?.["game_language_support"].map(l => l.language.id);
    // Current valid languages that aren't in game["game_language_support"]
    return data?.languages?.filter(l => !currentLanguageSupportIds.includes(l.id))
  }, [game["game_language_support"], data])

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
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <h2 className="m-0">{game.name}</h2>
              <div className="d-flex gap-2">
                <Button
                  type="button"
                  variant="igdb"
                  className={`${styles.btn}`}
                >IGDB</Button>
                <Button
                  type="submit"
                  variant="kv-secondary-800"
                  className={`${styles.btn}`}
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
            <h2 className="mt-4">Características</h2>
            <hr></hr>
            <Row>
              <Col>
                <Kv.Accordion
                  title="Categorias"
                  expand={game["game_genre"]?.length > 0 ?? false}
                  bodyHeight={250}
                >
                  {data.genres?.map((genre, index) => {
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
                <Kv.Accordion
                  title="Gamemodes"
                  expand={game["game_gamemode"]?.length > 0 ?? false}
                  bodyHeight={250}
                >
                  {data.gamemodes?.map((gamemode, index) => {
                    return (
                      <Kv.Checkbox
                        {...register.gamemode(gamemode)}
                        key={index}
                      />
                    )
                  })}
                </Kv.Accordion>
              </Col>
              <Col>
                <Kv.Accordion
                  title="Plataformas"
                  expand={game["game_platform"]?.length > 0 ?? false}
                  bodyHeight={250}
                >
                  {data.platforms?.map((platform, index) => {
                    return (
                      <Kv.Checkbox
                        {...register.platform(platform)}
                        key={index}
                      />
                    )
                  })}
                </Kv.Accordion>
              </Col>
            </Row>
            <h2 className="mt-4">Imagens</h2>
            <hr></hr>
            <div className="mb-3">
              <h3 className="mb-3 fw-normal">Cover</h3>
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
            <div className="mb-3">
              <h3 className="mb-3 fw-normal">Screenshots</h3>
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
            <div className="mb-3">
              <h3 className="mb-3 fw-normal">Artwork</h3>
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
            <h2 className="mt-4">Idiomas</h2>
            <hr></hr>
            <div>
              <AddLanguageSupport
                validLanguages={validLanguages}
                onSubmit={(languageSupport) => {
                  if (Object.keys(languageSupport.language).length === 0) return;
                  dispatchGame({
                    type: gameActions.AddGameLanguageSupport,
                    payload: languageSupport,
                  })
                }}
                game={game}
                onClickLanguage={(languageSupport) => {
                  dispatchGame({
                    type: gameActions.RemoveGameLanguageSupport,
                    payload: languageSupport
                  })
                }}
              />
            </div>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

function AddLanguageSupport({ validLanguages, onSubmit, game, onClickLanguage }) {
  const [currentLanguage, setCurrentLanguage] = useState(validLanguages?.[0]);
  const [currentChecked, setCurrentChecked] = useState({
    audio: false,
    subtitles: false,
    interface: false
  });
  const currentLanguageSupport = useMemo(() => {
    return {
      language: {
        ...currentLanguage
      },
      ...currentChecked
    }
  }, [currentChecked, currentLanguage])

  useEffect(() => {
    if (validLanguages) {
      setCurrentLanguage(validLanguages?.[0]);
    }
  }, [validLanguages])

  return (
    <>
      <LanguageSupport
        languageSupport={game["game_language_support"]}
        variant="hover"
        onClickLanguage={(languageSupport) => onClickLanguage?.(languageSupport)}
      />
      <div className={`${styles["add-language-support-container"]}`}>
        {currentLanguage && currentChecked ?
          <div className="mb-3 mt-3 w-100">
            <LanguageSupport 
              languageSupport={currentLanguageSupport}
              variant="secondary"
            />
          </div> : null
        }
        <div className="d-flex gap-4 align-items-center w-100 mb-2 flex-wrap">
          <Kv.SimpleDropDown title="Selecionar Idioma">
            {validLanguages?.map((language, index) => {
              return (
                <p
                  className='ms-3 me-3 pt-1 pb-1'
                  onClick={() => setCurrentLanguage(language)}
                  key={index}
                >{toFirstUpperCase(language["ptBR_name"])}</p>
              );
            })}
          </Kv.SimpleDropDown>
          <div className="d-flex gap-4 align-items-center flex-wrap">
            <Kv.Checkbox
              label="Audio"
              name="languageSupport"
              id="audio"
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, audio: e.target.checked }))
              }}
            />
            <Kv.Checkbox
              label="Legenda"
              name="languageSupport"
              id="subtitles"
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, subtitles: e.target.checked }))
              }}
            />
            <Kv.Checkbox
              label="Interface"
              name="languageSupport"
              id="interface"
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, interface: e.target.checked }))
              }}
            />
          </div>
        </div>
        <Button
          variant="kv-secondary-800"
          className={`${styles.btn} w-100`}
          onClick={() => {
            onSubmit(
              {
                language: {
                  ...currentLanguage
                },
                ...currentChecked
              }
            )
          }}
        >Inserir Novo Idioma</Button>
      </div>
    </>
  );
}