interface IRoute {
  home: string;
  khampha: string;
  library: string;
  playlist: string;
  player: string;
}

const routesConfig: IRoute = {
  home: "/",
  khampha: "/khampha",
  library: "/library",
  playlist: "/playlistmusic/:id",
  player: "/playlist/:id/:idmusic",
};

export default routesConfig;
