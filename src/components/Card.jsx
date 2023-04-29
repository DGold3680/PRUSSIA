import "./card.css";
export default function Card({ item }) {
  return (
    <div className="card">
      <div className="card-img-container">
        <img className="card-img" src={item.dp} alt="" />
      </div>
      <div className="card-content">
        {<p className="card-name">{item.name}</p>}
        <p className="card-price">&#x20A6;{item.price}</p>
      </div>
    </div>
  );
}
