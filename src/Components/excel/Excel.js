import {$} from "@core/Dom";
import {Emiter} from "@core/Emiter";


export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emiter();
  }

  getRoot() {
    const options = {emitter:this.emitter}
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
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component=>component.init())
  }
  destroy(){
    this.components.forEach((component)=>component.destroy())
  }
}
