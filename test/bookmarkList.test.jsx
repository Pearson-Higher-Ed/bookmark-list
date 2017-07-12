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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import { InternationalSupport } from '@pearson-incubator/aquila-js-core';
import BookmarkList from '../src/js/BookmarkList';
import msgObject from '../translations';


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

const clickBookmarkHandler = () => {
    console.log('clickBookmarkHandler');
  };


const intlObj = new InternationalSupport(msgObject, 'en');

  it('renders the renderNoBookmarks function', () => {
  	const component = renderer.create(
    <MuiThemeProvider>
    <IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
    <BookmarkList
      clickBookmarkHandler={clickBookmarkHandler}
      removeBookmarkHandler={()=>{}}
      />
    </IntlProvider>
    </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // manually trigger the callback
  tree.children[0].children[0].props;
  tree.children[0].children[0].children[0];
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

 it('renders the renderBookmarks function', () => {
    const component = renderer.create(
    <MuiThemeProvider>
    <IntlProvider locale={intlObj.getLocale()} messages={intlObj.getMessages()}>
    <BookmarkList
      bookmarksArr={bookmarksArr} 
      clickBookmarkHandler={clickBookmarkHandler}
      removeBookmarkHandler={()=>{}}
    />
      </IntlProvider>
      </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
   tree.children[0].children[0].children[0].props.onClick({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
   tree.children[0].children[0].children[0].props.onFocus({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
   tree.children[0].children[0].children[0].props.onKeyDown({preventDefault(){}, target:{parentNode:{classList:{remove(){}}}}, shiftKey:true,keyCode:9});
   tree.children[0].children[0].children[0].props.onKeyPress({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
   tree.children[0].children[0].children[1].props.onClick({preventDefault(){}, target:{parentNode:{classList:{add(){}}}}});
   tree = component.toJSON();
   tree.children[0].children[0].children[0].props.onKeyUp({preventDefault(){}, which:37, keyCode:37, target:{parentNode:{classList:{remove(){}}}}});
   expect(tree).toMatchSnapshot();
});










