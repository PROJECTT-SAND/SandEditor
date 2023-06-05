// import { Keyboard, Process } from '@/constants';

//////////////////////
import process from './sandeditor/process';
import keyboard from './sandeditor/keyboard';
import { getObject } from './sandeditor/object';
import { newTextParam } from './sandeditor/parameter';
import store from './store';
import { add } from './calc';

const SpeedX = 5;
const text = newTextParam('Text');
const object = getObject();

// process.on(Process.Update, () => {
// 	object.x += SpeedX;
// });

// keyboard.on(Keyboard.Press.W, () => {});
// keyboard.on(Keyboard.Down.Any, (e) => {});
