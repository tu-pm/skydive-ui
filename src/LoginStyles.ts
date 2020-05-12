import { minWidth, borderRadius } from "@material-ui/system";

/*
 * Copyright (C) 2019 Sylvain Afchain
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative" as const,
    margin: "0",
    padding: "0",
    border: "0",
    justifyContent: "center"
  },
  container: {
    minHeight: "100vh"
  },
  paper: {
    padding: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: '#bb2c2c'
  },
  failure: {
    color: '#bb2c2c',
    fontSize: 18
  },
  logoImg: {
    width: '40%',
    height: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoTitle: {
    color: theme.palette.grey[800],
    paddingBottom: theme.spacing(2)
  }
})