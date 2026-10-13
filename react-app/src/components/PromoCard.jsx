export default function PromoCard({ tag, title, description, price, oldPrice, tone = '' }) {
  return <div className={`promo-card ${tone}`}>
    <span className="tag">{tag}</span><h3>{title}</h3><p>{description}</p>
    <div className="price"><span className="now">{price}</span>{oldPrice && <span className="old">{oldPrice}</span>}</div>
  </div>
}
