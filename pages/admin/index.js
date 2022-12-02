import { Alert, Button, CloseButton, Col, Container, Dropdown, Modal, Row, Spinner } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from "../../scss/modules/pages/admin/Admin.module.scss";
import useData from '../../hooks/useData';
import * as Kv from '../../components/ui/Kv';
import { gameActions, useGameForm } from '../../hooks/useGameForm';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import LanguageSupport from '../../components/ui/LanguageSupport';
import { GameFields, GameSystemRequirements, getUnixDate, getIGDBImageURL, IGDBImageSize, imgTypes, toFirstUpperCase } from '../../global';
import SearchBar from '../../components/ui/SearchBar';
import useIGDBGame from '../../hooks/IGDB/useIGDBGame';
import useIGDBLanguageSupports from '../../hooks/IGDB/useIGDBLanguageSupports';
import useIGDBInvolvedCompanies from '../../hooks/IGDB/useIGDBInvolvedCompanies';

const GameContext = React.createContext();
const formRef = React.createRef();

export default function Admin() {
  const {
    game, dispatchGame, register, handleSubmit, error, dispatchIGDBGame, isIgdbDispatched, igdbNotFound
  } = useGameForm();
  const { data } = useData();
  const validLanguages = useMemo(() => {
    // Current language support languages id array
    const currentLanguageSupportIds = game?.["game_language_support"].map(l => l.language.id);
    // Current valid languages that aren't in game["game_language_support"]
    return data?.languages?.filter(l => !currentLanguageSupportIds.includes(l.id))
  }, [game["game_language_support"], data])
  const [IGDBModal, setIGDBModal] = useState(false);
  const showIGDBModal = () => setIGDBModal(true);
  const closeIGDBModal = () => setIGDBModal(false);
  const context = {
    game,
    dispatchGame,
    register,
    handleSubmit,
    error,
    data,
    dispatchIGDBGame,
    isIgdbDispatched,
    igdbNotFound,
    validLanguages,
    modal: {
      IGDBModal,
      showIGDBModal,
      closeIGDBModal
    }
  }

  if (!data.defined) return;

  return (
    <GameContext.Provider value={context}>
      <IgdbModal />
      <div className="d-flex flex-column justify-content-between h-100">
        <Header activeKey={""} />
        <Container className={`${styles.container} mb-auto`}>
          <GameForm />
        </Container>
        <Footer />
      </div>
    </GameContext.Provider>
  );
}

function IgdbModal() {
  const gc = useContext(GameContext);
  const [searchParam, setSearchParam] = useState();
  const { games: IGDBgames, error, isLoading: isIGDBGameLoading } = useIGDBGame(searchParam);
  const [currentGame, setCurrentGame] = useState();
  const {
    data: languageSupport,
    error: isLSError,
    isLoading: isLSLoading
  } = useIGDBLanguageSupports(currentGame?.id);
  const {
    data: involvedCompanies,
    error: isICError,
    isLoading: isICLoading
  } = useIGDBInvolvedCompanies(currentGame?.id);
  const currentGameData = useMemo(() => {
    if (!isLSLoading && !isICLoading) {
      return {
        game: currentGame,
        languageSupport,
        involvedCompanies
      };
    }
  }, [isLSLoading, isICLoading])
  const [activeCard, setActiveCard] = useState(currentGame?.id);

  useEffect(() => {
    if (currentGameData && currentGameData.game &&
      currentGameData.languageSupport && currentGameData.involvedCompanies) {
      gc.dispatchIGDBGame(currentGameData, gc.modal.closeIGDBModal);
    }
  }, [currentGameData])

  const searchBar = {
    timeout: null,
    handleChange: function (e) {
      e.preventDefault();
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        setSearchParam(e.target.value);
      }, 1000);
    },
    handleSubmit: function (e) {
      e.preventDefault();
      clearTimeout(this.timeout);

      setSearchParam(e.target.querySelector("input").value);
    }
  }

  return (
    <Modal
      show={gc.modal.IGDBModal}
      onHide={gc.modal.closeIGDBModal}
      className={`${styles.modal}`}
    >
      <Modal.Header>
        <Modal.Title>IGDB</Modal.Title>
        <CloseButton variant="white" onClick={gc.modal.closeIGDBModal} />
      </Modal.Header>
      <Modal.Body>
        <div className="m-auto" style={{ width: "fit-content" }}>
          <SearchBar
            onChange={(e) => searchBar.handleChange(e)}
            onSubmit={(e) => searchBar.handleSubmit(e)}
            focus
          />
        </div>
        <div className='mt-3'>
          {isIGDBGameLoading ?
            <div className='d-flex align-items-center justify-content-center'>
              <span className='fw-bold'>Loading...</span>
              <Spinner animation='border' />
            </div>
            : IGDBgames?.length > 0 ?
              IGDBgames.map((game, index) => {
                return (
                  <IgdbGameCard
                    igdbGame={game}
                    onClickCard={() => setCurrentGame(game)}
                    key={index}
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                  />
                );
              })
              : searchParam ?
                <Alert variant='info' className='text-center'>
                  Nenhum Jogo Encontrado :/
                </Alert>
                : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function IgdbGameCard({ igdbGame, onClickCard, activeCard, setActiveCard, ...props }) {
  const [year, month, day] = getUnixDate(igdbGame["first_release_date"]);

  if (!igdbGame) return;

  return (
    <div
      className={`${styles["igdb-game-card-container"]} 
        ${activeCard === igdbGame.id ? styles["igdb-card-active"] : ""}`}
      onClick={() => {
        setActiveCard?.(igdbGame.id);
        onClickCard?.();
      }}
      {...props}
    >
      <div className={`${styles["card-img-wrapper"]}`}>
        <Image
          src={getIGDBImageURL(IGDBImageSize.cover_big, igdbGame.cover?.["image_id"])}
          fill
          priority
          sizes="25vw"
          alt=""
        />
      </div>
      <div className={`${styles["card-text-content"]}`}>
        <h4>{igdbGame.name}</h4>
        <p className={`${styles.genres}`}>
          {igdbGame.genres?.map(genre => genre.name).join(", ")}
        </p>
        <p>
          {year && month && day ?
            <>
              <strong> Data de Lançamento: </strong>{`${day}/${month}/${year}`}
            </> : null}
        </p>
      </div>
    </div>
  );
}

function GameForm() {
  const gc = useContext(GameContext);
  const languageSupportRef = React.createRef();
  const systemReqRef = React.createRef();
  const genreRef = React.createRef();
  const gamemodeRef = React.createRef();
  const platformsRef = React.createRef();
  const imagesRef = React.createRef();

  if (!gc) return;

  function isReqEmpty() {
    const gameSystemRequirements = gc.game[GameFields.GameSystemRequirements];
    let isReqEmpty = true;
    gameSystemRequirements?.forEach(gsr => {
      if (gsr[GameFields.GameSystemRequirementsFields.so] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.storage] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.cpu] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.memory] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.gpu] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.directx] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.internet] !== "" ||
        gsr[GameFields.GameSystemRequirementsFields.other] !== "") {
        isReqEmpty = false;
      }
    })
    return isReqEmpty;
  }

  const emptyFields = {
    languageSupport: gc.game[GameFields.GameLanguageSupport].length === 0,
    systemRequirements: isReqEmpty(),
    genres: gc.game[GameFields.GameGenre].length === 0,
    gamemodes: gc.game[GameFields.GameGamemode].length === 0,
    platforms: gc.game[GameFields.GamePlatform].length === 0,
    images: gc.game[GameFields.GameImage].length === 0
  }

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
            gc.dispatchGame({
              type: gameActions.RemoveImg,
              payload: image
            })
          }}
        ><i className="bi bi-x-lg"></i></button>
      </div>
    );
  }

  return (
    <form onSubmit={gc.handleSubmit} ref={formRef}>
      <div className="d-flex justify-content-between sticky-top pt-3">
        <h2
          className="m-0"
          onClick={() => { formRef.current.scrollIntoView() }}
          style={{cursor: "pointer"}}
        >{gc.game.name}</h2>
        <div className="d-flex gap-2">
          <Button
            type="button"
            variant="igdb"
            className={`${styles.btn}`}
            onClick={gc.modal.showIGDBModal}
          >IGDB</Button>
          <Button
            type="submit"
            variant="kv-secondary-800"
            className={`${styles.btn}`}
          >Salvar</Button>
        </div>
      </div>
      <hr></hr>
      <div className='mb-3'>
        {emptyFields.languageSupport ?
          <Button
            variant='danger'
            onClick={() => {
              languageSupportRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Idiomas
          </Button> : null}
        {emptyFields.images ?
          <Button
            variant='danger'
            className='ms-1'
            onClick={() => {
              imagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Imagens
          </Button> : null}
        {emptyFields.systemRequirements ?
          <Button
            variant='danger'
            className='ms-1'
            onClick={() => {
              systemReqRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Requisitos
          </Button> : null}
        {emptyFields.genres ?
          <Button
            variant='danger'
            className='ms-1'
            onClick={() => {
              genreRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Categorias
          </Button> : null}
        {emptyFields.gamemodes ?
          <Button
            variant='danger'
            className='ms-1'
            onClick={() => {
              gamemodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Game Modes
          </Button> : null}
        {emptyFields.platforms ?
          <Button
            variant='danger'
            className='ms-1'
            onClick={() => {
              platformsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          >
            Plataformas
          </Button> : null}
      </div>
      <Kv.FloatingInput
        {...gc.register.field(GameFields.name, { required: true })}
        type="text"
        label="Nome"
        placeholder="Nome"
      >
        {gc.error.field?.[GameFields.name] ?
          <p className={`${styles.error}`}>{gc?.error.field[GameFields.name].message}</p> : null}
      </Kv.FloatingInput>
      <Kv.FloatingTextArea
        {...gc.register.field(GameFields.description)}
        type="textarea"
        label="Descrição"
        placeholder="Descrição"
        style={{ height: 200 + "px" }}
      >
        {gc.error.field?.[GameFields.description] ?
          <p className={`${styles.error}`}>{gc?.error.field[GameFields.description].message}</p>
          : null}
      </Kv.FloatingTextArea>
      <Kv.FloatingInput
        {...gc.register.field(GameFields.releaseDate, { required: true, max: "9999-12-31" })}
        type="date"
        label="Data de Lançamento"
        placeholder="Data de Lançamento"
        style={{ colorScheme: "dark" }}
      >
        {gc.error.field?.[GameFields.releaseDate] ?
          <p className={`${styles.error}`}>{gc?.error.field[GameFields.releaseDate].message}</p>
          : null}
      </Kv.FloatingInput>
      <Kv.FloatingInput
        {...gc.register.field(GameFields.developer, { required: true })}
        type="text"
        label="Desenvolvedor"
        placeholder="Desenvolvedor"
      >
        {gc.error.field?.[GameFields.developer] ?
          <p className={`${styles.error}`}>{gc?.error.field[GameFields.developer].message}</p>
          : null}
      </Kv.FloatingInput>
      <Kv.FloatingInput
        {...gc.register.field(GameFields.publisher, { required: true })}
        type="text"
        label="Distribuidor"
        placeholder="Distribuidor"
      >
        {gc.error.field?.[GameFields.publisher] ?
          <p className={`${styles.error}`}>{gc?.error.field[GameFields.publisher].message}</p>
          : null}
      </Kv.FloatingInput>
      <Row className={`${gc.isIgdbDispatched ? styles.highlight : ""}`}>
        <Col>
          <Kv.InputGroup
            {...gc.register.field(GameFields.price, { required: true, min: "0", step: "0.01" })}
            type="number"
            label="Preço"
            startLabel="R$"
          >
            {gc.error.field?.[GameFields.price] ?
              <p className={`${styles.error}`}>{gc?.error.field[GameFields.price].message}</p>
              : null}
          </Kv.InputGroup>
        </Col>
        <Col>
          <Kv.InputGroup
            {...gc.register.field(GameFields.discount,
              { required: true, max: "100", min: "0", step: "1" })}
            type="number"
            label="Desconto"
            endLabel="%"
          >
            {gc.error.field?.[GameFields.discount] ?
              <p className={`${styles.error}`}>{gc?.error.field[GameFields.discount].message}</p>
              : null}
          </Kv.InputGroup>
        </Col>
        <Col sm="auto">
          <Kv.BtnCheck
            {...gc.register.isDiscountActive("Desconto Ativo ?")}
            invisibleLabel
          />
        </Col>
      </Row>
      <h2 className="mt-4">Características</h2>
      <hr></hr>
      {gc.igdbNotFound?.genres?.length > 0 ?
        <p className={`${styles.error} mb-1`}>Categorias não encontradas:
          {" "}{gc.igdbNotFound.genres.join(" | ")}
        </p> : null}
      {gc.igdbNotFound?.gamemodes?.length > 0 ?
        <p className={`${styles.error}`}>Game modes não encontrados:
          {" "}{gc.igdbNotFound.gamemodes.join(" | ")}
        </p> : null}
      <Row>
        <Col ref={genreRef}>
          <Kv.Accordion
            title="Categorias"
            expand={!emptyFields.genres}
            bodyHeight={250}
          >
            {gc.data?.genres?.map((genre, index) => {
              return (
                <Kv.Checkbox
                  {...gc.register.genre(genre)}
                  key={index}
                />
              );
            })}
          </Kv.Accordion>
        </Col>
        <Col ref={gamemodeRef}>
          <Kv.Accordion
            title="Gamemodes"
            expand={!emptyFields.gamemodes}
            bodyHeight={250}
          >
            {gc.data?.gamemodes?.map((gamemode, index) => {
              return (
                <Kv.Checkbox
                  {...gc.register.gamemode(gamemode)}
                  key={index}
                />
              )
            })}
          </Kv.Accordion>
        </Col>
        <Col className={`${gc.isIgdbDispatched ? styles.highlight : ""}`} ref={platformsRef}>
          <Kv.Accordion
            title="Plataformas"
            expand={!emptyFields.platforms || gc.isIgdbDispatched}
            bodyHeight={250}
          >
            {gc.data?.platforms?.map((platform, index) => {
              return (
                <Kv.Checkbox
                  {...gc.register.platform(platform)}
                  key={index}
                />
              )
            })}
          </Kv.Accordion>
        </Col>
      </Row>
      <Row className={`${gc.isIgdbDispatched ? styles.highlight : ""} mt-4`} ref={systemReqRef}>
        <Col>
          <h3 className="mb-3 fw-normal">Requisitos Mínimos</h3>
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.so,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.storage,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.cpu,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.memory,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.gpu,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.directx,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.internet,
              GameSystemRequirements.Minimum)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.other,
              GameSystemRequirements.Minimum)}
            type="text"
          />
        </Col>
        <Col>
          <h3 className="mb-3 fw-normal">Requisitos Recomendados</h3>
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.so,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.storage,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.cpu,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.memory,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.gpu,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.directx,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.internet,
              GameSystemRequirements.Recommended)}
            type="text"
          />
          <Kv.FormControl
            {...gc.register.sysReqField(
              GameFields.GameSystemRequirementsFields.other,
              GameSystemRequirements.Recommended)}
            type="text"
          />
        </Col>
      </Row>
      <h2 className="mt-4">Imagens</h2>
      <hr></hr>
      <div className="mb-3">
        <h3 className="mb-3 fw-normal">Cover</h3>
        <div className={`${styles["img-container"]}`}>
          {gc.game?.[GameFields.GameImage]?.map((image, index) => {
            if (image.type === imgTypes.Cover) {
              return Img(image, index);
            }
          })}
        </div>
      </div>
      <Kv.FloatingInput
        {...gc.register.urlField("cover", imgTypes.Cover)}
        type="text"
        label="URL"
        placeholder="URL"
      >
        {gc.error.urlField?.cover ?
          <p className={`${styles.error}`}>{gc.error.urlField.cover.message}</p> : null}
      </Kv.FloatingInput>
      <div className="mb-3" ref={imagesRef}>
        <h3 className="mb-3 fw-normal">Screenshots</h3>
        <div className={`${styles["img-container"]}`}>
          {gc.game?.[GameFields.GameImage]?.map((image, index) => {
            if (image.type === imgTypes.Screenshot) {
              return Img(image, index);
            }
          })}
        </div>
      </div>
      <Kv.FloatingInput
        {...gc.register.urlField("screenshot", imgTypes.Screenshot)}
        type="text"
        label="URL"
        placeholder="URL"
      >
        {gc.error.urlField?.screenshot ?
          <p className={`${styles.error}`}>{gc?.error.urlField.screenshot.message}</p> : null}
      </Kv.FloatingInput>
      <div className="mb-3">
        <h3 className="mb-3 fw-normal">Artwork</h3>
        <div className={`${styles["img-container"]}`}>
          {gc.game?.[GameFields.GameImage]?.map((image, index) => {
            if (image.type === imgTypes.Artwork) {
              return Img(image, index);
            }
          })}
        </div>
      </div>
      <Kv.FloatingInput
        {...gc.register.urlField("artwork", imgTypes.Artwork)}
        type="text"
        label="URL"
        placeholder="URL"
      >
        {gc.error.urlField?.artwork ?
          <p className={`${styles.error}`}>{gc?.error.urlField.artwork.message}</p> : null}
      </Kv.FloatingInput>
      <h2 className="mt-4">Idiomas</h2>
      <hr></hr>
      {gc.igdbNotFound?.languages?.length > 0 ?
        <p className={`${styles.error}`}>Idiomas não encontrados:
          {" "}{Array.from(gc.igdbNotFound.languages).join(" | ")}
        </p> : null}
      <div ref={languageSupportRef}>
        <AddLanguageSupport />
      </div>
    </form>
  );
}

function AddLanguageSupport() {
  const gc = useContext(GameContext);
  const [currentLanguage, setCurrentLanguage] = useState(gc.validLanguages?.[0]);
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
    if (gc.validLanguages) {
      setCurrentLanguage(gc.validLanguages[0]);
    }
  }, [gc.validLanguages])

  return (
    <>
      <LanguageSupport
        languageSupport={gc.game?.[GameFields.GameLanguageSupport]}
        variant="hover"
        onClickLanguage={(languageSupport) => {
          gc.dispatchGame({
            type: gameActions.RemoveGameLanguageSupport,
            payload: languageSupport
          })
        }}
      />
      <div className={`${styles["add-language-support-container"]}`}>
        <div className="mb-3 mt-3 w-100">
          <LanguageSupport
            languageSupport={currentLanguageSupport}
            variant="secondary"
          />
        </div>

        <div className="d-flex gap-4 align-items-center w-100 mb-2 mt-3 flex-wrap">
          <Kv.Dropdown title="Selecionar">
            {gc.validLanguages?.map((language, index) => {
              return (
                <Dropdown.Item
                  onClick={() => setCurrentLanguage(language)}
                  key={index}
                >
                  {toFirstUpperCase(language["ptBR_name"])}
                </Dropdown.Item>
              );
            })}
          </Kv.Dropdown>
          <div className="d-flex gap-4 align-items-center flex-wrap">
            <Kv.Checkbox
              label="Audio"
              name="languageSupport"
              id="audio"
              disabled={gc.validLanguages?.length === 0}
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, audio: e.target.checked }))
              }}
            />
            <Kv.Checkbox
              label="Legenda"
              name="languageSupport"
              id="subtitles"
              disabled={gc.validLanguages?.length === 0}
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, subtitles: e.target.checked }))
              }}
            />
            <Kv.Checkbox
              label="Interface"
              name="languageSupport"
              id="interface"
              disabled={gc.validLanguages?.length === 0}
              onChange={(e) => {
                setCurrentChecked(state => ({ ...state, interface: e.target.checked }))
              }}
            />
          </div>
        </div>
        <Button
          variant="kv-secondary-800"
          className={`${styles.btn} w-100`}
          disabled={gc.validLanguages?.length === 0}
          onClick={() => {
            if (Object.keys(currentLanguageSupport.language).length === 0) return;
            gc.dispatchGame({
              type: gameActions.AddGameLanguageSupport,
              payload: currentLanguageSupport,
            })
          }}
        >Inserir Idioma</Button>
      </div>
    </>
  );
}