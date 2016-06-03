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
    const isPlayElm = this.nextElm()
    if(page < totalPage && !isPlayElm) {
      this.page = page+1
      presentation.pages.show(this.page, "next");
    }
  }

  prev() {
    let { page, totalPage, presentation } = this
    const isPlayElm = this.prevElm()
    if(page > 1 && !isPlayElm) {
      this.page = page-1
      presentation.pages.show(this.page, "prev");
    }
  }


  nextElm() {
    let { presentation, page } = this
    let { pages } = presentation
    return pages.pages[page-1].next()
  }

  prevElm() {
    let { presentation, page } = this
    let { pages } = presentation
    return pages.pages[page-1].prev()
  }
}

module.exports = Player;