import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return(
    <article className='teacher-item'>
      <header>
        <img src='https://avatars0.githubusercontent.com/u/52381662?s=460&u=67b6c3805001173bf3324ecbbbcf11f9f0dcb152&v=4' alt='Welton Felix'/>
        <div>
          <strong>Welton Felix</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        Electronics student at IFPE. Passionate about Technology and Entrepreneurship.
        <br/><br/>
        Hi, I'm Welton, a Electronics student passionate about development and entrepreneurship.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type='button'>
          <img src={whatsappIcon} alt='Whatsapp'/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;