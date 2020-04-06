import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import colors from './colors'

const RADIUS = 600

function toLatLng(google, e) {
  return new google.maps.LatLng(e.lat, e.lng)
}

function DahboardHelper(props) {
  const ref = React.createRef()
  const selectedMarker = React.createRef()
  
  const [ selected, setSelected ] = useState(null)

  function removeuser() {
    cookie.remove('me')
    props.history.push('/')
  }

  useEffect(() => {
    
    window.initMap = function() {
      
      const me = cookie.getJSON('me')

      fetch('https://grannleveransen-be.herokuapp.com/helper-list')
        .then( res => res.json() )
        .then( helpers => {

          const google = window.google

          const pos = {
            lat: 59.349142465871864,
            lng: 18.07889355468749
          }

          let map = new google.maps.Map(ref.current, {
            zoom: 13,
            center: pos,
            mapTypeId: 'terrain'
          })

          var myMarker = new google.maps.Marker({
            position: toLatLng(google, me.position),
            map: map,
            title: 'Det här är du'
          });
          
          helpers.filter(x => x.agent === "NEEDER")
            .map(x => createCircle(google, map, setSelected, x))
        })
    }

    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAOxsbI1PYUHS7iDMIQuivzYrWxxQFo9FQ&libraries=drawing&callback=initMap";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }, [])

  useEffect(() => {
    //console.log('i react whenefer selected changes')
    //createCircle(google, map, setSelected, x)
  }, [selected])

  function help() {
    //console.log('helping')
  }

  const HelpButton = () => (
    <Link to='/helper/establishcontacthelper'>
      <Button classes={{ 'label': 'larger' }} classes={{ 'label': 'larger' }} variant="contained" color="primary" onClick={help}>
        Hjälp denna person
      </Button>
    </Link>
  )
  const Info = () => (
    <div>
      <br />
      Du har markerat { selected }<br />
      Hen är { km(selected) } ifrån dig
    </div>
  )
  
  const HelpText = () => (
    <p>
      Välj en blå cirkel nedan - det är någon som behöver din hjälp!
    </p>
  )

  return (
    <div>
      <h1>Välkommen <span className="helper">HJÄLPARE</span></h1>
      { selected === null && <HelpText /> }
      <div className="button-holder">
        <Link to='/'>
          <Button classes={{ 'label': 'larger' }} classes={{ 'label': 'larger' }} variant="contained" color="primary" onClick={removeuser}>
            Gå tillbaka
          </Button>
        </Link>
        {
          selected !== null && <HelpButton />
        }
      </div>
      { selected !== null && <Info /> }
      <div ref={ref} id="map" style={ { height: '50vh', margin: '40px' } }></div>
    </div>
  )
}

function createCircle(google, map, setSelected, input, color) {

  const c = new google.maps.Circle({
    strokeColor: color || colors['HELPER'],
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color || colors['HELPER'],
    fillOpacity: 0.35,
    map: map,
    center: input.position,
    radius: RADIUS * 1.1,
    zIndex: 1
  })
  c.customID = input.id

  google.maps.event.addListener(c, 'click', function(e) {
    setSelected(c.customID)
    //c.strokeColor('red')
    //console.log(c)
  })
}

function km() {
  return "13 km"
}

export default DahboardHelper