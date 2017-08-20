// @flow

import type { Store } from 'redux';
import type { State, Action } from '../types';

const loggerMiddleware = (store: Store<State, Action>) =>
  (next: (action: Action) => void) => (action: Action) => {
    // agrupamos lo que vamos a mostrar en
    // consola usando el tipo de la acción
    console.group(action.type); // eslint-disable-line no-console
    // mostramos el estado actual del store
    console.debug('current state', store.getState()); // eslint-disable-line no-console
    // mostramos la acción despachada
    console.debug('action', action); // eslint-disable-line no-console
    // empezamos a contar cuanto se tarda en
    // aplicar la acción
    console.time('duration'); // eslint-disable-line no-console
    // pasamos la acción al store
    const result = next(action);
    // terminamos de contar
    console.timeEnd('duration'); // eslint-disable-line no-console
    // mostramos el estado nuevo
    console.debug('new state', store.getState()); // eslint-disable-line no-console
    // terminamos el grupo
    console.groupEnd(); // eslint-disable-line no-console

    return result;
  };

export default loggerMiddleware;
