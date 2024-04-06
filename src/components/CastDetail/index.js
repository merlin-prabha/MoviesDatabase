import './index.css'

const CastDetail = props => {
  const {details} = props
  const {name, character, profilePath} = details

  return (
    <li className="list-cast">
      <div className="cast">
        <img src={profilePath} alt={name} className="img" />
        <p className="title">Name: {name}</p>
        <p className="title">Character Name: {character}</p>
      </div>
    </li>
  )
}

export default CastDetail
