import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 shorten">
            <h2>Link Shortener — сократите ссылку в 1 клик</h2>

            <div class="row">
              <div class="form-group justify-content-center d-flex">
                <input
                  placeholder="Enter link"
                  id="link"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyPress={pressHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container advantage-block">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="header">
              Простой метод укоротить ссылку с массой преимуществ
            </h3>
          </div>
          <div class="col-sm-4">
            <div class="advantage">
              <h4 class="title">Сокращенный URL в 1 клик</h4>
              <p class="icons text">
                Всего в 1 клик Вы получаете персональный короткий адрес. Данный
                sURL — статичен, а значит всегда с вами
              </p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="advantage">
              <h4 class="title">Полная статистика ссылок</h4>
              <p class="icons graph text">
                Вы можете отслеживать статистику ваших ссылок.
              </p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="advantage">
              <h4 class="title">Рабочая альтернатива goo.gl</h4>
              <p class="icons domain text">
                В отличие от закрытого проекта от google — sURL поддерживает
                действительно короткие адреса вида surl.li/clck
              </p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="advantage">
              <h4 class="title">Ускорение работы сайтов</h4>
              <p class="icons domain text">
                Использование коротких URL повышает CTR на 106–146%
              </p>
            </div>
          </div>
          <div class="col-sm-12">
            <h4 class="title">
              sURL — Сервис сокращенных ссылок со статистикой
            </h4>
            <p>
              Всего в 1 клик вы получите краткую ссылку — аналог вашего длинного
              адреса. Также к каждой сокращённой ссылке мы предоставляем полную
              статистику. Главное, чтобы длинна исходной ссылки перед ее
              сокращением, не превышала 1984 символов.
            </p>
          </div>
          <div class="col-sm-6">
            <h4 class="title">Как работает онлайн сократитель ссылок?</h4>
            <p>
              Вы просто вводите необходимый длинный URL в поле ввода и получаете
              его короткий аналог. В дальнейшем, данный короткий адрес на
              постоянной основе будет привязан к длинному варианту вашей ссылки.
              По факту станет его зеркалом. Таким образом вы можете не бояться,
              что ссылка перестанет работать. Забыли или потеряли сокращенную
              ссылку? Не беда! Просто снова вставьте длинный адрес так вы можете
              узнать короткую ссылку — аналог длинного адреса.
            </p>
          </div>
          <div class="col-sm-6">
            <h4 class="title">Зачем сокращать URL адреса?</h4>
            <p>
              Ссылка может иметь огромные знание, здесь могут быть указаны
              параметры страниц и сортировок, а также многое другое. Также
              маркетологи часто используют utm метки, что удлиняет ссылку и
              делает ее иногда в несколько раз длиннее. Такого рода ссылки
              просто неудобно передавать, часто их даже не поддерживают форумы,
              блоги или мессенджеры. С помощью нашего сервиса коротких URL вы
              можете создать красивую ссылку surl.li/xxx и разместить ее где
              пожелаете.
            </p>
          </div>
         </div>
      </div>
    </div>
  );
};
