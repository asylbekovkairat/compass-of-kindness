import compose from 'compose-function';

import { withAtomState } from './withAtomState';
import { withHelmet } from './withHelmet';
import { withLocalization } from './withLocalization';
import { withRouter } from './withRouter';
import { withTime } from './withTime';

export const withProviders = compose<any>(
  withTime,
  withLocalization,
  withAtomState,
  withHelmet,
  withRouter
);
