import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import { ANTIFILTER_INFO } from './Queries/antifilter_Info';
import { TARIFF_IN_ANTI_FILTER } from './Queries/tariffIn_Anti_Filter';

const regionUrl = 'moskva';

function App() {
  const [providerId, setProviderId] = useState(null);
  const [fixProvider, setFixProvider] = useState(false);
  const [priceTariff, setPriceTariff] = useState(null);
  const [fixPrice, setFixPrice] = useState(false);
  const [callsTariff, setCallsTariff] = useState(null);
  const [fixCalls, setFixCalls] = useState(false);
  const [internetTariff, setInternetTariff] = useState(null);
  const [fixInternet, setFixInternet] = useState(false);
  const [switchTariff, setSwitchTariff] = useState(null);

  const getFix = () => {
    let arrFixName = ['provider', 'internet', 'calls', 'price'];
    let objFixState = {
      provider: fixProvider,
      internet: fixInternet,
      calls: fixCalls,
      price: fixPrice,
    };
    let result = '';
    arrFixName.forEach((state) => {
      if (objFixState[state] === true) {
        if (result.length > 0) {
          result += `&${state}`;
        } else {
          result += state;
        }
      }
    });
    return result;
  };

  const fix = getFix();

  // const {
  //   loading: loadInfo,
  //   error: errorInfo,
  //   data: InfoData,
  // } = useQuery(ANTIFILTER_INFO, {
  //   variables: {
  //     type: "antifilter",
  //   },
  //   skip: false,
  // });

  const handleMoreDetailsClick = () => {
    // Ваш код для обработки нажатия на кнопку "ПОДРОБНЕЕ" и открытия внешней ссылки
    window.open('https://101internet.ru/ryazan', '_blank');
  };

  const {
    loading: loadInfo,
    error: errorInfo,
    data: infoData,
  } = useQuery(ANTIFILTER_INFO, {
    variables: {
      type: 'antifilter',
    },
    skip: false,
  });

  const {
    loading: loadTariff,
    error: errorTariff,
    data: tariffData,
  } = useQuery(TARIFF_IN_ANTI_FILTER, {
    variables: {
      region: regionUrl,
      providerJoin: true,
      with_aggregate: true,
      providerId: providerId,
      internet: internetTariff,
      fix: fix,
      price: priceTariff,
      switch: switchTariff,
      calls: callsTariff,
    },
    skip: false,
  });

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  const handleCheckboxChange = (checkboxNumber, event) => {
    const setIsChecked = getSetIsCheckedFunction(checkboxNumber);
    setIsChecked(event.target.checked);

    if (event.target.checked) {
      console.log(`Галочка ${checkboxNumber} установлена`);
    } else {
      console.log(`Галочка ${checkboxNumber} убрана`);
    }
  };

  const getSetIsCheckedFunction = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        return setIsChecked1;
      case 2:
        return setIsChecked2;
      case 3:
        return setIsChecked3;
      case 4:
        return setIsChecked4;
      default:
        return setIsChecked1;
    }
  };

  const [unitValue, setUnitValue] = useState(30);

  const handleIncrement = () => {
    setUnitValue(unitValue + 1);
  };

  const handleDecrement = () => {
    if (unitValue > 0) {
      setUnitValue(unitValue - 1);
    }
  };

  //Для минут
  const [showSlider1, setShowSlider1] = useState(false);
  const [unitValue1, setUnitValue1] = useState(0);
  const step = 50;

  const handleShowSlider1 = () => {
    setShowSlider1(!showSlider1);
  };

  const handleDecrement1 = (event) => {
    event.stopPropagation();
    setUnitValue1((prevValue) => Math.max(prevValue - 50, 0));
  };

  const handleIncrement1 = (event) => {
    event.stopPropagation();
    setUnitValue1((prevValue) => prevValue + 50);
  };

  const handleSliderChange1 = (event) => {
    setUnitValue1(parseInt(event.target.value, 10));
  };

  //Для гигабайт
  const [showSlider2, setShowSlider2] = useState(false);
  const [unitValue2, setUnitValue2] = useState(0);

  const maxGigabytes = 50;
  const step2 = 1;

  const handleShowSlider2 = () => {
    setShowSlider2(!showSlider2);
  };

  const handleDecrement2 = (event) => {
    event.stopPropagation();
    setUnitValue2((prevValue) => Math.max(prevValue - step2, 0));
  };

  const handleIncrement2 = (event) => {
    event.stopPropagation();
    setUnitValue2((prevValue) => Math.min(prevValue + step2, maxGigabytes)); // Ограничиваем значение до 50
  };

  const handleSliderChange2 = (event) => {
    setUnitValue2(parseInt(event.target.value, 10));
    setUnitValue2((prevValue) => Math.min(prevValue, maxGigabytes)); // Ограничиваем значение до 50
  };

  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  //Для цены
  const maxPrice = 2500; // Например, максимальное значение цены
  const stepPrice = 100;

  const [showSliderPrice3, setShowSliderPrice3] = useState(false);
  const [unitValuePrice3, setUnitValuePrice] = useState(0);

  const handleShowSliderPrice3 = () => {
    setShowSliderPrice3(!showSliderPrice3);
  };

  const handleDecrementPrice3 = (event) => {
    event.stopPropagation();
    setUnitValuePrice((prevValue) => Math.max(prevValue - stepPrice, 0));
  };

  const handleIncrementPrice3 = (event) => {
    event.stopPropagation();
    setUnitValuePrice((prevValue) => Math.min(prevValue + stepPrice, maxPrice));
  };

  const handleSliderChangePrice3 = (event) => {
    setUnitValuePrice(parseInt(event.target.value, 10));
    setUnitValuePrice((prevValue) => Math.min(prevValue, maxPrice));
  };

  const customBorderRef = useRef(null);

  useEffect(() => {
    const moreDetailsButton = document.querySelector('.button__moreDetails');
    const customBorder = customBorderRef.current;

    if (moreDetailsButton && customBorder) {
      const moreDetailsButtonTop = moreDetailsButton.offsetTop;
      const moreDetailsButtonHeight = moreDetailsButton.offsetHeight;

      customBorder.style.height = moreDetailsButtonTop + moreDetailsButtonHeight + 35 + 'px';
    }
  }, []);

  // const {
  //   loading: loadTariff,
  //   error: errorTariff,
  //   data: tariffData,
  //   previousData: tariffPreviousData,
  // } = useQuery(TARIFF_IN_ANTI_FILTER, {
  //   variables: {
  //     region: regionUrl,
  //     providerJoin: true,
  //     with_aggregate: true,
  //     providerId: providerId,
  //     internet: internetTariff,
  //     fix: fix,
  //     price: priceTariff,
  //     switch: switchTariff,
  //     calls: callsTariff,
  //   },
  //   skip: false,
  // });

  console.log('InfoData', infoData);
  console.log('tariffData', tariffData);

  return (
    <div className="App">
      <section name="title" id="">
        <p className="description__title">ВЫБЕРИТЕ СВОЙ ТАРИФ</p>
        <hr />
        <div className="description__text">
          <p>
            Используйте кнопки и <strong>“&lt;/&gt;”</strong> и <strong>“+/-”</strong>, чтобы найти
            подходящий тариф.
          </p>
          <p className="description__text__marginTop">
            Меняйте операторов, выбирайте значения гигабайт, минут и абонплаты.
          </p>
          <p className="description__text__marginTop">
            Используйте <strong>"зафиксировать"</strong>, чтобы этот параметр не менялся.
          </p>
          <p className="description__text__marginTop">
            Жмите <strong>“Подробнее”</strong>, чтобы увидеть детали и подключить тариф
          </p>
        </div>
      </section>
      <section name="title" className="rate">
        <div class="custom-border" ref={customBorderRef}>
          <div className="MyRate">Свой тариф</div>

          <div className="rate__operator">
            <img src="/images/leftArrow.svg" alt="" />
            <img className="beline" src="/images/Beeline.png" alt="" />
            <img src="/images/rightArrow.svg" alt="" />
            <div className="fix rate_charter">
              <input
                id="checkbox1"
                className="checkbox"
                type="checkbox"
                checked={isChecked1}
                onChange={(event) => handleCheckboxChange(1, event)}
              />
              <div className="fix__text">зафиксировать</div>
            </div>
          </div>

          <div className="rate__gigabyte rate_charter">
            <div className="unit" onClick={handleShowSlider2}>
              <img
                className="button__minus"
                src="/images/minus.svg"
                alt=""
                onClick={handleDecrement2}
              />
              <div className="unit__text">{unitValue2} гб</div>
              <img
                className="button__plus"
                src="/images/plus.svg"
                alt=""
                onClick={handleIncrement2}
              />
            </div>
            <div>
              {showSlider2 && (
                <input
                  type="range"
                  min="0"
                  max="50"
                  step={step2}
                  value={unitValue2}
                  onChange={handleSliderChange2}
                />
              )}
              <div className="fix rate_charter">
                <input
                  id="checkbox5"
                  className="checkbox"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={(event) => handleCheckboxChange(2, event)}
                />
                <div className="fix__text">зафиксировать</div>
              </div>
            </div>
          </div>

          <div className="rate__minutes rate_charter">
            <div className="unit" onClick={handleShowSlider1}>
              <img
                className="button__minus"
                src="/images/minus.svg"
                alt=""
                onClick={handleDecrement1}
              />
              <div className="unit__text">{unitValue1} мин</div>
              <img
                className="button__plus"
                src="/images/plus.svg"
                alt=""
                onClick={handleIncrement1}
              />
            </div>
            <div>
              {showSlider1 && (
                <input
                  type="range"
                  min="0"
                  max="900"
                  step={step}
                  value={unitValue1}
                  onChange={handleSliderChange1}
                />
              )}
              <div className="fix rate_charter">
                <input
                  id="checkbox3"
                  className="checkbox"
                  type="checkbox"
                  checked={isChecked3}
                  onChange={(event) => handleCheckboxChange(3, event)}
                />
                <div className="fix__text">зафиксировать</div>
              </div>
            </div>
          </div>

          <div className="rate__price rate_charter">
            <div className="rate__price rate_charter">
              <div className="unit" onClick={handleShowSliderPrice3}>
                <img
                  className="button__minus"
                  src="/images/minus.svg"
                  alt=""
                  onClick={handleDecrementPrice3}
                />
                <div className="unit__text">{unitValuePrice3} руб/мес</div>
                <img
                  className="button__plus"
                  src="/images/plus.svg"
                  alt=""
                  onClick={handleIncrementPrice3}
                />
              </div>
              <div>
                {showSliderPrice3 && (
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step={stepPrice}
                    value={unitValuePrice3}
                    onChange={handleSliderChangePrice3}
                  />
                )}
                <div className="fix rate_charter">
                  <input
                    id="checkbox4"
                    className="checkbox"
                    type="checkbox"
                    checked={isChecked4}
                    onChange={(event) => handleCheckboxChange(4, event)}
                  />
                  <div className="fix__text">зафиксировать</div>
                </div>
              </div>
            </div>

            <div className="socialNetwork">
              <div className="network__text">Безлимит на:</div>
              <div>
                <a
                  href="https://www.whatsapp.com/?lang=ru_RU"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img className="social-icon" src="/images/Whatsapp.svg" alt="WhatsApp" />
                </a>
                <a href="https://web.telegram.org/a/" target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src="/images/Telegram.svg" alt="Telegram" />
                </a>
                <a href="https://www.viber.com/ru/" target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src="/images/Viber.svg" alt="Viber" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src="/images/YouTube.svg" alt="YouTube" />
                </a>
                <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src="/images/VK.svg" alt="VKontakte" />
                </a>
                <button>+3</button>
              </div>
              <button className="button__moreDetails" onClick={() => handleMoreDetailsClick()}>
                ПОДРОБНЕЕ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
