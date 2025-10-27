const OfferCard = ({ title, image, price, link }) => {
  return (
    <>
      <div>
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt=""
            className="duration-750 ease-linear hover:scale-110 object-contain "
          />
        </div>
        <div>
          <div>
            <p>{title}</p>
          </div>
          <div>
            <p className="font-bold text-red-500">S/.{price}</p>
          </div>
          <div>
            <a href={link} className="underline hover:no-underline ">
              Comprar Ahora
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
