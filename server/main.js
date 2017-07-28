import emails from './configs/emails.js';
import publications from './publications';
import methods from './methods';

import { accountsConfig } from 'meteor/storyteller:accounts-server';

accountsConfig();
emails();
publications();
methods();

