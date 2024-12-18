import './index.css';
import '../components/cards.js'
import '../components/modal.js'
import '../components/index.js'
import '../components/validate.js'

import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
