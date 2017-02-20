import './css/common.scss'
import './css/mpeditor.scss'
import './css/theme-white.scss'
import Clipboard from 'clipboard'
import _ from 'underscore'
import $ from 'jQuery'
// import './js/jquery.easing.js'
// ace
import * as ace from 'brace'
import 'brace/mode/markdown'
import 'brace/theme/solarized_dark'

// showdown
import showdown from 'showdown'
import './js/showdown-plugins/showdown-prettify-for-wechat.js'
import './js/showdown-plugins/showdown-task-list.js'
import './js/showdown-plugins/showdown-section-divider.js'
import './js/showdown-plugins/showdown-emoji.js'
import './js/showdown-plugins/showdown-image-size.js'
import './js/showdown-plugins/showdown-colorful.js'

// 语法高亮
import './js/google-code-prettify/run_prettify.js'

const PR = require('PR')

const tmpl = `
<div class="mpe-nav-wrap">
  <div class="mpe-nav">
    <ul class="mpe-nav-tools mpe_fl">
      <li class="mpe-nav-item">
        <a href="#">
        <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4277"><path d="M64 448l896 0c57.6 0 83.2-70.4 44.8-108.8l-192-192c-25.6-25.6-64-25.6-89.6 0s-25.6 64 0 89.6L806.4 320 64 320C25.6 320 0 345.6 0 384S25.6 448 64 448zM960 576 64 576c-57.6 0-83.2 70.4-44.8 108.8l192 192c25.6 25.6 64 25.6 89.6 0 25.6-25.6 25.6-64 0-89.6L217.6 704 960 704c38.4 0 64-25.6 64-64S998.4 576 960 576z" p-id="4278"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="#">
          <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="879"><path d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608zM512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608zM800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z" p-id="880"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="javascript:void(0)" eid="copyBtn">
          <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1808"><path d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128zM800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960zM544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320zM608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480zM608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z" p-id="1809"></path></svg>
        </a>
      </li>
    </ul>
    <ul class="mpe-nav-tools mpe_fr">
      <li class="mpe-nav-item">
        <a href="#">
          <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456"><path d="M516 352c-1.888 0-3.808-0.16-5.664-0.512l-356-64C139.104 284.736 128 271.488 128 256L128 160c0-52.928 43.072-96 96-96l576 0c52.928 0 96 43.072 96 96l0 96c0 15.424-11.04 28.672-26.208 31.456l-348 64C519.872 351.84 517.952 352 516 352zM192 229.248l323.936 58.24L832 229.344 832 160c0-17.632-14.336-32-32-32L224 128C206.368 128 192 142.368 192 160L192 229.248zM800 960 224 960c-52.928 0-96-43.072-96-96L128 384c0-17.664 14.336-32 32-32s32 14.336 32 32l0 480c0 17.664 14.368 32 32 32l576 0c17.664 0 32-14.336 32-32L832 384c0-17.664 14.304-32 32-32s32 14.336 32 32l0 480C896 916.928 852.928 960 800 960zM607.808 640c17.696 0 32-14.304 32-32s-14.304-32-32-32l-51.84 0 76.16-73.312c12.704-12.288 13.088-32.448 0.8-45.152-12.288-12.736-32.512-12.992-45.248-0.768l-76.256 73.6-73.344-73.216c-12.512-12.48-32.8-12.48-45.28 0.064-12.48 12.512-12.448 32.608 0.032 45.088L466.88 576l-51.136 0c-17.664 0-32 14.304-32 32s14.336 32 32 32L480 640l0 32-64.256 0c-17.664 0-32 14.304-32 32s14.336 32 32 32L480 736l0 64.384c0 17.696 14.336 32 32 32s32-14.304 32-32L544 736l63.808 0c17.696 0 32-14.304 32-32s-14.304-32-32-32L544 672l0-32L607.808 640z" p-id="1457"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="#">
          <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3490"><path d="M800 64H224C171.072 64 128 107.072 128 160v96a32 32 0 0 0 26.336 31.488l356 64a30.56 30.56 0 0 0 11.456-0.032l348-64A32 32 0 0 0 896 256V160c0-52.928-43.072-96-96-96zM884.512 359.424a31.744 31.744 0 0 0-26.208-6.912L512 415.456 165.728 352.512A32.064 32.064 0 0 0 128 384v480c0 52.928 43.072 96 96 96h576c52.928 0 96-43.072 96-96V384c0-9.472-4.224-18.496-11.488-24.576zM607.808 608a32 32 0 1 1 0 64H544v32h63.808a32 32 0 1 1 0 64H544v64.416a32 32 0 1 1-64 0V768h-64.256a32 32 0 1 1 0-64H480v-32h-64.256a32 32 0 1 1 0-64h51.168l-74.016-73.664a31.968 31.968 0 0 1 45.184-45.12l73.376 73.216 76.256-73.6a32 32 0 0 1 45.248 0.768 31.872 31.872 0 0 1-0.8 45.152L555.968 608h51.84z" p-id="3491"></path></svg>
        </a>
      </li>
      <li class="mpe-nav-item">
        <a href="#">
          <svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1224"><path d="M728.864 497.056c-12.48-3.712-29.152-6.752-22.624-22.944 14.144-35.136 15.744-73.792 0.416-95.424-28.736-40.576-99.36-29.472-189.44 7.808 0-0.064-28.288 12.224-21.056-9.952 13.856-44.032 11.776-80.896-9.792-102.208-48.896-48.352-178.88 1.824-290.368 111.936C112.48 468.8 64 556.256 64 631.84c0 144.608 187.68 232.544 371.296 232.544 240.704 0 395.776-139.104 395.776-248.832C831.072 549.28 779.616 512.608 728.864 497.056zM435.808 812.576c-146.528 14.272-272.992-51.168-282.496-146.208-9.504-95.04 101.568-183.68 248.096-197.984 146.528-14.304 273.024 51.136 282.496 146.144C693.376 709.6 582.336 798.24 435.808 812.576zM897.632 235.136c-60.096-62.496-148.704-86.304-230.496-69.984l-0.032 0c-18.944 3.808-30.976 21.28-26.944 38.976 4.032 17.728 22.656 29.056 41.568 25.28 58.176-11.584 121.152 5.376 163.872 49.76 42.656 44.384 54.272 104.928 35.968 157.984l0 0c-5.952 17.28 4.128 35.776 22.592 41.376 18.368 5.568 38.144-3.872 44.096-21.12 0-0.032 0-0.096 0-0.096C973.92 382.656 957.728 297.568 897.632 235.136M807.904 317.088c-29.024-31.2-71.872-43.04-111.456-34.88-16.16 3.328-26.464 18.752-23.008 34.432 3.456 15.616 19.36 25.632 35.488 22.24l0 0.032c19.328-3.968 40.32 1.824 54.496 17.024 14.208 15.264 18.016 36.032 11.936 54.272l0.032 0c-5.056 15.232 3.52 31.584 19.264 36.512 15.744 4.864 32.608-3.424 37.696-18.688C844.768 390.752 836.992 348.288 807.904 317.088M484.928 504.064C413.12 485.76 331.968 520.8 300.8 582.72c-31.744 63.168-1.056 133.28 71.488 156.192 75.136 23.712 163.68-12.64 194.464-80.8C597.12 591.488 559.2 522.848 484.928 504.064zM430.08 662.528c-14.592 22.336-45.824 32.128-69.376 21.824-23.2-10.144-30.048-36.096-15.456-57.856 14.432-21.696 44.608-31.36 67.968-21.952C436.864 614.208 444.416 639.968 430.08 662.528zM478.176 603.328c-5.28 8.64-16.928 12.832-26.08 9.216-8.992-3.552-11.808-13.248-6.688-21.728 5.248-8.448 16.48-12.608 25.44-9.184C479.936 584.8 483.2 594.592 478.176 603.328z" p-id="1225"></path></svg>
        </a>
      </li>
    </ul>
  </div>
</div>
<div class="mpe-wrap">

  <div eclass="mpe-col" class="mpe-editor-col mpe-col mpe_fl">
    <div class="mpe-editor-wrap">
      <div eid="editor" class="mpe-editor"></div>
    </div>
  </div>
  <div eclass="mpe-col" class="mpe-preview-col mpe-col mpe_fr">
    <div class="mpe-preview-wrap">
      <div class="mpe-preview" eid="preview"></div>
    </div>
  </div>
</div>
`
const $win = $(window)
let mdSections = []
let offsetBegin = 0
$win.on('createMdSection', (evt, ...data) => {
  mdSections = data
}).on('markdownTrim', (e, offset) => {
  offsetBegin = offset
})

export default class Editor {
  constructor (node, { text, updateDelayTime = 300 } = {}) {
    let $container = $(node).html(tmpl)
    this.$container = $container
    let that = this
    $container.find('[eid]').each((i, dom) => {
      dom = $(dom)
      let id = dom.attr('eid')
      that['$' + id] = dom
    })

    this.resize()
    let editor = this.editor = this._initEditor(this.$editor[0], text)
    this.converter = this._initShowdown()
    if (text) {
      this.updatePreview(text)
    }

    let timer
    editor.on('change', () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => that.updatePreview(), updateDelayTime)
    })

    // 跟滚动相关
    this._scrollingHelper = $('<div>')
    this._isPreviewMoving = false
    this._isEditorMoving = false
    this._bindEvent()
  }
  setValue (content) {
    this.editor.getSession().setValue(content)
    this.updatePreview()
    return this
  }
  updatePreview (content) {
    // console.log(this.editor.getValue())
    let val = this.converter.makeHtml(content || this.editor.getValue())
    this.$preview.html(val)
    PR.prettyPrint()
    this._buildSection()

    return this
  }

  // 改变大小
  resize (height) {
    height = height || this.$container.height()
    this.$editor.height(height)
    this.$preview.height(height)
    this.$container.find('[eclass=mpe-col]').height(height)
    this.editor && this.editor.resize()
    this._buildSection()
  }
    // 私有方法
  _initShowdown () {
    let converter = new showdown.Converter({
      extensions: ['prettify', 'tasklist', 'section-divider', 'showdown-emoji', 'colorful'],
      tables: true,
      simpleLineBreaks: true,
      strikethrough: true
    })
    return converter
  }
  _buildScrollLink () {
    return _.throttle(() => {
      let that = this
      let mdSectionList = this._mdSectionList
      let htmlSectionList = this._htmlSectionList
      let aceEditor = this.editor
      if (mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
        this._doScrollLink()
        return
      }

      let editorScrollTop = aceEditor.renderer.getScrollTop()
      if (editorScrollTop < 0) {
        editorScrollTop = 0
      }

      let $previewElt = this.$preview
      let previewScrollTop = $previewElt.scrollTop()
      function getDestScrollTop (srcScrollTop, srcSectionList, destSectionList) {
        let sectionIndex
        let srcSection = _.find(srcSectionList, (section, index) => {
          sectionIndex = index
          return srcScrollTop < section.endOffset
        })
        if (srcSection === undefined) {
          return
        }
        let posInSection = (srcScrollTop - srcSection.startOffset) / (srcSection.height || 1)
        let destSection = destSectionList[sectionIndex]
        return destSection.startOffset + destSection.height * posInSection
      }

      let lastEditorScrollTop = this.lastEditorScrollTop
      let lastPreviewScrollTop = this.lastPreviewScrollTop
      let destScrollTop
      let isScrollEditor = this._scrollSyncLeader === 'editor'
      let isScrollPreview = this._scrollSyncLeader === 'preview'
      let scrollingHelper = this._scrollingHelper
      if (isScrollEditor === true) {
        if (Math.abs(editorScrollTop - lastEditorScrollTop) <= 9) {
          return
        }
        isScrollEditor = false
        lastEditorScrollTop = editorScrollTop
        destScrollTop = getDestScrollTop(editorScrollTop, mdSectionList, htmlSectionList)
        destScrollTop = _.min([
          destScrollTop,
          $previewElt.prop('scrollHeight') - $previewElt.outerHeight()
        ])
        if (Math.abs(destScrollTop - previewScrollTop) <= 9) {
          lastPreviewScrollTop = previewScrollTop
          return
        }
        scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
          value: destScrollTop - previewScrollTop
        }, {
          // easing: 'easeOutSine',
          duration: 200,
          queue: 'scrollLinkFx',
          step: function (now) {
            that._isPreviewMoving = true
            lastPreviewScrollTop = previewScrollTop + now
            $previewElt.scrollTop(lastPreviewScrollTop)
          },
          done: function () {
            _.defer(function () {
              that._isPreviewMoving = false
            })
          }
        }).dequeue('scrollLinkFx')
      } else if (isScrollPreview === true) {
        if (Math.abs(previewScrollTop - lastPreviewScrollTop) <= 9) {
          return
        }
        isScrollPreview = false
        lastPreviewScrollTop = previewScrollTop
        destScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList)

        destScrollTop = _.min([
          destScrollTop,
          aceEditor.session.getScreenLength() * aceEditor.renderer.lineHeight + aceEditor.renderer.scrollMargin.bottom - aceEditor.renderer.$size.scrollerHeight
        ])
        destScrollTop < 0 && (destScrollTop = 0)

        if (Math.abs(destScrollTop - editorScrollTop) <= 9) {
          lastEditorScrollTop = editorScrollTop
          return
        }
        scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
          value: destScrollTop - editorScrollTop
        }, {
          // easing: 'easeOutSine',
          duration: 200,
          queue: 'scrollLinkFx',
          step: function (now) {
            that._isEditorMoving = true
            lastEditorScrollTop = editorScrollTop + now
            aceEditor.session.setScrollTop(lastEditorScrollTop)
          },
          done: function () {
            _.defer(function () {
              that._isEditorMoving = false
            })
          }
        }).dequeue('scrollLinkFx')
      }
    }, 100)
  }

  _bindEvent () {
    let sessionEditor = this.editor.getSession()
    let $preview = this.$preview
    let that = this

    let buildSection = this._buildSection()
    this._doScrollLink = this._buildScrollLink()
    sessionEditor.on('changeScrollTop', () => {
      if (that._isEditorMoving === false) {
        that._scrollSyncLeader = 'editor'
        buildSection()
      }
    })

    $preview.on('scroll', () => {
      if (that._isPreviewMoving === false) {
        that._scrollSyncLeader = 'preview'
        buildSection()
      }
    })
    // 工具栏
    let clipboard = new Clipboard(this.$copyBtn[0], {
      action: 'cut',
      target: () => this.$preview[0]
    })
    clipboard.on('success', (e) => {
      console.info('Text:', e.text)
    })
  }
  _buildSection () {
    return _.throttle(() => {
      // console.log('buildSection')
      let $preview = this.$preview
      let preScrollTop = $preview.scrollTop()
      // 处理预览html
      let startOffset
      let htmlSectionList = []
      $preview.find('.mpe-section-divider').each((i, dom) => {
        if (startOffset === undefined) {
          startOffset = 0
          return
        }
        let $node = $(dom)
        let top = $node.position().top + preScrollTop
        htmlSectionList.push({
          startOffset: startOffset,
          endOffset: top,
          height: top - startOffset
        })
        startOffset = top
      })
      let scrollHeight = $preview.prop('scrollHeight')
      htmlSectionList.push({
        startOffset: startOffset,
        endOffset: scrollHeight,
        height: scrollHeight - startOffset
      })

      // 处理编辑器
      let mdSectionList = []
      let mdSectionOffset = 0
      let mdTextOffset = 0
      let editorSession = this.editor.session
      let editorLineHeight = this.editor.renderer.lineHeight

      let firstSectionOffset = offsetBegin

      mdSections.forEach((section) => {
        mdTextOffset += section.text.length + firstSectionOffset
        firstSectionOffset = 0
        let documentPosition = editorSession.doc.indexToPosition(mdTextOffset)
        let screenPosition = editorSession.documentToScreenPosition(documentPosition.row, documentPosition.column)
        let newSectionOffset = screenPosition.row * editorLineHeight
        var sectionHeight = newSectionOffset - mdSectionOffset
        mdSectionList.push({
          startOffset: mdSectionOffset,
          endOffset: newSectionOffset,
          height: sectionHeight
        })
        mdSectionOffset = newSectionOffset
      })
      this._mdSectionList = mdSectionList
      this._htmlSectionList = htmlSectionList
      // apply Scroll Link (-10 to have a gap > 9px)
      this.lastEditorScrollTop = -10
      this.lastPreviewScrollTop = -10
      this._doScrollLink()
    }, 80)
  }

  // 初始化编辑器
  _initEditor (id, val) {
    let editor = ace.edit(id)
    let aceSession = editor.getSession()
    let aceRenderer = editor.renderer
    editor.setOption('scrollPastEnd', true)
    aceRenderer.setShowPrintMargin(false)

    aceRenderer.setShowGutter(false)
    aceSession.setUseWrapMode(true)
    aceSession.setNewLineMode('unix')
    aceSession.setMode('ace/mode/markdown')
    aceSession.$selectLongWords = true
    aceRenderer.setPadding(15)
    editor.setTheme('ace/theme/solarized_dark')
    if (val) {
      aceSession.setValue(val)
    }
    return editor
  }
}
