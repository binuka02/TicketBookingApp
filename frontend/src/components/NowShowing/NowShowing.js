import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './nowshowing.module.css';
import KM from '../../assets/img/km.png';

function NowShowing() {
  const navigate = useNavigate();

  const handleBookNow = (movieName) => {
    navigate('/theater', { state: { movieName } });
  };

  return (
    <div className={classes.card_container}>
      <div className={classes.now_showing}>
        <h1>Now Showing Movies</h1>
      </div>
      <div className={classes.card__container}>
        <article className={classes.card__article}>
          <img src={KM} alt="image" className={classes.card__img} />
          <div className={classes.card__data}>
            <span className={classes.card__description}>Sinhala</span>
            <h2 className={classes.card__title}>Kathuru Mithuru</h2>
            <a onClick={() => handleBookNow('Kathuru Mithuru')} className={classes.card__button}>Book Now</a>
          </div>
        </article>

        <article className={classes.card__article}>
          <img src={KM} alt="image" className={classes.card__img} />
          <div className={classes.card__data}>
            <span className={classes.card__description}>Sinhala</span>
            <h2 className={classes.card__title}>Kathuru Mithuru</h2>
            <a onClick={() => handleBookNow('Kathuru Mithuru')} className={classes.card__button}>Book Now</a>
          </div>
        </article>

        <article className={classes.card__article}>
          <img src={KM} alt="image" className={classes.card__img} />
          <div className={classes.card__data}>
            <span className={classes.card__description}>Sinhala</span>
            <h2 className={classes.card__title}>Kathuru Mithuru</h2>
            <a onClick={() => handleBookNow('Kathuru Mithuru')} className={classes.card__button}>Book Now</a>
          </div>
        </article>
      </div>
    </div>
  );
}

export default NowShowing;
