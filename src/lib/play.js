var Player = class {

  constructor(presentation, initPage = 1, initFm = 1, initElm = 1) {
    this.page = initPage;
    this.fm = initFm;
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
    let { page, totalPage, presentation } = this
    const isPlayFragment = this.nextFragment()
    if(page < totalPage && !isPlayFragment) {
      this.page = page+1
      presentation.pages.show(this.page, "next");
    }
  }

  prev() {
    let { page, totalPage, presentation } = this
    const isPlayFragment = this.prevFragment()
    if(page > 1 && !isPlayFragment) {
      this.page = page-1
      presentation.pages.show(this.page, "prev");
    }
  }


  nextFragment() {
    let { presentation, page } = this
    let { pages } = presentation
    return pages.pages[page-1].next()
  }

  prevFragment() {
    let { presentation, page } = this
    let { pages } = presentation
    return pages.pages[page-1].prev()
  }
}

module.exports = Player;