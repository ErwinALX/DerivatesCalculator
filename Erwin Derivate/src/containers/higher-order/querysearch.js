// @flow

import type { Location } from 'react-router-dom';
import React from 'react';
import qs from 'qs';

type Props = {
  location: Location,
};

const querysearchHigherOrder = (BaseComponent: *) => ({ location, ...props }: Props) => {
  const { search } = location;

  const querysearch = !search || search.length === 0 ? {} :
    qs.parse(search.replace('?', ''));

  const stringifyQuery: (query: {}) => string = qs.stringify;

  return (
    <BaseComponent
      {...props}
      location={location}
      querysearch={querysearch}
      stringifyQuery={stringifyQuery}
    />
  );
};

export default querysearchHigherOrder;
