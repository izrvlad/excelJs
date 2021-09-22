import {$} from '@core/Dom';

export function resizeGandler($root, event) {
  const $resize = $(event.target);
  const $parent = $resize.closest('[data-type="resize"]');
  const cord = $parent.getCord()
  const id = $parent.data
  const type = event.target.dataset.resize
  let delta; let cools

  if (type === 'col') {
    cools = $root.findAll(`[data-colid="${id}"]`)
    document.onmousemove = (e)=>{
      delta = e.pageX - cord.right
      $resize.css({right: -delta + 'px', opacity: 1, bottom: -5000 + 'px'})
    }
  }

  if (type === 'row') {
    document.onmousemove = (e)=>{
      delta = e.pageY - cord.bottom
      $parent.css({height: cord.height + delta + 'px'});
    }
  }
  document.onmouseup=()=>{
    if (type === 'col') {
      $parent.css({width: cord.width + delta + 'px'});
      cools.forEach((coll)=>coll.style.width = cord.width + delta + 'px')
      $resize.css({right: 0, opacity: 0, bottom: 0})
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
