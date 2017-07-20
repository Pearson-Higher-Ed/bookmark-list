/**
PEARSON PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 *  Copyright © 2017 Pearson Education, Inc.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Pearson Education, Inc.  The intellectual and technical concepts contained
 * herein are proprietary to Pearson Education, Inc. and may be covered by U.S. and Foreign Patents,
 * patent applications, and are protected by trade secret or copyright law.
 * Dissemination of this information, reproduction of this material, and copying or distribution of this software
 * is strictly forbidden unless prior written permission is obtained
 * from Pearson Education, Inc.
**/
/* eslint-disable */


import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import ComponentOwner from '../src/js/component-owner';
import msgObject from '../translations';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack, fullBlack } from 'material-ui/styles/colors';

 const bookmarksArr = [
  {
    "id": "1499682113569",
    "uri": "urn:pearson:manifestation:1c31193b-c5fe-4b17-881d-1f591351e82e",
    "data": {
      "baseUrl": "urn:pearson:manifestation:55a98cce-067a-4a73-b610-229959548eab"
    },
    "createdTimestamp": 1499682113569,
    "title": "Neurons and Nerves",
    "labels": "Neurons and Nerves"
  }
]
const intlObj = new InternationalSupport(msgObject, 'en');

it('renders the component correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <IntlProvider 
        locale={intlObj.getLocale()} 
        messages={intlObj.getMessages()}>
          <ComponentOwner 
          bookmarksArr={bookmarksArr} 
          clickBookmarkHandler={()=>{}}
          removeBookmarkHandler={()=>{}}
          ></ComponentOwner>
        </IntlProvider>
      </MuiThemeProvider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});




