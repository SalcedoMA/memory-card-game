import '../styles/Card.css'

// function Card({ image, name , onClick }) {  //UNCOMMENT IF PREFFER TO USE CARDS WITH NAME INSTEAD OF JUST THE IMAGE
//   return (
//     <button className='shuffle-button' onClick={onClick}>
//       <div className="card">
//         <img src={image} alt="balatro joker" />
//         <p className='card-name'>{name}</p>
//       </div>
//     </button>
//   )
// }

function Card({ image, onClick }) {
  return (
    <button className='shuffle-button' onClick={onClick}>
        <img className='card-image' src={image} alt="balatro joker" />
    </button>
  )
}

export default Card