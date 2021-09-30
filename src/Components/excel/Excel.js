import {$} from "@core/Dom";
import {Emiter} from "@core/Emiter";
import {StoreSubscriber} from "@core/storeSubscriber";


export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
    this.emitter = new Emiter();
  }

  getRoot() {
    const options = {emitter: this.emitter, store: this.store}
    const $root = $.create('div', 'excel')
    this.components = this.components.map(Component=>{
      const el = $.create('div',Component.className);
      const component = new Component(el,options);
      el.Html(component.toHTML());
      $root.append(el);
      return component
    })
    return $root
  }
  init() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component=>component.init())
  }
  destroy(){
    this.subscriber.unSubscribeComponents()
    this.components.forEach((component)=>component.destroy())
  }
}
