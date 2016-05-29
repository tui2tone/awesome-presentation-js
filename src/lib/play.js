var Player = class {

  constructor(presentation, initPage = 1, initElm = 1) {
    this.page = initPage;
    this.elm = initElm;
    this.totalPage = presentation.pages.count();
    this.presentation = presentation;
    this.addControlKey()

    presentation.pages.show(this.page);
  }

  addControlKey() {
    const temp = this
    window.onkeydown = (e) => {
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 37:
          this.prev()
          break;
        case 39:
          this.next()
          break;
      }
    }
  }

  next() {
    let { page, totalPage, presentation, nextElm } = this
    if(page < totalPage) {
      this.page = page+1
      presentation.pages.show(this.page);
    }
  }

  prev() {
    let { page, totalPage, presentation } = this
    if(page > 1) {
      this.page = page-1
      presentation.pages.show(this.page);
    }
  }


  // nextElm() {
  //   let { presentation, page } = this
  //   presentation.pages[page].nextElm()
  // }
}

module.exports = Player;