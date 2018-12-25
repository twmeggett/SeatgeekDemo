import React from 'react'
import PropTypes from 'prop-types'
import YouTubeLink from './YouTubeLink.jsx'
import Loading from './Loading.jsx'
import formatDisplayDate from '../util/formatDisplayDate'
import staticMapSrc from '../util/staticMapSrc'
import NoImage from '../images/no_image.jpg';
import '../styles/event-details-style.less'
require('font-awesome-webpack');

//offsets aren't working in bootstrap for some reason
const Event = ({ event }) => {
  if (event.id) {
    return (
      <div className="event-details">
        <div className="container top-content">
          <img src={event.performers[0].image} className="background-img" />
          <div className="row">

            <div className="col-md-1 col-lg-2 hide-xs"></div>

            <div className="col-xs-12 col-md-5 col-lg-4 images">
              <a href={event.url} target="_blank">
                <img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" className="backup-img" />
                <img src={event.performers[0].image} className="main-img" />
              </a>
            </div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <div className="info-container">
                <a href={event.url} target="_blank">
                  <h2>{event.title}</h2>
                </a>
                <div className="info-content">
                  <p className="venue">
                    <a href={event.venue.url} target="_blank">
                      <i className="fa fa-building-o" aria-hidden="true"></i>
                      {event.venue.name}
                    </a>
                  </p>
                  <p className="location">
                    <a href={`https://www.google.com/maps/place/${event.venue.address} ${event.venue.city} ${event.venue.postal_code}`} target="_blank">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      {event.venue.address}, {event.venue.city} {event.venue.postal_code}
                    </a>
                  </p>
                  <p className="date">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    {formatDisplayDate(event.datetime_local)}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-1 col-lg-2 hide-xs"></div>

            <div className="col-md-1 col-lg-2 hide-xs"></div>

            <div className="col-xs-12 col-md-5 col-lg-4">
              <div className="social-container">
                <div
                  className="fb-share-button"
                  data-href={event.url}
                  data-layout="button_count"
                  data-size="large"
                  data-mobile-iframe="true">
                    <a className="fb-xfbml-parse-ignore"
                      target="_blank"
                      href={'https://www.facebook.com/sharer/sharer.php?u=' + event.url}>
                        <i className="fa fa-facebook-square" aria-hidden="true"> Share</i>
                    </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="sub-info">
          <div className="performers">
            <h2>Youtube Search</h2>
            {event.performers.map((performer, index) => (
              <YouTubeLink key={'performer' + index} name={performer.name} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return <Loading />
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    datetime_local: PropTypes.string.isRequired,
    performers: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
      })
    ),
    venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        display_location: PropTypes.string.isRequired,
        location: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        url: PropTypes.string,
        }),
    }),
  }),
}

export default Event
