/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/guardado`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/mapa`; params?: Router.UnknownInputParams; } | { pathname: `/perfil`; params?: Router.UnknownInputParams; } | { pathname: `/rutas`; params?: Router.UnknownInputParams; } | { pathname: `/seguridad`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/guardado`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/mapa`; params?: Router.UnknownOutputParams; } | { pathname: `/perfil`; params?: Router.UnknownOutputParams; } | { pathname: `/rutas`; params?: Router.UnknownOutputParams; } | { pathname: `/seguridad`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/guardado${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/mapa${`?${string}` | `#${string}` | ''}` | `/perfil${`?${string}` | `#${string}` | ''}` | `/rutas${`?${string}` | `#${string}` | ''}` | `/seguridad${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/guardado`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/mapa`; params?: Router.UnknownInputParams; } | { pathname: `/perfil`; params?: Router.UnknownInputParams; } | { pathname: `/rutas`; params?: Router.UnknownInputParams; } | { pathname: `/seguridad`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
