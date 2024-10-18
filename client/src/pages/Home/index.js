
import React from "react";
import classNames from "classnames/bind";
import styles from'./Home.module.scss';

import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.svg";
import img4 from "../../assets/img4.svg";
import img5 from "../../assets/img5.svg";
function Home() {

    const cx = classNames.bind(styles);
  return (
    <div>
      <main className={cx('page')}>
      <section className={cx("page-section")}>
        <section className={cx("first-section")}>
          <div className={cx('banner')}>
            <div className={cx("banner-body")}>
              <h2 className={cx("banner-title")}>
              Make learning awesome </h2>
              <p className={cx("banner-description")}>
              Quizzly delivers engaging learning to billions</p>
              <button className={cx("banner-button")}>
                <a href="/">
                Sign up for free</a>
              </button>
            </div>
            <img src={img1} alt="" className={cx("banner-image")} />
          </div>
          <div className={cx('banner')}>
            <div className={cx("banner-body")}>
              <h2 className={cx("banner-title")}>
              Explore content</h2>
              <p className={cx("banner-description")}>
              Explore content and join one of the world’s largest educator communities.</p>
              <button className={cx("banner-button")}>
                <a href="/">
                Check public quizes</a>
              </button>
            </div>
            <img src={img2} alt="" className={cx("banner-image")} />
          </div>
        </section>
        <section className={cx("second-section")}>
          <div className={cx("section-background")}></div>
          <div className={cx('info')}>
            <div className={cx("info-body")}>
              <h2 className={cx("info-title")}>
              Quizzly at school
              </h2>
              <p className={cx("info-description")}>
              Engaging group and distance learning for teachers and students.</p>
              <a href="/" className={cx("info-link")}>
              Learn more</a>
            </div>
          </div>
          <div className={cx('info')}>
            <div className={cx("info-body")}>
              <h2 className={cx("info-title")}>
              Quizzly at work
              </h2>
              <p className={cx("info-description")}>
              Deliver training, presentations, meetings and events in-person or on any video conferencing platform.</p>
              <a href="/" className={cx("info-link")}>
              Learn more</a>
            </div>
          </div>
          <div className={cx('info')}>
            <div className={cx("info-body")}>
              <h2 className={cx("info-title")}>
              Quizzly at home</h2>
              <p className={cx("info-description")}>
              Learning Apps and games for family fun or home study</p>
              <a href="/" className={cx("info-link")}>
              Learn more</a>
            </div>
          </div>
        </section>
        <section className={cx("third-section")}>
          <h1>
          How does Quizzly work?</h1>
          <div className={cx("card-container")}>
            <div className={cx('card')}>
              <img src={img3} alt="" />
              <div className={cx("card-body")}>
                <h1>Create</h1>
                <p>
                It only takes minutes to create a learning game or trivia quiz on any topic, in any language.
                </p>
              </div>
            </div>
            <div className={cx('card')}>
              <img src={img4} alt="" />
              <div className={cx("card-body")}>
                <h1>
                Host or share </h1>
                <p>
                Host a live game with questions on a big screen or share a game with remote players.
                </p>
              </div>
            </div>
            <div className={cx('card')}>
              <img src={img5} alt="" />
              <div className={cx("card-body")}>
                <h1>Play</h1>
                <p>
                Game on! Join a kahoot with a PIN provided by the host and answer questions on your device.
                </p>
              </div>
            </div>
          </div>
          <div className={cx("card-button")}>
          Play Quizzly to see how it works. 
            <a href="/">
            Explore our public quizes</a>
          </div>
        </section>
      </section>
    </main>
      
    </div>
  );
}

export default Home;
