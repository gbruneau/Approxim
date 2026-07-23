import './style.css';
import AppVersion from './version.json';
import { setupI18n } from  './i18n.js';


document.querySelector('#appVersion').textContent = `${AppVersion}`;


// Templates for language selector
var langOptionHTML=`<option class="langOption" value="%code"  data-lang="%code">%name</option>`;
//var langOptionHTML=`<div class="langOption" data-lang="%code">%name</div>`;
//var langOptionHTML=`<input type="radio" id="langOpt%code" name="langOpt" value="%code"><label for="langOpt%code">%name</label></br>`

setupI18n('langSelector',langOptionHTML);

