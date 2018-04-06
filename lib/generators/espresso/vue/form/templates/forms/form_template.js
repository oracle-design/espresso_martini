import FormBase from './form_base'

export default class <%= name.split('::').map(&:classify).join('') %>From extends FormBase {
  constructor(model) {
    super({
      /**
       * 在 attributes() 中重新定義這個 Form 所需要的欄位。可以自行定義（但可能要配合
       * model 中的 requestBody helper 一起設定），也可以直接使用 model 中的部分內
       * 容。例如：
       *   若有個 SiteConfig 的非標準 model，這個 form 是用來更新 model.meta_tags 的
       *   部分，在這邊可以寫成：
       *   ```js
       *   attributes() {
       *     return model.meta_tags
       *   }
       *   ```
       */
      attributes() {
        return {}
      }
    })
    this.model = model

    this.constructor.dataAssigner(this.originalData, this)
  }

  /**
   * 在 dataDumper() 決定這個 Form 的欄位要寫到 modle 中的哪個部分。
   * 例如：
   *   若有個 SiteConfig 的非標準 model，這個 form 是用來更新 model.meta_tags 的部分，則
   *   在這邊就要寫成：
   *   ```js
   *   this.constructor.dataDumper(this, this.model.meta_tags, this.originalData)
   *   ```
   */
  sync() {
    this.constructor.dataDumper(this, this.model.some_property, this.originalData)

    return this.model
  }
}
