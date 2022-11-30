export const sample = {
  name: "Spider Man",
  description: "Homem Aranha",
  developer: "Sony",
  publisher: "Sony",
  releaseDate: "2022-06-22",
  price: "250.00",
  discount: "20",
  isDiscountActive: true,
  game_language_support: [
    {
      language: {
        id: 1,
        enUS_name: "english",
        ptBR_name: "inglês"
      },
      audio: true,
      subtitles: true,
      interface: true
    },
    {
      language: {
        id: 2,
        enUS_name: "portuguese",
        ptBR_name: "português"
      },
      audio: false,
      subtitles: true,
      interface: true
    }
  ],
  game_system_requirements: [
    {
      type: "minimum",
      so: "Windows",
      storage: "128GB SSD",
      cpu: "i5 12600K",
      memory: "16GB DDR4",
      gpu: "Nvidia RTX 2070",
      directx: "12",
      internet: "",
      other: ""
    },
    {
      type: "recommended",
      so: "Windows",
      storage: "128GB SSD",
      cpu: "i7 12700K",
      memory: "16GB DDR4",
      gpu: "Nvidia RTX 3070",
      directx: "12",
      internet: "",
      other: ""
    }
  ],
  game_platform: [
    {
      "id": 1,
      "name": "steam"
    }
  ],
  game_genre: [
    {
      id: 1,
      name: "RPG"
    },
    {
      id: 2,
      name: "FPS"
    },
    {
      id: 3,
      name: "Shooter"
    }
  ],
  game_gamemode: [
    {
      "id": 1,
      "name": "singleplayer"
    }
  ],
  game_image: [
    {
      type: "cover",
      url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png"
    },
    {
      type: "artwork",
      url: "https://images.igdb.com/igdb/image/upload/t_original/xyrkou2h4zxjnmitk8gi.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/nofld5l3txxuqhp7j8cc.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/bjoksdiwvkatzql3gi95.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/inft7cmgvqcionq0jtrn.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/gc3cpzbpddhfxj4nvaq1.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/fozp4i9v0b1w0uucoii8.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/o25kbk0jom2uvfm37l62.jpg"
    },
    {
      type: "artwork",
      url: "https://images.igdb.com/igdb/image/upload/t_original/qdf6gzojgbyqywysnntm.jpg"
    },
    {
      type: "artwork",
      url: "https://images.igdb.com/igdb/image/upload/t_original/drtsnc0kypn8rzssuxpc.jpg"
    },
    {
      type: "artwork",
      url: "https://images.igdb.com/igdb/image/upload/t_original/nplsp5hfioqmqhv32shz.jpg"
    }
  ],
}