export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress;
  #mouseDown;
  constructor() {
    this.#keyPress = false;
    this.#mouseDown = false;
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.getElementById('switch');
    this.#fontSelectEl = document.getElementById('font');
    this.#keyboardEl = document.getElementById('keyboard');
    this.#inputGroupEl = document.getElementById('input-group');
    this.#inputEl = document.getElementById('input');
  }

  #addEvent() {
    this.#switchEl.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectEl.addEventListener('change', this.#onChangeFont);
    this.#inputEl.addEventListener('input', this.#onInput.bind(this));
    document.addEventListener('keydown', this.#onKeyDown.bind(this));
    document.addEventListener('keyup', this.#onKeyUp.bind(this));
    this.#keyboardEl.addEventListener(
      'mousedown',
      this.#onMouseDown.bind(this)
    );
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }
  #onMouseDown(ev) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    ev.target.closest('div.key')?.classList.add('active');
  }
  #onMouseUp(ev) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = ev.target.closest('div.key');
    const isActive = !!keyEl?.classList.contains('active');
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== 'Space' && val !== 'Backspace') {
      this.#inputEl.value += val;
    }
    // Space
    if (isActive && val === 'Space') {
      this.#inputEl.value += ' ';
    }
    // Backspace
    if (isActive && val === 'Backspace') {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector('.active')?.classList.remove('active');
  }

  #onInput(ev) {
    if (this.#mouseDown) return;
    ev.target.value = ev.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, '');
    this.#inputGroupEl.classList.toggle(
      'error',
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(ev.data)
    );
  }
  #onKeyDown(ev) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#keyboardEl
      .querySelector(`[data-code=${ev.code}]`)
      ?.classList.add('active');
  }
  #onKeyUp(ev) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${ev.code}]`)
      ?.classList.remove('active');
  }
  #onChangeTheme(ev) {
    document.documentElement.setAttribute(
      'theme',
      ev.target.checked ? 'dark-mode' : ''
    );
  }
  #onChangeFont(ev) {
    document.body.style.fontFamily = ev.target.value;
  }
}
