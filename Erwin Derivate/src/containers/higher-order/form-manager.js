// @flow

import React, { Component } from 'react';
import { mapValues } from 'lodash';

import type {
  StringMap,
} from '../../types';

import autobind from '../../utils/autobind';

type TextType = {
  type: 'text',
};

type InputType =
  | TextType;

type InputTypeDirty =
  | InputType
  | 'text';

type SyntheticEventHandler = (evt: SyntheticEvent) => void;

type FormDescriptionDirty = {
  name: string,
  fields: StringMap<InputTypeDirty>,
};

type FormDescription = {
  name: string,
  fields: StringMap<InputType>,
}

type OptionsDirty = FormDescriptionDirty;

type Options = FormDescription;

type Props = {};

type ContainerState = StringMap<string>;

const formManager = (optionsDirty: OptionsDirty) => (BaseComponent: *) => {
  const {
    name,
    fields: fieldsDirty,
  } = optionsDirty;

  const fields: StringMap<InputType> = mapValues(fieldsDirty, (value: InputTypeDirty) => {
    if (typeof value === 'string') {
      return { type: value };
    }

    return value;
  });

  const options: Options = {
    name,
    fields,
  };

  class FormManagerWrapper extends Component {
    props: Props;
    state: ContainerState;

    constructor(props: Props, context: {}) {
      super(props, context);
      autobind(this);

      this.state = mapValues(options.fields, (/* inputType: InputType , inputName: string */) => '');

      this._onChange = mapValues(options.fields, (inputType: InputType, inputName: string) => {
        if (inputType.type === 'text') {
          return (evt: SyntheticInputEvent) => {
            this.setState({ [inputName]: evt.target.value });
          };
        }

        return () => {}; // noop
      });

      // eslint-disable-next-line arrow-body-style
      this._setValue = mapValues(options.fields, (inputType: InputType, inputName: string) => {
        return (value: string) => {
          this.setState({ [inputName]: value });
        };
      });
    }

    render() {
      const props = {
        [options.name]: {
          values: this.state,
          fields: this.getFields(),
        },
      };

      return (
        <BaseComponent
          {...this.props}
          {...props}
        />
      );
    }

    _onChange: StringMap<SyntheticEventHandler>;
    _setValue: StringMap<(value: string) => void>

    getFields() {
      return mapValues(options.fields, (inputType: InputType, inputName: string) => {
        if (inputType.type === 'text') {
          return {
            value: this.state[inputName],
            onChange: this._onChange[inputName],
            setValue: this._setValue[inputName],
          };
        }

        return {};
      });
    }
  }

  return FormManagerWrapper;
};

export default formManager;
