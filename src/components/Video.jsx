import React from 'react';
import DateTime from './DateTime';
import {withTimePretty} from './withTimePretty';

const DateTimePretty = withTimePretty(DateTime);

export default function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}
