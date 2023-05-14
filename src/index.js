import './style.scss';
import _ from 'lodash';
import { run } from './app/app.js';
import { AlertService } from './app/alert.service.js';
import { CalculatorService } from './app/calculator.service.js';
import { JokesService } from './app/jokes.service.js';

run(new AlertService(), new CalculatorService(), new JokesService());

console.log(_.toUpper('hi index.js'));
