import React from 'react'
import { Link } from 'react-router-dom'

function HomeImageCard({imageCard, redirectLink}) {
  return (
    <div className="card topcard mb-4">
    <Link to={redirectLink}>
    <img src={imageCard} style={{height: 300}} className="card-img-top" alt="Image 1" />
    </Link>    
    </div>
  )
}

export default HomeImageCard
